import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { ApiResponseMini } from "../types/miniInfoTypes";
import type { MoviesGenres } from "../types/moviesGenres";
import type { MoviesList } from "../types/moviesList";

export const useTinder = defineStore("tinder", () => {
  const moviesGenresData = ref<MoviesGenres>();
  const moviesGenresLoading = ref(false);
  const moviesGenresError = ref(false);

  const moviesListData = ref<MoviesList>();
  const moviesListLoading = ref(false);
  const moviesListError = ref(false);

  const filterNullGenresData = computed(() => moviesGenresData.value?.results.filter( genre => genre !== null))


  function getDataMoviesGenres<T extends MoviesGenres>(payload: T) {
    moviesGenresLoading.value = false;
    moviesGenresData.value = payload;
  }

  function isLoadingMoviesGenres() {
    moviesGenresLoading.value = true;
  }

  function isErrorMoviesGenres() {
    moviesGenresError.value = true;
  }

  function getDataMoviesList<T extends MoviesList>(payload: T) {
    moviesListLoading.value = false;
    moviesListData.value = payload;
  }

  function isLoadingMoviesList() {
    moviesListLoading.value = true;
  }

  function isErrorMoviesList() {
    moviesListError.value = true;
  }

  return {
    moviesGenresData,
    moviesGenresLoading,
    moviesGenresError,
    moviesListData,
    moviesListLoading,
    moviesListError,
    filterNullGenresData,
    getDataMoviesGenres,
    isLoadingMoviesGenres,
    isErrorMoviesGenres,
    getDataMoviesList,
    isLoadingMoviesList,
    isErrorMoviesList,
  };
});
