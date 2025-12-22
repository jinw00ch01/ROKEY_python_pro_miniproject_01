import React, { useEffect, useState } from 'react';
import { Card } from '../components/common';
import { analyticsService } from '../services/analytics';
import { GradeDistribution as GradeDistributionType } from '../types';
import styles from './Analytics.module.css';

export const GradeDistribution: React.FC = () => {
  const [distribution, setDistribution] = useState<GradeDistributionType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDistribution();
  }, []);

  const fetchDistribution = async () => {
    try {
      setLoading(true);
      const data = await analyticsService.getGradeDistribution();
      setDistribution(data);
    } catch (error) {
      console.error('Failed to fetch grade distribution:', error);
    } finally {
      setLoading(false);
    }
  };

  const getGradeColor = (grade: string): string => {
    const colors: Record<string, string> = {
      A: '#10b981',
      B: '#3b82f6',
      C: '#f59e0b',
      D: '#f97316',
      F: '#ef4444',
    };
    return colors[grade] || '#64748b';
  };

  const getTotalGrades = () => {
    if (!distribution) return 0;
    return Object.values(distribution).reduce((sum, count) => sum + count, 0);
  };

  const getPercentage = (count: number) => {
    const total = getTotalGrades();
    return total > 0 ? ((count / total) * 100).toFixed(1) : '0.0';
  };

  if (loading) {
    return <div className={styles.loading}>불러오는 중...</div>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>등급 분포</h1>
      </div>

      <div className={styles.statsGrid}>
        <Card className={styles.summaryCard}>
          <div className={styles.summaryTitle}>총 성적 수</div>
          <div className={styles.summaryValue}>{getTotalGrades()}</div>
        </Card>
      </div>

      <Card className={styles.chartCard}>
        <h2 className={styles.chartTitle}>등급별 분포</h2>
        <div className={styles.distribution}>
          {distribution &&
            Object.entries(distribution).map(([grade, count]) => (
              <div key={grade} className={styles.distributionItem}>
                <div className={styles.gradeInfo}>
                  <span
                    className={styles.gradeLabel}
                    style={{ backgroundColor: getGradeColor(grade) }}
                  >
                    {grade}
                  </span>
                  <span className={styles.gradeCount}>
                    {count}명 ({getPercentage(count)}%)
                  </span>
                </div>
                <div className={styles.barContainer}>
                  <div
                    className={styles.bar}
                    style={{
                      width: `${getPercentage(count)}%`,
                      backgroundColor: getGradeColor(grade),
                    }}
                  />
                </div>
              </div>
            ))}
        </div>
      </Card>

      <div className={styles.grid}>
        {distribution &&
          Object.entries(distribution).map(([grade, count]) => (
            <Card key={grade} className={styles.gradeCard}>
              <div
                className={styles.gradeCardHeader}
                style={{ backgroundColor: getGradeColor(grade) }}
              >
                <div className={styles.gradeCardLabel}>{grade}</div>
              </div>
              <div className={styles.gradeCardBody}>
                <div className={styles.gradeCardCount}>{count}</div>
                <div className={styles.gradeCardPercentage}>{getPercentage(count)}%</div>
              </div>
            </Card>
          ))}
      </div>
    </div>
  );
};
