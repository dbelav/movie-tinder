import hashlib
from sqlalchemy.exc import IntegrityError
from db.database import SessionLocal
from .models import User


class UserCRUD:

    def __init__(self):
        self._session = SessionLocal()

    @staticmethod
    def hash_password(password):
        return hashlib.sha256(password.encode('utf-8')).hexdigest()

    def create_user(self, username, password):
        try:
            user = User(
                username=username,
                hashed_password=self.hash_password(password)
            )
            self._session.add(user)
            self._session.commit()
        except IntegrityError:
            return {
                "status": False,
                "message": "User already exists."
            }

        return {
            "status": True,
            "message": "User successfully created.",
            "instance": user,
        }

    def check_user_credentials(self, username, password):
        status = False
        user = self._session.query(User).filter_by(username=username).first()

        if user is not None:
            if self.hash_password(password) == user.hashed_password:
                status = True

        if status:
            return {
                "status": status,
                "message": "OK!",
                "instance": user,
            }
        else:
            return {
                "status": status,
                "message": "Wrong username or password.",
            }