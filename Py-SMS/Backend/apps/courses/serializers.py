from rest_framework import serializers
from .models import Course, Enrollment
from apps.students.serializers import StudentListSerializer


class CourseSerializer(serializers.ModelSerializer):
    student_count = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = ['id', 'course_code', 'name', 'description', 'credits',
                  'instructor', 'student_count', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

    def get_student_count(self, obj):
        return obj.enrollments.filter(status='active').count()


class CourseListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'course_code', 'name', 'credits', 'instructor']


class EnrollmentSerializer(serializers.ModelSerializer):
    student = StudentListSerializer(read_only=True)
    course = CourseListSerializer(read_only=True)
    student_id = serializers.IntegerField(write_only=True)
    course_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Enrollment
        fields = ['id', 'student', 'course', 'student_id', 'course_id',
                  'enrolled_at', 'status']
        read_only_fields = ['id', 'enrolled_at']


class EnrollmentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enrollment
        fields = ['student', 'course', 'status']
