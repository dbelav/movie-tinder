from fastapi import APIRouter, status, Depends, WebSocket, WebSocketDisconnect
from auth.deps import get_current_active_user
from auth.schemas import User
from typing import Annotated
from .crud import TinderCRUD
from .schemas import LobbyCreateSchema
from uuid import UUID
from ws.manager import ConnectionManager
import json
from json import JSONDecodeError

router = APIRouter(
    prefix="/tinder",
    tags=["tinder"],
    responses={404: {"description": "Not found"}},
)

ws_manager = ConnectionManager()


@router.post('/lobby/create', status_code=status.HTTP_201_CREATED)
def create_lobby(current_user: Annotated[User, Depends(get_current_active_user)], data: LobbyCreateSchema):
    crud = TinderCRUD()
    result = crud.create_lobby(user_id=current_user.id, film_api_url=data.film_api_url)

    return {
        "message": result["message"],
        "lobby_id": result["lobby"].id
    }

@router.get('/lobby/{lobby_id}/join', status_code=status.HTTP_200_OK)
def join_lobby(current_user: Annotated[User, Depends(get_current_active_user)], lobby_id: UUID):
    crud = TinderCRUD()
    result = crud.create_lobby_participant(user_id=current_user.id, lobby_id=lobby_id)

    return {
        "message": result["message"],
        "lp": result.get("lp")
    }

#
@router.websocket("/lobby/{lobby_id}")
async def lobby_tinder(websocket: WebSocket, lobby_id: UUID):
    await ws_manager.connect(websocket)
    expected_keys = ['user_id', 'movie_id']
    crud = TinderCRUD()
    try:
        while True:
            data = await websocket.receive_text()
            data_json = json.loads(data)
            try:
                if all(data_json.get(i, False) for i in expected_keys):
                    result = crud.is_match(lobby_id)
                    if result["match"]:
                        await ws_manager.broadcast(f"{result['movie_id']}")
                        ws_manager.disconnect_all()
                    crud.create_movie_match(
                        data_json["user_id"],
                        lobby_id,
                        data_json["movie_id"]
                    )
                    result = crud.is_match(lobby_id)
                    if result["match"]:
                        await ws_manager.broadcast(f"{result['movie_id']}")
                        ws_manager.disconnect_all()
            except TypeError:
                pass
    except (WebSocketDisconnect):
        ws_manager.disconnect(websocket)
