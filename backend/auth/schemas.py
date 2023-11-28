from pydantic import BaseModel, Field


class UserSchema(BaseModel):
    username: str = Field(min_length=4)
    password: str = Field(min_length=10)
