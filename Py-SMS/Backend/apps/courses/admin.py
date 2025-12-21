from django.contrib import admin
from .models import Course, Enrollment


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ['course_code', 'name', 'credits', 'instructor', 'created_at']
    list_filter = ['credits', 'created_at']
    search_fields = ['course_code', 'name', 'instructor']
    ordering = ['name']


@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    list_display = ['student', 'course', 'status', 'enrolled_at']
    list_filter = ['status', 'enrolled_at']
    search_fields = ['student__first_name', 'student__last_name', 'course__name']
    raw_id_fields = ['student', 'course']
