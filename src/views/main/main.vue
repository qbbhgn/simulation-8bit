<template>
  <div class="main">
    <el-button @click="playMarioTheme">
      播放超级玛丽主题音乐
    </el-button>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const context = ref<any>({}) // 音频上下文，用于处理音频
const gainNode = ref<any>({})// 增益节点，用于控制音量
const oscillator = ref<any>({}) // 振荡器，用于生成音频波形
const marioTheme = ref<any>(
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

const playMarioTheme = () => {
  // 创建音频上下文
  context.value = new (window.AudioContext)()
  // 创建增益节点并连接到音频输出
  gainNode.value = context.value.createGain()
  console.log(context)
  gainNode.value.connect(context.value.destination)
  // 播放旋律
  playNotes(marioTheme.value)
}

const playNotes = (notes) => {
  let currentTime = context.value.currentTime // 获取当前音频上下文的时间
  notes.forEach(note => {
    if (note.note !== 'rest') {
      // 如果不是休息，则创建一个新的振荡器
      oscillator.value = context.value.createOscillator()
      oscillator.value.type = 'square' // 设置振荡器类型为方波，模拟8位音乐的声音
      oscillator.value.frequency.value = noteToFrequency(note.note) // 设置振荡器的频率
      oscillator.value.connect(gainNode.value) // 将振荡器连接到增益节点
      oscillator.value.start(currentTime) // 在当前时间开始播放振荡器
      oscillator.value.stop(currentTime + note.duration / 1000) // 在指定时间后停止播放振荡器
    }
    currentTime += note.duration / 1000 // 更新当前时间，为下一个音符做准备
  })
}
const noteToFrequency = (note) => {
  // 将音符名称转换为对应的频率
  const notes = [ 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#' ]
  const keyNumber = notes.indexOf(note[0]) // 获取音符在音符数组中的索引
  const octave = note[1] // 获取音符的八度
  // 计算频率，A4的频率是440Hz，根据音符的索引和八度计算目标频率
  const frequency = 440 * Math.pow(2, (keyNumber - 9) / 12) * Math.pow(2, octave - 4)
  return frequency
}

</script>
<style lang="less">
.main {
  width: 100%;
}
</style>