import React, { useEffect, useState } from 'react';
import { Button, Table, Modal } from '../components/common';
import { enrollmentsService } from '../services/enrollments';
import { studentsService } from '../services/students';
import { coursesService } from '../services/courses';
import { Enrollment, StudentListItem, CourseListItem } from '../types';
import styles from './Enrollments.module.css';

export const Enrollments: React.FC = () => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [students, setStudents] = useState<StudentListItem[]>([]);
  const [courses, setCourses] = useState<CourseListItem[]>([]);
  const [newEnrollment, setNewEnrollment] = useState({
    student_id: '',
    course_id: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      setLoading(true);
      const data = await enrollmentsService.getAll();
      setEnrollments(data.results);
    } catch (error) {
      console.error('Failed to fetch enrollments:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadStudentsAndCourses = async () => {
    try {
      const [studentsData, coursesData] = await Promise.all([
        studentsService.getAll(),
        coursesService.getAll(),
      ]);
      setStudents(studentsData.results);
      setCourses(coursesData.results);
    } catch (error) {
      console.error('Failed to load students and courses:', error);
    }
  };

  const handleAddClick = () => {
    setShowAddModal(true);
    loadStudentsAndCourses();
  };

  const handleAddEnrollment = async () => {
    if (!newEnrollment.student_id || !newEnrollment.course_id) {
      setError('학생과 과목을 모두 선택해주세요.');
      return;
    }

    try {
      await enrollmentsService.create({
        student_id: Number(newEnrollment.student_id),
        course_id: Number(newEnrollment.course_id),
      });
      setShowAddModal(false);
      setNewEnrollment({ student_id: '', course_id: '' });
      setError('');
      fetchEnrollments();
    } catch (err: any) {
      setError(err.response?.data?.detail || '수강신청 실패. 다시 시도해주세요.');
    }
  };

  const handleUpdateStatus = async (id: number, status: string) => {
    try {
      await enrollmentsService.update(id, { status });
      fetchEnrollments();
    } catch (error) {
      console.error('Failed to update enrollment status:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('수강신청을 취소하시겠습니까?')) {
      try {
        await enrollmentsService.delete(id);
        setEnrollments((prev) => prev.filter((e) => e.id !== id));
      } catch (error) {
        console.error('Failed to delete enrollment:', error);
      }
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; className: string }> = {
      active: { label: '수강중', className: styles.statusActive },
      completed: { label: '완료', className: styles.statusCompleted },
      dropped: { label: '취소', className: styles.statusDropped },
    };
    const statusInfo = statusMap[status] || { label: status, className: '' };
    return <span className={`${styles.badge} ${statusInfo.className}`}>{statusInfo.label}</span>;
  };

  const columns = [
    { key: 'student.full_name', header: '학생', render: (e: Enrollment) => e.student.full_name },
    { key: 'student.student_id', header: '학번', render: (e: Enrollment) => e.student.student_id },
    { key: 'course.name', header: '과목', render: (e: Enrollment) => e.course.name },
    { key: 'course.course_code', header: '과목 코드', render: (e: Enrollment) => e.course.course_code },
    {
      key: 'status',
      header: '상태',
      render: (e: Enrollment) => getStatusBadge(e.status),
    },
    {
      key: 'enrolled_at',
      header: '수강신청일',
      render: (e: Enrollment) => new Date(e.enrolled_at).toLocaleDateString('ko-KR'),
    },
    {
      key: 'actions',
      header: '작업',
      render: (e: Enrollment) => (
        <div className={styles.actions}>
          {e.status === 'active' && (
            <>
              <Button size="small" onClick={() => handleUpdateStatus(e.id, 'completed')}>
                완료
              </Button>
              <Button
                size="small"
                variant="secondary"
                onClick={() => handleUpdateStatus(e.id, 'dropped')}
              >
                취소
              </Button>
            </>
          )}
          <Button size="small" variant="danger" onClick={() => handleDelete(e.id)}>
            삭제
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>수강신청 관리</h1>
        <Button onClick={handleAddClick}>수강신청 추가</Button>
      </div>

      {loading ? (
        <div className={styles.loading}>불러오는 중...</div>
      ) : (
        <Table columns={columns} data={enrollments} />
      )}

      <Modal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setError('');
          setNewEnrollment({ student_id: '', course_id: '' });
        }}
        title="수강신청 추가"
      >
        <div className={styles.modalContent}>
          <div className={styles.formGroup}>
            <label className={styles.label}>학생</label>
            <select
              className={styles.select}
              value={newEnrollment.student_id}
              onChange={(e) =>
                setNewEnrollment({ ...newEnrollment, student_id: e.target.value })
              }
            >
              <option value="">학생을 선택하세요</option>
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.full_name} ({s.student_id})
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>과목</label>
            <select
              className={styles.select}
              value={newEnrollment.course_id}
              onChange={(e) =>
                setNewEnrollment({ ...newEnrollment, course_id: e.target.value })
              }
            >
              <option value="">과목을 선택하세요</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.course_code})
                </option>
              ))}
            </select>
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.modalActions}>
            <Button
              variant="secondary"
              onClick={() => {
                setShowAddModal(false);
                setError('');
                setNewEnrollment({ student_id: '', course_id: '' });
              }}
            >
              취소
            </Button>
            <Button onClick={handleAddEnrollment}>수강신청</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
