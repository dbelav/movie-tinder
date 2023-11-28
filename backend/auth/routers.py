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
def register(user: UserSchema, response: Response):
    result = user_crud.create_user(user.username, user.password)
    if not result["status"]:
        response.status_code = status.HTTP_400_BAD_REQUEST
    return {"message": result["message"]}


@router.post("/login", status_code=status.HTTP_200_OK)
def login(user: UserSchema, response: Response):
    result = user_crud.check_user_credentials(user.username, user.password)
    if not result["status"]:
        response.status_code = status.HTTP_400_BAD_REQUEST

    return {"message": result["message"]}
