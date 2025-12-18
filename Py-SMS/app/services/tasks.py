import os
import base64
from datetime import datetime
from typing import Dict, Any, Optional

from app.services.celery_worker import celery_app
from app.db.session import SessionLocal
from app.services.analytics import (
    calculate_course_statistics,
    calculate_student_report,
    generate_grade_chart
)
from app.services.pdf_report import generate_report_card_pdf


@celery_app.task(bind=True, name="tasks.generate_course_statistics")
def generate_course_statistics_task(self, course_id: int, semester: str) -> Dict[str, Any]:
    """Background task to generate course statistics."""
    db = SessionLocal()
    try:
        result = calculate_course_statistics(db, course_id, semester)
        if result:
            return {"status": "success", "data": result}
        return {"status": "error", "message": "No grades found for this course"}
    except Exception as e:
        return {"status": "error", "message": str(e)}
    finally:
        db.close()


@celery_app.task(bind=True, name="tasks.generate_student_report")
def generate_student_report_task(self, student_id: int, semester: str) -> Dict[str, Any]:
    """Background task to generate student report."""
    db = SessionLocal()
    try:
        result = calculate_student_report(db, student_id, semester)
        if result:
            return {"status": "success", "data": result}
        return {"status": "error", "message": "No grades found for this student"}
    except Exception as e:
        return {"status": "error", "message": str(e)}
    finally:
        db.close()


@celery_app.task(bind=True, name="tasks.generate_grade_chart")
def generate_grade_chart_task(self, course_id: int, semester: str) -> Dict[str, Any]:
    """Background task to generate grade chart image."""
    db = SessionLocal()
    try:
        buffer = generate_grade_chart(db, course_id, semester)
        if buffer:
            image_data = base64.b64encode(buffer.getvalue()).decode('utf-8')
            return {
                "status": "success",
                "data": {
                    "image_base64": image_data,
                    "content_type": "image/png"
                }
            }
        return {"status": "error", "message": "No grades found for this course"}
    except Exception as e:
        return {"status": "error", "message": str(e)}
    finally:
        db.close()


@celery_app.task(bind=True, name="tasks.generate_report_card_pdf")
def generate_report_card_pdf_task(self, student_id: int, semester: str) -> Dict[str, Any]:
    """Background task to generate PDF report card."""
    db = SessionLocal()
    try:
        buffer = generate_report_card_pdf(db, student_id, semester)
        if buffer:
            pdf_data = base64.b64encode(buffer.getvalue()).decode('utf-8')
            return {
                "status": "success",
                "data": {
                    "pdf_base64": pdf_data,
                    "content_type": "application/pdf",
                    "filename": f"report_card_{student_id}_{semester}.pdf"
                }
            }
        return {"status": "error", "message": "No grades found for this student"}
    except Exception as e:
        return {"status": "error", "message": str(e)}
    finally:
        db.close()


@celery_app.task(bind=True, name="tasks.batch_generate_reports")
def batch_generate_reports_task(self, student_ids: list, semester: str) -> Dict[str, Any]:
    """Background task to generate reports for multiple students."""
    db = SessionLocal()
    results = []
    try:
        total = len(student_ids)
        for i, student_id in enumerate(student_ids):
            self.update_state(
                state='PROGRESS',
                meta={'current': i + 1, 'total': total}
            )
            report = calculate_student_report(db, student_id, semester)
            if report:
                results.append({
                    "student_id": student_id,
                    "status": "success",
                    "gpa": report['gpa']
                })
            else:
                results.append({
                    "student_id": student_id,
                    "status": "no_data"
                })
        return {
            "status": "success",
            "data": {
                "processed": len(results),
                "results": results
            }
        }
    except Exception as e:
        return {"status": "error", "message": str(e)}
    finally:
        db.close()
