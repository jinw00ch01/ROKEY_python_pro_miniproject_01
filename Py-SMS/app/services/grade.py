from typing import Optional, List

from sqlalchemy.orm import Session
from sqlalchemy import func

from app.models.grade import Grade
from app.schemas.grade import GradeCreate, GradeUpdate


def get_grade(db: Session, grade_id: int) -> Optional[Grade]:
    """Get a grade by ID."""
    return db.query(Grade).filter(Grade.id == grade_id).first()


def get_grades_by_student(
    db: Session,
    student_id: int,
    semester: Optional[str] = None
) -> List[Grade]:
    """Get all grades for a student, optionally filtered by semester."""
    query = db.query(Grade).filter(Grade.student_id == student_id)
    if semester:
        query = query.filter(Grade.semester == semester)
    return query.all()


def get_grades_by_course(
    db: Session,
    course_id: int,
    semester: Optional[str] = None
) -> List[Grade]:
    """Get all grades for a course, optionally filtered by semester."""
    query = db.query(Grade).filter(Grade.course_id == course_id)
    if semester:
        query = query.filter(Grade.semester == semester)
    return query.all()


def get_grades_by_student_course(
    db: Session,
    student_id: int,
    course_id: int,
    semester: Optional[str] = None
) -> List[Grade]:
    """Get grades for a specific student in a specific course."""
    query = db.query(Grade).filter(
        Grade.student_id == student_id,
        Grade.course_id == course_id
    )
    if semester:
        query = query.filter(Grade.semester == semester)
    return query.all()


def get_all_grades(
    db: Session,
    skip: int = 0,
    limit: int = 100,
    semester: Optional[str] = None
) -> List[Grade]:
    """Get all grades with pagination."""
    query = db.query(Grade)
    if semester:
        query = query.filter(Grade.semester == semester)
    return query.offset(skip).limit(limit).all()


def create_grade(db: Session, grade_data: GradeCreate) -> Grade:
    """Create a new grade."""
    db_grade = Grade(**grade_data.model_dump())
    db.add(db_grade)
    db.commit()
    db.refresh(db_grade)
    return db_grade


def update_grade(
    db: Session,
    grade_id: int,
    grade_data: GradeUpdate
) -> Optional[Grade]:
    """Update a grade."""
    db_grade = get_grade(db, grade_id)
    if not db_grade:
        return None
    
    update_data = grade_data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_grade, key, value)
    
    db.commit()
    db.refresh(db_grade)
    return db_grade


def delete_grade(db: Session, grade_id: int) -> bool:
    """Delete a grade."""
    db_grade = get_grade(db, grade_id)
    if not db_grade:
        return False
    
    db.delete(db_grade)
    db.commit()
    return True
