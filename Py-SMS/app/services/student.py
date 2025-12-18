from typing import Optional, List

from sqlalchemy.orm import Session
from sqlalchemy import func

from app.models.student import Student
from app.schemas.student import StudentCreate, StudentUpdate


def get_student(db: Session, student_id: int) -> Optional[Student]:
    """Get a student by ID."""
    return db.query(Student).filter(Student.id == student_id).first()


def get_student_by_student_id(db: Session, student_id: str) -> Optional[Student]:
    """Get a student by student_id (unique identifier)."""
    return db.query(Student).filter(Student.student_id == student_id).first()


def get_student_by_email(db: Session, email: str) -> Optional[Student]:
    """Get a student by email."""
    return db.query(Student).filter(Student.email == email).first()


def get_students(
    db: Session,
    skip: int = 0,
    limit: int = 100
) -> List[Student]:
    """Get all students with pagination."""
    return db.query(Student).offset(skip).limit(limit).all()


def get_students_count(db: Session) -> int:
    """Get total count of students."""
    return db.query(func.count(Student.id)).scalar()


def create_student(db: Session, student_data: StudentCreate) -> Student:
    """Create a new student."""
    db_student = Student(**student_data.model_dump())
    db.add(db_student)
    db.commit()
    db.refresh(db_student)
    return db_student


def update_student(
    db: Session,
    student_id: int,
    student_data: StudentUpdate
) -> Optional[Student]:
    """Update a student."""
    db_student = get_student(db, student_id)
    if not db_student:
        return None
    
    update_data = student_data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_student, key, value)
    
    db.commit()
    db.refresh(db_student)
    return db_student


def delete_student(db: Session, student_id: int) -> bool:
    """Delete a student."""
    db_student = get_student(db, student_id)
    if not db_student:
        return False
    
    db.delete(db_student)
    db.commit()
    return True
