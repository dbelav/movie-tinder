import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { ApiResponseMini } from "../types/miniInfoTypes";

export const useHomePageStore = defineStore("homePage", () => {
  const trendingData = ref<ApiResponseMini>();
  const trendingDataLoading = ref(false);
  const trendingDataError = ref(false);

  function getData<T extends ApiResponseMini>(payload: T) {
    trendingDataLoading.value = false;
    trendingData.value = payload;
  }

  function dataLoading() {
    trendingDataLoading.value = true;
  }

  function dataError() {
    trendingDataError.value = true;
  }

  return {
    trendingData,
    trendingDataLoading,
    trendingDataError,
    getData,
    dataLoading,
    dataError,
  };
});
