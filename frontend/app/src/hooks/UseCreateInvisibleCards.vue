<template>
    <div class="trendingContainerCardsInvisible" v-for="item in 4"></div>
</template>

<style scoped lang="scss">
.trendingContainerCardsInvisible {
    width: 18%;
}

@media screen and (max-width: 1100px) {
    .trendingContainerCardsInvisible {
        width: 23%;
    }
}

@media screen and (max-width: 528px) {
    .trendingContainerCardsInvisible {
        width: 30%;
    }
}
</style>