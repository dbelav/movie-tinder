<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';
import BurgerNavbar from '../../assets/BurgerNavbar.vue';
import { defineProps } from 'vue';

const props = defineProps(['isOpenLeftNavbar', 'toggleNavbar'])
const route = useRoute();

function isRouteActive(path: string): boolean {
    return route.path === path;
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
                    <RouterLink to="/" class="leftNavbarContainerGeneral"
                        :class="{ 'active': isRouteActive('/'), 'leftNavbarContainerGeneralOpen': props.isOpenLeftNavbar }">
                        <img src="../../assets/mainPage.png" />
                        <span :class="{ 'leftNavbarLinksItemShow': props.isOpenLeftNavbar }">Main Page</span>

                    </RouterLink>
                    <RouterLink to="/movies" class="leftNavbarContainerGeneral"
                        :class="{ 'active': isRouteActive('/movies'), 'leftNavbarContainerGeneralOpen': props.isOpenLeftNavbar }">
                        <img src="../../assets/movie.png" />
                        <span :class="{ 'leftNavbarLinksItemShow': props.isOpenLeftNavbar }">Movies</span>
                    </RouterLink>
                    <RouterLink to="/actors/1" class="leftNavbarContainerGeneral"
                        :class="{ 'active': isRouteActive('/actors/1'), 'leftNavbarContainerGeneralOpen': props.isOpenLeftNavbar }">
                        <img src="../../assets/actor.png" />
                        <span :class="{ 'leftNavbarLinksItemShow': props.isOpenLeftNavbar }">Actors</span>
                    </RouterLink>
                    <div class="leftNavbarContainerGeneral">
                        <img src="../../assets/favorite.png" />
                        <span :class="{ 'leftNavbarLinksItemShow': props.isOpenLeftNavbar }">Favourites</span>
                    </div>
                    <div class="leftNavbarContainerGeneral">
                        <img src="../../assets/tinder.png" />
                        <span :class="{ 'leftNavbarLinksItemShow': props.isOpenLeftNavbar }">Tinder</span>
                    </div>
                </div>

                <div class="leftNavbarSettingLogout">
                    <div class="leftNavbarSettingLink leftNavbarContainerGeneral">Setting</div>
                    <div class="leftNavbarLogoutLink leftNavbarContainerGeneral">Logout</div>
                </div>
            </div>

        </div>
    </div>
</template>

<style scoped lang="scss">
.leftNavbarContainer {
    width: 120px;
    height: 100vh;
    // background-color: #21201E;
    background-color: #14131a;
    display: flex;
    color: #fff;
    font-size: 18px;
    box-shadow: 2px 0px 90px 0px #6100C266;
    position: fixed;
    transition: 0.3s;

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
    }
}

.leftNavbarContainerOpen {
    width: 200px;
}
</style>
