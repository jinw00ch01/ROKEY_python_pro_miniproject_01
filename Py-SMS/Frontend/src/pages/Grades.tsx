import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Table, Input } from '../components/common';
import { gradesService } from '../services/grades';
import { GradeListItem } from '../types';
import styles from './Grades.module.css';

export const Grades: React.FC = () => {
  const navigate = useNavigate();
  const [grades, setGrades] = useState<GradeListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [semester, setSemester] = useState('');

  useEffect(() => {
    fetchGrades();
  }, []);

  const fetchGrades = async (semesterFilter?: string) => {
    try {
      setLoading(true);
      const data = await gradesService.getAll({ semester: semesterFilter });
      setGrades(data.results);
    } catch (error) {
      console.error('Failed to fetch grades:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSemesterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSemester(value);
    fetchGrades(value);
  };

  const columns = [
    { key: 'student_name', header: '학생' },
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
    {
      key: 'actions',
      header: '작업',
      render: (grade: GradeListItem) => (
        <Button size="small" onClick={() => navigate(`/grades/${grade.id}`)}>
          보기
        </Button>
      ),
    },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>성적</h1>
        <Button onClick={() => navigate('/grades/new')}>성적 추가</Button>
      </div>

      <div className={styles.toolbar}>
        <Input
          placeholder="학기로 필터링 (예: 2024-1)"
          value={semester}
          onChange={handleSemesterChange}
          className={styles.filterInput}
        />
      </div>

      {loading ? (
        <div className={styles.loading}>불러오는 중...</div>
      ) : (
        <Table columns={columns} data={grades} />
      )}
    </div>
  );
};
