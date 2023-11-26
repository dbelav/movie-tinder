<script setup lang="ts">
import { ref } from 'vue';
import { defineProps } from 'vue';

const props = defineProps(['isOpenLeftNavbar', 'toggleNavbar'])


</script>

<template>
    <div class="leftNavbarBurger" @click="props.toggleNavbar">
        <div class="line" :class="{ 'line1': props.isOpenLeftNavbar }"></div>
        <div class="line" :class="{ 'line2': props.isOpenLeftNavbar }"></div>
        <div class="line" :class="{ 'line3': props.isOpenLeftNavbar }"></div>
    </div>
</template>

<style scoped lang="scss">
.leftNavbarBurger {
    margin-bottom: 100px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 30px;

    .line {
        width: 30px;
        height: 4px;
        background-color: #fff;
        transition: 0.3s;
    }

    .line1 {
        transform: translateY(13px) rotate(-45deg);
    }

    .line2 {
        display: none;
    }

    .line3 {
        transform: translateY(-13px) rotate(45deg);
    }
}
</style>