<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { ref } from 'vue'
import { useHttp } from '../../hooks/useHtpp'


// const username = ref('')
// const password = ref('')
// const { request } = useHttp()

// async function clickSignUp() {
//     console.log(username.value, password.value )
//     const responce = await request('http://localhost:8000/auth/register', 'POST', {
//         "username": username.value,
//         "password": password.value
//     })
//     // const responce1 = await fetch('http://localhost:8000/auth/register', 'POST', {
//     //     "username": username.value,
//     //     "password": password.value
//     // }, {})
//     console.log(responce)
// }
const username = "asdasddddd";
const password = "dsadasddddddd";

const url = 'http://localhost:8000/auth/register';
const data = {
    "username": username,
    "password": password
};

const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        mode: 'no-cors'
    },
    body: JSON.stringify({
        "username": username,
        "password": password
    })
};

async function asd() {
    console.log(requestOptions)
    const response = await fetch(url, requestOptions);
    console.log(response)
}



</script>

<template>
    <div class="authRegisterContainer">
        <div class="authRegisterContainerInner">
            <h2 class="authRegisterTitle">Sign Up</h2>
            <div class="authRegisterBody">
                <form class="authRegisterForm" @submit.prevent>
                    <input type="text" placeholder="Username" v-model="username">
                    <input type="password" placeholder="Password" v-model="password">
                    <button @click="asd">Sign Up</button>
                </form>
            </div>
            <div class="authRegisterRedirect">
                <RouterLink to="/login" class="authRegisterRedirectLink">Already have an account?</RouterLink>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.authRegisterContainer {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    .authRegisterContainerInner {
        width: 300px;
        padding: 0 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #14131a;

        .authRegisterTitle {
            color: #fff;
            margin-top: 40px;
            margin-bottom: 30px;
        }

        .authRegisterBody {
            width: 90%;
            margin-bottom: 30px;

            .authRegisterForm {
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

        .authRegisterRedirect {
            width: 100%;
            display: flex;
            justify-content: center;
            margin-bottom: 40px;

            .authRegisterRedirectLink {
                color: #fff;
            }
        }
    }
}
</style>