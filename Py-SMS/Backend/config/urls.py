"""URL configuration for Py-SMS project."""
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/v1/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/v1/accounts/', include('apps.accounts.urls')),
    path('api/v1/students/', include('apps.students.urls')),
    path('api/v1/courses/', include('apps.courses.urls')),
    path('api/v1/grades/', include('apps.grades.urls')),
    path('api/v1/analytics/', include('apps.analytics.urls')),
]
