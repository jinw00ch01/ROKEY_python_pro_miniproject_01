from typing import Optional
from io import BytesIO
from datetime import datetime

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch, cm
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from sqlalchemy.orm import Session

from app.models.grade import Grade
from app.models.student import Student, Course
from app.services.analytics import calculate_student_report


def generate_report_card_pdf(db: Session, student_id: int, semester: str) -> Optional[BytesIO]:
    """Generate a PDF report card for a student."""
    report_data = calculate_student_report(db, student_id, semester)
    if not report_data:
        return None
    
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        return None
    
    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=A4, topMargin=1*cm, bottomMargin=1*cm)
    
    elements = []
    styles = getSampleStyleSheet()
    
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=24,
        spaceAfter=30,
        alignment=1
    )
    
    header_style = ParagraphStyle(
        'CustomHeader',
        parent=styles['Heading2'],
        fontSize=14,
        spaceAfter=12,
        textColor=colors.darkblue
    )
    
    elements.append(Paragraph("Py-SMS Report Card", title_style))
    elements.append(Spacer(1, 20))
    
    student_info = [
        ['Student Name:', report_data['student_name']],
        ['Student ID:', student.student_id],
        ['Semester:', semester],
        ['Generated:', datetime.now().strftime('%Y-%m-%d %H:%M')]
    ]
    
    info_table = Table(student_info, colWidths=[2.5*inch, 4*inch])
    info_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
        ('FONTNAME', (1, 0), (1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 0), (-1, -1), 11),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
    ]))
    elements.append(info_table)
    elements.append(Spacer(1, 30))
    
    elements.append(Paragraph("Course Grades", header_style))
    
    grade_data = [['Course Code', 'Course Name', 'Credits', 'Score', '%', 'Grade', 'Points']]
    for course in report_data['courses']:
        grade_data.append([
            course['course_code'],
            course['course_name'][:30],
            str(course['credits']),
            f"{course['score']}/{course['max_score']}",
            f"{course['percentage']:.1f}%",
            course['letter_grade'],
            f"{course['grade_point']:.1f}"
        ])
    
    grade_table = Table(grade_data, colWidths=[1*inch, 2.2*inch, 0.7*inch, 0.9*inch, 0.7*inch, 0.6*inch, 0.7*inch])
    grade_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.darkblue),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 10),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
        ('FONTNAME', (0, 1), (-1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 1), (-1, -1), 9),
        ('GRID', (0, 0), (-1, -1), 1, colors.black),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.lightgrey]),
    ]))
    elements.append(grade_table)
    elements.append(Spacer(1, 30))
    
    elements.append(Paragraph("Summary", header_style))
    
    summary_data = [
        ['GPA:', f"{report_data['gpa']:.2f} / 4.00"],
        ['Total Credits:', str(report_data['total_credits'])],
        ['Class Rank:', f"{report_data['rank']} / {report_data['total_students']}" if report_data['rank'] else 'N/A']
    ]
    
    summary_table = Table(summary_data, colWidths=[2*inch, 2*inch])
    summary_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
        ('FONTNAME', (1, 0), (1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 0), (-1, -1), 12),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 10),
        ('TOPPADDING', (0, 0), (-1, -1), 10),
        ('BACKGROUND', (0, 0), (-1, -1), colors.lightyellow),
        ('BOX', (0, 0), (-1, -1), 1, colors.black),
    ]))
    elements.append(summary_table)
    elements.append(Spacer(1, 30))
    
    if report_data['z_scores']:
        elements.append(Paragraph("Z-Score Analysis", header_style))
        zscore_data = [['Course', 'Z-Score', 'Performance']]
        for course_name, z_score in report_data['z_scores'].items():
            if z_score > 1:
                performance = 'Above Average'
            elif z_score < -1:
                performance = 'Below Average'
            else:
                performance = 'Average'
            zscore_data.append([course_name[:25], f"{z_score:.2f}", performance])
        
        zscore_table = Table(zscore_data, colWidths=[2.5*inch, 1*inch, 1.5*inch])
        zscore_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.darkgreen),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, -1), 9),
            ('GRID', (0, 0), (-1, -1), 1, colors.black),
        ]))
        elements.append(zscore_table)
    
    doc.build(elements)
    buffer.seek(0)
    return buffer
