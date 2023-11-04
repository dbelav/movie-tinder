<script setup lang="ts">
import AddToFavourites from '../addToFavourites/AddToFavourites.vue';

</script>

<template>
  <div class="homeBanner">
    <div class="homeBannerBody">
      <div class="homeBannerBodyTitle">
        <span>Insider</span>
      </div>
      <div class="homeBannerBodyInfo">
        <span>2022 | Comedy horror | 1 Season</span>
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
  background-image: url('https://images.wallpaperscraft.ru/image/single/ulitsa_noch_mokryj_155637_1920x1080.jpg');
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
