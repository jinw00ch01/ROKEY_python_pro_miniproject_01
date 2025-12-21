from rest_framework import serializers
from .models import Grade
from apps.students.serializers import StudentListSerializer
from apps.courses.serializers import CourseListSerializer


class GradeSerializer(serializers.ModelSerializer):
    student = StudentListSerializer(read_only=True)
    course = CourseListSerializer(read_only=True)
    student_id = serializers.IntegerField(write_only=True)
    course_id = serializers.IntegerField(write_only=True)
    percentage = serializers.ReadOnlyField()
    letter_grade = serializers.ReadOnlyField()

    class Meta:
        model = Grade
        fields = ['id', 'student', 'course', 'student_id', 'course_id',
                  'score', 'max_score', 'grade_type', 'semester',
                  'percentage', 'letter_grade', 'comments',
                  'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class GradeCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields = ['student', 'course', 'score', 'max_score',
                  'grade_type', 'semester', 'comments']


class GradeListSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source='student.full_name', read_only=True)
    course_name = serializers.CharField(source='course.name', read_only=True)
    percentage = serializers.ReadOnlyField()
    letter_grade = serializers.ReadOnlyField()

    class Meta:
        model = Grade
        fields = ['id', 'student_name', 'course_name', 'score', 'max_score',
                  'percentage', 'letter_grade', 'grade_type', 'semester']
