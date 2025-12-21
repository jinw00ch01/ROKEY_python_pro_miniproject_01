import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { authService } from '../../services/auth';
import { User } from '../../types';
import styles from './Layout.module.css';

export const Layout: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (authService.isAuthenticated()) {
        try {
          const userData = await authService.getCurrentUser();
          setUser(userData);
        } catch {
          // Handle error silently
        }
      }
    };
    fetchUser();
  }, []);

  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.main}>
        <Header user={user} onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
      {sidebarOpen && (
        <div className={styles.overlay} onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  );
};
