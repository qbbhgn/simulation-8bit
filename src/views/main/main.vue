<template>
  <div class="main">
    <div class="header">
      <!-- 头部走马灯 -->
      <el-carousel :interval="4000" type="card" height="280px">
        <el-carousel-item
          v-for="item in headerBannerList"
          :key="item.id"
          @click="openGame(item)"
          :style="'background-image: url(' + item.bannerUrl + ');'"
          class="header-banner"
        >
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>
<script lang="ts" setup>
// 头部背景集合
const headerBannerList = [
  {
    id: 1,
    bannerUrl:
      "https://tw1-1301642022.cos.ap-shanghai.myqcloud.com/2048-banner.png",
    gameUrl: "../../../public/games/2048/index.html",
  },
  {
    id: 2,
    bannerUrl:
      "https://tw1-1301642022.cos.ap-shanghai.myqcloud.com/surround-the-kitten-banner.png",
    gameUrl: "../../../public/games/surroundTheKitten/index.html",
  },
  {
    id: 3,
    bannerUrl:
      "https://tw1-1301642022.cos.ap-shanghai.myqcloud.com/ball-impact-banner.png",
    gameUrl: "../../../public/games/ballImpact/index.html",
  }
];
// 打开游戏链接
const openGame = (item) => {
  window.open(item.gameUrl, "_blank");
};
</script>
<style lang="less">
.main {
  width: 100%;
  .header-banner {
    background-size: 100%;
  }
}
</style>