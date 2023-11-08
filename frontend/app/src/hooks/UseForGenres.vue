<script setup lang="ts">
import { defineProps } from 'vue';

interface IGenres {
    name: string;
    slug: string; 
}

const props = defineProps<{ genres: IGenres[] }>();

const genresNames = props.genres.map(genre => genre.name).join(' | ')

</script>

<template>
    <span>{{ genresNames }}</span>
</template>

