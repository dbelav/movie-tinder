import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { IMovie } from "../types/types";

export const useFavouriteMovie = defineStore("homePage", () => {
  const favouriteMovies = ref<IMovie[]>([]);

  function addFaviuriteMovie<T extends IMovie>(payload: T) {
    favouriteMovies.value.push(payload);
  }

  function deleteFavouritsMovie() {
    
  }

  return{
    favouriteMovies,
    addFaviuriteMovie,
    deleteFavouritsMovie
  }
});
