from typing import Annotated, List, Optional

from fastapi import APIRouter, Depends, HTTPException, status, Query
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.grade import (
    GradeCreate,
    GradeUpdate,
    GradeResponse,
    GradeWithDetails,
    GradeStatistics,
    StudentGradeReport
)
from app.services.grade import (
    get_grade,
    get_grades_by_student,
    get_grades_by_course,
    get_all_grades,
    create_grade,
    update_grade,
    delete_grade
)
from app.services.student import get_student
from app.services.course import get_course
from app.services.analytics import (
    calculate_course_statistics,
    calculate_student_report,
    generate_grade_chart
)
from app.services.pdf_report import generate_report_card_pdf
from app.api.v1.endpoints.auth import get_current_active_user
from app.models.user import User

router = APIRouter(prefix="/grades", tags=["Grades"])


def grade_to_dict(grade):
    """Convert grade model to dict with computed properties."""
    return {
        "id": grade.id,
        "student_id": grade.student_id,
        "course_id": grade.course_id,
        "score": grade.score,
        "max_score": grade.max_score,
        "grade_type": grade.grade_type,
        "semester": grade.semester,
        "comments": grade.comments,
        "percentage": grade.percentage,
        "letter_grade": grade.letter_grade,
        "created_at": grade.created_at,
        "updated_at": grade.updated_at,
        "student_name": grade.student.full_name if grade.student else None,
        "course_name": grade.course.name if grade.course else None
    }


@router.get("", response_model=List[GradeWithDetails])
async def list_grades(
    current_user: Annotated[User, Depends(get_current_active_user)],
    db: Session = Depends(get_db),
    semester: Optional[str] = None,
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000)
):
    """List all grades with optional semester filter."""
    grades = get_all_grades(db, skip=skip, limit=limit, semester=semester)
    return [grade_to_dict(g) for g in grades]


@router.get("/student/{student_id}", response_model=List[GradeWithDetails])
async def get_student_grades(
    student_id: int,
    current_user: Annotated[User, Depends(get_current_active_user)],
    db: Session = Depends(get_db),
    semester: Optional[str] = None
):
    """Get all grades for a student."""
    if not get_student(db, student_id):
        raise HTTPException(status_code=404, detail="Student not found")
    grades = get_grades_by_student(db, student_id, semester)
    return [grade_to_dict(g) for g in grades]


@router.get("/course/{course_id}", response_model=List[GradeWithDetails])
async def get_course_grades(
    course_id: int,
    current_user: Annotated[User, Depends(get_current_active_user)],
    db: Session = Depends(get_db),
    semester: Optional[str] = None
):
    """Get all grades for a course."""
    if not get_course(db, course_id):
        raise HTTPException(status_code=404, detail="Course not found")
    grades = get_grades_by_course(db, course_id, semester)
    return [grade_to_dict(g) for g in grades]


@router.get("/{grade_id}", response_model=GradeWithDetails)
async def read_grade(
    grade_id: int,
    current_user: Annotated[User, Depends(get_current_active_user)],
    db: Session = Depends(get_db)
):
    """Get a grade by ID."""
    db_grade = get_grade(db, grade_id)
    if not db_grade:
        raise HTTPException(status_code=404, detail="Grade not found")
    return grade_to_dict(db_grade)


@router.post("", response_model=GradeResponse, status_code=201)
async def create_new_grade(
    grade_data: GradeCreate,
    current_user: Annotated[User, Depends(get_current_active_user)],
    db: Session = Depends(get_db)
):
    """Create a new grade."""
    if not get_student(db, grade_data.student_id):
        raise HTTPException(status_code=404, detail="Student not found")
    if not get_course(db, grade_data.course_id):
        raise HTTPException(status_code=404, detail="Course not found")
    db_grade = create_grade(db, grade_data)
    return grade_to_dict(db_grade)


@router.put("/{grade_id}", response_model=GradeResponse)
async def update_existing_grade(
    grade_id: int,
    grade_data: GradeUpdate,
    current_user: Annotated[User, Depends(get_current_active_user)],
    db: Session = Depends(get_db)
):
    """Update a grade."""
    db_grade = update_grade(db, grade_id, grade_data)
    if not db_grade:
        raise HTTPException(status_code=404, detail="Grade not found")
    return grade_to_dict(db_grade)


@router.delete("/{grade_id}", status_code=204)
async def delete_existing_grade(
    grade_id: int,
    current_user: Annotated[User, Depends(get_current_active_user)],
    db: Session = Depends(get_db)
):
    """Delete a grade."""
    if not delete_grade(db, grade_id):
        raise HTTPException(status_code=404, detail="Grade not found")


@router.get("/analytics/course/{course_id}", response_model=GradeStatistics)
async def get_course_statistics(
    course_id: int,
    current_user: Annotated[User, Depends(get_current_active_user)],
    db: Session = Depends(get_db),
    semester: str = Query(..., description="Semester (e.g., 2024-1)")
):
    """Get grade statistics for a course."""
    if not get_course(db, course_id):
        raise HTTPException(status_code=404, detail="Course not found")
    stats = calculate_course_statistics(db, course_id, semester)
    if not stats:
        raise HTTPException(status_code=404, detail="No grades found")
    return stats


@router.get("/analytics/student/{student_id}/report", response_model=StudentGradeReport)
async def get_student_report(
    student_id: int,
    current_user: Annotated[User, Depends(get_current_active_user)],
    db: Session = Depends(get_db),
    semester: str = Query(..., description="Semester (e.g., 2024-1)")
):
    """Get grade report for a student."""
    if not get_student(db, student_id):
        raise HTTPException(status_code=404, detail="Student not found")
    report = calculate_student_report(db, student_id, semester)
    if not report:
        raise HTTPException(status_code=404, detail="No grades found")
    return report


@router.get("/analytics/course/{course_id}/chart")
async def get_course_chart(
    course_id: int,
    current_user: Annotated[User, Depends(get_current_active_user)],
    db: Session = Depends(get_db),
    semester: str = Query(..., description="Semester (e.g., 2024-1)")
):
    """Get grade distribution chart for a course."""
    if not get_course(db, course_id):
        raise HTTPException(status_code=404, detail="Course not found")
    chart = generate_grade_chart(db, course_id, semester)
    if not chart:
        raise HTTPException(status_code=404, detail="No grades found")
    return StreamingResponse(chart, media_type="image/png")


@router.get("/analytics/student/{student_id}/report-card")
async def get_report_card_pdf(
    student_id: int,
    current_user: Annotated[User, Depends(get_current_active_user)],
    db: Session = Depends(get_db),
    semester: str = Query(..., description="Semester (e.g., 2024-1)")
):
    """Generate PDF report card for a student."""
    if not get_student(db, student_id):
        raise HTTPException(status_code=404, detail="Student not found")
    pdf = generate_report_card_pdf(db, student_id, semester)
    if not pdf:
        raise HTTPException(status_code=404, detail="No grades found")
    return StreamingResponse(pdf, media_type="application/pdf")
