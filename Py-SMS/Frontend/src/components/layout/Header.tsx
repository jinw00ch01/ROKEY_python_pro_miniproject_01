import React from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/auth';
import styles from './Header.module.css';

interface HeaderProps {
  user?: { username: string; full_name: string } | null;
  onMenuToggle?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onMenuToggle }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button className={styles.menuButton} onClick={onMenuToggle} aria-label="Toggle menu">
          ☰
        </button>
        <h2 className={styles.title}>학생 관리 시스템</h2>
      </div>
      <div className={styles.right}>
        {user ? (
          <>
            <span className={styles.userName}>{user.full_name || user.username}</span>
            <button className={styles.logoutButton} onClick={handleLogout}>
              로그아웃
            </button>
          </>
        ) : (
          <>
            <button
              className={styles.loginButton}
              onClick={() => navigate('/login')}
            >
              로그인
            </button>
            <button
              className={styles.registerButton}
              onClick={() => navigate('/register')}
            >
              회원가입
            </button>
          </>
        )}
      </div>
    </header>
  );
};
