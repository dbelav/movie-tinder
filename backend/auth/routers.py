from fastapi import APIRouter, status, Response
from .crud import UserCRUD
from .schemas import UserSchema
from .auth import create_access_token, create_refresh_token


router = APIRouter(
    prefix="/auth",
    tags=["auth"],
    responses={404: {"description": "Not found"}},
)


@router.post("/register", status_code=status.HTTP_201_CREATED)
def register(user: UserSchema, response: Response):
    user_crud = UserCRUD()
    result = user_crud.create_user(user.username, user.password)
    if not result["status"]:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"message": result["message"]}
    return {
        "message": result["message"],
        "user_id": result["instance"].id,
        "username": result["instance"].username,
    }


@router.post("/login", status_code=status.HTTP_200_OK)
def login(user: UserSchema, response: Response):
    user_crud = UserCRUD()
    result = user_crud.check_user_credentials(user.username, user.password)
    if not result["status"]:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {
            "message": result["message"]
        }

    return {
        "message": result["message"],
        "access_token": create_access_token(result["instance"].username),
        "refresh_token": create_refresh_token(result["instance"].username),
    }
