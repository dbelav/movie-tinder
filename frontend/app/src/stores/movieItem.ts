import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { ApiResponsBase } from "../types/baseInfoTypes";

export const useMovieItem = defineStore("MovieItem", () => {

  const currentIdMovie = ref<string>("");
  const movieItemData = ref<ApiResponsBase>()
  const movieItemLoading = ref(false)
  const movieItemError = ref(false)

  function addCurrentIdMovie(payload: string) {
    currentIdMovie.value = payload
  }

  function getDataMovieItem<T extends ApiResponsBase>(payload: T) {
    movieItemLoading.value = false;
    movieItemData.value = payload;
  }

  function isLoadingMovieItem() {
    movieItemLoading.value = true;
  }

  function isErrorMovieItem() {
    movieItemError.value = true;
  }

  return {
    currentIdMovie,
    movieItemData,
    movieItemLoading,
    movieItemError,
    addCurrentIdMovie,
    getDataMovieItem,
    isLoadingMovieItem,
    isErrorMovieItem
  };
});
