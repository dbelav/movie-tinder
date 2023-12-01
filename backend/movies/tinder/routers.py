from fastapi import APIRouter, status, Response, Body, Depends
from auth.deps import get_current_active_user
from auth.schemas import User
from typing import Annotated
from .crud import TinderCRUD
from .schemas import LobbyCreateSchema

router = APIRouter(
    prefix="/tinder",
    tags=["tinder"],
    responses={404: {"description": "Not found"}},
)


@router.post('/lobby/create', status_code=status.HTTP_201_CREATED)
def create_lobby(current_user: Annotated[User, Depends(get_current_active_user)], data: LobbyCreateSchema):
    crud = TinderCRUD()
    result = crud.create_lobby(user_id=current_user.id, film_api_url=data.film_api_url)

    return {
        "message": result["message"],
        "lobby_id": result["lobby"].id
    }
