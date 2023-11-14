<script setup lang="ts">
import { useMovieItem } from '../../stores/movieItem';
import { onMounted } from 'vue'
import { ApiResponsBase } from '../../types/baseInfoTypes';
import MovieItemInfo from '../../components/movieItemInfo/MovieItemInfo.vue'
import { useStorage } from '@vueuse/core'
import type { Actors } from '../../types/actorsCast'
import type { BudgetMovie } from "../../types/budget";
import type {Directors} from '../../types/directors'
import { UseGetMovie } from '../../hooks/UseGetMovie';



const movieStore = useMovieItem()

const storage = useStorage('currentIdMovie', '');

onMounted(async () => {
    await UseGetMovie<ApiResponsBase>(`https://moviesdatabase.p.rapidapi.com/titles/${storage.value}?info=base_info`,
        movieStore.isLoadingMovieItem,
        movieStore.getDataMovieItem,
        movieStore.isErrorMovieItem)
})

onMounted(async () => {
    await UseGetMovie<Actors>(`https://moviesdatabase.p.rapidapi.com/titles/${storage.value}?info=extendedCast`,
        movieStore.isLoadingActorsMovie,
        movieStore.getActorsMovie,
        movieStore.isErrorActorsMovie)
})

onMounted(async () => {
    await UseGetMovie<BudgetMovie>(`https://moviesdatabase.p.rapidapi.com/titles/${storage.value}?info=revenue_budget`,
        movieStore.isLoadingBudgetMovie,
        movieStore.getBudgetMovie,
        movieStore.isErrorBudgetMovie)
})

onMounted(async () => {
    await UseGetMovie<Directors>(`https://moviesdatabase.p.rapidapi.com/titles/${storage.value}?info=creators_directors_writers`,
        movieStore.isLoadingDirectorsMovie,
        movieStore.getDirectorsMovie,
        movieStore.isErrorDirectorsMovie)
})


</script>

<template>
    <div class="movieItemContainer" v-if="!movieStore.movieItemLoading">
        <div class="movieItemContainerImage">
            <img v-if="movieStore.movieItemData" :src="movieStore.movieItemData.results.primaryImage?.url" alt="">
        </div>
        <MovieItemInfo v-if="movieStore.movieItemData" :actorsData="movieStore.actorsMovieData"
            :movieData="movieStore.movieItemData" />
    </div>
</template>

<style scoped lang="scss">
.movieItemContainer {
    height: 100vh;
    padding-top: 100px;
    display: flex;
    justify-content: center;
    padding-left: 50px;
    padding-right: 50px;

    .movieItemContainerImage {
        width: 30%;

        img {
            width: 100%;
        }
    }
}
</style>