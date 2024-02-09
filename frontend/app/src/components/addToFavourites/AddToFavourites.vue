<script setup lang="ts">
import { defineProps, ref, onMounted } from 'vue';
import Heart from '../../assets/Heart.vue';
import ActiveHeart from '../../assets/ActiveHeart.vue';
import { useStorage } from '@vueuse/core'
import { useHttp } from '../../hooks/useHtpp';
import { useFavoriteMovie } from '../../stores/favorites'
import { API_BACKEND_URL } from '../../apiUrls/apiUrls';
import type { FavoritesApi } from '../../types/favorites'


const props = defineProps<{ id: string, width?: string, height?: string }>();
const favoritesStore = useFavoriteMovie()
const isActive = ref(false)
const { request } = useHttp()
const localStorage = useStorage('userId', '');
const localStorageAccess = useStorage('access_token', '');


onMounted(() => {
    checkIdMatch(props.id)
})

async function refreshFavoritesData() {
    try {
        favoritesStore.loadingFavoriteMovieIds()
        const responce = await request(`${API_BACKEND_URL}/movies/favorites?user_id=${localStorage.value}`) as Promise<FavoritesApi>
        favoritesStore.getFavoriteMovieIds(await responce)
    } catch {
        favoritesStore.errorFavoriteMovieIds()
    }
}

async function favoritesDatabaseCrudOperation(method: string) {
    await request(`${API_BACKEND_URL}/movies/favorites`, method, JSON.stringify({
        user_id: localStorage.value,
        movie_id: props.id,
    }))
}

function switchActive() {
    if (localStorageAccess.value) {
        favoritesStore.showFavoriteMoviePopUp(false)
        favoritesChangeCrudOperationDatabase()
    } else {
        favoritesStore.showFavoriteMoviePopUp(true)
    }
}

async function favoritesChangeCrudOperationDatabase() {
    if (isActive.value) {
        await favoritesDatabaseCrudOperation('DELETE')
        await refreshFavoritesData()

        isActive.value = false
    } else {
        await favoritesDatabaseCrudOperation('POST')
        await refreshFavoritesData()
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
        <button class="addToFavouritesButton" @click="switchActive">
            <ActiveHeart v-if="isActive" />
            <Heart v-else />
        </button>

    </div>
</template>
<style scoped lang="scss">
.addToFavouritesButton {
    width: 50px;
    height: 50px;
    display: flex;
    color: rgb(97, 0, 194);
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 32%;
    padding: 0;
    z-index: 1000;
    margin: 0;
}

@media screen and (max-width: 1550px) {
    .addToFavouritesButton {
        width: 40px;
        height: 40px;
    }
}

@media screen and (max-width: 950px) {
    .addToFavouritesButton {
        width: 30px;
        height: 30px;

    }

}
</style>
