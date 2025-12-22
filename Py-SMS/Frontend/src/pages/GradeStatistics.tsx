import React, { useEffect, useState } from 'react';
import { Card, Input } from '../components/common';
import api from '../services/api';
import styles from './Statistics.module.css';

interface CourseStats {
  course_name: string;
  course_code: string;
  average_score: number;
  highest_score: number;
  lowest_score: number;
  total_students: number;
}

export const GradeStatistics: React.FC = () => {
  const [stats, setStats] = useState<CourseStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [semester, setSemester] = useState('');

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async (semesterFilter?: string) => {
    try {
      setLoading(true);
      const response = await api.get('/grades/statistics/', {
        params: { semester: semesterFilter },
      });
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch statistics:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSemesterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSemester(value);
    fetchStatistics(value);
  };

  if (loading) {
    return <div className={styles.loading}>불러오는 중...</div>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>성적 통계</h1>
      </div>

      <div className={styles.toolbar}>
        <Input
          placeholder="학기로 필터링 (예: 2024-1)"
          value={semester}
          onChange={handleSemesterChange}
          className={styles.filterInput}
        />
      </div>

      <div className={styles.grid}>
        {stats.length === 0 ? (
          <Card>
            <p className={styles.empty}>통계 데이터가 없습니다.</p>
          </Card>
        ) : (
          stats.map((stat, index) => (
            <Card key={index} className={styles.statsCard}>
              <div className={styles.cardHeader}>
                <h3 className={styles.courseName}>{stat.course_name}</h3>
                <span className={styles.courseCode}>{stat.course_code}</span>
              </div>

              <div className={styles.statsGrid}>
                <div className={styles.statItem}>
                  <div className={styles.statLabel}>평균 점수</div>
                  <div className={styles.statValue}>{stat.average_score.toFixed(1)}</div>
                </div>

                <div className={styles.statItem}>
                  <div className={styles.statLabel}>최고 점수</div>
                  <div className={styles.statValue}>{stat.highest_score}</div>
                </div>

                <div className={styles.statItem}>
                  <div className={styles.statLabel}>최저 점수</div>
                  <div className={styles.statValue}>{stat.lowest_score}</div>
                </div>

                <div className={styles.statItem}>
                  <div className={styles.statLabel}>학생 수</div>
                  <div className={styles.statValue}>{stat.total_students}</div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
