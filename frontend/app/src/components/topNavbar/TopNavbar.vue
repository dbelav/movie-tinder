<script setup lang="ts">


</script>

<template>
    <div class="topNavbarContainer">
        <div class="topNavbarContainerInner">
            <div class="topNavbarContainerInnerLeft">
                <div class="topNavbarContainerInnerLeftItem">Something</div>
                <div class="topNavbarContainerInnerLeftItem">Something</div>
                <div class="topNavbarContainerInnerLeftItem">Something</div>
            </div>

            <div class="topNavbarContainerInnerRight">
                <div class="topNavbarContainerInnerLeftItem">Something</div>
                <div class="topNavbarContainerInnerLeftItem">Something</div>
                <div class="topNavbarContainerInnerLeftItem">Something</div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.topNavbarContainer {
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    color: #fff;



    .topNavbarContainerInner {
        width: 100%;
        display: flex;

        justify-content: space-between;

        .topNavbarContainerInnerLeft {
            display: flex;
            padding-left: 40px;
        }

        .topNavbarContainerInnerRight {
            display: flex;
            padding-right: 30px;

        }

        .topNavbarContainerInnerLeftItem {
            padding: 10px;
        }
    }

}
</style>
