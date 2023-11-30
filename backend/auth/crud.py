from sqlalchemy.exc import IntegrityError
from db.database import SessionLocal
from .models import User
from passlib.context import CryptContext


class UserCRUD:

    def __init__(self):
        self._session = SessionLocal()
        self.password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    def get_hashed_password(self, password: str) -> str:
        return self.password_context.hash(password)

    def verify_password(self, password: str, hashed_pass: str) -> bool:
        return self.password_context.verify(password, hashed_pass)

    def create_user(self, username, password):
        try:
            user = User(
                username=username,
                hashed_password=self.get_hashed_password(password)
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
            if self.verify_password(password, user.hashed_password):
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