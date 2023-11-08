<script setup lang="ts">
import AddToFavourites from '../addToFavourites/AddToFavourites.vue';
import { defineProps } from 'vue';
import { IMovie } from '../../types/types'
import UseForGenres from '../../hooks/UseForGenres.vue';

const props = defineProps<{ trendingMovie: IMovie }>();

</script>

<template>
  <div class="homeBanner" :style="{ backgroundImage: `url(${props.trendingMovie.poster_url})` }">
    <div class="homeBannerBody">
      <div class="homeBannerBodyTitle">
        <span>{{ props.trendingMovie.title }}</span>
      </div>
      <div class="homeBannerBodyInfo">
        <UseForGenres :genres="props.trendingMovie.genres" />
      </div>
      <div class="homeBannerBodyLink">
        <div class="homeBannerBodyLinkButton">
          <a>Watch Now</a>
        </div>
        <AddToFavourites width="67px" height="54px" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.homeBanner {
  height: 500px;
  background-size: no-repeat;
  background-position: center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  color: #fff;

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
      }
    }
  }
}
</style>
