<script setup lang="ts">
import MovieCard from '../movieCard/MovieCard.vue';
import { defineProps } from 'vue';
import { IMovie } from '../../types/types'


const props = defineProps<{ trendingMovies: IMovie[] }>();

</script>

<template>
    <div class="trending">
        <div class="trendingContainer">
            <h2>Trending</h2>
            <div class="trendingContainerCards">
                <MovieCard :dataMovie="movie" width="26%" v-for="(movie, index) in props.trendingMovies" :key="index" />
                <div class="trendingContainerCardsInvisible"></div>  <!-- for normal alignment with space-beetween -->
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.trending {
    width: 100%;
    display: flex;
    justify-content: center;

    .trendingContainer {
        width: 90%;
        display: flex;
        flex-wrap: wrap;

        h2 {
            color: #fff;
            font-size: 24px;
        }

        .trendingContainerCards {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;

            .trendingContainerCardsInvisible{
                width: 26%;
            }

        }
    }
}
</style>
