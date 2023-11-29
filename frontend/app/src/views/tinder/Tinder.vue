<script setup lang="ts">
// import { useHttp } from '../../hooks/useHtpp'
import MovieCard from '../../components/movieCard/MovieCard.vue'
import { UseGetMovieData } from '../../hooks/UseGetMovieData'
import { onMounted, ref } from 'vue'
import { useTinder } from '../../stores/tinder'
import vSelect from "vue-select";
import type { MoviesGenres } from '../../types/moviesGenres'
import type { MoviesList } from '../../types/moviesList'
import "vue-select/dist/vue-select.css";

// const { request } = useHttp()
interface FilterParamsInner {
    name: string,
    url: string,
    value: string
}
type FilterParams = {
    [key: string]: FilterParamsInner;
};


const store = useTinder()

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

const filterParams = ref<FilterParams>({
    searchFromYear: {
        name: 'From Year',
        url: 'startYear=',
        value: ''
    },
    currentGenreSearch: {
        name: 'By Genre',
        url: 'genre=',
        value: ''
    },
    currentListSearch: {
        name: 'By List',
        url: 'list=',
        value: ''
    }
});

async function searchByParams(urlApi: string) {
    let urlParams = ''

    for (const key in filterParams.value) {
        const item = filterParams.value[key]
        if (item.value) {
            urlParams += `&${item.url}${item.value}`
        }
    }
console.log(urlParams)

}

</script>

<template>
    <div class="tinderContainer" v-if="store.moviesGenresData && store.moviesListData">
        <div class="tinderContainerInner">
            <h2>Select options</h2>
            <form class="tinderSelect" @submit.prevent>

                <div class="movieSortingDropDownList">
                    <v-select v-model="filterParams.currentGenreSearch.value" :options="store.filterNullGenresData"
                        placeholder="Select Genre" label="name"></v-select>
                </div>
                <div class="movieSortingDropDownList">
                    <v-select v-model="filterParams.currentListSearch.value" :options="store.moviesListData.results"
                        label="label" placeholder="Select List Item"></v-select>
                </div>
                <div class="tinderSelectYear">
                    <input placeholder="Select Year" v-model="filterParams.searchFromYear.value">
                </div>
                <div class="tinderCreateRoom">
                    <button class="movieSortingButton" @click="searchByParams">Create Room</button>
                </div>
            </form>
        </div>
    </div>
</template>

<style lang="scss">
.tinderContainer {
    width: 100%;
    display: flex;
    justify-content: center;

    .tinderContainerInner {
        width: 90%;

        h2 {
            color: #fff;
        }

        .tinderSelect {
            width: 100%;
            display: flex;
            justify-content: center;
            display: flex;
            flex-wrap: wrap;

            .tinderSelectYear {
                width: 30%;

                input {
                    height: 30px;
                    background-color: #31303b;
                    border: 1px solid #ffffff3d;
                    border-radius: 8px;
                    padding: 26px;
                    font-size: 18px;
                    color: #fff;
                    width: 100%;
                    box-sizing: border-box;

                    &::placeholder {
                        color: #fff;
                    }

                }
            }

            .tinderCreateRoom{
                width: 100%;
                display: flex;
                justify-content: center;
                margin-top: 50px;

                .movieSortingButton {
                    height: 50px;
                    background-color: #31303b;
                    color: #fff;
                    font-size: 19px;
                    font-weight: 600;
                    border: none;
                    border-radius: 7px;
                    cursor: pointer;
                    padding: 0 15px;
                }
            }

            .movieSortingDropDownList {
                width: 40%;
                margin: 30px;

                .vs__dropdown-toggle {
                    background-color: #31303b;
                    border: 1px solid #ffffff3d;
                    border-radius: 8px;
                    cursor: pointer;
                    padding: 10px;
                    font-size: 18px;
                }

                .vs__selected {
                    color: #fff;
                }

                .vs__open-indicator {
                    fill: #fff;
                }

                .vs__dropdown-menu {
                    background-color: #31303b;
                    border: 1px solid #ffffff3d;
                    border-radius: 8px;
                    color: #fff;
                    font-size: 18px;
                }

                .vs__search {
                    color: #fff;
                    font-size: 18px;
                }

                .vs__option {
                    padding: 10px;
                    cursor: pointer;

                    &:hover {
                        background-color: #444;
                    }
                }
            }

        }
    }
}
</style>

