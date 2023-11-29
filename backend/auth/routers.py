from fastapi import APIRouter, status, Response
from .crud import UserCRUD
from .schemas import UserSchema


router = APIRouter(
    prefix="/auth",
    tags=["auth"],
    responses={404: {"description": "Not found"}},
)
user_crud = UserCRUD()


@router.post("/register", status_code=status.HTTP_201_CREATED)
def register(username: str, password: str, response: Response):
    result = user_crud.create_user(username, password)
    if not result["status"]:
        response.status_code = status.HTTP_400_BAD_REQUEST
    return {
        "message": result["message"],
        "user_id": result["instance"].id,
        "username": result["instance"].username,
    }


@router.post("/login", status_code=status.HTTP_200_OK)
def login(username: str, password: str, response: Response):
    result = user_crud.check_user_credentials(username, password)
    if not result["status"]:
        response.status_code = status.HTTP_400_BAD_REQUEST

    return {
        "message": result["message"],
        "user_id": result["instance"].id,
        "username": result["instance"].username,
    }
