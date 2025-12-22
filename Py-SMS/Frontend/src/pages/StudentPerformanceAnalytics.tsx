import React, { useEffect, useState } from 'react';
import { Card, Table } from '../components/common';
import api from '../services/api';
import styles from './Analytics.module.css';

interface StudentPerformanceData {
  id: number;
  student_id: string;
  student_name: string;
  average_grade: number;
  total_courses: number;
  grade_distribution: {
    A: number;
    B: number;
    C: number;
    D: number;
    F: number;
  };
}

export const StudentPerformanceAnalytics: React.FC = () => {
  const [performances, setPerformances] = useState<StudentPerformanceData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPerformances();
  }, []);

  const fetchPerformances = async () => {
    try {
      setLoading(true);
      const response = await api.get('/analytics/students/performance/');
      const performancesWithId = response.data.map((perf: any, index: number) => ({
        ...perf,
        id: perf.id ?? index,
      }));
      setPerformances(performancesWithId);
    } catch (error) {
      console.error('Failed to fetch student performances:', error);
    } finally {
      setLoading(false);
    }
  };

  const getLetterGrade = (average: number): string => {
    if (average >= 90) return 'A';
    if (average >= 80) return 'B';
    if (average >= 70) return 'C';
    if (average >= 60) return 'D';
    return 'F';
  };

  const columns = [
    { key: 'student_name', header: '학생' },
    { key: 'student_id', header: '학번' },
    {
      key: 'average_grade',
      header: '평균 성적',
      render: (p: StudentPerformanceData) => `${p.average_grade.toFixed(1)}%`,
    },
    {
      key: 'letter_grade',
      header: '평균 등급',
      render: (p: StudentPerformanceData) => {
        const grade = getLetterGrade(p.average_grade);
        return (
          <span className={`${styles.grade} ${styles[`grade${grade}`]}`}>{grade}</span>
        );
      },
    },
    { key: 'total_courses', header: '수강 과목 수' },
  ];

  if (loading) {
    return <div className={styles.loading}>불러오는 중...</div>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>학생 성적 분석</h1>
      </div>

      <div className={styles.statsGrid}>
        <Card className={styles.statCard}>
          <div className={styles.statLabel}>총 학생 수</div>
          <div className={styles.statValue}>{performances.length}</div>
        </Card>

        <Card className={styles.statCard}>
          <div className={styles.statLabel}>평균 성적</div>
          <div className={styles.statValue}>
            {performances.length > 0
              ? (
                  performances.reduce((sum, p) => sum + p.average_grade, 0) /
                  performances.length
                ).toFixed(1)
              : '0.0'}
            %
          </div>
        </Card>

        <Card className={styles.statCard}>
          <div className={styles.statLabel}>최고 성적</div>
          <div className={styles.statValue}>
            {performances.length > 0
              ? Math.max(...performances.map((p) => p.average_grade)).toFixed(1)
              : '0.0'}
            %
          </div>
        </Card>

        <Card className={styles.statCard}>
          <div className={styles.statLabel}>최저 성적</div>
          <div className={styles.statValue}>
            {performances.length > 0
              ? Math.min(...performances.map((p) => p.average_grade)).toFixed(1)
              : '0.0'}
            %
          </div>
        </Card>
      </div>

      {performances.length > 0 ? (
        <Table columns={columns} data={performances} />
      ) : (
        <Card>
          <p className={styles.empty}>학생 성적 데이터가 없습니다.</p>
        </Card>
      )}
    </div>
  );
};
