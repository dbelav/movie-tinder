<script setup lang="ts">
import AddToFavourites from '../addToFavourites/AddToFavourites.vue';
import { defineProps } from 'vue';
import { ApiResponseMini } from '../../types/miniInfoTypes'
import { RouterLink, useRoute } from 'vue-router';
import { useStorage } from '@vueuse/core'
import { Skeletor } from "vue-skeletor";
import "vue-skeletor/dist/vue-skeletor.css";


const props = defineProps<{ trendingMovie: ApiResponseMini | undefined, loading: boolean }>();
const localStorage = useStorage('currentIdMovie', '');

function goToMovieInfo(id: string) {
  localStorage.value = id
}
</script>

<template>
  <Skeletor class="homeBannerLoading" v-if="props.loading" />

  <div class="homeBanner" :style="{ backgroundImage: `url(${props.trendingMovie.results[0].primaryImage?.url})` }"
    v-if="!props.loading && props.trendingMovie">
    <div class="homeBannerBody">
      <div class="homeBannerBodyTitle">
        <span>{{ props.trendingMovie.results[0].originalTitleText.text }}</span>
      </div>
      <div class="homeBannerBodyInfo">
      </div>
      <div class="homeBannerBodyLink">
        <div class="homeBannerBodyLinkButton">
          <RouterLink :to="`/movies/${props.trendingMovie.results[0].originalTitleText.text.replace(/\s/g, '')}`"
            @click="goToMovieInfo(props.trendingMovie.results[0].id)">Watch Now</RouterLink>
        </div>
        <AddToFavourites width="67px" height="54px" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.homeBannerLoading {
  height: 700px;
  border-radius: 0;
}

.homeBanner {
  height: 700px;
  background-size: no-repeat;
  background-position: center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  color: #fff;
  width: 100%;

  .homeBannerBody {
    margin-left: 100px;
    margin-bottom: 70px;
    width: 300px;

    .homeBannerBodyTitle {
      font-size: 48px;
      font-weight: 600;
      line-height: 48px;
      letter-spacing: 0em;
      text-align: left;
      margin-bottom: 20px;
    }

    .homeBannerBodyInfo {
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      letter-spacing: 0em;
      text-align: left;
      margin-bottom: 30px;
    }

    .homeBannerBodyLink {
      display: flex;

      .addToFavouritesButton {
        position: static;
      }

      .homeBannerBodyLinkButton {

        width: 139px;
        height: 54px;
        padding: 17px, 24px, 17px, 24px;
        border-radius: 14px;
        gap: 12px;
        background-color: #6100C2;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 14px;

        a {
          text-decoration: none;
          color: #fff;
        }
      }
    }
  }
}
</style>
