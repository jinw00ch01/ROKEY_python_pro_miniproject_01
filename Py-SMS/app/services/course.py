from typing import Optional, List

from sqlalchemy.orm import Session
from sqlalchemy import func

from app.models.student import Course, Enrollment
from app.schemas.course import CourseCreate, CourseUpdate
from app.schemas.enrollment import EnrollmentCreate, EnrollmentUpdate


def get_course(db: Session, course_id: int) -> Optional[Course]:
    """Get a course by ID."""
    return db.query(Course).filter(Course.id == course_id).first()


def get_course_by_code(db: Session, course_code: str) -> Optional[Course]:
    """Get a course by course code."""
    return db.query(Course).filter(Course.course_code == course_code).first()


def get_courses(
    db: Session,
    skip: int = 0,
    limit: int = 100
) -> List[Course]:
    """Get all courses with pagination."""
    return db.query(Course).offset(skip).limit(limit).all()


def get_courses_count(db: Session) -> int:
    """Get total count of courses."""
    return db.query(func.count(Course.id)).scalar()


def create_course(db: Session, course_data: CourseCreate) -> Course:
    """Create a new course."""
    db_course = Course(**course_data.model_dump())
    db.add(db_course)
    db.commit()
    db.refresh(db_course)
    return db_course


def update_course(
    db: Session,
    course_id: int,
    course_data: CourseUpdate
) -> Optional[Course]:
    """Update a course."""
    db_course = get_course(db, course_id)
    if not db_course:
        return None
    
    update_data = course_data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_course, key, value)
    
    db.commit()
    db.refresh(db_course)
    return db_course


def delete_course(db: Session, course_id: int) -> bool:
    """Delete a course."""
    db_course = get_course(db, course_id)
    if not db_course:
        return False
    
    db.delete(db_course)
    db.commit()
    return True


# Enrollment services
def get_enrollment(db: Session, enrollment_id: int) -> Optional[Enrollment]:
    """Get an enrollment by ID."""
    return db.query(Enrollment).filter(Enrollment.id == enrollment_id).first()


def get_enrollment_by_student_course(
    db: Session,
    student_id: int,
    course_id: int
) -> Optional[Enrollment]:
    """Get enrollment by student and course."""
    return db.query(Enrollment).filter(
        Enrollment.student_id == student_id,
        Enrollment.course_id == course_id
    ).first()


def get_enrollments_by_student(db: Session, student_id: int) -> List[Enrollment]:
    """Get all enrollments for a student."""
    return db.query(Enrollment).filter(Enrollment.student_id == student_id).all()


def get_enrollments_by_course(db: Session, course_id: int) -> List[Enrollment]:
    """Get all enrollments for a course."""
    return db.query(Enrollment).filter(Enrollment.course_id == course_id).all()


def create_enrollment(db: Session, enrollment_data: EnrollmentCreate) -> Enrollment:
    """Create a new enrollment."""
    db_enrollment = Enrollment(**enrollment_data.model_dump())
    db.add(db_enrollment)
    db.commit()
    db.refresh(db_enrollment)
    return db_enrollment


def update_enrollment(
    db: Session,
    enrollment_id: int,
    enrollment_data: EnrollmentUpdate
) -> Optional[Enrollment]:
    """Update an enrollment."""
    db_enrollment = get_enrollment(db, enrollment_id)
    if not db_enrollment:
        return None
    
    update_data = enrollment_data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_enrollment, key, value)
    
    db.commit()
    db.refresh(db_enrollment)
    return db_enrollment


def delete_enrollment(db: Session, enrollment_id: int) -> bool:
    """Delete an enrollment."""
    db_enrollment = get_enrollment(db, enrollment_id)
    if not db_enrollment:
        return False
    
    db.delete(db_enrollment)
    db.commit()
    return True
