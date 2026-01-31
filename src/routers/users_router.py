from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from config.database_connection import get_db
from src.models.user_details import User

router = APIRouter(prefix="/users", tags=["Users"])

@router.post("/")
def create_user(name: str, email: str, db: Session = Depends(get_db)):
    user = User(name=name, email=email)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

@router.get("/")
def get_users(db: Session = Depends(get_db)):
    return db.query(User).all()
