import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { MoviesGenres } from "../types/moviesGenres";
import type { MoviesList } from "../types/moviesList";
import type { ApiResponseMini } from "../types/miniInfoTypes";

export const useMovies = defineStore("MovieItem", () => {
  const moviesData = ref<ApiResponseMini>();
  const moviesLoading = ref(false);
  const moviesError = ref(false);

  const moviesGenresData = ref<MoviesGenres>();
  const moviesGenresLoading = ref(false);
  const moviesGenresError = ref(false);

  const moviesListData = ref<MoviesList>();
  const moviesListLoading = ref(false);
  const moviesListError = ref(false);

  const previousPage = ref<string[]>([]);
  const urlParams = ref(
    "/titles?limit=30&page=1"
  );

  const filterNullGenresData = computed(() => moviesGenresData.value?.results.filter( genre => genre !== null))

  function getDataMovies<T extends ApiResponseMini>(payload: T) {
    moviesLoading.value = false;
    moviesData.value = payload;
  }

  function isLoadingMovies() {
    moviesLoading.value = true;
  }

  function isErrorMovies() {
    moviesError.value = true;
  }

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

  function setPreviousPage(payload: string) {
    previousPage.value.unshift(payload);
  }
  function deletePreviousPage() {
    previousPage.value.splice(0, 1);
  }

  function deleteAllPreviousPages() {
    previousPage.value = [];
  }

  function setUrlParams(payload: string){
    urlParams.value += `${payload}`
  }

  return {
    moviesData,
    moviesLoading,
    moviesError,
    getDataMovies,
    isLoadingMovies,
    isErrorMovies,
    moviesGenresData,
    moviesGenresLoading,
    moviesGenresError,
    getDataMoviesGenres,
    isLoadingMoviesGenres,
    isErrorMoviesGenres,
    moviesListData,
    moviesListLoading,
    moviesListError,
    getDataMoviesList,
    isLoadingMoviesList,
    isErrorMoviesList,
    previousPage,
    setPreviousPage,
    deletePreviousPage,
    deleteAllPreviousPages,
    urlParams,
    setUrlParams,
    filterNullGenresData
  };
});
