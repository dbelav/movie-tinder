from fastapi import APIRouter
from .crud import UserCRUD


router = APIRouter(
    prefix="/auth",
    tags=["auth"],
    responses={404: {"description": "Not found"}},
)
user_crud = UserCRUD()


@router.get("/login")
def login():
    return 111


@router.post("/register")
def register():
    pass
