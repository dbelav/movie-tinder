<script setup lang="ts">
import { useMovieItem } from '../../stores/movieItem';
import { ref } from 'vue'
import { useStorage } from '@vueuse/core'

const store = useMovieItem();

const showPhoto = ref(false);
const currentActorPhoto = ref('');

function showActorPhoto(photoUrl: string) {
    currentActorPhoto.value = photoUrl;
    showPhoto.value = true;
}

function hideActorPhoto() {
    showPhoto.value = false;
}
</script> 

<template v-if="store.actorsMovieData">
    <div class="movieActorsContainer">
        <span class="movieActorsContainerTitle">Actors: </span>
        <div class="movieActorsItem" v-for="(actor, index) in store.get6Actors" :key="actor.node.name.id">
            <div class="movieActorsItemImage" v-if="currentActorPhoto === actor.node.name.primaryImage?.url && showPhoto">
                <img :src="currentActorPhoto" alt="">
            </div>
            <a class="movieActorsItemLink" href="#" v-if="actor.node.name && actor.node.name.primaryImage"
                @mouseover="showActorPhoto(actor.node.name.primaryImage.url)" @mouseleave="hideActorPhoto">

                {{ index < 5 ? (actor.node.name.nameText.text + ',') : actor.node.name.nameText.text }} </a>
        </div>
    </div>
</template>

<style scoped lang="scss">  .movieActorsContainer {
      width: 100%;
      display: flex;
      flex-wrap: wrap;

      .movieActorsContainerTitle {
          font-weight: 600;
            margin-right: 5px;
      }

      .movieActorsItem {
          margin-right: 5px;
          display: flex;
          flex-direction: column;
          position: relative;
          display: flex;
          justify-content: center;

          .movieActorsItemLink{
            color: #fff;
          }

          .movieActorsItemImage {
              width: 100%;
              position: absolute;
              bottom: 40px;

              img {
                  width: 180px;
              }

          }
      }
  }
</style>
