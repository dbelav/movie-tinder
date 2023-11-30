<script setup lang="ts">
import { onMounted, ref } from 'vue'
import LeftNavbar from './components/leftNavbar/LeftNavbar.vue'
import { RouterView } from 'vue-router'
import { useStorage } from '@vueuse/core'
import { useFavoriteMovie } from './stores/favorites'
import { useHttp } from './hooks/useHtpp'
import type { FavoritesApi } from './types/favorites'
import './main.scss'


const favoritesStore = useFavoriteMovie()
const isOpenLeftNavbar = ref(false)
const localStorage = useStorage('userId', '');
const { request } = useHttp()

onMounted(async () => {
  try {
    favoritesStore.loadingFavoriteMovieIds()
    const responce = await request(`http://localhost:8000/movies/favorites?user_id=${localStorage.value}`) as Promise<FavoritesApi>
    favoritesStore.getFavoriteMovieIds(await responce)
  } catch {
    favoritesStore.errorFavoriteMovieIds()
  }
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
