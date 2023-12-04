<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';
import BurgerNavbar from '../../assets/BurgerNavbar.vue';
import { defineProps } from 'vue';
import { useStorage } from '@vueuse/core'


const localStorageAccess = useStorage('access_token', '');
const localStorageRefresh = useStorage('refresh_token', '')
const props = defineProps(['isOpenLeftNavbar', 'toggleNavbar'])
const route = useRoute();

function isRouteActive(path: string): boolean {
    return route.path === path;
}

const optionRoutes = [
    {
        url: '/',
        img: 'http://localhost:5173/src/assets/mainPage.png',
        name: 'Main Page'
    },
    {
        url: '/movies',
        img: 'http://localhost:5173/src/assets/movie.png',
        name: 'Movies'
    },
    {
        url: '/actors/1',
        img: 'http://localhost:5173/src/assets/actor.png',
        name: 'Actors'
    },
    {
        url: '/favorites',
        img: 'http://localhost:5173/src/assets/favorite.png',
        name: 'Favorites'
    },
    {
        url: '/tinder',
        img: 'http://localhost:5173/src/assets/tinder.png',
        name: 'Tinder'
    },
]

function logOut(){
    localStorageAccess.value = ''
    localStorageRefresh.value = ''
}

</script>

<template>
    <div class="leftNavbarContainer" :class="{ 'leftNavbarContainerOpen': props.isOpenLeftNavbar }">
        <div class="leftNavbarContainerInner">
            <div class="leftNavbarBurgerContainer">
                <BurgerNavbar :isOpenLeftNavbar="props.isOpenLeftNavbar" :toggleNavbar="props.toggleNavbar" />
            </div>
            <div class="leftNavbarContainerLinksContainer">
                <div class="leftNavbarLinks">
                    <template v-for="item in optionRoutes">
                        <RouterLink :to="item.url" class="leftNavbarContainerGeneral"
                            :class="{ 'active': isRouteActive(item.url), 'leftNavbarContainerGeneralOpen': props.isOpenLeftNavbar }">
                            <img :src="item.img" />
                            <span>{{ item.name }}</span>
                        </RouterLink>
                    </template>
                </div>

                <div class="leftNavbarSettingLogout" :class="{ 'leftNavbarSettingLogoutOpen': props.isOpenLeftNavbar }">
                    <button class="leftNavbarLogoutLink leftNavbarContainerGeneral" @click="logOut">Logout</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.leftNavbarContainer {
    width: 120px;
    height: 100vh;
    background-color: #14131a;
    display: flex;
    color: #fff;
    font-size: 18px;
    box-shadow: 2px 0px 90px 0px #6100C266; 
    position: fixed;
    transition: 0.3s;
    z-index: 3;

    .leftNavbarContainerInner {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;


        .leftNavbarBurgerContainer {
            margin-top: 20px;
            margin-bottom: 100px;
            display: flex;
            justify-content: center;
        }

        .leftNavbarContainerLinksContainer {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 80%;

            .leftNavbarLinks {
                width: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;


                .leftNavbarContainerGeneral {
                    padding: 10px;
                    text-decoration: none;
                    color: #fff;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    transition: 0.3s;
                    justify-content: center;

                    img {
                        margin-right: 10px;
                        width: 40px;
                        transition: 0.3s;
                    }

                    span {
                        display: none;
                    }
                }

                .leftNavbarContainerGeneralOpen {
                    justify-content: flex-start;

                    span {
                        display: inline;
                    }

                    img {
                        width: 32px;
                    }
                }

                .leftNavbarContainerGeneral.active {
                    background-color: #333;
                }
            }
        }

        .leftNavbarSettingLogout {
            display: flex;
            justify-content: center;
            margin-bottom: 50px;

            button {
                display: none;
                padding: 10px;
                text-decoration: none;
                color: #fff;
                font-weight: 700;
                transition: 0.3s;
                background-color: transparent;
                border: none;
                font-size: 18px;
                cursor: pointer;
            }
        }

        .leftNavbarSettingLogoutOpen {

            button {
                display: block;
            }
        }
    }
}

.leftNavbarContainerOpen {
    width: 200px;
}


@media screen and (max-width: 950px) {
    .leftNavbarContainer {
        width: 100px;

        .leftNavbarContainerInner {
            .leftNavbarContainerLinksContainer {
                .leftNavbarLinks {
                    .leftNavbarContainerGeneral {
                        img {
                            width: 30px;
                        }
                    }

                    .leftNavbarContainerGeneralOpen {
                        img {
                            width: 22px;
                        }
                    }
                }
            }
        }
    }

    .leftNavbarContainerOpen {
        width: 150px;
    }
}

@media screen and (max-width: 700px) {
    .leftNavbarContainer {
        width: 100px;
        background-color: transparent;
        box-shadow: none;

        .leftNavbarContainerInner {
            .leftNavbarContainerLinksContainer {
                display: none;

                .leftNavbarLinks {
                    .leftNavbarContainerGeneral {
                        img {
                            width: 30px;
                        }
                    }

                    .leftNavbarContainerGeneralOpen {
                        img {
                            width: 22px;
                        }
                    }
                }
            }
        }
    }

    .leftNavbarContainerOpen {
        width: 150px;
        background-color: #14131a;
        box-shadow: 2px 0px 90px 0px #6100C266;

        .leftNavbarContainerInner {
            .leftNavbarContainerLinksContainer {
                display: flex;
            }
        }
    }
}
</style>
