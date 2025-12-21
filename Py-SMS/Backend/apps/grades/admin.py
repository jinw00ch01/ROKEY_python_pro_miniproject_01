from django.contrib import admin
from .models import Grade


@admin.register(Grade)
class GradeAdmin(admin.ModelAdmin):
    list_display = ['student', 'course', 'score', 'max_score', 'grade_type', 'semester', 'created_at']
    list_filter = ['grade_type', 'semester', 'created_at']
    search_fields = ['student__first_name', 'student__last_name', 'course__name']
    raw_id_fields = ['student', 'course']
    ordering = ['-created_at']
