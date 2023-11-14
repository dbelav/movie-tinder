import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { ActorsApiResponse } from "../types/actorsPage";


export const useActors = defineStore("Actors", () => {

    const actorsData = ref<ActorsApiResponse>();
    const actorsLoading = ref(false);
    const actorsError = ref(false);

    function getDataActors<T extends ActorsApiResponse>(payload: T) {
        actorsLoading.value = false;
        actorsData.value = payload;
      }
    
      function isLoadingActors() {
        actorsLoading.value = true;
      }
    
      function isErrorActors() {
        actorsError.value = true;
      }

      return{
        actorsData,
        actorsLoading,
        actorsError,
        getDataActors,
        isLoadingActors,
        isErrorActors
      }
})