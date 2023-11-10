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

const formatActors = (actors: string | null) => {
    if (actors && actors.length > 3) {
        return actors.split(', ').slice(0, 3).join(', ') + '...';
    }
    else {
        return actors
    }
};

</script>

<template>
    <div class="movieCard"
        :style="{ width: props.width, height: props.height, 'background-image': `url(${props.dataMovie.primaryImage?.url})` }">
        <div class="movieCardbody">
            <div class="movieCardbodyTopContainer">
                <h3>{{ props.dataMovie.originalTitleText.text }}</h3>
            </div>
            <div class="movieCardbodyBottomContainer">
                <div>{{ formatActors(props.dataMovie.primaryImage.caption.plainText) }}</div>
                <div class="movieCardbodyBottomContainerYear">{{ props.dataMovie.releaseDate?.year }}</div>
            </div>
            <!-- <AddToFavourites class="addToFavourites" width="50px" height="50px" /> -->
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
    border-radius: 15px;
    border: 1px;
    margin: 20px 0;
    // transition: 3s;
    color: #fff;



    &:hover {
        .movieCardbody {
            opacity: 1;

            // h3 {
            //     opacity: 1;
            // }
        }
    }

    .movieCardbody {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        border-radius: 15px;
        align-items: center;
        padding-left: -20px;
        opacity: 0;
        background-color: rgba(0, 0, 0, 0.411);
        transition: 0.3s;

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
            align-self: flex-end;
            padding: 0 5px;

            .movieCardbodyBottomContainerYear {
                margin-bottom: 10px;
                font-weight: 600;
            }
        }
    }

    .addToFavourites {
        margin-top: 10px;
        margin-right: 10px;
    }

}
</style>
