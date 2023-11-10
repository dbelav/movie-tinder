<script setup lang="ts">
import LeftNavbar from './components/leftnavbar/LeftNavbar.vue'
import TopNavbar from './components/topNavbar/TopNavbar.vue'
import MainPage from './views/mainPage/MainPage.vue'
import { RouterView } from 'vue-router'

import './main.scss'




</script>

<template>
  <div class="app">
    <LeftNavbar />
    <div class="appMainContainer">
      <TopNavbar />
      <RouterView />
    </div>
  </div>
</template>

<style scoped lang="scss">
.app {

  display: flex;
  width: 100%;
  background: conic-gradient(from -1.54deg at 28.99% 107.28%, #191817 0deg, #37312A 175.51deg, #191817 342.49deg, #191817 360deg);

  .appMainContainer {
    width: 80%;
    padding-left: 20%;
  }
}
</style>
