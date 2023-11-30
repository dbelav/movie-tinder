from db.database import Base
from sqlalchemy import Column, Integer, ForeignKey, String
from sqlalchemy.orm import relationship
from sqlalchemy.schema import UniqueConstraint


class Favorites(Base):
    __tablename__ = "favorites"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="favorites")
    movie_id = Column(String)

    __table_args__ = (
        UniqueConstraint("user_id", "movie_id"),
    )
