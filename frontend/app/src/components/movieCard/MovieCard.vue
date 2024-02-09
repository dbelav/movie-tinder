<script setup lang="ts">
import { defineProps, onMounted, ref } from 'vue'
import AddToFavourites from '../addToFavourites/AddToFavourites.vue'
import { RouterLink } from 'vue-router'
import { useStorage } from '@vueuse/core'
import type { IMovie } from '../../types/miniInfoTypes'


interface Actor {
    caption: {
        plainText: string;
    }
}

const props = defineProps<{ dataMovie: IMovie, width?: string, height?: string }>()
const localStorage = useStorage('currentIdMovie', '')
const imageSrc = ref<string>('')

onMounted(async () => {
    try {
        imageSrc.value = await checkIsImage(props.dataMovie.primaryImage?.url)
    } catch (error) {
        imageSrc.value = 'http://localhost:5173/src/assets/noImageData.jpg'
    }
})

const formatActors = (actors: Actor | null) => {
    if (actors) {
        if (actors.caption.plainText && actors.caption.plainText.length > 3) {
            return actors.caption.plainText.split(', ').slice(0, 3).join(', ') + '...'
        }
    }
    else {
        return ''
    }
};

function goToMovieInfo(id: string) {
    localStorage.value = id
}

async function checkIsImage(imageUrl: string | undefined): Promise<string> {
    if (!imageUrl) {
        return 'http://localhost:5173/src/assets/noImageData.jpg'
    }

    return new Promise<string>((resolve) => {
        const img = new Image()

        img.onload = () => {
            resolve(imageUrl)
        }
        img.onerror = (e) => {
            resolve('http://localhost:5173/src/assets/noImageData.jpg');
        }
        img.src = imageUrl
    })
}
</script>

<template>
    <div class="movieCard" v-if="props.dataMovie" :style="{
        width: props.width, height: props.height,
        'background-image': `url(${imageSrc})`
    }">
        <AddToFavourites class="addToFavourites" :id="props.dataMovie.id" />
        <RouterLink :to="`/movies/${props.dataMovie.originalTitleText.text.replace(/\s/g, '')}`" class="movieCardbody"
            @click="goToMovieInfo(props.dataMovie.id)">
            <div class=" movieCardbodyTopContainer">
                <h3>{{ props.dataMovie.originalTitleText.text }}</h3>
            </div>
            <div class="movieCardbodyBottomContainer">

                <div class="movieCardbodyBottomContainerActors"><span>{{
                    formatActors(props.dataMovie.primaryImage)
                }}</span></div>
                <div class="movieCardbodyBottomContainerYear">{{ props.dataMovie.releaseDate?.year }}</div>
            </div>

        </RouterLink>
    </div>
</template>

<style scoped lang="scss">
.movieCard {
    width: 18%;
    height: 400px;
    background-size: no-repeat;
    background-position: center;
    background-size: cover;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
    position: relative;
    border-radius: 15px;
    border: 1px;
    margin: 15px 0;

    .addToFavourites {
        display: none;
        position: absolute;
        right: 10px;
        top: 10px;
    }

    &:hover {
        .addToFavourites {
            display: block;
        }

        .movieCardbody {
            display: flex;
        }
    }

    .movieCardbody {
        height: 100%;

        display: none;
        flex-direction: column;
        align-items: center;
        width: 100%;
        border-radius: 15px;
        align-items: center;
        padding-left: -20px;
        background-color: rgba(0, 0, 0, 0.411);
        transition: 0.3s;
        text-decoration: none;
        color: #fff;

        .movieCardbodyTopContainer {
            height: 50%;
            display: flex;
            justify-content: center;
            align-items: center;

            h3 {
                margin: 0;
                margin-top: 10px;
                font-size: 28px;
                margin-bottom: 5px;
                padding-left: 0 5px;
                transition: opacity 0.9s;
                color: #fff;
                text-align: center;

            }
        }

        .movieCardbodyBottomContainer {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            height: 50%;
            padding: 0 5px;

            .movieCardbodyBottomContainerActors {
                display: flex;
                justify-content: center;
                width: 90%;
            }

            .movieCardbodyBottomContainerYear {
                margin-bottom: 10px;
                font-weight: 600;
            }
        }
    }
}

@media screen and (max-width: 1780px) {
    .movieCard {
        height: 350px;

        .movieCardbody {
            .movieCardbodyTopContainer {
                h3 {
                    font-size: 24px;
                    margin-top: 20px;
                }
            }
        }
    }
}

@media screen and (max-width: 1550px) {
    .movieCard {
        height: 300px;

        .movieCardbody {
            .movieCardbodyTopContainer {
                h3 {
                    font-size: 23px;

                }
            }
        }
    }
}

@media screen and (max-width: 1368px) {
    .movieCard {
        height: 250px;

        .movieCardbody {
            .movieCardbodyTopContainer {
                height: 60%;

                h3 {
                    font-size: 20px;
                    margin-top: 30px;
                }
            }

            .movieCardbodyBottomContainer {
                height: 40%;

                .movieCardbodyBottomContainerActors {
                    font-size: 14px;
                }

                .movieCardbodyBottomContainerYear {
                    font-size: 15px;
                }
            }
        }
    }
}

@media screen and (max-width: 1100px) {
    .movieCard {
        width: 23%;
    }
}

@media screen and (max-width: 950px) {
    .movieCard {
        height: 220px;

        .movieCardbody {
            .movieCardbodyTopContainer {
                h3 {
                    font-size: 17px;
                }
            }

            .movieCardbodyBottomContainer {
                .movieCardbodyBottomContainerActors {
                    font-size: 13px;
                }

                .movieCardbodyBottomContainerYear {
                    font-size: 14px;
                }
            }
        }
    }
}

@media screen and (max-width: 800px) {
    .movieCard {
        height: 200px;

        .movieCardbody {
            .movieCardbodyTopContainer {
                h3 {
                    font-size: 15px;
                }
            }

            .movieCardbodyBottomContainer {
                .movieCardbodyBottomContainerActors {
                    font-size: 12px;
                }

                .movieCardbodyBottomContainerYear {
                    font-size: 13px;
                }
            }
        }
    }
}

@media screen and (max-width: 580px) {
    .movieCard {
        height: 180px;
    }
}

@media screen and (max-width: 528px) {
    .movieCard {
        height: 180px;
        width: 30%;
    }
}

@media screen and (max-width: 450px) {
    .movieCard {
        height: 150px;

        .movieCardbody {
            .movieCardbodyTopContainer {
                h3 {
                    margin-top: 70px;
                    height: 70%;
                    font-size: 14px;
                }
            }

            .movieCardbodyBottomContainer {
                justify-content: flex-end;
                height: 30%;

                .movieCardbodyBottomContainerActors {
                    display: none;
                }

                .movieCardbodyBottomContainerYear {
                    margin-bottom: 0;
                }
            }
        }
    }
}
</style>
