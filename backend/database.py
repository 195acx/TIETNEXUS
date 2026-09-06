from pathlib import Path

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker


# =========================================================
# DATABASE LOCATION
# =========================================================

# Project root = folder containing "backend"
BASE_DIR = Path(__file__).resolve().parent.parent

DATABASE_PATH = BASE_DIR / "tietnexus.db"

DATABASE_URL = f"sqlite:///{DATABASE_PATH}"


# =========================================================
# DATABASE ENGINE
# =========================================================

engine = create_engine(
    DATABASE_URL,
    connect_args={
        "check_same_thread": False
    }
)


# =========================================================
# SESSION
# =========================================================

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)


# =========================================================
# BASE MODEL
# =========================================================

Base = declarative_base()