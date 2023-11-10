<script setup lang="ts">
import HomeBanner from '../../components/homeBanner/HomeBanner.vue';
import Trending from '../../components/trending/Trending.vue'
import { useHomePageStore } from '../../stores/homePage';
import { useHttp } from '../../hooks/useHtpp'
import { onMounted } from 'vue'
import { ApiResponse } from '../../types/types';


const store = useHomePageStore()
const { request } = useHttp()

onMounted(async () => {
    store.dataLoading()

    const response  = await request('https://moviesdatabase.p.rapidapi.com/titles?startYear=1990&list=most_pop_movies&page=1&limit=9') as Promise<ApiResponse>
    console.log(response)

    if((await response).results.length > 0){
        store.getData(await response)
    } else{
        store.dataError()    }   

})

</script> 

<template>
    <div class="mainPage" v-if="!store.trendingDataLoading">
        <HomeBanner v-if="store.trendingData" :trendingMovie='store.trendingData.results[0]' />
        <Trending v-if="store.trendingData" :trendingMovies='store.trendingData.results' />
    </div> 
</template>

<style scoped lang="scss">
.mainPage{
    padding-top: 100px;
}
</style>

