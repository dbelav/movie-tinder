<script setup lang="ts">
import { useMovies } from '../../stores/movies'
import { ref } from 'vue'
import { ApiResponseMini } from '../../types/miniInfoTypes'
import { UseGetMovieData } from '../../hooks/UseGetMovieData'
import Delete from '../../assets/Delete.vue'
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";


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
        name: 'By Year',
        url: 'year=',
        value: ''
    },
    searchFromYear: {
        name: 'From Year',
        url: 'startYear=',
        value: ''
    },
    searchToYear: {
        name: 'To Year',
        url: 'endYear=',
        value: ''
    },
    incDecSearch: {
        name: 'By Range',
        url: 'sort=',
        value: 'year.incr'
    },
    currentGenreSearch: {
        name: 'By Genre',
        url: 'genre=',
        value: ''
    },
    currentListItemSearch: {
        name: 'By List',
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

function formatLabel(label: string) {
    return label.replace(/_/g, ' ').replace(/\b\w/g, match => match.toUpperCase())
}

</script>

<template>
    <div class="movieSortingContainer" v-if="store.moviesListData && store.moviesGenresData">
        <div class="movieSortingContainerFilter">
            <div class="movieSortingContainerInnerFilter">
                <div class="movieSearchKeyword">
                    <form>
                        <input type="text" placeholder="Search By Name" class="movieSortInput" v-model="searchKeyword"
                            @input="searchByName(BASE_API_URL)">
                    </form>
                </div>

                <div class="movieSortingDropDownList">
                    <v-select v-model="filterParams.currentGenreSearch.value" :options="store.filterNullGenresData"
                        placeholder="Select Genre" label="name"></v-select>
                </div>

                <div class="movieSortingDropDownList">
                    <v-select v-model="filterParams.currentListItemSearch.value"
                        :options="store.moviesListData.results.map(listItem => ({ label: formatLabel(listItem), value: listItem }))"
                        label="label" :reduce="option => option.value" placeholder="Select List Item"></v-select>
                </div>
                <div class="movieSortingDateClear">
                    <template v-for="filter in filterParams">
                        <button class="movieSortingDateClearButton movieSortingButton" @click="clearFilters(filter.name)"
                            v-if="filter.value && filter.name !== 'Search By Range'">
                            <Delete class="movieSortingButtonDelete" /><span>{{ filter.name }}</span>
                        </button>
                    </template>
                </div>

            </div>


            <div class="movieSortingDateYear">
                <form class="movieSortingDateYearForm" @submit.prevent>
                    <input placeholder="Search by Year" type="text" class="movieSortInput"
                        v-model="filterParams.searchByYear.value">
                </form>

                <form class="movieSortingDateRangeYearForm" @submit.prevent>
                    <input placeholder="Range From" type="text" class="movieSortInput movieSortInput1"
                        v-model="filterParams.searchFromYear.value">
                    <input placeholder="Range To" type="text" class="movieSortInput movieSortInput2"
                        v-model="filterParams.searchToYear.value">
                        <div class="movieSortingDateRangeYearButton">
                            <button class="movieSortingButton" @click="toggleIncDecSearch()">
                        {{ filterParams.incDecSearch.value }}</button>
                        </div>

                </form>
            </div>
        </div>

        <div class="movieSortingContainerBottom">
            <button class="movieSortingButton" @click="searchByParams(BASE_API_URL)">Search</button>
        </div>
    </div>
</template>

<style lang="scss">
.movieSortingContainer {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #2e2e2e;
    margin-top: 100px;

    .movieSortingContainerFilter {
        width: 100%;
        display: flex;
        margin-top: 10px;
        justify-content: space-between;


        .movieSortingContainerInnerFilter {
            width: 70%;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            margin-left: 1%;

            .movieSearchKeyword {
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 30%;

                form {
                    width: 100%;
                }
            }

            .movieSortingDropDownList {
                width: 30%;

                .vs__dropdown-toggle {
                    background-color: #333;
                    border: 1px solid #fff;
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
                    background-color: #333;
                    border: 1px solid #ccc;
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

            .movieSortingDateClear {
                display: flex;
                white-space: nowrap;

                .movieSortingDateClearButton {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-right: 3%;

                    .movieSortingButtonDelete {
                        height: 40%;
                        margin-right: 10px;
                    }
                }
            }
        }

        .movieSortingDateYear {
            width: 25%;

            .movieSortingDateRangeYearForm {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;

                .movieSortInput {
                    width: 48%;
                    margin: 12px 0;
                }

                .movieSortInput1 {
                    margin-right: 1%;
                }

                .movieSortInput2 {
                    margin-left: 1%;
                }
                
                .movieSortingDateRangeYearButton{
                    width: 100%;
                    display: flex;
                    justify-content: center;
                }
            }
        }

        .movieSortInput {
            height: 30px;
            background-color: #333;
            border: 1px solid #fff;
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

    .movieSortingContainerBottom {
        display: flex;
        width: 100%;
        justify-content: center;
        margin-bottom: 10px;
        
        .movieSortingButton{
            width: 150px;
            font-size: 18px;
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
}
</style>


