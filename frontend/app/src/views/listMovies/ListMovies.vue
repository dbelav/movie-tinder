<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useMovies } from '../../stores/movies'
import { UseGetMovieData } from '../../hooks/UseGetMovieData'
import MovieSorting from '../../components/movieSorting/MovieSorting.vue'
import MovieCard from '../../components/movieCard/MovieCard.vue'
import type { MoviesGenres } from '../../types/moviesGenres'
import type { MoviesList } from '../../types/moviesList'
import type { ApiResponseMini } from '../../types/miniInfoTypes'


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

onMounted(async () => {

    await UseGetMovieData<ApiResponseMini>(`${store.BASE_API_URL}${store.urlParams}`,
        store.isLoadingMovies,
        store.getDataMovies,
        store.isErrorMovies
    )
    store.setPreviousPage(store.urlParams)
})


async function clickNextPage() {
    store.setPreviousPage(store.moviesData?.next)

    await UseGetMovieData<ApiResponseMini>(`${store.BASE_API_URL}${store.moviesData?.next}`,
        store.isLoadingMovies,
        store.getDataMovies,
        store.isErrorMovies
    )
}

async function clickPreviousPage() {
    await UseGetMovieData<ApiResponseMini>(`${store.BASE_API_URL}${store.previousPage[1]}`,
        store.isLoadingMovies,
        store.getDataMovies,
        store.isErrorMovies
    )
    store.deletePreviousPage()
}
</script>

<template>
    <div class="listMoviesContainer">
        <div class="listMoviesContainerInner">
            <MovieSorting />
            <div class="listMovies">
                <template v-for="movie in store.moviesData?.results">
                    <MovieCard :dataMovie="movie" width="26%" />
                </template>

            </div>
            <div class="listMoviesPagination">
                <button @click="clickPreviousPage">Previous</button>
                <button @click="clickNextPage">Next</button>
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

        .listMoviesPagination {
            display: flex;
            justify-content: center;

            button {
                height: 45px;
                width: 110px;
                background-color: rgba(66, 66, 66, 0.671);
                color: #fff;
                font-size: 16px;
                border: none;
                border-radius: 7px;
                cursor: pointer;
                padding: 0 10px;
                margin: 30px 5px;
            }
        }
    }
}
</style>