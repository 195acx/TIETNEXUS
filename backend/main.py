from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from sqlalchemy.orm import Session
from pydantic import BaseModel

from .database import engine, Base, SessionLocal
from . import models

from jose import jwt, JWTError

import hashlib
import secrets

from datetime import datetime, timedelta


# =========================================================
# APP
# =========================================================

app = FastAPI(
    title="TIET NExus API",
    description="Backend API for TIET NExus",
    version="1.0.0"
)


# =========================================================
# CORS
# =========================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================================================
# DATABASE
# =========================================================

Base.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


# =========================================================
# AUTHENTICATION
# =========================================================

SECRET_KEY = "TIET_NEXUS_DEVELOPMENT_SECRET"

ALGORITHM = "HS256"

TOKEN_EXPIRE_HOURS = 24

security = HTTPBearer(auto_error=False)


# =========================================================
# PASSWORD HASHING
# =========================================================

def hash_password(password):

    salt = secrets.token_bytes(16)

    password_hash = hashlib.pbkdf2_hmac(
        "sha256",
        password.encode(),
        salt,
        100000
    )

    return (
        salt.hex()
        + ":"
        + password_hash.hex()
    )


def verify_password(password, stored_hash):

    try:

        salt_hex, hash_hex = stored_hash.split(":")

        salt = bytes.fromhex(salt_hex)

        password_hash = hashlib.pbkdf2_hmac(
            "sha256",
            password.encode(),
            salt,
            100000
        )

        return secrets.compare_digest(
            password_hash.hex(),
            hash_hex
        )

    except Exception:

        return False


# =========================================================
# JWT TOKEN
# =========================================================

def create_token(user_id):

    expire = (
        datetime.utcnow()
        + timedelta(hours=TOKEN_EXPIRE_HOURS)
    )

    payload = {
        "sub": str(user_id),
        "exp": expire
    }

    return jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=ALGORITHM
    )


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):

    if credentials is None:

        raise HTTPException(
            status_code=401,
            detail="Authentication required"
        )


    token = credentials.credentials


    try:

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        user_id = payload.get("sub")


        if user_id is None:

            raise HTTPException(
                status_code=401,
                detail="Invalid token"
            )


    except JWTError:

        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
        )


    user = (
        db.query(models.User)
        .filter(
            models.User.id == int(user_id)
        )
        .first()
    )


    if user is None:

        raise HTTPException(
            status_code=401,
            detail="User not found"
        )


    return user


# =========================================================
# REQUEST MODELS
# =========================================================

class SignupRequest(BaseModel):

    name: str

    email: str

    password: str


class LoginRequest(BaseModel):

    email: str

    password: str


# =========================================================
# HOME
# =========================================================

@app.get("/")
def home():

    return {
        "message": "TIET NExus backend is running!"
    }


# =========================================================
# SIGNUP
# =========================================================

@app.post("/auth/signup")
def signup(
    data: SignupRequest,
    db: Session = Depends(get_db)
):

    email = data.email.strip().lower()


    existing_user = (
        db.query(models.User)
        .filter(
            models.User.email == email
        )
        .first()
    )


    if existing_user:

        raise HTTPException(
            status_code=400,
            detail="An account with this email already exists"
        )


    if len(data.password) < 6:

        raise HTTPException(
            status_code=400,
            detail="Password must contain at least 6 characters"
        )


    if not data.name.strip():

        raise HTTPException(
            status_code=400,
            detail="Name cannot be empty"
        )


    user = models.User(

        name=data.name.strip(),

        email=email,

        password_hash=hash_password(
            data.password
        )

    )


    db.add(user)

    db.commit()

    db.refresh(user)


    token = create_token(user.id)


    return {

        "access_token": token,

        "user": {

            "id": user.id,

            "name": user.name,

            "email": user.email

        }

    }


# =========================================================
# LOGIN
# =========================================================

@app.post("/auth/login")
def login(
    data: LoginRequest,
    db: Session = Depends(get_db)
):

    email = data.email.strip().lower()


    user = (
        db.query(models.User)
        .filter(
            models.User.email == email
        )
        .first()
    )


    if user is None:

        raise HTTPException(
            status_code=401,
            detail="Incorrect email or password"
        )


    if not verify_password(
        data.password,
        user.password_hash
    ):

        raise HTTPException(
            status_code=401,
            detail="Incorrect email or password"
        )


    token = create_token(user.id)


    return {

        "access_token": token,

        "user": {

            "id": user.id,

            "name": user.name,

            "email": user.email

        }

    }


# =========================================================
# CURRENT USER
# =========================================================

@app.get("/auth/me")
def get_me(
    user: models.User = Depends(
        get_current_user
    )
):

    return {

        "id": user.id,

        "name": user.name,

        "email": user.email

    }


# =========================================================
# SOCIETIES
# =========================================================

@app.get("/societies")
def get_societies(
    db: Session = Depends(get_db)
):

    societies = (

        db.query(models.Society)

        .order_by(
            models.Society.id
        )

        .all()

    )


    return [

        {

            "id": society.id,

            "name": society.name,

            "category": society.category,

            "description": society.description,

            "about": society.about,

            "logo_url": society.logo_url,

            "instagram_url": society.instagram_url,

            "website_url": society.website_url,

            "recruitment_info": society.recruitment_info,

            "contact_email": society.contact_email

        }

        for society in societies

    ]


# =========================================================
# SINGLE SOCIETY
# =========================================================

@app.get("/societies/{society_id}")
def get_society(
    society_id: int,
    db: Session = Depends(get_db)
):

    society = (

        db.query(models.Society)

        .filter(
            models.Society.id == society_id
        )

        .first()

    )


    if society is None:

        raise HTTPException(
            status_code=404,
            detail="Society not found"
        )


    return {

        "id": society.id,

        "name": society.name,

        "category": society.category,

        "description": society.description,

        "about": society.about,

        "logo_url": society.logo_url,

        "instagram_url": society.instagram_url,

        "website_url": society.website_url,

        "recruitment_info": society.recruitment_info,

        "contact_email": society.contact_email

    }


# =========================================================
# EVENTS
# =========================================================

@app.get("/events")
def get_events(
    db: Session = Depends(get_db)
):

    events = (

        db.query(models.Event)

        .order_by(
            models.Event.id.desc()
        )

        .all()

    )


    result = []


    for event in events:

        society = (

            db.query(models.Society)

            .filter(
                models.Society.id
                == event.society_id
            )

            .first()

        )


        result.append({

            "id": event.id,

            "title": event.title,

            "description": event.description,

            "date": event.date,

            "time": event.time,

            "venue": event.venue,

            "society_id": event.society_id,

            "society_name":
                society.name
                if society
                else "TIET",

            "registration_required":
                event.registration_required

        })


    return result


# =========================================================
# EVENT REGISTRATION
# =========================================================

@app.post("/events/{event_id}/register")
def register_for_event(

    event_id: int,

    user: models.User = Depends(
        get_current_user
    ),

    db: Session = Depends(get_db)

):

    event = (

        db.query(models.Event)

        .filter(
            models.Event.id == event_id
        )

        .first()

    )


    if event is None:

        raise HTTPException(
            status_code=404,
            detail="Event not found"
        )


    existing = (

        db.query(models.Registration)

        .filter(

            models.Registration.user_id
            == user.id,

            models.Registration.event_id
            == event_id

        )

        .first()

    )


    if existing:

        return {
            "message": "Already registered"
        }


    registration = models.Registration(

        user_id=user.id,

        event_id=event_id

    )


    db.add(registration)

    db.commit()


    return {
        "message": "Registration successful"
    }


# =========================================================
# MY REGISTRATIONS
# =========================================================

@app.get("/registrations/me")
def get_my_registrations(

    user: models.User = Depends(
        get_current_user
    ),

    db: Session = Depends(get_db)

):

    registrations = (

        db.query(models.Registration)

        .filter(

            models.Registration.user_id
            == user.id

        )

        .order_by(
            models.Registration.id.desc()
        )

        .all()

    )


    result = []


    for registration in registrations:

        event = (

            db.query(models.Event)

            .filter(

                models.Event.id
                == registration.event_id

            )

            .first()

        )


        if event is None:

            continue


        society = (

            db.query(models.Society)

            .filter(

                models.Society.id
                == event.society_id

            )

            .first()

        )


        result.append({

            "registration_id":
                registration.id,

            "event_id":
                event.id,

            "title":
                event.title,

            "date":
                event.date,

            "time":
                event.time,

            "venue":
                event.venue,

            "society_name":
                society.name
                if society
                else "TIET",

            "registered_at":
                registration.registered_at

        })


    return result
