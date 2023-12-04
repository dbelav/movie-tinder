<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { ref } from 'vue'
import { useHttp } from '../../hooks/useHtpp'
import { useStorage } from '@vueuse/core'


const localStorageAccess = useStorage('access_token', '');
const username = ref('')
const password = ref('')
const errorRegister = ref('')
const successfulRegister = ref(false)

const { request } = useHttp()

async function clickSignUp() {
    const response = await request('http://localhost:8000/auth/register', 'POST', JSON.stringify({
        username: username.value,
        password: password.value,
    }));
    if (response.message) {
        successfulRegister.value = true
        errorRegister.value = ''
    }
    else if(response.status === 422){
        errorRegister.value = 'Validation Error'
        successfulRegister.value = false
    } 
}

</script>

<template>
    <div class="authRegisterContainer">
        <div class="authRegisterContainerInner">
            <h2 class="authRegisterTitle" v-if="localStorageAccess">You are already signed in</h2>
            <template v-else>
                <h2 class="authRegisterTitle">Sign Up</h2>
                <div class="authRegisterBody">
                    <form class="authRegisterForm" @submit.prevent>
                        <input type="text" placeholder="Username" v-model="username">
                        <input type="password" placeholder="Password" v-model="password">
                        <button @click="clickSignUp">Sign Up</button>
                        <span class="authMessageError" v-if="errorRegister">{{ errorRegister }}</span>
                        <span class="authMessageSuccessful" v-if="successfulRegister">Successful Register</span>
                    </form>
                </div>
                <div class="authRegisterRedirect">
                    <RouterLink to="/login" class="authRegisterRedirectLink">Already have an account?</RouterLink>
                </div>
            </template>
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

                .authMessageError{
                    color: #d62020;
                    font-size: 18px;
                }

                .authMessageSuccessful{
                    color: #26db73;
                    font-size: 18px;
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