<script setup lang="ts">
import MovieCard from '../movieCard/MovieCard.vue';


</script>

<template>
    <div class="trending">
        <div class="trendingContainer">
            <h2>Trending</h2>
            <div class="trendingContainerCards">
                <MovieCard name="asdfsadf" year="2022" genre="asdf asdf asdf"
                    image="https://images.wallpaperscraft.ru/image/single/ulitsa_noch_mokryj_155637_1920x1080.jpg" />
                    <MovieCard name="asdfsadf" year="2022" genre="asdf asdf asdf"
                    image="https://images.wallpaperscraft.ru/image/single/ulitsa_noch_mokryj_155637_1920x1080.jpg" />
                    <MovieCard name="asdfsadf" year="2022" genre="asdf asdf asdf"
                    image="https://images.wallpaperscraft.ru/image/single/ulitsa_noch_mokryj_155637_1920x1080.jpg" />
                    <MovieCard name="asdfsadf" year="2022" genre="asdf asdf asdf"
                    image="https://images.wallpaperscraft.ru/image/single/ulitsa_noch_mokryj_155637_1920x1080.jpg" />
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

        .trendingContainerCards{
            display: flex;
            justify-content: space-between;
        }
    }
}
</style>
