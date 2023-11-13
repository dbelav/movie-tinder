<script setup lang="ts">
import { useMovieItem } from '../../stores/movieItem';
import { onMounted } from 'vue'
import { ApiResponsBase } from '../../types/baseInfoTypes';
import { useHttp } from '../../hooks/useHtpp'
import MovieItemInfo from '../../components/movieItemInfo/MovieItemInfo.vue'
import { useStorage } from '@vueuse/core'
import type { Actors } from '../../types/actorsCast'



const movieStore = useMovieItem()

const { request } = useHttp()

const storage = useStorage('currentIdMovie', '');



onMounted(async () => {
    movieStore.isLoadingMovieItem()

    const response = await request(`https://moviesdatabase.p.rapidapi.com/titles/${storage.value}?info=base_info`) as Promise<ApiResponsBase>

    if ((await response).results) {
        movieStore.getDataMovieItem(await response)
    } else {
        movieStore.isErrorMovieItem()
    }
})

onMounted(async () => {
    movieStore.isLoadingActorsMovie()

    const response = await request(`https://moviesdatabase.p.rapidapi.com/titles/${storage.value}?info=extendedCast`) as Promise<Actors>
    if ((await response).results) {
        movieStore.getActorsMovie(await response)
    } else {
        movieStore.isErrorActorsMovie()
    }
})
</script>

<template>
    <div class="movieItemContainer" v-if="!movieStore.movieItemLoading">
        <div class="movieItemContainerImage">
            <img v-if="movieStore.movieItemData" :src="movieStore.movieItemData.results.primaryImage?.url" alt="">
        </div>
        <MovieItemInfo v-if="movieStore.movieItemData" :actorsData="movieStore.actorsMovieData" :movieData="movieStore.movieItemData" />
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