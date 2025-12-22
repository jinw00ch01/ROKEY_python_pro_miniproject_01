import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Card } from '../components/common';
import { studentsService } from '../services/students';
import styles from './Form.module.css';

export const StudentForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    student_id: '',
    first_name: '',
    last_name: '',
    email: '',
    date_of_birth: '',
    phone: '',
    address: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await studentsService.create(formData);
      navigate('/students');
    } catch (err: any) {
      const errorMsg = err.response?.data?.student_id?.[0]
        || err.response?.data?.email?.[0]
        || '학생 추가 실패. 다시 시도해주세요.';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>학생 추가</h1>
        <Button variant="secondary" onClick={() => navigate(-1)}>
          취소
        </Button>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.row}>
            <Input
              label="학번"
              name="student_id"
              value={formData.student_id}
              onChange={handleChange}
              placeholder="예: 2024001"
              required
            />
          </div>

          <div className={styles.row}>
            <Input
              label="성"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="김"
              required
            />
            <Input
              label="이름"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="철수"
              required
            />
          </div>

          <div className={styles.row}>
            <Input
              label="이메일"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="student@example.com"
              required
            />
          </div>

          <div className={styles.row}>
            <Input
              label="생년월일"
              name="date_of_birth"
              type="date"
              value={formData.date_of_birth}
              onChange={handleChange}
            />
            <Input
              label="전화번호"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="010-1234-5678"
            />
          </div>

          <div className={styles.row}>
            <div className={styles.fullWidth}>
              <label className={styles.label}>주소</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="주소를 입력하세요"
                className={styles.textarea}
                rows={3}
              />
            </div>
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.actions}>
            <Button type="button" variant="secondary" onClick={() => navigate(-1)}>
              취소
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? '추가 중...' : '학생 추가'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
