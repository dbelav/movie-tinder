<script setup lang="ts">
import { defineProps } from 'vue';
import AddToFavourites from '../addToFavourites/AddToFavourites.vue';
import type { IMovie } from '../../types/types'
import UseForGenres from '../../hooks/UseForGenres.vue';

interface Iprops {
    width?: string;
    height?: string;
}

const props = defineProps<{ dataMovie: IMovie, width?: string, height?: string }>();

</script>

<template>
    <div class="movieCard"
        :style="{ width: props.width, height: props.height, 'background-image': `url(${props.dataMovie.poster_url})` }">
        <AddToFavourites class="addToFavourites" width="50px" height="50px" />
        <div class="movieCardbody">
            <UseForGenres :genres="props.dataMovie.genres" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.movieCard {
    width: 20%;
    height: 300px;
    background-size: no-repeat;
    background-position: center;
    background-size: cover;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
    border-radius: 20px;
    border: 1px;
    margin: 20px 0;


    .movieCardbody {
        height: 25%;
        display: flex;
        flex-direction: column;
        width: 100%;
        background: linear-gradient(100.38deg, #FFFFFF 12.94%, rgba(255, 255, 255, 0) 159.1%);
        border-radius: 0 0 20px 20px;
        justify-content: center;
        padding-left: -20px;

        h3 {
            margin: 0;
            margin-bottom: 5px;
            padding-left: 10px;
        }

        span {
            padding-left: 10px;
        }
    }

    .addToFavourites {
        margin-top: 10px;
        margin-right: 10px;
    }

}
</style>
