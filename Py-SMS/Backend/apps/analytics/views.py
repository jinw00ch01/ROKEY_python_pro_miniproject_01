from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Count, Avg
from apps.students.models import Student
from apps.courses.models import Course, Enrollment
from apps.grades.models import Grade


class DashboardStatsView(APIView):
    """Dashboard statistics API."""

    def get(self, request):
        total_students = Student.objects.count()
        total_courses = Course.objects.count()
        active_enrollments = Enrollment.objects.filter(status='active').count()
        total_grades = Grade.objects.count()

        avg_grade = Grade.objects.aggregate(
            avg=Avg('score')
        )['avg'] or 0

        return Response({
            'total_students': total_students,
            'total_courses': total_courses,
            'active_enrollments': active_enrollments,
            'total_grades': total_grades,
            'average_grade': round(avg_grade, 2),
        })


class CourseAnalyticsView(APIView):
    """Course analytics API."""

    def get(self, request):
        course_stats = Course.objects.annotate(
            student_count=Count('enrollments', filter=Enrollment.objects.filter(status='active')),
            avg_grade=Avg('grades__score')
        ).values('id', 'course_code', 'name', 'student_count', 'avg_grade')

        return Response(list(course_stats))


class GradeDistributionView(APIView):
    """Grade distribution API."""

    def get(self, request):
        course_id = request.query_params.get('course_id')
        semester = request.query_params.get('semester')

        queryset = Grade.objects.all()
        if course_id:
            queryset = queryset.filter(course_id=course_id)
        if semester:
            queryset = queryset.filter(semester=semester)

        distribution = {
            'A': 0, 'B': 0, 'C': 0, 'D': 0, 'F': 0
        }

        for grade in queryset:
            letter = grade.letter_grade
            distribution[letter] += 1

        return Response(distribution)


class StudentPerformanceView(APIView):
    """Student performance API."""

    def get(self, request):
        student_id = request.query_params.get('student_id')
        if not student_id:
            return Response({'error': 'student_id is required'}, status=400)

        grades = Grade.objects.filter(student_id=student_id).select_related('course')

        performance = []
        for grade in grades:
            performance.append({
                'course': grade.course.name,
                'score': grade.score,
                'max_score': grade.max_score,
                'percentage': grade.percentage,
                'letter_grade': grade.letter_grade,
                'semester': grade.semester,
            })

        avg_percentage = sum(p['percentage'] for p in performance) / len(performance) if performance else 0

        return Response({
            'student_id': student_id,
            'grades': performance,
            'average_percentage': round(avg_percentage, 2),
        })
