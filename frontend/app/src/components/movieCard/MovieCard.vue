<script setup lang="ts">
import { defineProps } from 'vue';
import AddToFavourites from '../addToFavourites/AddToFavourites.vue';

interface Iprops {
    width?: string;
    height?: string;
    name: string;
    year: string;
    genre: string;
    image: string
}

const props = defineProps<Iprops>();

</script>

<template>
    <div class="movieCard" :style="{ width: props.width, height: props.height, 'background-image': `url(${props.image})` }">
        <AddToFavourites class="addToFavourites" width="50px" height="50px" />
        <div class="movieCardbody">
            <h3>{{ props.genre }}</h3>
            <span>{{ props.year + ' | ' + props.genre }}</span>

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
        span{
            padding-left: 10px;
        }
    }

    .addToFavourites {
        margin-top: 10px;
        margin-right: 10px;
    }

}
</style>
