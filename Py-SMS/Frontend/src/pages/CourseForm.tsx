import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Card } from '../components/common';
import { coursesService } from '../services/courses';
import styles from './Form.module.css';

export const CourseForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    course_code: '',
    name: '',
    description: '',
    credits: 3,
    instructor: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.name === 'credits' ? Number(e.target.value) : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await coursesService.create(formData);
      navigate('/courses');
    } catch (err: any) {
      const errorMsg = err.response?.data?.course_code?.[0]
        || err.response?.data?.name?.[0]
        || '과목 추가 실패. 다시 시도해주세요.';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>과목 추가</h1>
        <Button variant="secondary" onClick={() => navigate(-1)}>
          취소
        </Button>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.row}>
            <Input
              label="과목 코드"
              name="course_code"
              value={formData.course_code}
              onChange={handleChange}
              placeholder="예: CS101"
              required
            />
            <Input
              label="과목명"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="예: 컴퓨터 과학 입문"
              required
            />
          </div>

          <div className={styles.row}>
            <Input
              label="학점"
              name="credits"
              type="number"
              value={formData.credits}
              onChange={handleChange}
              min={1}
              max={6}
              required
            />
            <Input
              label="담당 교수"
              name="instructor"
              value={formData.instructor}
              onChange={handleChange}
              placeholder="예: 김교수"
            />
          </div>

          <div className={styles.row}>
            <div className={styles.fullWidth}>
              <label className={styles.label}>과목 설명</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="과목 설명을 입력하세요"
                className={styles.textarea}
                rows={4}
              />
            </div>
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.actions}>
            <Button type="button" variant="secondary" onClick={() => navigate(-1)}>
              취소
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? '추가 중...' : '과목 추가'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
