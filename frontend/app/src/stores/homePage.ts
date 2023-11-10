import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { ApiResponse } from "../types/types";

export const useHomePageStore = defineStore("homePage", () => {
  const trendingData = ref<ApiResponse>();
  const trendingDataLoading = ref(false);
  const trendingDataError = ref(false);

  function getData<T extends ApiResponse>(payload: T) {
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
