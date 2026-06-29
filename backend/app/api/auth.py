from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.orm import Session
from datetime import timedelta
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


@router.post("/login", response_model=Token)
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
    
    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/me", response_model=User)
def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user
