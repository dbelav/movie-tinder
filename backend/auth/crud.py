from db.database import SessionLocal


class UserCRUD:

    def __init__(self):
        self._session = SessionLocal()
