from pydantic import BaseModel, Field


class User(BaseModel):
    username: str = Field(min_length=4)


class UserSchema(User):
    password: str = Field(min_length=10)


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None

