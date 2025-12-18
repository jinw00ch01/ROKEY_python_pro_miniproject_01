from typing import Optional, Dict, Any
from io import BytesIO

import pandas as pd
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import seaborn as sns
from sqlalchemy.orm import Session

from app.models.grade import Grade
from app.models.student import Student, Course

def calculate_course_statistics(db: Session, course_id: int, semester: str) -> Optional[Dict[str, Any]]:
    grades = db.query(Grade).filter(Grade.course_id == course_id, Grade.semester == semester).all()
    if not grades:
        return None
    course = db.query(Course).filter(Course.id == course_id).first()
    data = [{'student_id': g.student_id, 'score': g.score, 'max_score': g.max_score,
             'percentage': (g.score / g.max_score * 100) if g.max_score > 0 else 0} for g in grades]
    df = pd.DataFrame(data)
    percentages = df['percentage']
    return {
        'course_id': course_id, 'course_name': course.name if course else '',
        'semester': semester, 'total_students': len(df),
        'mean': float(np.mean(percentages)), 'median': float(np.median(percentages)),
        'std_dev': float(np.std(percentages)), 'min_score': float(np.min(percentages)),
        'max_score': float(np.max(percentages)),
        'grade_distribution': calculate_grade_distribution(percentages)
    }


def calculate_grade_distribution(percentages: pd.Series) -> Dict[str, int]:
    distribution = {'A': 0, 'B': 0, 'C': 0, 'D': 0, 'F': 0}
    for pct in percentages:
        if pct >= 90: distribution['A'] += 1
        elif pct >= 80: distribution['B'] += 1
        elif pct >= 70: distribution['C'] += 1
        elif pct >= 60: distribution['D'] += 1
        else: distribution['F'] += 1
    return distribution


def percentage_to_gpa(percentage: float) -> float:
    if percentage >= 93: return 4.0
    elif percentage >= 90: return 3.7
    elif percentage >= 87: return 3.3
    elif percentage >= 83: return 3.0
    elif percentage >= 80: return 2.7
    elif percentage >= 77: return 2.3
    elif percentage >= 73: return 2.0
    elif percentage >= 70: return 1.7
    elif percentage >= 67: return 1.3
    elif percentage >= 63: return 1.0
    elif percentage >= 60: return 0.7
    else: return 0.0


def calculate_student_rank(db: Session, student_id: int, semester: str) -> Dict[str, Optional[int]]:
    all_grades = db.query(Grade).filter(Grade.semester == semester).all()
    if not all_grades: return {'rank': None, 'total': None}
    student_averages = {}
    for grade in all_grades:
        pct = (grade.score / grade.max_score * 100) if grade.max_score > 0 else 0
        if grade.student_id not in student_averages: student_averages[grade.student_id] = []
        student_averages[grade.student_id].append(pct)
    student_means = {sid: np.mean(pcts) for sid, pcts in student_averages.items()}
    sorted_students = sorted(student_means.items(), key=lambda x: x[1], reverse=True)
    rank = None
    for i, (sid, _) in enumerate(sorted_students, 1):
        if sid == student_id: rank = i; break
    return {'rank': rank, 'total': len(sorted_students)}


def calculate_student_report(db: Session, student_id: int, semester: str) -> Optional[Dict[str, Any]]:
    grades = db.query(Grade).filter(Grade.student_id == student_id, Grade.semester == semester).all()
    if not grades: return None
    student = db.query(Student).filter(Student.id == student_id).first()
    courses_data, total_grade_points, total_credits, z_scores = [], 0, 0, {}
    for grade in grades:
        course = db.query(Course).filter(Course.id == grade.course_id).first()
        percentage = (grade.score / grade.max_score * 100) if grade.max_score > 0 else 0
        course_grades = db.query(Grade).filter(Grade.course_id == grade.course_id, Grade.semester == semester).all()
        if len(course_grades) > 1:
            course_pcts = [(g.score / g.max_score * 100) if g.max_score > 0 else 0 for g in course_grades]
            mean, std = np.mean(course_pcts), np.std(course_pcts)
            z_score = (percentage - mean) / std if std > 0 else 0
        else: z_score = 0
        z_scores[course.name if course else str(grade.course_id)] = round(z_score, 2)
        grade_point = percentage_to_gpa(percentage)
        credits = course.credits if course else 3
        total_grade_points += grade_point * credits
        total_credits += credits
        courses_data.append({'course_id': grade.course_id, 'course_name': course.name if course else '',
            'course_code': course.course_code if course else '', 'credits': credits,
            'score': grade.score, 'max_score': grade.max_score, 'percentage': round(percentage, 2),
            'letter_grade': grade.letter_grade, 'grade_point': grade_point})
    gpa = total_grade_points / total_credits if total_credits > 0 else 0
    rank_info = calculate_student_rank(db, student_id, semester)
    return {'student_id': student_id, 'student_name': student.full_name if student else '',
        'semester': semester, 'courses': courses_data, 'gpa': round(gpa, 2),
        'total_credits': total_credits, 'z_scores': z_scores,
        'rank': rank_info.get('rank'), 'total_students': rank_info.get('total')}


def generate_grade_chart(db: Session, course_id: int, semester: str) -> Optional[BytesIO]:
    grades = db.query(Grade).filter(Grade.course_id == course_id, Grade.semester == semester).all()
    if not grades: return None
    course = db.query(Course).filter(Course.id == course_id).first()
    percentages = [(g.score / g.max_score * 100) if g.max_score > 0 else 0 for g in grades]
    fig, axes = plt.subplots(1, 2, figsize=(14, 5))
    sns.histplot(percentages, bins=10, kde=True, ax=axes[0], color='steelblue')
    axes[0].set_xlabel('Score (%)')
    axes[0].set_ylabel('Count')
    course_name = course.name if course else "Course"
    axes[0].set_title(f'Score Distribution - {course_name}\n{semester}')
    distribution = calculate_grade_distribution(pd.Series(percentages))
    labels, sizes = list(distribution.keys()), list(distribution.values())
    colors = ['#2ecc71', '#3498db', '#f1c40f', '#e67e22', '#e74c3c']
    non_zero = [(l, s, c) for l, s, c in zip(labels, sizes, colors) if s > 0]
    if non_zero:
        labels, sizes, colors = zip(*non_zero)
        axes[1].pie(sizes, labels=labels, colors=colors, autopct='%1.1f%%', startangle=90)
    axes[1].set_title('Grade Distribution')
    plt.tight_layout()
    buffer = BytesIO()
    plt.savefig(buffer, format='png', dpi=100, bbox_inches='tight')
    buffer.seek(0)
    plt.close(fig)
    return buffer
