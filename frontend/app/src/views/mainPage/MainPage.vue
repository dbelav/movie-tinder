<script setup lang="ts">
import HomeBanner from '../../components/homeBanner/HomeBanner.vue';
import Trending from '../../components/trending/Trending.vue'
import { useHomePageStore } from '../../stores/homePage';
import { useHttp } from '../../hooks/useHtpp'
import { onMounted } from 'vue'
import { IMovie } from '../../types/types';


const store = useHomePageStore()
const { request } = useHttp()

onMounted(async () => {
    store.dataLoading()

    const data = await request('http://localhost:8000/trending') as Promise<IMovie[]>

    if (Array.isArray(data)) {
        store.getData(await data)
    } else {
        store.dataError()
    }

})

</script> 

<template>
    <div class="mainPage" v-if="store.trendingData.length > 0">
        <HomeBanner :trendingMovie='store.trendingData[0]'/>
        <Trending :trendingMovies='store.trendingData'/>
    </div>
</template>

<style scoped lang="scss"></style>
