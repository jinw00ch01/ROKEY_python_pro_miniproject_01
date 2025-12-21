from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Student
from .serializers import StudentSerializer, StudentListSerializer


class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['student_id']
    search_fields = ['first_name', 'last_name', 'email', 'student_id']
    ordering_fields = ['created_at', 'last_name', 'first_name']
    ordering = ['-created_at']

    def get_serializer_class(self):
        if self.action == 'list':
            return StudentListSerializer
        return StudentSerializer
