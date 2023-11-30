<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { ref } from 'vue'
import { useHttp } from '../../hooks/useHtpp'

const username = ref('')
const password = ref('')
const { request } = useHttp()

async function clickSignIn() {
    const response = await request('http://localhost:8000/auth/login', 'POST', JSON.stringify({
        username: username.value,
        password: password.value,
    }));
    console.log(response)
}
</script>

<template>
    <div class="authLoginContainer">
        <div class="authLoginContainerInner">
            <h2 class="authLoginTitle">Sign In</h2>
            <div class="authLoginBody">
                <form class="authLoginForm" @submit.prevent>
                    <input type="text" placeholder="Username" v-model="username">
                    <input type="password" placeholder="Password" v-model="password">
                    <button @click="clickSignIn">Sign In</button>
                </form>
            </div>
            <div class="authLoginRedirect">
                <RouterLink to="/register" class="authLoginRedirectLink">Don`t have an account?</RouterLink>
            </div>

        </div>
    </div>
</template>

<style lang="scss">
.authLoginContainer {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    .authLoginContainerInner {
        width: 300px;
        padding: 0 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #14131a;

        .authLoginTitle {
            color: #fff;
            margin-top: 40px;
            margin-bottom: 30px;
        }

        .authLoginBody {
            width: 90%;
            margin-bottom: 30px;

            .authLoginForm {
                width: 100%;
                display: flex;
                flex-direction: column;

                input {
                    height: 30px;
                    background-color: #31303b;
                    border: 1px solid #ffffff3d;
                    border-radius: 8px;
                    padding: 26px;
                    font-size: 18px;
                    color: #fff;
                    box-sizing: border-box;
                    margin-bottom: 20px;
                }

                button {
                    height: 40px;
                    background-color: #31303b;
                    color: #fff;
                    font-size: 16px;
                    border: none;
                    border-radius: 7px;
                    cursor: pointer;
                    padding: 0 25px;
                    font-size: 18px;
                    align-self: flex-end;
                }
            }
        }

        .authLoginRedirect {
            width: 100%;
            display: flex;
            justify-content: center;
            margin-bottom: 40px;

            .authLoginRedirectLink {
                color: #fff;
            }
        }
    }
}
</style>