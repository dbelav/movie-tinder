import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { ApiResponsBase } from "../types/baseInfoTypes";
import type { Actors } from "../types/actorsCast";
import type { BudgetMovie } from "../types/budget";
import type { Directors } from "../types/directors";


export const useMovieItem = defineStore("Movie", () => {
  const currentIdMovie = ref<string>("");
  
  const movieItemData = ref<ApiResponsBase>();
  const movieItemLoading = ref(false);
  const movieItemError = ref(false);

  const actorsMovieData = ref<Actors>();
  const actorsMovieLoading = ref(false);
  const actorsMovieError = ref(false);

  const budgetMovieData = ref<BudgetMovie>();
  const budgetMovieLoading = ref(false);
  const budgetMovieError = ref(false);

  const directorsMovieData = ref<Directors>();
  const directorsMovieLoading = ref(false);
  const directorsMovieError = ref(false);

  const get6Actors = computed(() =>
    actorsMovieData.value?.results.cast.edges.splice(0, 6)
  );

  function addCurrentIdMovie(payload: string) {
    currentIdMovie.value = payload;
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

  function getActorsMovie<T extends Actors>(payload: T) {
    actorsMovieLoading.value = false;
    actorsMovieData.value = payload;
  }

  function isLoadingActorsMovie() {
    actorsMovieLoading.value = true;
  }

  function isErrorActorsMovie() {
    actorsMovieError.value = true;
  }

  function getBudgetMovie<T extends BudgetMovie>(payload: T) {
    budgetMovieLoading.value = false;
    budgetMovieData.value = payload;
  }

  function isLoadingBudgetMovie() {
    budgetMovieLoading.value = true;
  }

  function isErrorBudgetMovie() {
    budgetMovieError.value = true;
  }

  function getDirectorsMovie<T extends Directors>(payload: T) {
    directorsMovieLoading.value = false;
    directorsMovieData.value = payload;
  }

  function isLoadingDirectorsMovie() {
    directorsMovieLoading.value = true;
  }

  function isErrorDirectorsMovie() {
    directorsMovieError.value = true;
  }

  return {
    currentIdMovie,
    movieItemData,
    movieItemLoading,
    movieItemError,
    addCurrentIdMovie,
    getDataMovieItem,
    isLoadingMovieItem,
    isErrorMovieItem,
    actorsMovieData,
    actorsMovieLoading,
    actorsMovieError,
    getActorsMovie,
    isLoadingActorsMovie,
    isErrorActorsMovie,
    get6Actors,
    budgetMovieData,
    budgetMovieLoading,
    budgetMovieError,
    getBudgetMovie,
    isLoadingBudgetMovie,
    isErrorBudgetMovie,
    directorsMovieData,
    directorsMovieLoading,
    directorsMovieError,
    getDirectorsMovie,
    isLoadingDirectorsMovie,
    isErrorDirectorsMovie
  };
});
