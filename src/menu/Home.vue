<script setup>
import HeadBar from "./HeadBar.vue";
import MainContent from "./MainContent.vue";
</script>

<template>
  <div class="flex-v">
    <!-- 头部区域 -->
    <div class="header">
      <HeadBar></HeadBar>
    </div>
    <!-- 主内容区域 -->
    <div class="main-content">
      <MainContent></MainContent>
    </div>
  </div>
</template>
<style lang="less" scoped>
.header {
    width: 100%;
}
.main-content {
  width: 1290px;
}
</style>