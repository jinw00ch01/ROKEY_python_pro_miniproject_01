from datetime import datetime
from typing import Optional, List

from pydantic import BaseModel, Field, ConfigDict


class CourseBase(BaseModel):
    """Base course schema."""
    course_code: str = Field(..., min_length=1, max_length=20)
    name: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = None
    credits: int = Field(default=3, ge=1, le=10)
    instructor: Optional[str] = Field(None, max_length=255)


class CourseCreate(CourseBase):
    """Schema for creating a course."""
    pass


class CourseUpdate(BaseModel):
    """Schema for updating a course."""
    course_code: Optional[str] = Field(None, min_length=1, max_length=20)
    name: Optional[str] = Field(None, min_length=1, max_length=255)
    description: Optional[str] = None
    credits: Optional[int] = Field(None, ge=1, le=10)
    instructor: Optional[str] = Field(None, max_length=255)


class CourseResponse(CourseBase):
    """Schema for course response."""
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    model_config = ConfigDict(from_attributes=True)


class CourseListResponse(BaseModel):
    """Schema for list of courses response."""
    items: List[CourseResponse]
    total: int
    page: int
    size: int
