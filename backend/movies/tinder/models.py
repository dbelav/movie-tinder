from db.database import Base
from sqlalchemy import Column, Integer, ForeignKey, String
from sqlalchemy.schema import UniqueConstraint
from sqlalchemy.dialects.postgresql import UUID
import uuid


class Lobby(Base):
    __tablename__ = "lobbies"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True)
    owner_id = Column(Integer, ForeignKey("users.id"))
    film_api_url = Column(String)


class LobbyParticipant(Base):
    __tablename__ = "lobby_participant"

    id = Column(Integer, primary_key=True, index=True)

    lobby_id = Column(UUID(as_uuid=True), ForeignKey("lobbies.id"))

    user_id = Column(Integer, ForeignKey("users.id"))

    __table_args__ = (
        UniqueConstraint("user_id", "lobby_id"),
    )


class LobbyMovieMatch(Base):
    __tablename__ = "lobby_movie_matches"

    id = Column(Integer, primary_key=True, index=True)
    lobby_id = Column(UUID(as_uuid=True), ForeignKey("lobbies.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    movie_id = Column(String)

    __table_args__ = (
        UniqueConstraint("user_id", "lobby_id", "movie_id"),
    )

