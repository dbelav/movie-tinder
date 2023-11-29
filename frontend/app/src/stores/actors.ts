import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { ActorsApiResponse, ActorInfoResponce } from "../types/actorsPage";
import type {ApiResponsBase} from '../types/baseInfoTypes'

export const useActors = defineStore("Actors", () => {
  const actorsData = ref<ActorsApiResponse>();
  const actorsLoading = ref(false);
  const actorsError = ref(false);

  const actorInfoData = ref<ActorInfoResponce>();
  const actorInfoLoading = ref(false);
  const actorInfoError = ref(false);

  const actorTitlesData = ref<ActorInfoResponce>();
  const actorTitlesLoading = ref(false);
  const actorTitlesError = ref(false);


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

  function getDataActorInfo<T extends ActorInfoResponce>(payload: T) {
    actorInfoLoading.value = false;
    actorInfoData.value = payload;
  }

  function isLoadingActorInfo() {
    actorInfoLoading.value = true;
  }

  function isErrorActorInfo() {
    actorInfoError.value = true;
  }

  function getDataActorTitles<T extends ApiResponseMini>(payload: T) {
    actorTitlesLoading.value = false;
    actorTitlesData.value = payload;
  }

  function isLoadingActorTitles() {
    actorTitlesLoading.value = true;
  }

  function isErrorActorTitles() {
    actorTitlesError.value = true;
  }

  return {
    actorsData,
    actorsLoading,
    actorsError,
    getDataActors,
    isLoadingActors,
    isErrorActors,
    actorInfoData,
    actorInfoLoading,
    actorInfoError,
    getDataActorInfo,
    isLoadingActorInfo,
    isErrorActorInfo,
    actorTitlesData,
    actorTitlesLoading,
    actorTitlesError,
    getDataActorTitles,
    isLoadingActorTitles,
    isErrorActorTitles
  };
});
