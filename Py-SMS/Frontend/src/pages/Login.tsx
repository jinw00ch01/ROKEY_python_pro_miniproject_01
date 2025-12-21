import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Input, Card } from '../components/common';
import { authService } from '../services/auth';
import styles from './Login.module.css';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await authService.login(formData);
      navigate('/');
    } catch {
      setError('잘못된 사용자명 또는 비밀번호');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <div className={styles.header}>
          <h1>Py-SMS</h1>
          <p>학생 관리 시스템</p>
          <Link to="/" className={styles.homeLink}>홈으로 돌아가기</Link>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            label="사용자명"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <Input
            label="비밀번호"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {error && <div className={styles.error}>{error}</div>}

          <Button type="submit" disabled={loading} className={styles.submitButton}>
            {loading ? '로그인 중...' : '로그인'}
          </Button>

          <p className={styles.linkText}>
            계정이 없으신가요? <Link to="/register">회원가입</Link>
          </p>
        </form>
      </Card>
    </div>
  );
};
