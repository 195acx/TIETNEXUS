from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    Boolean,
    ForeignKey,
    DateTime,
    UniqueConstraint
)

from .database import Base

from datetime import datetime


class User(Base):

    __tablename__ = "users"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(
        String(100),
        nullable=False
    )

    email = Column(
        String(150),
        unique=True,
        nullable=False,
        index=True
    )

    password_hash = Column(
        String(300),
        nullable=False
    )

    is_active = Column(
        Boolean,
        default=True
    )


class Society(Base):

    __tablename__ = "societies"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(
        String(100),
        nullable=False
    )

    category = Column(
        String(100),
        nullable=False
    )

    description = Column(
        Text,
        nullable=False
    )

    about = Column(
        Text,
        nullable=True
    )

    logo_url = Column(
        String(300),
        nullable=True
    )

    instagram_url = Column(
        String(300),
        nullable=True
    )

    website_url = Column(
        String(300),
        nullable=True
    )

    recruitment_info = Column(
        Text,
        nullable=True
    )

    contact_email = Column(
        String(150),
        nullable=True
    )

    is_active = Column(
        Boolean,
        default=True
    )


class Event(Base):

    __tablename__ = "events"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    title = Column(
        String(150),
        nullable=False
    )

    description = Column(
        Text,
        nullable=False
    )

    date = Column(
        String(30),
        nullable=False
    )

    time = Column(
        String(30),
        nullable=False
    )

    venue = Column(
        String(150),
        nullable=False
    )

    society_id = Column(
        Integer,
        ForeignKey("societies.id"),
        nullable=False
    )

    registration_required = Column(
        Boolean,
        default=True
    )


class Registration(Base):

    __tablename__ = "registrations"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    event_id = Column(
        Integer,
        ForeignKey("events.id"),
        nullable=False
    )

    registered_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    __table_args__ = (
        UniqueConstraint(
            "user_id",
            "event_id",
            name="unique_user_event"
        ),
    )