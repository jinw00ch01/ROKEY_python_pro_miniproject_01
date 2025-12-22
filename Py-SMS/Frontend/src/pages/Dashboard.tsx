import React, { useEffect, useState } from 'react';
import { Card } from '../components/common';
import { analyticsService } from '../services/analytics';
import { DashboardStats, GradeDistribution } from '../types';
import styles from './Dashboard.module.css';

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [distribution, setDistribution] = useState<GradeDistribution | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, distData] = await Promise.all([
          analyticsService.getDashboardStats(),
          analyticsService.getGradeDistribution(),
        ]);
        setStats(statsData);
        setDistribution(distData);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className={styles.loading}>불러오는 중...</div>;
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1 className={styles.title}>대시보드</h1>
      </div>

      <div className={styles.statsGrid}>
        <Card className={styles.statCard}>
          <div className={styles.statValue}>{stats?.total_students || 0}</div>
          <div className={styles.statLabel}>총 학생 수</div>
        </Card>
        <Card className={styles.statCard}>
          <div className={styles.statValue}>{stats?.total_courses || 0}</div>
          <div className={styles.statLabel}>총 과목 수</div>
        </Card>
        <Card className={styles.statCard}>
          <div className={styles.statValue}>{stats?.active_enrollments || 0}</div>
          <div className={styles.statLabel}>활성 수강 신청</div>
        </Card>
        <Card className={styles.statCard}>
          <div className={styles.statValue}>{stats?.average_grade?.toFixed(1) || 0}</div>
          <div className={styles.statLabel}>평균 성적</div>
        </Card>
      </div>

      <div className={styles.chartsGrid}>
        <Card title="등급 분포" className={styles.chartCard}>
          <div className={styles.distribution}>
            {distribution &&
              Object.entries(distribution).map(([grade, count]) => (
                <div key={grade} className={styles.distributionItem}>
                  <span className={styles.gradeLabel}>{grade}</span>
                  <div className={styles.barContainer}>
                    <div
                      className={styles.bar}
                      style={{
                        width: `${Math.min(count * 10, 100)}%`,
                        backgroundColor: getGradeColor(grade),
                      }}
                    />
                  </div>
                  <span className={styles.countLabel}>{count}</span>
                </div>
              ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

function getGradeColor(grade: string): string {
  const colors: Record<string, string> = {
    A: '#10b981',
    B: '#3b82f6',
    C: '#f59e0b',
    D: '#f97316',
    F: '#ef4444',
  };
  return colors[grade] || '#64748b';
}
