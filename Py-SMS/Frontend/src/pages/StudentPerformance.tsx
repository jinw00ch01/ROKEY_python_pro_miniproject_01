import React, { useEffect, useState } from 'react';
import { Table, Card } from '../components/common';
import { gradesService } from '../services/grades';
import { studentsService } from '../services/students';
import { StudentListItem, GradeListItem } from '../types';
import styles from './Statistics.module.css';

export const StudentPerformance: React.FC = () => {
  const [students, setStudents] = useState<StudentListItem[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);
  const [grades, setGrades] = useState<GradeListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [gradesLoading, setGradesLoading] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const data = await studentsService.getAll();
      setStudents(data.results);
    } catch (error) {
      console.error('Failed to fetch students:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStudentChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const studentId = Number(e.target.value);
    setSelectedStudent(studentId);

    if (studentId) {
      setGradesLoading(true);
      try {
        const data = await gradesService.getByStudent(studentId);
        setGrades(data);
      } catch (error) {
        console.error('Failed to fetch student grades:', error);
      } finally {
        setGradesLoading(false);
      }
    } else {
      setGrades([]);
    }
  };

  const columns = [
    { key: 'course_name', header: '과목' },
    { key: 'grade_type', header: '유형' },
    {
      key: 'score',
      header: '점수',
      render: (grade: GradeListItem) => `${grade.score}/${grade.max_score}`,
    },
    {
      key: 'percentage',
      header: '백분율',
      render: (grade: GradeListItem) => `${grade.percentage.toFixed(1)}%`,
    },
    {
      key: 'letter_grade',
      header: '등급',
      render: (grade: GradeListItem) => (
        <span className={`${styles.grade} ${styles[`grade${grade.letter_grade}`]}`}>
          {grade.letter_grade}
        </span>
      ),
    },
    { key: 'semester', header: '학기' },
  ];

  if (loading) {
    return <div className={styles.loading}>불러오는 중...</div>;
  }

  const calculateAverage = () => {
    if (grades.length === 0) return 0;
    const sum = grades.reduce((acc, grade) => acc + grade.percentage, 0);
    return (sum / grades.length).toFixed(1);
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>학생 성적 조회</h1>
      </div>

      <Card className={styles.selectionCard}>
        <label className={styles.label}>학생 선택</label>
        <select
          className={styles.select}
          value={selectedStudent || ''}
          onChange={handleStudentChange}
        >
          <option value="">학생을 선택하세요</option>
          {students.map((s) => (
            <option key={s.id} value={s.id}>
              {s.full_name} ({s.student_id})
            </option>
          ))}
        </select>
      </Card>

      {selectedStudent && (
        <>
          {grades.length > 0 && (
            <Card className={styles.summaryCard}>
              <div className={styles.summary}>
                <div className={styles.summaryItem}>
                  <span className={styles.summaryLabel}>총 성적 수</span>
                  <span className={styles.summaryValue}>{grades.length}</span>
                </div>
                <div className={styles.summaryItem}>
                  <span className={styles.summaryLabel}>평균 성적</span>
                  <span className={styles.summaryValue}>{calculateAverage()}%</span>
                </div>
              </div>
            </Card>
          )}

          {gradesLoading ? (
            <div className={styles.loading}>성적 불러오는 중...</div>
          ) : grades.length > 0 ? (
            <Table columns={columns} data={grades} />
          ) : (
            <Card>
              <p className={styles.empty}>해당 학생의 성적이 없습니다.</p>
            </Card>
          )}
        </>
      )}
    </div>
  );
};
