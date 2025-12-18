from datetime import datetime
from typing import Optional, List

from pydantic import BaseModel, Field, ConfigDict


class EnrollmentBase(BaseModel):
    """Base enrollment schema."""
    student_id: int
    course_id: int
    status: str = Field(default="active", pattern="^(active|completed|dropped)$")


class EnrollmentCreate(EnrollmentBase):
    """Schema for creating an enrollment."""
    pass


class EnrollmentUpdate(BaseModel):
    """Schema for updating an enrollment."""
    status: Optional[str] = Field(None, pattern="^(active|completed|dropped)$")


class EnrollmentResponse(EnrollmentBase):
    """Schema for enrollment response."""
    id: int
    enrolled_at: datetime
    
    model_config = ConfigDict(from_attributes=True)


class EnrollmentWithDetails(EnrollmentResponse):
    """Schema for enrollment with student and course details."""
    student_name: Optional[str] = None
    course_name: Optional[str] = None
