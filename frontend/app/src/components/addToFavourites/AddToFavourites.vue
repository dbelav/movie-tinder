<script setup lang="ts">
import { defineProps, ref } from 'vue';
import Heart from '../../assets/Heart.vue';
import ActiveHeart from '../../assets/ActiveHeart.vue';
import { useStorage } from '@vueuse/core'
import { useHttp } from '../../hooks/useHtpp';

interface Iprops {
    id: string,
    width?: string;
    height?: string;
}

const props = defineProps<Iprops>();
const isActive = ref(false)
const { request } = useHttp()
const localStorage = useStorage('userId', '');

async function switchActive() {
    if (isActive.value) {
        const responce = await request(`http://localhost:8000/movies/favorites`, 'DELETE', JSON.stringify({
            user_id: localStorage.value,
            movie_id: props.id,
        }))
        console.log(responce)
        isActive.value = false
    } else {
        const responce = await request(`http://localhost:8000/movies/favorites`, 'POST', JSON.stringify({
            user_id: localStorage.value,
            movie_id: props.id,
        }))
        console.log(responce)
        isActive.value = true
    }
}

// function fetchApi(){
//     if(isActive){

//     }
// }
</script>

<template>
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
