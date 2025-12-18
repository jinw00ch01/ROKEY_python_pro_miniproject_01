from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from celery.result import AsyncResult

from app.db.session import get_db
from app.api.v1.endpoints.auth import get_current_active_user
from app.models.user import User
from app.services.tasks import (
    generate_course_statistics_task,
    generate_student_report_task,
    generate_grade_chart_task,
    generate_report_card_pdf_task,
    batch_generate_reports_task
)

router = APIRouter(prefix="/tasks", tags=["Async Tasks"])


@router.post("/course-statistics/{course_id}")
async def create_course_statistics_task(
    course_id: int,
    semester: str,
    current_user: Annotated[User, Depends(get_current_active_user)]
):
    """Queue a task to generate course statistics."""
    task = generate_course_statistics_task.delay(course_id, semester)
    return {"task_id": task.id, "status": "queued"}


@router.post("/student-report/{student_id}")
async def create_student_report_task(
    student_id: int,
    semester: str,
    current_user: Annotated[User, Depends(get_current_active_user)]
):
    """Queue a task to generate student report."""
    task = generate_student_report_task.delay(student_id, semester)
    return {"task_id": task.id, "status": "queued"}


@router.post("/grade-chart/{course_id}")
async def create_grade_chart_task(
    course_id: int,
    semester: str,
    current_user: Annotated[User, Depends(get_current_active_user)]
):
    """Queue a task to generate grade chart."""
    task = generate_grade_chart_task.delay(course_id, semester)
    return {"task_id": task.id, "status": "queued"}


@router.post("/report-card/{student_id}")
async def create_report_card_task(
    student_id: int,
    semester: str,
    current_user: Annotated[User, Depends(get_current_active_user)]
):
    """Queue a task to generate PDF report card."""
    task = generate_report_card_pdf_task.delay(student_id, semester)
    return {"task_id": task.id, "status": "queued"}


@router.post("/batch-reports")
async def create_batch_reports_task(
    student_ids: list,
    semester: str,
    current_user: Annotated[User, Depends(get_current_active_user)]
):
    """Queue a task to generate reports for multiple students."""
    task = batch_generate_reports_task.delay(student_ids, semester)
    return {"task_id": task.id, "status": "queued", "total_students": len(student_ids)}


@router.get("/status/{task_id}")
async def get_task_status(
    task_id: str,
    current_user: Annotated[User, Depends(get_current_active_user)]
):
    """Get the status of a background task."""
    task_result = AsyncResult(task_id)
    
    if task_result.state == 'PENDING':
        response = {
            "task_id": task_id,
            "status": "pending",
            "result": None
        }
    elif task_result.state == 'PROGRESS':
        response = {
            "task_id": task_id,
            "status": "progress",
            "progress": task_result.info
        }
    elif task_result.state == 'SUCCESS':
        response = {
            "task_id": task_id,
            "status": "completed",
            "result": task_result.result
        }
    elif task_result.state == 'FAILURE':
        response = {
            "task_id": task_id,
            "status": "failed",
            "error": str(task_result.info)
        }
    else:
        response = {
            "task_id": task_id,
            "status": task_result.state.lower(),
            "result": None
        }
    
    return response
