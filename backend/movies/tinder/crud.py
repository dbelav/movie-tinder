from sqlalchemy.exc import IntegrityError
from db.database import SessionLocal
from .models import Lobby, LobbyParticipant


class TinderCRUD:

    def __init__(self):
        self._session = SessionLocal()

    def create_lobby(self, user_id, film_api_url):
        lobby = Lobby(owner_id=user_id, film_api_url=film_api_url)
        self._session.add(lobby)
        self._session.flush()
        owner_as_participant = LobbyParticipant(lobby_id=lobby.id, user_id=user_id)
        self._session.add(owner_as_participant)
        self._session.commit()

        return {
            "status": True,
            "message": "OK!",
            "lobby": lobby
        }

    def create_lobby_participant(self, user_id, lobby_id, commit=True):
        response = {
            "status": False,
            "message": "User already in lobby",
        }
        try:
            lp = LobbyParticipant(lobby_id=lobby_id, user_id=user_id)
            self._session.add(lp)
            if commit:
                self._session.commit()
            response["status"] = True
            response["message"] = "OK!"
            response["lp"] = lp.__dict__
        except IntegrityError:
            pass

        return response
