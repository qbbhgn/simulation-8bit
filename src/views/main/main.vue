<template>
  <div class="main">
    <div class="header">
      <el-carousel :interval="4000" type="card" height="250px">
        <el-carousel-item v-for="item in 6" :key="item" @click="openGame('1')">
          <h3 text="2xl" justify="center">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>
<script lang="ts" setup>
const openGame = (id:string) =>{
    const externalLink = "../../../public/games/2048/index.html";
    window.open(externalLink, "_blank");
}
</script>
<style lang="less">
.main {
  width: 100%;

  .el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
}
</style>