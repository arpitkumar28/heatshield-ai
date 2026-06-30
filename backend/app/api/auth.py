from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.orm import Session
from datetime import timedelta
import time
from app.core.database import get_db
from app.core.security import create_access_token, get_current_user
from app.core.config import settings
from app.schemas.user import User, UserCreate, Token
from app.services.auth_service import AuthService

router = APIRouter()


@router.post("/register", response_model=User)
def register(user: UserCreate, db: Session = Depends(get_db)):
    auth_service = AuthService(db)
    
    # Check if user already exists
    if auth_service.get_user_by_email(user.email):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    if auth_service.get_user_by_username(user.username):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already taken"
        )
    
    return auth_service.create_user(user)


@router.post("/login")
async def login(request: Request, db: Session = Depends(get_db)):
    if request.headers.get("content-type", "").startswith("application/json"):
        credentials = await request.json()
        email = credentials.get("email") or credentials.get("username")
        password = credentials.get("password")
    else:
        form_data = await request.form()
        email = form_data.get("username") or form_data.get("email")
        password = form_data.get("password")

    if not email or not password:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Email and password are required"
        )

    auth_service = AuthService(db)
    user = auth_service.authenticate_user(email, password)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(user.id), "email": user.email, "role": user.role},
        expires_delta=access_token_expires
    )
    
    # Generate a refresh token (in production, this should be stored in database)
    refresh_token = create_access_token(
        data={"sub": str(user.id), "type": "refresh"},
        expires_delta=timedelta(days=7)
    )
    
    return {
        "user": {
            "id": str(user.id),
            "email": user.email,
            "name": user.full_name,
            "role": user.role,
            "permissions": ["read", "write"],  # This should come from user's permissions
            "organization": "ISRO",  # This should come from user's organization
            "createdAt": user.created_at.isoformat() if hasattr(user, 'created_at') else None,
            "lastLogin": None,
        },
        "tokens": {
            "accessToken": access_token,
            "refreshToken": refresh_token,
            "expiresIn": (access_token_expires.total_seconds() * 1000) + int(time.time() * 1000),
        }
    }


@router.post("/refresh")
async def refresh_token(request: Request, db: Session = Depends(get_db)):
    credentials = await request.json()
    refresh_token = credentials.get("refreshToken")
    
    if not refresh_token:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Refresh token is required"
        )
    
    # In a real implementation, you would validate the refresh token
    # For now, we'll issue a new access token
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": "user_id"},  # This would come from the refresh token
        expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/me", response_model=User)
def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user
