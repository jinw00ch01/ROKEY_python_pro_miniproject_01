from datetime import datetime
from typing import Optional, TYPE_CHECKING

from sqlalchemy import Float, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base

if TYPE_CHECKING:
    from app.models.student import Student, Course


class Grade(Base):
    """Grade model for student scores."""
    
    __tablename__ = "grades"
    
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    student_id: Mapped[int] = mapped_column(ForeignKey("students.id"), nullable=False)
    course_id: Mapped[int] = mapped_column(ForeignKey("courses.id"), nullable=False)
    score: Mapped[float] = mapped_column(Float, nullable=False)
    max_score: Mapped[float] = mapped_column(Float, default=100.0)
    grade_type: Mapped[str] = mapped_column(String(50), default="exam")  # exam, quiz, assignment, project
    semester: Mapped[str] = mapped_column(String(20), nullable=False)  # e.g., "2024-1", "2024-2"
    comments: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[Optional[datetime]] = mapped_column(DateTime, onupdate=datetime.utcnow, nullable=True)
    
    # Relationships
    student: Mapped["Student"] = relationship("Student", back_populates="grades")
    course: Mapped["Course"] = relationship("Course", back_populates="grades")
    
    @property
    def percentage(self) -> float:
        """Calculate percentage score."""
        if self.max_score == 0:
            return 0.0
        return (self.score / self.max_score) * 100
    
    @property
    def letter_grade(self) -> str:
        """Convert percentage to letter grade."""
        pct = self.percentage
        if pct >= 90:
            return "A"
        elif pct >= 80:
            return "B"
        elif pct >= 70:
            return "C"
        elif pct >= 60:
            return "D"
        else:
            return "F"
