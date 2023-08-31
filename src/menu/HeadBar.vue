<template>
  <div class="head-bar">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
    >
      <el-menu-item index="0">主页</el-menu-item>
      <div class="flex-grow" />
      <el-menu-item index="1">菜单一</el-menu-item>
      <el-sub-menu index="2">
        <template #title>菜单二</template>
        <el-menu-item index="2-1">item one</el-menu-item>
        <el-menu-item index="2-2">item two</el-menu-item>
        <el-menu-item index="2-3">item three</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";

const activeIndex = ref("0");
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style lang="less">
.head-bar {
  width: 100%;

  .flex-grow {
    flex-grow: 1;
  }
}
</style>