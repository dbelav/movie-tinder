<script setup lang="ts">
import { defineProps, ref } from 'vue';
import Heart from '../../assets/Heart.vue';
import ActiveHeart from '../../assets/ActiveHeart.vue';


interface Iprops {
    width?: string;
    height?: string;
}

const props = defineProps<Iprops>();
const isActive = ref(false)

function switchActive(){
    if(isActive.value){
        isActive.value = false
    } else{
        isActive.value = true
    }
}

</script>

<template>
    <div class="addToFavourites">

        <button class="addToFavouritesButton" :style="{ width: props.width, height: props.height }" @click="switchActive">
            <ActiveHeart v-if="isActive"/>
            <Heart v-else/>    
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
