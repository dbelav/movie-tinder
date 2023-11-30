interface FavoriteItem {
  user_id: number;
  movie_id: string;
  id: number;
}

export interface FavoritesApi {
  message: string;
  favorites: FavoriteItem[];
}
