from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Course, Enrollment
from .serializers import (
    CourseSerializer, CourseListSerializer,
    EnrollmentSerializer, EnrollmentCreateSerializer
)


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['course_code', 'instructor']
    search_fields = ['course_code', 'name', 'description', 'instructor']
    ordering_fields = ['created_at', 'name', 'course_code']
    ordering = ['name']

    def get_serializer_class(self):
        if self.action == 'list':
            return CourseListSerializer
        return CourseSerializer

    @action(detail=True, methods=['get'])
    def students(self, request, pk=None):
        course = self.get_object()
        enrollments = course.enrollments.filter(status='active')
        serializer = EnrollmentSerializer(enrollments, many=True)
        return Response(serializer.data)


class EnrollmentViewSet(viewsets.ModelViewSet):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['student', 'course', 'status']
    ordering_fields = ['enrolled_at']
    ordering = ['-enrolled_at']

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return EnrollmentCreateSerializer
        return EnrollmentSerializer
