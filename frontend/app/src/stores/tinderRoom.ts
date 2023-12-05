import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { ApiResponseMini } from "../types/miniInfoTypes";

export const usetinderRoom = defineStore("tinderRoom", () => {
  const tinderMovieData = ref<ApiResponseMini>();
  const tinderMovieDataLoading = ref(true);
  const tinderMovieDataError = ref(false);
  const tinderMovieMatch = ref()
  

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

  function tinderMovieMatchGetData(payload){
    tinderMovieMatch.value = payload
  }

  return {
    tinderMovieData,
    tinderMovieDataLoading,
    tinderMovieDataError,
    tinderMovieMatch,
    getData,
    dataLoading,
    dataError,
    tinderMovieMatchGetData
  };
});
