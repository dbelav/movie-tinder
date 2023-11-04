<script setup lang="ts">

// import LogoSVG from '../../assets/logo.vue'


</script>

<template>
    <div class="leftNavbarContainer">
        <div class="leftNavbarContainerInner">
            <div class="leftNavbarLogo leftNavbarContainerGeneral">
                <!-- <LogoSVG /> -->
            </div>
            <div class="leftNavbarContainerLinksContainer">
                <div class="leftNavbarLinks">
                    <div class="leftNavbarLinksItem leftNavbarContainerGeneral">Home</div>
                    <div class="leftNavbarLinksItem leftNavbarContainerGeneral">Favourites</div>
                    <div class="leftNavbarLinksItem leftNavbarContainerGeneral">Trending</div>
                    <div class="leftNavbarLinksItem leftNavbarContainerGeneral">Tinder</div>
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
    width: 20%;
    height: 100vh;
    background-color: #21201E;
    display: flex;
    color: #fff;
    font-size: 18px;
    box-shadow: 2px 0px 90px 0px #6100C266;



    .leftNavbarContainerInner {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;

        padding-left: 25%;

        .leftNavbarLogo {
            margin-top: 50px;
            margin-bottom: 100px;
        }

        .leftNavbarContainerLinksContainer {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 80%;

            .leftNavbarContainerGeneral {
                padding: 10px;
            }
        }




    }
}
</style>
