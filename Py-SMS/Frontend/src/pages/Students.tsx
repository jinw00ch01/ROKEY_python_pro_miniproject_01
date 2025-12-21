import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Table, Input, Modal } from '../components/common';
import { studentsService } from '../services/students';
import { StudentListItem } from '../types';
import styles from './Students.module.css';

export const Students: React.FC = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState<StudentListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; student: StudentListItem | null }>({
    open: false,
    student: null,
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async (searchTerm?: string) => {
    try {
      setLoading(true);
      const data = await studentsService.getAll({ search: searchTerm });
      setStudents(data.results);
    } catch (error) {
      console.error('Failed to fetch students:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    fetchStudents(value);
  };

  const handleDelete = async () => {
    if (deleteModal.student) {
      try {
        await studentsService.delete(deleteModal.student.id);
        setStudents((prev) => prev.filter((s) => s.id !== deleteModal.student?.id));
        setDeleteModal({ open: false, student: null });
      } catch (error) {
        console.error('Failed to delete student:', error);
      }
    }
  };

  const columns = [
    { key: 'student_id', header: '학번' },
    { key: 'full_name', header: '이름' },
    { key: 'email', header: '이메일' },
    {
      key: 'actions',
      header: '작업',
      render: (student: StudentListItem) => (
        <div className={styles.actions}>
          <Button size="small" onClick={() => navigate(`/students/${student.id}`)}>
            보기
          </Button>
          <Button
            size="small"
            variant="danger"
            onClick={(e) => {
              e.stopPropagation();
              setDeleteModal({ open: true, student });
            }}
          >
            삭제
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>학생</h1>
        <Button onClick={() => navigate('/students/new')}>학생 추가</Button>
      </div>

      <div className={styles.toolbar}>
        <Input
          placeholder="학생 검색..."
          value={search}
          onChange={handleSearch}
          className={styles.searchInput}
        />
      </div>

      {loading ? (
        <div className={styles.loading}>불러오는 중...</div>
      ) : (
        <Table columns={columns} data={students} onRowClick={(s) => navigate(`/students/${s.id}`)} />
      )}

      <Modal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, student: null })}
        title="학생 삭제"
      >
        <p>다음을 삭제하시겠습니까: {deleteModal.student?.full_name}?</p>
        <div className={styles.modalActions}>
          <Button variant="secondary" onClick={() => setDeleteModal({ open: false, student: null })}>
            취소
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            삭제
          </Button>
        </div>
      </Modal>
    </div>
  );
};
