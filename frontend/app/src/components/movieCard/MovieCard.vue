<script setup lang="ts">
import { defineProps } from 'vue';
import AddToFavourites from '../addToFavourites/AddToFavourites.vue'
import type { IMovie } from '../../types/miniInfoTypes'
import { RouterLink } from 'vue-router';
import { useStorage } from '@vueuse/core'


const props = defineProps<{ dataMovie: IMovie, width?: string, height?: string }>();
const localStorage = useStorage('currentIdMovie', '');

const formatActors = (actors: string | null) => {
    if (actors && actors.length > 3) {
        return actors.split(', ').slice(0, 3).join(', ') + '...';
    }
    else {
        return actors
    }
};

function goToMovieInfo(id: string) {
    localStorage.value = id
}
</script>

<template>
    <div class="movieCard" v-if="props.dataMovie.primaryImage"
        :style="{ width: props.width, height: props.height, 'background-image': `url(${props.dataMovie.primaryImage?.url})` }">
        <AddToFavourites class="addToFavourites" width="50px" height="50px" />
        <RouterLink :to="`/movies/${props.dataMovie.originalTitleText.text.replace(/\s/g, '')}`" class="movieCardbody"
            @click="goToMovieInfo(props.dataMovie.id)">
            <div class=" movieCardbodyTopContainer">
                <h3>{{ props.dataMovie.originalTitleText.text }}</h3>
            </div>
            <div class="movieCardbodyBottomContainer">
                <div class="movieCardbodyBottomContainerActors"><span>{{
                    formatActors(props.dataMovie.primaryImage.caption.plainText) }}</span></div>
                <div class="movieCardbodyBottomContainerYear">{{ props.dataMovie.releaseDate?.year }}</div>
            </div>

        </RouterLink>
    </div>
</template>

<style scoped lang="scss">
.movieCard {
    width: 18%;
    height: 400px;
    background-size: no-repeat;
    background-position: center;
    background-size: cover;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
    position: relative;
    border-radius: 10px;
    border: 1px;
    margin: 15px 0;

    .addToFavourites {
        display: none;
        position: absolute;
        right: 15px;
        top: 15px;
    }

    &:hover {
        .addToFavourites {
            display: block;
        }

        .movieCardbody {
            display: flex;
        }
    }

    .movieCardbody {
        height: 100%;

        display: none;
        flex-direction: column;
        align-items: center;
        width: 100%;
        border-radius: 15px;
        align-items: center;
        padding-left: -20px;
        background-color: rgba(0, 0, 0, 0.411);
        transition: 0.3s;
        text-decoration: none;
        color: #fff;

        .movieCardbodyTopContainer {
            height: 50%;
            display: flex;
            justify-content: center;
            align-items: center;

            h3 {
                margin: 0;
                margin-bottom: 5px;
                padding-left: 0 5px;
                transition: opacity 0.9s;
                color: #fff;
                text-align: center;

            }
        }

        .movieCardbodyBottomContainer {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            height: 50%;
            padding: 0 5px;

            .movieCardbodyBottomContainerActors {
                display: flex;
                justify-content: center;
                width: 90%;
            }

            .movieCardbodyBottomContainerYear {
                margin-bottom: 10px;
                font-weight: 600;
            }
        }
    }
}

@media screen and (max-width: 1780px) {
    .movieCard {
        height: 350px;
    }
}

@media screen and (max-width: 1550px) {
    .movieCard {
        height: 300px;
    }
}

@media screen and (max-width: 1368px) {
    .movieCard {
        height: 250px;
    }
}

@media screen and (max-width: 1100px) {
    .movieCard {
        width: 23%;
    }
}

@media screen and (max-width: 950px) {
    .movieCard {
        height: 220px;
    }
}

@media screen and (max-width: 800px) {
    .movieCard {
        height: 200px;
    }
}

@media screen and (max-width: 580px) {
    .movieCard {
        height: 180px;
    }
}

@media screen and (max-width: 528px) {
    .movieCard {
        height: 180px;
        width: 30%;
    }
}

@media screen and (max-width: 450px) {
    .movieCard {
        height: 150px;
        width: 30%;
    }
}
</style>
