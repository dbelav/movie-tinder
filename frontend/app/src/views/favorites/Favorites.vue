<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useHttp } from '../../hooks/useHtpp';
import MovieCard from '../../components/movieCard/MovieCard.vue';
import { useStorage } from '@vueuse/core'
import { useFavoriteMovie } from '../../stores/favorites'
import { UseGetMovieData } from '../../hooks/UseGetMovieData'
import type { IMovie } from '../../types/miniInfoTypes'
import SignIn from '../../components/signIn/SignIn.vue';


const localStorageAccess = useStorage('access_token', '');
const localStorageRefresh = useStorage('refresh_token', '')
const favoritesStore = useFavoriteMovie()
const localStorage = useStorage('userId', '');

async function getMoviesById() {
    favoritesStore.favoriteMoviesIdsData?.favorites.forEach(item => {
        UseGetMovieData<IMovie>(`https://moviesdatabase.p.rapidapi.com/titles/${item.movie_id}`,
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
        <SignIn v-if="!localStorageAccess" />
        <div class="favoritesContainerInner" v-else>
            <h2 class="favoritesContainerTitle">Favorites</h2>
            <div class="favoritesContainerNoData" v-if="favoritesStore.favoriteMoviesIdsData?.favorites.length === 0">
                <span>No favorites data. Add to favorite movies</span>
            </div>
            <div class="favoritesContainerCards" v-else>
                <template v-for="item in favoritesStore.favoriteMoviesApiData" >
                    <MovieCard :dataMovie="item.results" />
                </template>
            </div>
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
        flex-direction: column;
        margin-top: 50px;

        .favoritesContainerTitle {
            color: #fff;
        }

        .favoritesContainerNoData {
            margin-top: 30px;

            span {
                color: #fff;
                font-size: 20px;
            }
        }

        .favoritesContainerCards{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
        }
    }
}
</style>