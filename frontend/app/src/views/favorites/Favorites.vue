<script setup lang="ts">
import {onMounted, ref} from 'vue'
import { useHttp } from '../../hooks/useHtpp';
import MovieCard from '../../components/movieCard/MovieCard.vue';
import { useStorage } from '@vueuse/core'


const { request } = useHttp()
const favoritesMovies = ref()
const localStorage = useStorage('userId', '');

onMounted(async () =>{
    console.log(44)
    const responce = await request(`http://localhost:8000/movies/favorites?user_id=${localStorage.value}`)
    console.log(responce)
    favoritesMovies.value = responce.favorites
})
</script>

<template>
    <div class="favoritesContainer">
        <div class="favoritesContainerInner">

        </div>

    </div>
</template>

<style lang="scss">
.favoritesContainer{
    width: 100%;
    display: flex;
    justify-content: center;

    .favoritesContainerInner{
        width: 90%;
    }
}
</style>