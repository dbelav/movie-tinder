import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { FavoritesApi } from "../types/favorites";
import type { ImovieIdApi } from "../types/miniInfoTypes";

export const useFavoriteMovie = defineStore("favorite", () => {
  const favoriteMoviesIdsData = ref<FavoritesApi>();
  const favoriteMoviesIdsLoading = ref(false);
  const favoriteMoviesIdsError = ref(false);

  const favoriteMoviesApiData = ref<ImovieIdApi[]>([]);
  const favoriteMoviesApiLoading = ref(false);
  const favoriteMoviesApiError = ref(false);

  function getFavoriteMovieIds(payload: FavoritesApi) {
    favoriteMoviesIdsLoading.value = false;
    favoriteMoviesIdsData.value = payload;
  }

  function loadingFavoriteMovieIds() {
    favoriteMoviesIdsLoading.value = true;
  }

  function errorFavoriteMovieIds() {
    favoriteMoviesIdsError.value = true;
  }

  function getFavoriteMovieIdApi(payload: ImovieIdApi) {
    favoriteMoviesApiLoading.value = false;
    favoriteMoviesApiData.value.push(payload);
  }

  function loadingFavoriteMovieIdApi() {
    favoriteMoviesApiLoading.value = true;
  }

  function errorFavoriteMovieIdApi() {
    favoriteMoviesApiError.value = true;
  }

  return {
    favoriteMoviesIdsData,
    favoriteMoviesIdsLoading,
    favoriteMoviesIdsError,
    getFavoriteMovieIds,
    loadingFavoriteMovieIds,
    errorFavoriteMovieIds,
    favoriteMoviesApiData,
    favoriteMoviesApiLoading,
    favoriteMoviesApiError,
    getFavoriteMovieIdApi,
    loadingFavoriteMovieIdApi,
    errorFavoriteMovieIdApi,
  };
});
