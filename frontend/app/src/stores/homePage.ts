import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { IMovie } from "../types/types";

export const useHomePageStore = defineStore("homePage", () => {
  const trendingData = ref<IMovie[]>([]);
  const trendingDataLoading = ref(false);
  const trendingDataError = ref(false);

  function getData<T extends IMovie[]>(payload: T) {
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
