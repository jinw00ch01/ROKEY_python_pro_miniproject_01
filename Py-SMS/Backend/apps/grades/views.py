from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Avg
from .models import Grade
from .serializers import GradeSerializer, GradeCreateSerializer, GradeListSerializer


class GradeViewSet(viewsets.ModelViewSet):
    queryset = Grade.objects.all()
    serializer_class = GradeSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['student', 'course', 'grade_type', 'semester']
    search_fields = ['student__first_name', 'student__last_name', 'course__name']
    ordering_fields = ['created_at', 'score', 'semester']
    ordering = ['-created_at']

    def get_serializer_class(self):
        if self.action == 'list':
            return GradeListSerializer
        if self.action in ['create', 'update', 'partial_update']:
            return GradeCreateSerializer
        return GradeSerializer

    @action(detail=False, methods=['get'])
    def by_student(self, request):
        student_id = request.query_params.get('student_id')
        if not student_id:
            return Response({'error': 'student_id is required'}, status=400)

        grades = self.queryset.filter(student_id=student_id)
        serializer = GradeListSerializer(grades, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def by_course(self, request):
        course_id = request.query_params.get('course_id')
        if not course_id:
            return Response({'error': 'course_id is required'}, status=400)

        grades = self.queryset.filter(course_id=course_id)
        serializer = GradeListSerializer(grades, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def statistics(self, request):
        course_id = request.query_params.get('course_id')
        semester = request.query_params.get('semester')

        queryset = self.queryset
        if course_id:
            queryset = queryset.filter(course_id=course_id)
        if semester:
            queryset = queryset.filter(semester=semester)

        stats = queryset.aggregate(
            average_score=Avg('score'),
            average_percentage=Avg('score') * 100 / Avg('max_score') if queryset.exists() else 0
        )

        return Response({
            'total_grades': queryset.count(),
            'average_score': stats['average_score'] or 0,
        })
