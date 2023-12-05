<script setup lang="ts">
import { useHttp } from '../../hooks/useHtpp'
import { useStorage } from '@vueuse/core'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router';
import SignIn from '../../components/signIn/SignIn.vue';
import MovieCard from '../../components/movieCard/MovieCard.vue';
import { usetinderRoom } from '../../stores/tinderRoom'
import { UseGetMovieData } from '../../hooks/UseGetMovieData'
import { collapseTextChangeRangesAcrossMultipleVersions, isConstructorTypeNode } from 'typescript';
// import { WebSocket } from 'vite';

const { request } = useHttp()
const route = useRoute().path.split('/').pop();
const localStorageAccess = useStorage('access_token', '');
const localStorageUserId = useStorage('userid', '');
const store = usetinderRoom()
const currentMovie = ref(0)
const likeOrDislike = ref()
const matchId = ref(false)
let socket

onMounted(async () => {
    const response = await request(`http://localhost:8000/movies/tinder/lobby/${route}/join`, 'GET', null, {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorageAccess.value}`
    })

    const responceId = await request(`http://localhost:8000/auth/me`, 'GET', null, {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorageAccess.value}`
    })
    localStorageUserId.value = responceId.id

    if (response.message) {
        await UseGetMovieData(response.film_api_url,
            store.dataLoading,
            store.getData,
            store.dataError)
            console.log(store.tinderMovieData)

        if (!store.tinderMovieDataError) {
            socket = new WebSocket(`ws://localhost:8000/movies/tinder/lobby/${route}`);

            socket.addEventListener('open', () => {
                console.log('WebSocket connection opened');
            });
            socket.addEventListener('message', async (event) => {
                const responceMovieMatch = await request(`https://moviesdatabase.p.rapidapi.com/titles/${event.data}`)
                store.tinderMovieMatchGetData(responceMovieMatch)
            });
        }
    }
})

function clickLike() {
    likeOrDislike.value = true
    socket.send(JSON.stringify({
        user_id: localStorageUserId.value,
        movie_id: store.tinderMovieData?.results[currentMovie.value].id
    }))
    currentMovie.value++
}

function clickDisLike() {
    likeOrDislike.value = false
    currentMovie.value++
}


const anim = ref(false)
const beforeEnter = (el) => {
    anim.value = true
    el.style.transform = 'translateX(0)';
    el.style.opacity = '1';
};

const enter = (el, done) => {
    el.style.transform = 'translateX(0)';
    el.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
    el.style.opacity = '1';
    done();

};

const leave = (el, done) => {
    el.style.transition = 'transform 0.5s ease, opacity 0.5s ease';

    if (likeOrDislike.value) {
        el.style.transform = 'translateX(300px)';
    } else {
        el.style.transform = 'translateX(-300px)';
    }
    el.style.opacity = '0';

    el.addEventListener('transitionend', done);

    console.log(3)
};
const afterLeave = (el) => {
    anim.value = false

};
</script>


<template>
    <div class="tinderRoomContainer">
        <div class="tinderRoomContainerInner">
            <div class="tinderRoomMatch" v-if="store.tinderMovieMatch">
                {{ console.log(store.tinderMovieMatch) }}
                <h2>You have match on this movie</h2>
                <MovieCard :data-movie="store.tinderMovieMatch.results" w />
            </div>
            <template v-else>
                <SignIn v-if="!localStorageAccess" />
                <template v-else-if="localStorageAccess && store.tinderMovieData">
                    <transition name="tinder-card" @before-enter="beforeEnter" @enter="enter" @leave="leave"
                        @after-leave="afterLeave">
                        <div :key="store.tinderMovieData.results[currentMovie].id" class="tinderRoomMovie">
                            <MovieCard :data-movie="store.tinderMovieData.results[currentMovie]" v-if="!anim" />
                        </div>
                    </transition>

                    <div class="tinderRoomButtons">
                        <button class="tinderRoomButtonDisLike" @click="clickDisLike">Dislike</button>
                        <button class="tinderRoomButtonLike" @click="clickLike">Like</button>
                    </div>
                </template>
            </template>

        </div>
    </div>
</template>


<style lang="scss">
.tinderRoomMovie {
    width: 40%;
}

.tinderRoomContainer {
    width: 100%;
    display: flex;
    justify-content: center;

    .tinderRoomContainerInner {
        width: 90%;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        margin-top: 100px;

        .tinderRoomMatch {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;

            h2 {
                color: #fff;
            }

            .movieCard {
                width: 25%;
                height: 700px;
            }

        }

        .tinderRoomMovie {
            width: 100%;
            display: flex;
            justify-content: center;

            .tinder-card-enter-active,
            .tinder-card-leave-active {
                transition: all 0.5s ease-in-out;
            }

            .tinder-card-enter,
            .tinder-card-leave-to {
                opacity: 0;

            }

            .tinder-card-enter-to,
            .tinder-card-leave {
                opacity: 1;

            }
        }

        .tinderRoomButtons {
            width: 100%;
            display: flex;
            justify-content: center;
            margin-top: 50px;
            z-index: 5;

            button {
                height: 50px;
                width: 100px;
                color: #fff;
                font-size: 19px;
                font-weight: 600;
                border: none;
                border-radius: 7px;
                cursor: pointer;
                margin: 0 30px;
            }

            .tinderRoomButtonDisLike {
                background-color: #931212;
            }

            .tinderRoomButtonLike {
                background-color: #348c10;
            }
        }
    }
}
</style>