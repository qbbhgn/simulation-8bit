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
import { useRouter } from "vue-router";

const router = useRouter();
const activeIndex = ref("0");

const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
  if (key === "0") {
    router.push("/main");
  }
};
</script>

<style lang="less">
.head-bar {
  width: 100%;
  position: fixed;
  top: 0px;
  left: 0px;
  .flex-grow {
    flex-grow: 1;
  }
}
</style>