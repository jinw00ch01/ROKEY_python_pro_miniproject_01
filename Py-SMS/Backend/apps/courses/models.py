from django.db import models
from apps.students.models import Student


class Course(models.Model):
    """Course model."""

    course_code = models.CharField(max_length=20, unique=True, db_index=True)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    credits = models.IntegerField(default=3)
    instructor = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'courses'
        ordering = ['name']

    def __str__(self):
        return f"{self.course_code} - {self.name}"


class Enrollment(models.Model):
    """Enrollment model - junction table for Student and Course."""

    STATUS_CHOICES = [
        ('active', 'Active'),
        ('completed', 'Completed'),
        ('dropped', 'Dropped'),
    ]

    student = models.ForeignKey(
        Student,
        on_delete=models.CASCADE,
        related_name='enrollments'
    )
    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name='enrollments'
    )
    enrolled_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')

    class Meta:
        db_table = 'enrollments'
        unique_together = ['student', 'course']
        ordering = ['-enrolled_at']

    def __str__(self):
        return f"{self.student.full_name} - {self.course.name}"
