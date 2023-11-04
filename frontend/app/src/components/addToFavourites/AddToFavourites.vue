<script setup lang="ts">
import { defineProps } from 'vue';

interface Iprops {
    width: string;
    height: string;
}

const props = defineProps<Iprops>();
console.log(props)
</script>

<template>
    <div class="addToFavourites">
        <button class="addToFavouritesButton" :style="{ width: props.width, height: props.height }">
        </button>
    </div>
</template>
<style scoped lang="scss">
.addToFavouritesButton {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 15px;
    gap: 10px;


    // background: linear-gradient(98.85deg, #FFFFFF 3.36%, rgba(255, 255, 255, 0) 238.16%);
    background-image: url("../../assets/heart.png");
    background-size: no-repeat;
    background-position: center;
    background-size: cover;
    backdrop-filter: blur(10px);
    border-radius: 14px;

}
</style>
