from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CourseViewSet, EnrollmentViewSet

router = DefaultRouter()
router.register('', CourseViewSet, basename='course')
router.register('enrollments', EnrollmentViewSet, basename='enrollment')

urlpatterns = [
    path('', include(router.urls)),
]
