from datetime import datetime
from typing import Optional, List

from pydantic import BaseModel, Field, ConfigDict


class GradeBase(BaseModel):
    """Base grade schema."""
    student_id: int
    course_id: int
    score: float = Field(..., ge=0)
    max_score: float = Field(default=100.0, ge=0)
    grade_type: str = Field(default="exam", pattern="^(exam|quiz|assignment|project)$")
    semester: str = Field(..., min_length=1, max_length=20)
    comments: Optional[str] = None


class GradeCreate(GradeBase):
    """Schema for creating a grade."""
    pass


class GradeUpdate(BaseModel):
    """Schema for updating a grade."""
    score: Optional[float] = Field(None, ge=0)
    max_score: Optional[float] = Field(None, ge=0)
    grade_type: Optional[str] = Field(None, pattern="^(exam|quiz|assignment|project)$")
    semester: Optional[str] = Field(None, min_length=1, max_length=20)
    comments: Optional[str] = None


class GradeResponse(GradeBase):
    """Schema for grade response."""
    id: int
    percentage: float
    letter_grade: str
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    model_config = ConfigDict(from_attributes=True)


class GradeWithDetails(GradeResponse):
    """Schema for grade with student and course details."""
    student_name: Optional[str] = None
    course_name: Optional[str] = None


class GradeStatistics(BaseModel):
    """Schema for grade statistics."""
    course_id: int
    course_name: str
    semester: str
    total_students: int
    mean: float
    median: float
    std_dev: float
    min_score: float
    max_score: float
    grade_distribution: dict


class StudentGradeReport(BaseModel):
    """Schema for student grade report."""
    student_id: int
    student_name: str
    semester: str
    courses: List[dict]
    gpa: float
    total_credits: int
    z_scores: dict
    rank: Optional[int] = None
    total_students: Optional[int] = None
