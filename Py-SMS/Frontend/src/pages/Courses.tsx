import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Table, Input, Modal } from '../components/common';
import { coursesService } from '../services/courses';
import { CourseListItem } from '../types';
import styles from './Courses.module.css';

export const Courses: React.FC = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<CourseListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; course: CourseListItem | null }>({
    open: false,
    course: null,
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async (searchTerm?: string) => {
    try {
      setLoading(true);
      const data = await coursesService.getAll({ search: searchTerm });
      setCourses(data.results);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    fetchCourses(value);
  };

  const handleDelete = async () => {
    if (deleteModal.course) {
      try {
        await coursesService.delete(deleteModal.course.id);
        setCourses((prev) => prev.filter((c) => c.id !== deleteModal.course?.id));
        setDeleteModal({ open: false, course: null });
      } catch (error) {
        console.error('Failed to delete course:', error);
      }
    }
  };

  const columns = [
    { key: 'course_code', header: '과목 코드' },
    { key: 'name', header: '과목명' },
    { key: 'credits', header: '학점' },
    { key: 'instructor', header: '담당 교수' },
    {
      key: 'actions',
      header: '작업',
      render: (course: CourseListItem) => (
        <div className={styles.actions}>
          <Button size="small" onClick={() => navigate(`/courses/${course.id}`)}>
            보기
          </Button>
          <Button
            size="small"
            variant="danger"
            onClick={(e) => {
              e.stopPropagation();
              setDeleteModal({ open: true, course });
            }}
          >
            삭제
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>과목</h1>
        <Button onClick={() => navigate('/courses/new')}>과목 추가</Button>
      </div>

      <div className={styles.toolbar}>
        <Input
          placeholder="과목 검색..."
          value={search}
          onChange={handleSearch}
          className={styles.searchInput}
        />
      </div>

      {loading ? (
        <div className={styles.loading}>불러오는 중...</div>
      ) : (
        <Table columns={columns} data={courses} onRowClick={(c) => navigate(`/courses/${c.id}`)} />
      )}

      <Modal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, course: null })}
        title="과목 삭제"
      >
        <p>다음을 삭제하시겠습니까: {deleteModal.course?.name}?</p>
        <div className={styles.modalActions}>
          <Button variant="secondary" onClick={() => setDeleteModal({ open: false, course: null })}>
            취소
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            삭제
          </Button>
        </div>
      </Modal>
    </div>
  );
};
