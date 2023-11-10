<script setup lang="ts">
import { defineProps } from 'vue';
import Heart from '../../assets/Heart.vue';

interface Iprops {
    width: string;
    height: string;
}

const props = defineProps<Iprops>();

</script>

<template>
    <div class="addToFavourites">

        <button class="addToFavouritesButton" :style="{ width: props.width, height: props.height }">
            <Heart />
        </button>
    </div>
</template>
<style scoped lang="scss">
.addToFavouritesButton {
    display: flex;

    justify-content: center;
    align-items: center;
    backdrop-filter: blur(10px);
    border-radius: 14px;
    padding: 0;

}
</style>
