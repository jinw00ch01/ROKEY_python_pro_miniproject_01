from typing import Annotated, List

from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.course import CourseCreate, CourseUpdate, CourseResponse, CourseListResponse
from app.schemas.enrollment import EnrollmentCreate, EnrollmentUpdate, EnrollmentResponse, EnrollmentWithDetails
from app.services.course import (
    get_course,
    get_course_by_code,
    get_courses,
    get_courses_count,
    create_course,
    update_course,
    delete_course,
    get_enrollment,
    get_enrollment_by_student_course,
    get_enrollments_by_student,
    get_enrollments_by_course,
    create_enrollment,
    update_enrollment,
    delete_enrollment
)
from app.services.student import get_student
from app.api.v1.endpoints.auth import get_current_active_user
from app.models.user import User

router = APIRouter(prefix="/courses", tags=["Courses"])


@router.get("", response_model=CourseListResponse)
async def list_courses(
    current_user: Annotated[User, Depends(get_current_active_user)],
    db: Session = Depends(get_db),
    page: int = Query(1, ge=1),
    size: int = Query(10, ge=1, le=100)
) -> dict:
    """List all courses with pagination."""
    skip = (page - 1) * size
    courses = get_courses(db, skip=skip, limit=size)
    total = get_courses_count(db)
    
    return {
        "items": courses,
        "total": total,
        "page": page,
        "size": size
    }


@router.get("/{course_id}", response_model=CourseResponse)
async def read_course(
    course_id: int,
    current_user: Annotated[User, Depends(get_current_active_user)],
    db: Session = Depends(get_db)
):
    """Get a course by ID."""
    db_course = get_course(db, course_id)
    if not db_course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found"
        )
    return db_course


@router.post("", response_model=CourseResponse, status_code=status.HTTP_201_CREATED)
async def create_new_course(
    course_data: CourseCreate,
    current_user: Annotated[User, Depends(get_current_active_user)],
    db: Session = Depends(get_db)
):
    """Create a new course."""
    # Check if course code already exists
    if get_course_by_code(db, course_data.course_code):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Course code already exists"
        )
    
    return create_course(db, course_data)


@router.put("/{course_id}", response_model=CourseResponse)
async def update_existing_course(
    course_id: int,
    course_data: CourseUpdate,
    current_user: Annotated[User, Depends(get_current_active_user)],
    db: Session = Depends(get_db)
):
    """Update a course."""
    # Check if course code is being changed and already exists
    if course_data.course_code:
        existing = get_course_by_code(db, course_data.course_code)
        if existing and existing.id != course_id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Course code already exists"
            )
    
    db_course = update_course(db, course_id, course_data)
    if not db_course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found"
        )
    return db_course


@router.delete("/{course_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_existing_course(
    course_id: int,
    current_user: Annotated[User, Depends(get_current_active_user)],
    db: Session = Depends(get_db)
):
    """Delete a course."""
    if not delete_course(db, course_id):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found"
        )


# Enrollment endpoints
@router.get("/{course_id}/enrollments", response_model=List[EnrollmentWithDetails])
async def list_course_enrollments(
    course_id: int,
    current_user: Annotated[User, Depends(get_current_active_user)],
    db: Session = Depends(get_db)
):
    """Get all enrollments for a course."""
    db_course = get_course(db, course_id)
    if not db_course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found"
        )
    
    enrollments = get_enrollments_by_course(db, course_id)
    result = []
    for enrollment in enrollments:
        result.append({
            "id": enrollment.id,
            "student_id": enrollment.student_id,
            "course_id": enrollment.course_id,
            "status": enrollment.status,
            "enrolled_at": enrollment.enrolled_at,
            "student_name": enrollment.student.full_name if enrollment.student else None,
            "course_name": enrollment.course.name if enrollment.course else None
        })
    return result


@router.post("/enrollments", response_model=EnrollmentResponse, status_code=status.HTTP_201_CREATED)
async def create_new_enrollment(
    enrollment_data: EnrollmentCreate,
    current_user: Annotated[User, Depends(get_current_active_user)],
    db: Session = Depends(get_db)
):
    """Create a new enrollment."""
    # Check if student exists
    if not get_student(db, enrollment_data.student_id):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Student not found"
        )
    
    # Check if course exists
    if not get_course(db, enrollment_data.course_id):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found"
        )
    
    # Check if enrollment already exists
    existing = get_enrollment_by_student_course(
        db, enrollment_data.student_id, enrollment_data.course_id
    )
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Student is already enrolled in this course"
        )
    
    return create_enrollment(db, enrollment_data)


@router.put("/enrollments/{enrollment_id}", response_model=EnrollmentResponse)
async def update_existing_enrollment(
    enrollment_id: int,
    enrollment_data: EnrollmentUpdate,
    current_user: Annotated[User, Depends(get_current_active_user)],
    db: Session = Depends(get_db)
):
    """Update an enrollment."""
    db_enrollment = update_enrollment(db, enrollment_id, enrollment_data)
    if not db_enrollment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Enrollment not found"
        )
    return db_enrollment


@router.delete("/enrollments/{enrollment_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_existing_enrollment(
    enrollment_id: int,
    current_user: Annotated[User, Depends(get_current_active_user)],
    db: Session = Depends(get_db)
):
    """Delete an enrollment."""
    if not delete_enrollment(db, enrollment_id):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Enrollment not found"
        )
