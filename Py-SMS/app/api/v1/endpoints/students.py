from typing import Annotated, List

from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.student import StudentCreate, StudentUpdate, StudentResponse, StudentListResponse
from app.services.student import (
    get_student,
    get_student_by_student_id,
    get_student_by_email,
    get_students,
    get_students_count,
    create_student,
    update_student,
    delete_student
)
from app.api.v1.endpoints.auth import get_current_active_user
from app.models.user import User

router = APIRouter(prefix="/students", tags=["Students"])


@router.get("", response_model=StudentListResponse)
async def list_students(
    current_user: Annotated[User, Depends(get_current_active_user)],
    db: Session = Depends(get_db),
    page: int = Query(1, ge=1),
    size: int = Query(10, ge=1, le=100)
) -> dict:
    """List all students with pagination."""
    skip = (page - 1) * size
    students = get_students(db, skip=skip, limit=size)
    total = get_students_count(db)
    
    return {
        "items": students,
        "total": total,
        "page": page,
        "size": size
    }


@router.get("/{student_id}", response_model=StudentResponse)
async def read_student(
    student_id: int,
    current_user: Annotated[User, Depends(get_current_active_user)],
    db: Session = Depends(get_db)
):
    """Get a student by ID."""
    db_student = get_student(db, student_id)
    if not db_student:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Student not found"
        )
    return db_student


@router.post("", response_model=StudentResponse, status_code=status.HTTP_201_CREATED)
async def create_new_student(
    student_data: StudentCreate,
    current_user: Annotated[User, Depends(get_current_active_user)],
    db: Session = Depends(get_db)
):
    """Create a new student."""
    # Check if student_id already exists
    if get_student_by_student_id(db, student_data.student_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Student ID already exists"
        )
    
    # Check if email already exists
    if get_student_by_email(db, student_data.email):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    return create_student(db, student_data)


@router.put("/{student_id}", response_model=StudentResponse)
async def update_existing_student(
    student_id: int,
    student_data: StudentUpdate,
    current_user: Annotated[User, Depends(get_current_active_user)],
    db: Session = Depends(get_db)
):
    """Update a student."""
    # Check if student_id is being changed and already exists
    if student_data.student_id:
        existing = get_student_by_student_id(db, student_data.student_id)
        if existing and existing.id != student_id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Student ID already exists"
            )
    
    # Check if email is being changed and already exists
    if student_data.email:
        existing = get_student_by_email(db, student_data.email)
        if existing and existing.id != student_id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
    
    db_student = update_student(db, student_id, student_data)
    if not db_student:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Student not found"
        )
    return db_student


@router.delete("/{student_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_existing_student(
    student_id: int,
    current_user: Annotated[User, Depends(get_current_active_user)],
    db: Session = Depends(get_db)
):
    """Delete a student."""
    if not delete_student(db, student_id):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Student not found"
        )
