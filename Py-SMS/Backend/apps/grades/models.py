from django.db import models
from apps.students.models import Student
from apps.courses.models import Course


class Grade(models.Model):
    """Grade model for student scores."""

    GRADE_TYPE_CHOICES = [
        ('exam', 'Exam'),
        ('quiz', 'Quiz'),
        ('assignment', 'Assignment'),
        ('project', 'Project'),
        ('midterm', 'Midterm'),
        ('final', 'Final'),
    ]

    student = models.ForeignKey(
        Student,
        on_delete=models.CASCADE,
        related_name='grades'
    )
    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name='grades'
    )
    score = models.FloatField()
    max_score = models.FloatField(default=100.0)
    grade_type = models.CharField(max_length=50, choices=GRADE_TYPE_CHOICES, default='exam')
    semester = models.CharField(max_length=20)  # e.g., "2024-1", "2024-2"
    comments = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'grades'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.student.full_name} - {self.course.name}: {self.score}/{self.max_score}"

    @property
    def percentage(self):
        """Calculate percentage score."""
        if self.max_score == 0:
            return 0.0
        return (self.score / self.max_score) * 100

    @property
    def letter_grade(self):
        """Convert percentage to letter grade."""
        pct = self.percentage
        if pct >= 90:
            return "A"
        elif pct >= 80:
            return "B"
        elif pct >= 70:
            return "C"
        elif pct >= 60:
            return "D"
        else:
            return "F"
