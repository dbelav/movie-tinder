<script lang="ts" setup>
import type { ActorsApiResponse } from '../../types/actorsPage'
import { useActors } from '../../stores/actors'
import { onMounted } from 'vue'
import { useHttp } from '../../hooks/useHtpp'
import { RouterLink } from 'vue-router';


const store = useActors()
const { request } = useHttp()

async function getActors(page: number) {
    store.isLoadingActors()

    const response = await request(`https://moviesdatabase.p.rapidapi.com/actors?page=${page}&limit=30`) as Promise<ActorsApiResponse>

    if ((await response).results) {
        store.getDataActors(await response)
    } else {
        store.isErrorActors()
    }
    console.log(response)
}

onMounted(async () => {
    getActors(2)

})
</script>

<template>
    <div class="actorsContainer" v-if="store.actorsData">
        <div class="actorsContainerInner">
            <div class="actorsContainerInnerTitle">
                <h1 class="actorsContainerInnerTitle">All Actors</h1>
            </div>
            <a href="#" class="actorItem" v-for="actor in store.actorsData?.results">
                <div class="actorItemImage">
                    <img src="../../assets/actorAvatar.jpg" alt="">
                </div>
                <div class="actorItemName">
                    <h2>{{ actor.primaryName }}</h2>
                </div>
            </a>

            <div class="actorsPageNumber" v-for="index in 51">
                <a href="#"></a>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.actorsContainer {
    min-height: 100vh;
    padding-top: 100px;
    width: 100%;
    color: #fff;
    display: flex;
    justify-content: center;

    .actorsContainerInner {
        width: 90%;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        .actorsContainerInnerTitle {
            margin-bottom: 50px;
            width: 100%;
            height: 100px;
        }

        .actorItem {
            width: 18%;
            margin-bottom: 50px;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-decoration: none;
            color: #fff;

            &:hover {
                .actorItemImage {
                    filter: blur(4px);
                }
            }



            .actorItemImage {
                width: 100%;
                transition: 0.3s;

                img {
                    width: 100%;
                }
            }

            .actorItemName {}

        }
    }



}
</style>