from sqlalchemy.exc import IntegrityError
from db.database import SessionLocal
from .models import Favorites


class MoviesCRUD:

    def __init__(self):
        self._session = SessionLocal()

    def create_favorite(self, user_id, movie_id):
        try:
            favorite = Favorites(user_id=user_id, movie_id=movie_id)
            self._session.add(favorite)
            self._session.commit()
        except IntegrityError:
            return {
                "status": False,
                "message": "Already in favorites"
            }
        return {
            "status": True,
            "message": "OK!",
            "instance": favorite,
        }

    def get_favorites_by_user_id(self, user_id):
        favorites = self._session.query(Favorites).filter_by(user_id=user_id).all()

        return {
            "status": True,
            "message": "OK!",
            "instance": favorites
        }

    def delete_favorite(self, user_id, movie_id):
        favorite = self._session.query(Favorites).filter_by(user_id=user_id, movie_id=movie_id).delete()
        self._session.commit()

        return {
            "status": True,
            "message": "OK!",
        }
