<script setup lang="ts">
import { useMovieItem } from '../../stores/movieItem';
import { onMounted } from 'vue'
import { ApiResponsBase } from '../../types/baseInfoTypes';
import { useHttp } from '../../hooks/useHtpp'
import MovieItemInfo from '../../components/movieItemInfo/MovieItemInfo.vue'
// import { useLocalStorage } from '@vueuse/core'


const movieStore = useMovieItem()

const { request } = useHttp()
// const { value } = useLocalStorage('currentIdMovie', 'default');
// console.log(value)


onMounted(async () => {
    movieStore.isLoadingMovieItem()

    const response = await request(`https://moviesdatabase.p.rapidapi.com/titles/${movieStore.currentIdMovie}?info=base_info`) as Promise<ApiResponsBase>
    // console.log(response)

    if ((await response).results) {
        movieStore.getDataMovieItem(await response)
    } else {
        movieStore.isErrorMovieItem()
    }
    console.log(movieStore)
})
console.log(movieStore)
</script>

<template>
    <div class="movieItemContainer" v-if="!movieStore.movieItemLoading">
        <div class="movieItemContainerImage" >
            <img v-if="movieStore.movieItemData" :src="movieStore.movieItemData.results.primaryImage?.url" alt="">    
        </div>
        <MovieItemInfo v-if="movieStore.movieItemData" :movieData="movieStore.movieItemData"/>
    </div>
</template>

<style scoped lang="scss">
.movieItemContainer {
    height: 100vh;
    padding-top: 100px;
    display: flex;

    .movieItemContainerImage{
        width: 30%;

        img{
            width: 100%;
        }
    }
}
</style>