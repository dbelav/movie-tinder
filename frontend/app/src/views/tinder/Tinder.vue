<script setup lang="ts">
import SignIn from '../../components/signIn/SignIn.vue'
import { useHttp } from '../../hooks/useHtpp'
import { UseGetMovieData } from '../../hooks/UseGetMovieData'
import { onMounted, ref } from 'vue'
import { useTinder } from '../../stores/tinder'
import vSelect from "vue-select";
import type { MoviesGenres } from '../../types/moviesGenres'
import type { MoviesList } from '../../types/moviesList'
import "vue-select/dist/vue-select.css";
import { useStorage } from '@vueuse/core'
import { RouterLink } from 'vue-router';


interface FilterParamsInner {
    name: string,
    url: string,
    value: string
}
type FilterParams = {
    [key: string]: FilterParamsInner;
};

const { request } = useHttp()
const store = useTinder()
const localStorageAccess = useStorage('access_token', '');
const urlRoom = ref<string>('')
const roomId = ref<string>('')
const BASE_URL_API = 'https://moviesdatabase.p.rapidapi.com/titles?limit=50'

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
        url: '&startYear=',
        value: ''
    },
    currentGenreSearch: {
        name: 'By Genre',
        url: '&genre=',
        value: ''
    },
    currentListSearch: {
        name: 'By List',
        url: '&list=',
        value: ''
    }
});

async function searchByParams(urlApi: string) {
    let urlParams = ''

    for (const key in filterParams.value) {
        const item = filterParams.value[key]
        if (item.value) {
            urlParams += `${item.url}${item.value}`
        }
    }

    const response = await request('http://localhost:8000/movies/tinder/lobby/create', 'POST', JSON.stringify({
        "film_api_url": BASE_URL_API + urlParams
    }), {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorageAccess.value}`

    });
    if (response.message) {
        urlRoom.value = 'http://localhost:5173/tinder/' + response.lobby_id
        roomId.value = response.lobby_id
    }

    console.log(urlRoom.value)

}

</script>

<template>
    <div class="tinderContainer" v-if="store.moviesGenresData && store.moviesListData">
        <div class="tinderContainerInner">
            <SignIn v-if="!localStorageAccess"/>
            <template v-else>
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
                        <input class="tinderInput" placeholder="From Year" v-model="filterParams.searchFromYear.value">
                    </div>
                    <div class="tinderCreateRoom">
                        <button class="movieSortingButton" @click="searchByParams">Create Room</button>
                    </div>
                </form>

                <div class="tinderRoomUrl" v-if="urlRoom">
                    <h2>Copy this and send your friend</h2>
                    <input class="tinderInput" type="text" v-model="urlRoom">
                    <RouterLink :to="`/tinder/${roomId}`" class="tinderRoomLink">
                        Go to Lobby
                    </RouterLink>
                </div>
            </template>

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

        .tinderInput {
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
            }

            .tinderCreateRoom {
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

        .tinderRoomUrl {
            display: flex;
            justify-content: center;
            margin-top: 60px;
            flex-direction: column;
            align-items: center;

            .tinderInput {
                width: 600px;
            }

            .tinderRoomLink {
                margin-top: 60px;
                font-weight: 600;
                color: #fff;
                font-size: 22px;
            }
        }
    }
}
</style>

