from sqlalchemy.exc import IntegrityError
from sqlalchemy import func
from db.database import SessionLocal
from .models import Lobby, LobbyParticipant, LobbyMovieMatch


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
        lobby = self._session.query(Lobby).filter_by(id=lobby_id).first()
        response = {
            "status": False,
            "message": "User already in lobby",
            "film_api_url": lobby.film_api_url,
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

    def create_movie_match(self, user_id, lobby_id, movie_id):
        response = {
            "status": False,
        }
        try:
            match = LobbyMovieMatch(user_id=user_id, lobby_id=lobby_id, movie_id=movie_id)
            self._session.add(match)
            self._session.commit()
            response["status"] = True
        except:
            pass

        return response

    def is_match(self, lobby_id):
        match = False
        movie_id = None
        matches = self._session.query(LobbyMovieMatch).filter_by(lobby_id=lobby_id)
        matches = matches.with_entities(LobbyMovieMatch.movie_id, func.count(LobbyMovieMatch.movie_id)).group_by(LobbyMovieMatch.movie_id).all()

        for i in matches:
            if i[1] > 1:
                match = True
                movie_id = i[0]

        return {"match": match, "movie_id": movie_id}
