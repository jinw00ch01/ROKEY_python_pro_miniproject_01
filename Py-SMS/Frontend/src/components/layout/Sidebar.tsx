import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import styles from './Sidebar.module.css';

interface MenuItem {
  label: string;
  path: string;
  icon?: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  { label: '대시보드', path: '/' },
  {
    label: '학생',
    path: '/students',
    children: [
      { label: '학생 추가', path: '/students/new' },
      { label: '학생 성적 조회', path: '/students/performance' },
    ],
  },
  {
    label: '과목',
    path: '/courses',
    children: [
      { label: '수강조회', path: '/courses' },
      { label: '과목 추가', path: '/courses/new' },
      { label: '수강신청 관리', path: '/enrollments' },
    ],
  },
  {
    label: '성적',
    path: '/grades',
    children: [
      { label: '성적조회', path: '/grades' },
      { label: '성적 추가', path: '/grades/new' },
      { label: '성적 통계', path: '/grades/statistics' },
    ],
  },
  {
    label: '분석',
    path: '/analytics',
    children: [
      { label: '등급 분포', path: '/analytics/grade-distribution' },
      { label: '학생 성적 분석', path: '/analytics/student-performance' },
      { label: '과목별 통계', path: '/analytics/course-stats' },
    ],
  },
];

export const Sidebar: React.FC = () => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const renderMenuItem = (item: MenuItem, depth = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.label);

    return (
      <li key={item.path} className={styles.menuItem}>
        {hasChildren ? (
          <>
            <button
              className={styles.menuButton}
              onClick={() => toggleExpand(item.label)}
              style={{ paddingLeft: `${16 + depth * 16}px` }}
            >
              <span className={styles.label}>{item.label}</span>
              <span className={`${styles.arrow} ${isExpanded ? styles.expanded : ''}`}>
                ▶
              </span>
            </button>
            {isExpanded && (
              <ul className={styles.submenu}>
                {item.children?.map((child) => renderMenuItem(child, depth + 1))}
              </ul>
            )}
          </>
        ) : (
          <NavLink
            to={item.path}
            end
            className={({ isActive }) =>
              `${styles.menuLink} ${isActive ? styles.active : ''}`
            }
            style={{ paddingLeft: `${16 + depth * 16}px` }}
          >
            <span className={styles.label}>{item.label}</span>
          </NavLink>
        )}
      </li>
    );
  };

  return (
    <aside className={styles.sidebar}>
      <Link to="/" className={styles.logo} style={{ textDecoration: 'none', color: 'inherit' }}>
        <h1>Py-SMS</h1>
        <p>학생 관리 시스템</p>
      </Link>
      <nav className={styles.nav}>
        <ul className={styles.menu}>{menuItems.map((item) => renderMenuItem(item))}</ul>
      </nav>
    </aside>
  );
};
