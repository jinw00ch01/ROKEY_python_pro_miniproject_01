from django.urls import path
from .views import (
    DashboardStatsView,
    CourseAnalyticsView,
    GradeDistributionView,
    StudentPerformanceView
)

urlpatterns = [
    path('dashboard/', DashboardStatsView.as_view(), name='dashboard-stats'),
    path('courses/', CourseAnalyticsView.as_view(), name='course-analytics'),
    path('grades/distribution/', GradeDistributionView.as_view(), name='grade-distribution'),
    path('students/performance/', StudentPerformanceView.as_view(), name='student-performance'),
]
