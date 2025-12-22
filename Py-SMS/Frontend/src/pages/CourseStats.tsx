import React, { useEffect, useState } from 'react';
import { Card, Table } from '../components/common';
import api from '../services/api';
import styles from './Analytics.module.css';

interface CourseAnalytics {
  id: number;
  course_code: string;
  course_name: string;
  total_students: number;
  average_grade: number;
  grade_distribution: {
    A: number;
    B: number;
    C: number;
    D: number;
    F: number;
  };
}

export const CourseStats: React.FC = () => {
  const [courses, setCourses] = useState<CourseAnalytics[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourseAnalytics();
  }, []);

  const fetchCourseAnalytics = async () => {
    try {
      setLoading(true);
      const response = await api.get('/analytics/courses/');
      const coursesWithId = response.data.map((course: any, index: number) => ({
        ...course,
        id: course.id ?? index,
      }));
      setCourses(coursesWithId);
    } catch (error) {
      console.error('Failed to fetch course analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { key: 'course_code', header: '과목 코드' },
    { key: 'course_name', header: '과목명' },
    { key: 'total_students', header: '학생 수' },
    {
      key: 'average_grade',
      header: '평균 성적',
      render: (c: CourseAnalytics) => `${c.average_grade.toFixed(1)}%`,
    },
    {
      key: 'distribution',
      header: '등급 분포',
      render: (c: CourseAnalytics) => (
        <div className={styles.miniDistribution}>
          <span>A: {c.grade_distribution.A}</span>
          <span>B: {c.grade_distribution.B}</span>
          <span>C: {c.grade_distribution.C}</span>
          <span>D: {c.grade_distribution.D}</span>
          <span>F: {c.grade_distribution.F}</span>
        </div>
      ),
    },
  ];

  if (loading) {
    return <div className={styles.loading}>불러오는 중...</div>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>과목별 통계</h1>
      </div>

      <div className={styles.statsGrid}>
        <Card className={styles.statCard}>
          <div className={styles.statLabel}>총 과목 수</div>
          <div className={styles.statValue}>{courses.length}</div>
        </Card>

        <Card className={styles.statCard}>
          <div className={styles.statLabel}>평균 수강생 수</div>
          <div className={styles.statValue}>
            {courses.length > 0
              ? (
                  courses.reduce((sum, c) => sum + c.total_students, 0) / courses.length
                ).toFixed(1)
              : '0.0'}
          </div>
        </Card>

        <Card className={styles.statCard}>
          <div className={styles.statLabel}>전체 평균 성적</div>
          <div className={styles.statValue}>
            {courses.length > 0
              ? (
                  courses.reduce((sum, c) => sum + c.average_grade, 0) / courses.length
                ).toFixed(1)
              : '0.0'}
            %
          </div>
        </Card>
      </div>

      {courses.length > 0 ? (
        <Table columns={columns} data={courses} />
      ) : (
        <Card>
          <p className={styles.empty}>과목 통계 데이터가 없습니다.</p>
        </Card>
      )}
    </div>
  );
};
