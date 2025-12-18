from datetime import datetime, date
from typing import Optional, List

from pydantic import BaseModel, Field, EmailStr, ConfigDict


class StudentBase(BaseModel):
    """Base student schema."""
    student_id: str = Field(..., min_length=1, max_length=20)
    first_name: str = Field(..., min_length=1, max_length=100)
    last_name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    date_of_birth: Optional[date] = None
    phone: Optional[str] = Field(None, max_length=20)
    address: Optional[str] = None


class StudentCreate(StudentBase):
    """Schema for creating a student."""
    pass


class StudentUpdate(BaseModel):
    """Schema for updating a student."""
    student_id: Optional[str] = Field(None, min_length=1, max_length=20)
    first_name: Optional[str] = Field(None, min_length=1, max_length=100)
    last_name: Optional[str] = Field(None, min_length=1, max_length=100)
    email: Optional[EmailStr] = None
    date_of_birth: Optional[date] = None
    phone: Optional[str] = Field(None, max_length=20)
    address: Optional[str] = None


class StudentResponse(StudentBase):
    """Schema for student response."""
    id: int
    full_name: str
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    model_config = ConfigDict(from_attributes=True)


class StudentListResponse(BaseModel):
    """Schema for list of students response."""
    items: List[StudentResponse]
    total: int
    page: int
    size: int
