<script setup lang="ts">
import HomeBanner from '../../components/homeBanner/HomeBanner.vue'
import Trending from '../../components/trending/Trending.vue'
import { useHomePageStore } from '../../stores/homePage'
import { API_BASE_URL } from '../../apiUrls/apiUrls'
import { UseGetMovieData } from '../../hooks/UseGetMovieData'
import { onMounted } from 'vue'
import type { ApiResponseMini } from '../../types/miniInfoTypes'


const store = useHomePageStore()

onMounted(async () => {
    UseGetMovieData<ApiResponseMini>(`${API_BASE_URL}/titles?startYear=2022&limit=10&list=top_boxoffice_200`,
    store.dataLoading,
    store.getData,
    store.dataError)
})

</script> 

<template>
    <div class="mainPage">
        <HomeBanner :trendingMovie='store.trendingData?.results[0]' :loading="store.trendingDataLoading" />
        <Trending :trendingMovies='store.trendingData' :loading="store.trendingDataLoading"/>
    </div>
</template>

<style scoped lang="scss">

</style>

