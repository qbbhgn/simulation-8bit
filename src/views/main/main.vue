<template>
  <div class="main">
    <el-button @click="play">
      播放超级玛丽主题音乐
    </el-button>
  </div>
</template>
<script lang="ts" setup>
import { playMarioTheme } from '../../utils/player.js'
import { ref } from 'vue'

// const context = ref<any>({}) // 音频上下文，用于处理音频
// const gainNode = ref<any>({})// 增益节点，用于控制音量
// const oscillator = ref<any>({}) // 振荡器，用于生成音频波形
const marioTheme = ref(
  [
    { note: 'A1', duration: 125 }, // E4音符，持续125毫秒
    { note: 'rest', duration: 125 }, // 休息，持续125毫秒
    { note: 'B2', duration: 125 }, // 同上
    { note: 'rest', duration: 125 }, // 休息，持续125毫秒
    { note: 'C3', duration: 125 }, // 同上
    { note: 'rest', duration: 125 }, // 休息，持续125毫秒
    { note: 'D4', duration: 125 }, // C4音符，持续125毫秒
    { note: 'rest', duration: 125 }, // 休息，持续125毫秒
    { note: 'E5', duration: 125 }, // E4音符，持续250毫秒
    { note: 'rest', duration: 125 }, // 休息，持续250毫秒
    { note: 'F6', duration: 125 }, // 休息，持续125毫秒
    { note: 'rest', duration: 125 }, // 休息，持续125毫秒
    { note: 'G7', duration: 125 } // 休息，持续125毫秒
  ]
)
const play = () => {
  playMarioTheme(marioTheme.value)
}


</script>
<style lang="less">
.main {
  width: 100%;
}
</style>