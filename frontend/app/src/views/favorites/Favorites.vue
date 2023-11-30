<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useHttp } from '../../hooks/useHtpp';
import MovieCard from '../../components/movieCard/MovieCard.vue';
import { useStorage } from '@vueuse/core'
import { useFavoriteMovie } from '../../stores/favorites'
import { UseGetMovieData } from '../../hooks/UseGetMovieData'
import type { Imovie } from '../../types/miniInfoTypes'

const { request } = useHttp()
const favoritesStore = useFavoriteMovie()
const localStorage = useStorage('userId', '');

async function getMoviesById() {
    favoritesStore.favoriteMoviesIdsData?.favorites.forEach(item => {
        console.log(item)
        UseGetMovieData<Imovie>(`https://moviesdatabase.p.rapidapi.com/titles/${item.movie_id}`,
            favoritesStore.loadingFavoriteMovieIdApi,
            favoritesStore.getFavoriteMovieIdApi,
            favoritesStore.errorFavoriteMovieIdApi)
    })
    console.log(favoritesStore.favoriteMoviesApiData)
}
</script>

<template v-if="favoritesStore.favoriteMoviesIdsData">
    <div class="favoritesContainer">
        {{ getMoviesById() }}
        <div class="favoritesContainerInner">
            <template v-for="item in favoritesStore.favoriteMoviesApiData">
                <MovieCard :dataMovie="item.results" />
            </template>
        </div>

    </div>
</template>

<style lang="scss">
.favoritesContainer {
    width: 100%;
    display: flex;
    justify-content: center;

    .favoritesContainerInner {
        width: 90%;
    }
}
</style>