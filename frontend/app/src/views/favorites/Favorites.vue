<script setup lang="ts">
import { useHttp } from '../../hooks/useHtpp';
import MovieCard from '../../components/movieCard/MovieCard.vue';

const { request } = useHttp()

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