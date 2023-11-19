<script setup lang="ts">
import { onMounted } from 'vue'
import { useMovies } from '../../stores/movies'
import { UseGetMovieData } from '../../hooks/UseGetMovieData'
import MovieSorting from '../../components/movieSorting/MovieSorting.vue'
import MovieCard from '../../components/movieCard/MovieCard.vue'
import type { MoviesGenres } from '../../types/moviesGenres'
import type { MoviesList } from '../../types/moviesList'
import type { ApiResponseMini } from '../../types/miniInfoTypes'
import { useHttp } from '../../hooks/useHtpp'


const store = useMovies()

onMounted(async () => {
    await UseGetMovieData<MoviesGenres>('https://moviesdatabase.p.rapidapi.com/titles/utils/genres',
        store.isLoadingMoviesGenres,
        store.getDataMoviesGenres,
        store.isErrorMoviesGenres
    )
    await UseGetMovieData<MoviesList>('https://moviesdatabase.p.rapidapi.com/titles/utils/lists',
        store.isLoadingMoviesList,
        store.getDataMoviesList,
        store.isErrorMoviesList
    )

    // await UseGetMovieData<ApiResponseMini>('https://moviesdatabase.p.rapidapi.com/titles?list=top_boxoffice_200&startYear=1990&limit=30',
        await UseGetMovieData<ApiResponseMini>('https://moviesdatabase.p.rapidapi.com/titles?list=&startYear=&limit=15',
        store.isLoadingMovies,
        store.getDataMovies,
        store.isErrorMovies
    )
})


</script>

<template>
    <div class="listMoviesContainer">
        <div class="listMoviesContainerInner">
            <MovieSorting />
            <div class="listMovies">
                <template v-for="movie in store.moviesData?.results">
                    <MovieCard :dataMovie="movie" width="22%" />
                </template>

            </div>
        </div>
    </div>
</template>

<style lang="scss">
.listMoviesContainer {
    min-height: 100vh;
    width: 100%;
    padding-top: 100px;
    display: flex;
    justify-content: center;

    .listMoviesContainerInner {
        width: 90%;

        .listMovies {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
        }
    }
}
</style>