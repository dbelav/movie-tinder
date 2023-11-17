<script setup lang="ts">
import { useMovies } from '../../stores/movies'


const store = useMovies()
</script>

<template>
    <div class="movieSortingContainer" v-if="store.moviesListData && store.moviesGenresData">
        <div class="movieSortingGenres">
            <ul class="movieSortingGenresList">
                <template v-for="genre in store.moviesGenresData.results">
                    <li class="movieSortingGenresListItem" v-if="genre">
                        <button @click="store.setCurrentGenre(genre)">{{ genre }}</button>
                    </li>
                </template>
            </ul>
        </div>

        <div class="movieSortingList">
            <ul class="movieSortingListInner">
                <template v-for="listItem in store.moviesListData.results">
                    <li class="movieSortingListItem">
                        <button class="movieSortingListItemButton" @click="store.setCurrentListItem(listItem)">{{ listItem }}</button>
                    </li>
                </template>
            </ul>
        </div>
    </div>
</template>

<style lang="scss">
.movieSortingContainer {
    width: 100%;
    display: flex;
    justify-content: space-between;

    .movieSortingGenres {
        width: 55%;
        background-color: #2e2e2e;

        .movieSortingGenresList {
            display: flex;
            flex-wrap: wrap;


            .movieSortingGenresListItem {
                width: 30%;
                list-style: none;
                margin: 7px;

                button {
                    background-color: transparent;
                    border: none;
                    cursor: pointer;
                    padding: 0;
                    font-size: 18px;
                    color: #fff;
                }
            }
        }
    }

    .movieSortingList {
        width: 30%;
        background-color: #2e2e2e;

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
                // justify-content: center;

                .movieSortingListItemButton {
                    background-color: transparent;
                    border: none;
                    cursor: pointer;
                    padding: 0;
                    font-size: 18px;
                    color: #fff;
                    width: 100%;
                    display: flex;
                }
            }
        }
    }

}
</style>


