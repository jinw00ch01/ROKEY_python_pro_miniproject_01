import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Input, Card } from '../components/common';
import api from '../services/api';
import styles from './Login.module.css';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirm: '',
    full_name: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.password_confirm) {
      setError('비밀번호가 일치하지 않습니다');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await api.post('/accounts/users/', formData);
      navigate('/login', { state: { message: '회원가입 성공! 로그인해주세요.' } });
    } catch (err: any) {
      const errorMsg = err.response?.data?.username?.[0]
        || err.response?.data?.email?.[0]
        || err.response?.data?.password?.[0]
        || '회원가입 실패. 다시 시도해주세요.';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <div className={styles.header}>
          <h1>Py-SMS</h1>
          <p>계정 만들기</p>
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
            label="이메일"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            label="이름"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
          />
          <Input
            label="비밀번호"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Input
            label="비밀번호 확인"
            name="password_confirm"
            type="password"
            value={formData.password_confirm}
            onChange={handleChange}
            required
          />

          {error && <div className={styles.error}>{error}</div>}

          <Button type="submit" disabled={loading} className={styles.submitButton}>
            {loading ? '계정 생성 중...' : '회원가입'}
          </Button>

          <p className={styles.linkText}>
            이미 계정이 있으신가요? <Link to="/login">로그인</Link>
          </p>
        </form>
      </Card>
    </div>
  );
};
