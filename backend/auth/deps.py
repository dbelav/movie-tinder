from typing import Union, Any, Annotated
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from .auth import (
    ALGORITHM,
    JWT_SECRET_KEY
)
from jose import jwt, JWTError
from .schemas import TokenData, User
from .crud import UserCRUD

reuseable_oauth = OAuth2PasswordBearer(
    tokenUrl="/auth/login",
    scheme_name="JWT",

)


def get_current_user(token: Annotated[str, Depends(reuseable_oauth)]):
    user_crud = UserCRUD()
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = user_crud.get_user_by_username(token_data.username)
    if user is None:
        raise credentials_exception
    return user


def get_current_active_user(
    current_user: Annotated[User, Depends(get_current_user)]
):
    return current_user
