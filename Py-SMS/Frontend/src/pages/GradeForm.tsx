import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '../components/common';
import { gradesService } from '../services/grades';
import { studentsService } from '../services/students';
import { coursesService } from '../services/courses';
import { StudentListItem, CourseListItem, GradeType } from '../types';
import styles from './Form.module.css';

export const GradeForm: React.FC = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState<StudentListItem[]>([]);
  const [courses, setCourses] = useState<CourseListItem[]>([]);
  const [formData, setFormData] = useState({
    student: '',
    course: '',
    score: 0,
    max_score: 100,
    grade_type: 'exam' as GradeType,
    semester: '',
    comments: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadStudentsAndCourses();
  }, []);

  const loadStudentsAndCourses = async () => {
    try {
      const [studentsData, coursesData] = await Promise.all([
        studentsService.getAll(),
        coursesService.getAll(),
      ]);
      setStudents(studentsData.results);
      setCourses(coursesData.results);
    } catch (error) {
      console.error('Failed to load students and courses:', error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const value = ['score', 'max_score'].includes(e.target.name)
      ? Number(e.target.value)
      : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.student || !formData.course) {
      setError('학생과 과목을 선택해주세요.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const payload: any = {
        student: Number(formData.student),
        course: Number(formData.course),
        score: formData.score,
        max_score: formData.max_score,
        grade_type: formData.grade_type,
        semester: formData.semester,
        comments: formData.comments,
      };
      await gradesService.create(payload);
      navigate('/grades');
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.score?.[0] ||
        err.response?.data?.detail ||
        '성적 추가 실패. 다시 시도해주세요.';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>성적 추가</h1>
        <Button variant="secondary" onClick={() => navigate(-1)}>
          취소
        </Button>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.row}>
            <div>
              <label className={styles.label}>학생</label>
              <select
                name="student"
                value={formData.student}
                onChange={handleChange}
                className={styles.select}
                required
              >
                <option value="">학생을 선택하세요</option>
                {students.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.full_name} ({s.student_id})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={styles.label}>과목</label>
              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                className={styles.select}
                required
              >
                <option value="">과목을 선택하세요</option>
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.course_code})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.row}>
            <div>
              <label className={styles.label}>성적 유형</label>
              <select
                name="grade_type"
                value={formData.grade_type}
                onChange={handleChange}
                className={styles.select}
                required
              >
                <option value="exam">시험</option>
                <option value="quiz">퀴즈</option>
                <option value="assignment">과제</option>
                <option value="project">프로젝트</option>
                <option value="midterm">중간고사</option>
                <option value="final">기말고사</option>
              </select>
            </div>

            <div>
              <label className={styles.label}>학기</label>
              <input
                type="text"
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                placeholder="예: 2024-1"
                className={styles.select}
                required
              />
            </div>
          </div>

          <div className={styles.row}>
            <div>
              <label className={styles.label}>점수</label>
              <input
                type="number"
                name="score"
                value={formData.score}
                onChange={handleChange}
                min={0}
                className={styles.select}
                required
              />
            </div>

            <div>
              <label className={styles.label}>만점</label>
              <input
                type="number"
                name="max_score"
                value={formData.max_score}
                onChange={handleChange}
                min={1}
                className={styles.select}
                required
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.fullWidth}>
              <label className={styles.label}>코멘트</label>
              <textarea
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                placeholder="코멘트를 입력하세요 (선택사항)"
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
              {loading ? '추가 중...' : '성적 추가'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
