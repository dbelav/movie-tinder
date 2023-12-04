import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { ApiResponseMini } from "../types/miniInfoTypes";

export const useHomePageStore = defineStore("tinderRoom", () => {
  const tinderMovieData = ref<ApiResponseMini>();
  const tinderMovieDataLoading = ref(true);
  const tinderMovieDataError = ref(false);

  function getData<T extends ApiResponseMini>(payload: T) {
    tinderMovieDataLoading.value = false;
    tinderMovieData.value = payload;
  }

  function dataLoading() {
    tinderMovieDataLoading.value = true;
  }

  function dataError() {
    tinderMovieDataError.value = true;
  }

  return {
    tinderMovieData,
    tinderMovieDataLoading,
    tinderMovieDataError,
    getData,
    dataLoading,
    dataError
  };
});
