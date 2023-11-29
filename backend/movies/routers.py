from fastapi import APIRouter, status, Response
from .crud import MoviesCRUD


router = APIRouter(
    prefix="/movies",
    tags=["movies"],
    responses={404: {"description": "Not found"}},
)


@router.get("/favorites/", status_code=status.HTTP_200_OK)
def favorites(user_id: int, response: Response):
    movies_crud = MoviesCRUD()
    result = movies_crud.get_favorites_by_user_id(user_id=user_id)
    if not result["status"]:
        response.status_code = status.HTTP_400_BAD_REQUEST
    return {"message": result["message"], "favorites": result["instance"]}


@router.post("/favorites/", status_code=status.HTTP_201_CREATED)
def favorites(user_id: int, movie_id: int, response: Response):
    movies_crud = MoviesCRUD()
    result = movies_crud.create_favorite(user_id, movie_id)
    if not result["status"]:
        response.status_code = status.HTTP_400_BAD_REQUEST
    return {"message": result["message"]}


@router.delete("/favorites/")
def favorites(user_id: int, movie_id: int, response: Response):
    movies_crud = MoviesCRUD()
    result = movies_crud.delete_favorite(user_id, movie_id)
    if not result["status"]:
        response.status_code = status.HTTP_400_BAD_REQUEST
    return {"message": result["message"]}
