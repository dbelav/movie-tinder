<script setup lang="ts">
import { onMounted } from 'vue'
import { useMovies } from '../../stores/movies'
import { UseGetMovieData } from '../../hooks/UseGetMovieData'
import MovieSorting from '../../components/movieSorting/MovieSorting.vue'
import type { MoviesGenres } from '../../types/moviesGenres'
import type { MoviesList } from '../../types/moviesList'


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
})


</script>

<template>
    <div class="listMoviesContainer">
        <div class="listMoviesContainerInner">
            <MovieSorting />

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


    }
}
</style>