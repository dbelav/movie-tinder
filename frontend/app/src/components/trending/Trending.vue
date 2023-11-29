<script setup lang="ts">
import MovieCard from '../movieCard/MovieCard.vue';
import { defineProps } from 'vue';
import { ApiResponseMini } from '../../types/miniInfoTypes'
import { Skeletor } from "vue-skeletor";
import "vue-skeletor/dist/vue-skeletor.css";


const props = defineProps<{ trendingMovies: ApiResponseMini | undefined, loading: boolean }>();

</script>

<template>
    <div class="trending">
        <div class="trendingContainer">
            <h2>Trending</h2>
            <div class="trendingContainerCards">
                <Skeletor v-if="props.loading" v-for="item in 10" class="trendingContainerCardsLoading"/>

                <template v-else-if="!props.loading && props.trendingMovies">
                    <MovieCard :dataMovie="movie" :loading="props.loading" v-for="(movie, index) in props.trendingMovies.results"
                        :key="index" />
                    <div class="trendingContainerCardsInvisible"></div>
                </template>
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

            .trendingContainerCardsLoading{
                width: 18%;
                height: 300px;
                border-radius: 15px;
                margin: 20px 0;
            }

            .trendingContainerCardsInvisible {
                width: 18%;
            }

        }
    }
}
</style>
