from pydantic import BaseModel


class LobbyCreateSchema(BaseModel):
    film_api_url: str
