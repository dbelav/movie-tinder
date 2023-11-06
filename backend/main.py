from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/trending/")
def trending():
    return [
        {
            'id': 1,
            'title': 'Terminator',
            'year': 1984,
            'poster_url': 'https://m.media-amazon.com/images/I/61qCgQZyhOL.jpg',
            'rating': 7.8,
            'genres': [
                {'name': 'Sci-Fi', 'slug': 'scifi'},
                {'name': 'Thriller', 'slug': 'thriller'},
                {'name': 'Action', 'slug': 'action'},
                {'name': 'Apocalypse', 'slug': 'apocalypse'},
            ]
        },
        {
            'id': 1,
            'title': 'Terminator',
            'year': 1984,
            'poster_url': 'https://m.media-amazon.com/images/I/61qCgQZyhOL.jpg',
            'rating': 7.8,
            'genres': [
                {'name': 'Sci-Fi', 'slug': 'scifi'},
                {'name': 'Thriller', 'slug': 'thriller'},
                {'name': 'Action', 'slug': 'action'},
                {'name': 'Apocalypse', 'slug': 'apocalypse'},
            ]
        },
        {
            'id': 1,
            'title': 'Terminator',
            'year': 1984,
            'poster_url': 'https://m.media-amazon.com/images/I/61qCgQZyhOL.jpg',
            'rating': 7.8,
            'genres': [
                {'name': 'Sci-Fi', 'slug': 'scifi'},
                {'name': 'Thriller', 'slug': 'thriller'},
                {'name': 'Action', 'slug': 'action'},
                {'name': 'Apocalypse', 'slug': 'apocalypse'},
            ]
        },
        {
            'id': 1,
            'title': 'Terminator',
            'year': 1984,
            'poster_url': 'https://m.media-amazon.com/images/I/61qCgQZyhOL.jpg',
            'rating': 7.8,
            'genres': [
                {'name': 'Sci-Fi', 'slug': 'scifi'},
                {'name': 'Thriller', 'slug': 'thriller'},
                {'name': 'Action', 'slug': 'action'},
                {'name': 'Apocalypse', 'slug': 'apocalypse'},
            ]
        },
        {
            'id': 1,
            'title': 'Terminator',
            'year': 1984,
            'poster_url': 'https://m.media-amazon.com/images/I/61qCgQZyhOL.jpg',
            'rating': 7.8,
            'genres': [
                {'name': 'Sci-Fi', 'slug': 'scifi'},
                {'name': 'Thriller', 'slug': 'thriller'},
                {'name': 'Action', 'slug': 'action'},
                {'name': 'Apocalypse', 'slug': 'apocalypse'},
            ]
        },
        {
            'id': 1,
            'title': 'Terminator',
            'year': 1984,
            'poster_url': 'https://m.media-amazon.com/images/I/61qCgQZyhOL.jpg',
            'rating': 7.8,
            'genres': [
                {'name': 'Sci-Fi', 'slug': 'scifi'},
                {'name': 'Thriller', 'slug': 'thriller'},
                {'name': 'Action', 'slug': 'action'},
                {'name': 'Apocalypse', 'slug': 'apocalypse'},
            ]
        },
        {
            'id': 1,
            'title': 'Terminator',
            'year': 1984,
            'poster_url': 'https://m.media-amazon.com/images/I/61qCgQZyhOL.jpg',
            'rating': 7.8,
            'genres': [
                {'name': 'Sci-Fi', 'slug': 'scifi'},
                {'name': 'Thriller', 'slug': 'thriller'},
                {'name': 'Action', 'slug': 'action'},
                {'name': 'Apocalypse', 'slug': 'apocalypse'},
            ]
        },

    ]
