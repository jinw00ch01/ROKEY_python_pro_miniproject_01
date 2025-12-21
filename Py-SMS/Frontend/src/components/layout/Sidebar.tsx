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
  { label: '대시보드', path: '/', icon: '📊' },
  {
    label: '학생',
    path: '/students',
    icon: '👥',
    children: [
      { label: '전체 학생', path: '/students' },
      { label: '학생 추가', path: '/students/new' },
    ],
  },
  {
    label: '과목',
    path: '/courses',
    icon: '📚',
    children: [
      { label: '전체 과목', path: '/courses' },
      { label: '과목 추가', path: '/courses/new' },
    ],
  },
  {
    label: '성적',
    path: '/grades',
    icon: '📝',
    children: [
      { label: '전체 성적', path: '/grades' },
      { label: '성적 추가', path: '/grades/new' },
    ],
  },
  { label: '분석', path: '/analytics', icon: '📈' },
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
              {item.icon && <span className={styles.icon}>{item.icon}</span>}
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
            className={({ isActive }) =>
              `${styles.menuLink} ${isActive ? styles.active : ''}`
            }
            style={{ paddingLeft: `${16 + depth * 16}px` }}
          >
            {item.icon && <span className={styles.icon}>{item.icon}</span>}
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
