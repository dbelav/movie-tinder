<script setup lang="ts">
import { useHttp } from '../../hooks/useHtpp'
import { useRouter } from 'vue-router';
import { onMounted, onUpdated } from 'vue'
import type { ActorInfoResponce } from '../../types/actorsPage'
import type { ApiResponseMini } from '../../types/miniInfoTypes'
import { useActors } from '../../stores/actors'
import { useStorage } from '@vueuse/core'
import MovieCard from '../movieCard/MovieCard.vue';


const { request } = useHttp()
const store = useActors()
const router = useRouter();

const localStorage = useStorage('currentActorId', '');

onMounted(async () => {
    store.isLoadingActorInfo()

    const response = await request(`https://moviesdatabase.p.rapidapi.com/actors/${localStorage.value}`) as Promise<ActorInfoResponce>

    if ((await response).results) {
        store.getDataActorInfo(await response)
    } else {
        store.isErrorActorInfo()
    }
})

onUpdated(async () => {
    if (store.actorInfoData) {

        store.isLoadingActorTitles()

        const response = await request(`https://moviesdatabase.p.rapidapi.com/titles/x/titles-by-ids?idsList=${store.actorInfoData.results.knownForTitles}`) as Promise<ApiResponseMini>

        if ((await response).results) {
            store.getDataActorTitles(await response)
        } else {
            store.isErrorActorTitles()
        }
    }
})


</script>

<template>
    <div class="actorInfoContainer" v-if="store.actorInfoData?.results">
        <div class="actorInfoContainerInner">
            <div class="actorInfoImage">
                <img src="../../assets/actorAvatar.jpg" alt="">
            </div>

            <div class="actorInfoBody">
                <div class="actorInfoBodyContainer">
                    <div class="actorInfoBodyName actorInfoBodyItem">
                        <h2>{{ store.actorInfoData.results.primaryName }}</h2>
                    </div>

                    <div class="actorInfoBodyItem">
                        <strong>Birth Year: </strong>
                        <span>{{ store.actorInfoData.results.birthYear }}</span>
                    </div>
                    <div class="actorInfoBodyItem">
                        <strong>Death Year: </strong>
                        <span>{{ store.actorInfoData.results.deathYear }}</span>
                    </div>
                    <div class="actorInfoBodyItem">
                        <strong> Primary Profession: </strong>
                        <span>{{ store.actorInfoData.results.primaryProfession?.split(',').join(', ') }}</span>
                    </div>
                </div>
            </div>
            <div class="actorInfoBodyTitles" v-if="store.actorTitlesData">
                <div class="actorInfoBodyTitlesItem" v-for="movie in store.actorTitlesData?.results">
                    <MovieCard :dataMovie="movie" width="100%" />
                </div>
            </div>

        </div>


    </div>
</template>

<style lang="scss">
.actorInfoContainer {
    width: 100%;
    min-height: 100vh;
    padding-top: 100px;
    display: flex;
    justify-content: center;
    font-size: 18px;

    .actorInfoContainerInner {
        width: 90%;
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        align-content: start;

        .actorInfoImage {
            width: 30%;
            height: 30%;

            img {
                width: 100%;
            }
        }

        .actorInfoBody {
            width: 70%;
            height: 30%;
            display: flex;
            flex-direction: column;
            color: #fff;
            display: flex;
            align-items: center;
            margin-bottom: 150px;

            .actorInfoBodyContainer {
                width: 90%;

                .actorInfoBodyName {

                    h2 {
                        font-size: 30px;
                        margin: 0;
                        margin-bottom: 30px;
                    }
                }

                .actorInfoBodyItem {
                    margin-bottom: 20px;
                }
            }
        }

        .actorInfoBodyTitles {
            width: 100%;
            display: flex;
            justify-content: space-between;

            .actorInfoBodyTitlesItem {
                width: 20%;
            }
        }
    }
}
</style>