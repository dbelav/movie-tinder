<script setup lang="ts">
import { onMounted, onUpdated, ref } from 'vue'
import LeftNavbar from './components/leftNavbar/LeftNavbar.vue'
import { RouterView } from 'vue-router'
import { useStorage } from '@vueuse/core'
import { useFavoriteMovie } from './stores/favorites'
import { useHttp } from './hooks/useHtpp'
import { API_BACKEND_URL } from './apiUrls/apiUrls'
import type { FavoritesApi } from './types/favorites'
import type { AuthMe } from './types/backEndApi'

import './main.scss'


const favoritesStore = useFavoriteMovie()
const isOpenLeftNavbar = ref(false)
const localStorageIdUser = useStorage('userId', '');
const localStorageAccess = useStorage('access_token', '');
const { request } = useHttp()

async function authFavorites() {
  if (localStorageAccess.value) {
    try {
      const responceUserId = await request(`${API_BACKEND_URL}/auth/me`, 'GET', null, {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorageAccess.value}`
      }) as Promise<AuthMe>

      localStorageIdUser.value = (await responceUserId).id.toString()
      favoritesStore.loadingFavoriteMovieIds()

      const responceFavoritesMovies = await request(`${API_BACKEND_URL}/movies/favorites?user_id=${localStorageIdUser.value}`) as Promise<FavoritesApi>
      favoritesStore.getFavoriteMovieIds(await responceFavoritesMovies)
    } catch (e) {
      favoritesStore.errorFavoriteMovieIds()
    }
  }
}
onMounted(async () => {
  await authFavorites()
})

onUpdated(async () => {
  await authFavorites()
})


function toggleNavbar() {
  isOpenLeftNavbar.value = !isOpenLeftNavbar.value;
}

</script>

<template>
  <div class="app">
    <LeftNavbar :isOpenLeftNavbar="isOpenLeftNavbar" :toggleNavbar="toggleNavbar" />
    <div class="appMainContainer" :class="{ 'appMainContainerOpen': isOpenLeftNavbar }">
      <RouterView />
      <div class="favoritesPopUpWindow" v-if="favoritesStore.favoriteMoviePopUp">
        You need to login to use favorites
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.app {
  display: flex;
  width: 100%;
  background: rgb(34, 33, 45);
  background: linear-gradient(180deg,
      rgba(34, 33, 45, 1) 0%,
      rgb(25 25 33) 100%);
  min-height: 100vh;


  .appMainContainer {
    width: 100%;
    padding-left: 120px;
    transition: 0.3s;
    position: relative;

    .favoritesPopUpWindow {
      width: 200px;
      background: #000;
      border-radius: 10px;
      color: #fff;
      display: flex;
      align-items: center;
      padding: 10px 20px;
      position: fixed;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      z-index: 10;
    }
  }

  .appMainContainerOpen {
    padding-left: 200px;


  }
}

@media screen and (max-width: 950px) {
  .app {
    .appMainContainer {
      padding-left: 100px;

    }
  }
}

@media screen and (max-width: 700px) {
  .app {
    .appMainContainer {
      padding-left: 0;

    }
  }
}
</style>
