<script setup lang="ts">
import { useHttp } from '../../hooks/useHtpp'
import { useStorage } from '@vueuse/core'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router';


const { request } = useHttp()
const route = useRoute();
const localStorageAccess = useStorage('access_token', '');


onMounted(async () => {
    const idRoom = route.path.split('/').pop()
    const response = await request(`http://localhost:8000/movies/tinder/lobby/${idRoom}/join`, 'GET', null, {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorageAccess.value}`
    })
    
})

</script>


<template>
        
</template>


<style lang="scss"></style>