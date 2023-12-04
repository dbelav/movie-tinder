<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useHttp } from '../../hooks/useHtpp';
import MovieCard from '../../components/movieCard/MovieCard.vue';
import { useStorage } from '@vueuse/core'
import { useFavoriteMovie } from '../../stores/favorites'
import { UseGetMovieData } from '../../hooks/UseGetMovieData'
import type { Imovie } from '../../types/miniInfoTypes'
import SignIn from '../../components/signIn/SignIn.vue';


const localStorageAccess = useStorage('access_token', '');
const localStorageRefresh = useStorage('refresh_token', '')
const favoritesStore = useFavoriteMovie()
const localStorage = useStorage('userId', '');

async function getMoviesById() {
    favoritesStore.favoriteMoviesIdsData?.favorites.forEach(item => {
        UseGetMovieData<Imovie>(`https://moviesdatabase.p.rapidapi.com/titles/${item.movie_id}`,
            favoritesStore.loadingFavoriteMovieIdApi,
            favoritesStore.getFavoriteMovieIdApi,
            favoritesStore.errorFavoriteMovieIdApi)
    })
}
onMounted(() => {
    favoritesStore.favoriteMovieIdApiClear()
    getMoviesById()
})

watch(() => favoritesStore.favoriteMoviesIdsData, async () => {
    favoritesStore.favoriteMovieIdApiClear()
    await getMoviesById();
})
</script>

<template v-if="favoritesStore.favoriteMoviesIdsData">
    <div class="favoritesContainer">
        <div class="favoritesContainerInner">
            <SignIn v-if="!localStorageAccess"/>
            <template v-for="item in favoritesStore.favoriteMoviesApiData" v-else>
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
        display: flex;
    }
}
</style>