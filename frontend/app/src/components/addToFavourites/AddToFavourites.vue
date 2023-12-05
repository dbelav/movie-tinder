<script setup lang="ts">
import { defineProps, ref } from 'vue';
import Heart from '../../assets/Heart.vue';
import ActiveHeart from '../../assets/ActiveHeart.vue';
import { useStorage } from '@vueuse/core'
import { useHttp } from '../../hooks/useHtpp';
import { useFavoriteMovie } from '../../stores/favorites'


const props = defineProps<{ id: string, width: string, height: string }>();
const favoritesStore = useFavoriteMovie()
const isActive = ref(false)
const { request } = useHttp()
const localStorage = useStorage('userId', '');


async function refreshData() {
    try {
        favoritesStore.loadingFavoriteMovieIds()
        const responce = await request(`http://localhost:8000/movies/favorites?user_id=${localStorage.value}`) as Promise<FavoritesApi>
        favoritesStore.getFavoriteMovieIds(await responce)
    } catch {
        favoritesStore.errorFavoriteMovieIds()
    }
}
async function switchActive() {
    if (isActive.value) {
        const responce = await request(`http://localhost:8000/movies/favorites`, 'DELETE', JSON.stringify({
            user_id: localStorage.value,
            movie_id: props.id,
        }))
        refreshData()
    } else {
        const responce = await request(`http://localhost:8000/movies/favorites`, 'POST', JSON.stringify({
            user_id: localStorage.value,
            movie_id: props.id,
        }))
        refreshData()
    }
}

function checkIdMatch(id: string) {
    const isMatch = favoritesStore.favoriteMoviesIdsData?.favorites.filter(item => item.movie_id === id)
    if (isMatch && isMatch.length > 0) {
        isActive.value = true
    } else {
        isActive.value = false
    }
}

</script>

<template v-if="favoriteStore.favoriteMoviesIdsData && localStorage">
    <div class="addToFavourites">
        <button class="addToFavouritesButton" :style="{ width: props.width, height: props.height }" @click="switchActive">
            <ActiveHeart v-if="isActive" />
            <Heart v-else />
        </button>
    </div>
</template>
<style scoped lang="scss">
.addToFavouritesButton {
    display: flex;
    color: rgb(97, 0, 194);
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 14px;
    padding: 0;
    z-index: 1000;
    margin: 0;

}
</style>
