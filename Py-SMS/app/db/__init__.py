from app.db.base import Base

# Import session only when not running alembic
# This prevents database connection issues during migration generation
try:
    from app.db.session import SessionLocal, engine, get_db
    __all__ = ["Base", "SessionLocal", "engine", "get_db"]
except Exception:
    __all__ = ["Base"]
