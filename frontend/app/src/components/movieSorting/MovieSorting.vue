<script setup lang="ts">
import { useMovies } from '../../stores/movies'
import { ref } from 'vue'
import { ApiResponseMini } from '../../types/miniInfoTypes'
import { UseGetMovieData } from '../../hooks/UseGetMovieData'
import Delete from '../../assets/Delete.vue'


interface FilterParamsInner {
    name: string,
    url: string,
    value: string
}
type FilterParams = {
    [key: string]: FilterParamsInner;
};

const store = useMovies()

const BASE_API_URL = ref('https://moviesdatabase.p.rapidapi.com/titles?limit=30&page=1')
const searchKeyword = ref('')
let timeoutSearch: NodeJS.Timeout | null = null


const filterParams = ref<FilterParams>({
    searchByYear: {
        name: 'Search By Year',
        url: 'year=',
        value: ''
    },
    searchFromYear: {
        name: 'Search From Year',
        url: 'startYear=',
        value: ''
    },
    searchToYear: {
        name: 'Search To Year',
        url: 'endYear=',
        value: ''
    },
    incDecSearch: {
        name: 'Search By Range',
        url: 'sort=',
        value: 'year.incr'
    },
    currentGenreSearch: {
        name: 'Search By Genre',
        url: 'genre=',
        value: ''
    },
    currentListItemSearch: {
        name: 'Search By List',
        url: 'list=',
        value: ''
    }

});
async function searchByParams(urlApi: string) {
    store.deleteAllPreviousPages()
    let urlParams = ''

    for (const key in filterParams.value) {
        const item = filterParams.value[key]
        if (item.value) {
            urlParams += `&${item.url}${item.value}`
        }
    }

    store.setPreviousPage(`/titles?limit=30&page=1${urlParams}`)

    await UseGetMovieData<ApiResponseMini>(
        `${urlApi}${urlParams}`,
        store.isLoadingMovies,
        store.getDataMovies,
        store.isErrorMovies
    )
}

async function searchByName(urlApi: string) {
    if (timeoutSearch !== null) {
        clearTimeout(timeoutSearch);
    }
    if (searchKeyword.value.length > 0) {
        timeoutSearch = setTimeout(async () => {
            await UseGetMovieData<ApiResponseMini>(
                `https://moviesdatabase.p.rapidapi.com/titles/search/title/${searchKeyword.value}?limit=30&page=1`,
                store.isLoadingMovies,
                store.getDataMovies,
                store.isErrorMovies
            );
        }, 300);
    }

}

function clearFilters(filterName: string) {
    store.deleteAllPreviousPages()

    for (const key in filterParams.value) {
        if (filterParams.value[key].name === filterName) {
            filterParams.value[key].value = ''
        }
    }

    searchByParams(BASE_API_URL.value)
}

function toggleIncDecSearch() {
    filterParams.value.incDecSearch.value = filterParams.value.incDecSearch.value === 'year.incr' ? 'year.decr' : 'year.incr';
}

</script>

<template>
    <div class="movieSortingContainer" v-if="store.moviesListData && store.moviesGenresData">
        <div class="movieSortingGenres">
            <ul class="movieSortingGenresList">
                <template v-for="genre in store.moviesGenresData.results">
                    <li class="movieSortingGenresListItem" v-if="genre">
                        <button @click="filterParams.currentGenreSearch.value = genre"
                            :style="{ color: genre === filterParams.currentGenreSearch.value ? 'black' : '#fff' }">
                            {{ genre }}
                        </button>
                    </li>
                </template>
            </ul>
        </div>

        <div class="movieSortingList">
            <ul class="movieSortingListInner">
                <template v-for="listItem in store.moviesListData.results">
                    <li class="movieSortingListItem">
                        <button class="movieSortingListItemButton"
                            @click="filterParams.currentListItemSearch.value = listItem"
                            :style="{ color: listItem === filterParams.currentListItemSearch.value ? 'black' : '#fff' }">{{
                                listItem.replace(/_/g, ' ').replace(/\b\w/g, match => match.toUpperCase()) }}
                        </button>
                    </li>
                </template>
            </ul>
        </div>
        <div class="movieSearchSortingContainer">
            <div class="movieSearchKeyword">
                <h2>Search By Name</h2>
                <form>
                    <input type="text" class="movieSortInput" v-model="searchKeyword" @input="searchByName(BASE_API_URL)">
                </form>
            </div>
            <div class="movieSortingDate">
                <h2>Search by Year</h2>
                <div class="movieSortingDateYear">
                    <form class="movieSortingDateYearForm" @submit.prevent>
                        <input type="text" class="movieSortInput" v-model="filterParams.searchByYear.value">
                    </form>
                </div>

                <div class="movieSortingDateRangeYear">
                    <h2>Search by Year Range</h2>
                    <form class="movieSortingDateRangeYearForm" @submit.prevent>
                        <input type="text" class="movieSortInput" v-model="filterParams.searchFromYear.value">
                        <input type="text" class="movieSortInput" v-model="filterParams.searchToYear.value">
                        <button class="movieSortingButton" @click="toggleIncDecSearch()">
                            {{ filterParams.incDecSearch.value }}</button>
                    </form>

                    <div class="movieSortingDateSearch">
                        <button class="movieSortingButton" @click="searchByParams(BASE_API_URL)">Search</button>
                    </div>
                    <div class="movieSortingDateClear">
                        <template v-for="filter in filterParams">
                            <button class="movieSortingDateClearButton movieSortingButton"
                                @click="clearFilters(filter.name)" v-if="filter.value && filter.name !== 'Search By Range'">
                                <Delete class="movieSortingButtonDelete" /><span>{{ filter.name }}</span>
                            </button>
                        </template>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<style lang="scss">
.movieSortingContainer {
    width: 100%;
    display: flex;
    justify-content: space-between;
    background-color: #2e2e2e;
    padding-right: 15px;

    .movieSortingGenres {
        width: 50%;

        .movieSortingGenresList {
            display: flex;
            flex-wrap: wrap;
            padding: 15px 20px;
            margin: 0;

            .movieSortingGenresListItem {
                list-style: none;
                margin: 7px;

                button {
                    background-color: transparent;
                    border: none;
                    cursor: pointer;
                    padding: 0;
                    font-size: 18px;
                    color: #fff;
                    text-decoration: underline;
                }
            }
        }
    }

    .movieSortingList {
        width: 35%;

        .movieSortingListInner {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 0;

            .movieSortingListItem {
                width: 90%;
                list-style: none;
                margin: 7px;
                display: flex;

                .movieSortingListItemButton {
                    background-color: transparent;
                    border: none;
                    cursor: pointer;
                    padding: 0;
                    font-size: 18px;
                    color: #fff;
                    width: 100%;
                    display: flex;
                    text-decoration: underline;
                }
            }
        }
    }

    .movieSortingButton {
        height: 40px;
        background-color: rgba(66, 66, 66, 0.671);
        color: #fff;
        font-size: 16px;
        border: none;
        border-radius: 7px;
        cursor: pointer;
        padding: 0 10px;
    }

    .movieSearchSortingContainer {
        color: #fff;

        .movieSearchKeyword {
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;

        }

        .movieSortingDate {
            display: flex;
            flex-direction: column;
            align-items: center;

            h2 {
                font-size: 24px;
                margin-bottom: 10px;
            }

            .movieSortingDateYear,
            .movieSortingDateRangeYear {
                margin-bottom: 20px;

                h2 {
                    text-align: center;
                }

                .movieSortingDateYearForm,
                .movieSortingDateRangeYearForm {
                    display: flex;
                    align-items: center;
                }

                .movieSortingDateSearch {
                    margin-top: 10px;
                }
            }
        }

        .movieSortInput {
            height: 30px;
            border-radius: 7px;
            border: none;
            margin-right: 10px;
            padding: 5px;
            font-size: 18px;
        }
    }


    .movieSortingDateClear {
        display: flex;
        justify-content: center;

        .movieSortingDateClearButton {
            margin: 10px 7px;
            display: flex;
            justify-content: center;
            align-items: center;

            .movieSortingButtonDelete {
                height: 40%;
                margin-right: 10px;
            }
        }
    }
}
</style>


