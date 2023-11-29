from pydantic import BaseModel, Field


class Favorite(BaseModel):
    username: str = Field(min_length=4)
    password: str = Field(min_length=10)