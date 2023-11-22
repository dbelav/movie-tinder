<script lang="ts" setup>
import type { ActorsApiResponse } from '../../types/actorsPage'
import { useActors } from '../../stores/actors'
import { onMounted } from 'vue'
import { useHttp } from '../../hooks/useHtpp'
import { useRouter, RouterLink } from 'vue-router';
import { ref } from 'vue'
import { useStorage } from '@vueuse/core'



const { request } = useHttp()
const store = useActors()
const router = useRouter();
const localStorage = useStorage('currentActorId', '');

const currentIdPage = ref(router.currentRoute.value.params.page as string);

function renderPage(currentPage: number) {
    const arrPage = [currentPage - 1, currentPage, currentPage + 1]
    const minPage = 1
    const maxPage = 50

    const filteredPages = arrPage.filter(page => page >= minPage && page <= maxPage)
    const result = [minPage, ...filteredPages, maxPage]

    return [...new Set(result)]
}

async function getActors(page: string) {
    store.isLoadingActors()

    const response = await request(`https://moviesdatabase.p.rapidapi.com/actors?page=${page}&limit=30`) as Promise<ActorsApiResponse>

    if ((await response).results) {
        store.getDataActors(await response)
    } else {
        store.isErrorActors()
    }
    console.log(response)
}

const navigateToPage = async (page: string) => {
    await getActors(page);
    router.push(`/actors/${page}`)
    currentIdPage.value = page
};

onMounted(async () => {
    getActors(currentIdPage.value)
})
</script>

<template>
    <div class="actorsContainer" v-if="store.actorsData">
        <div class="actorsContainerInner">
            <div class="actorsContainerInnerTitle">
                <h1 class="actorsContainerInnerTitle">All Actors</h1>
            </div>
            <RouterLink :to="`/actors/actorInformation/${actor.primaryName.replace(/\s/g, '')}`"
                v-for="actor in store.actorsData?.results" @click="localStorage = `${actor.nconst}`" class="actorItem">

                <div class="actorItemImage">
                    <img src="../../assets/actorAvatar.jpg" alt="">
                </div>
                <div class="actorItemName">
                    <h2>{{ actor.primaryName }}</h2>
                </div>
            </RouterLink>

            <div class="actorsPageNumberContainer">
                <div class="actorsPageNumberItem" v-for="page in renderPage(+currentIdPage)">
                    <button @click="navigateToPage(page.toString())"
                        :class="[page === +currentIdPage ? 'actorsPageNumberItemActive' : '']">{{ page }}</button>
                </div>
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
        }

        .actorsPageNumberContainer {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;

            .actorsPageNumberItem {

                display: flex;
                justify-content: center;
                align-items: center;
                margin: 0 7px;

                button {
                    text-decoration: none;
                    color: #fff;
                    padding: 20px;
                    border: 2px solid #fff;
                    background-color: transparent;
                }

                .actorsPageNumberItemActive {
                    border: 3px solid #fff;
                    padding: 22px;
                }
            }
        }
    }
}
</style>