from pydantic import BaseModel, Field

class BaseUser(BaseModel):
    username: str = Field(min_length=4)

class User(BaseUser):
    id: int


class UserSchema(BaseUser):
    password: str = Field(min_length=10)


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None

