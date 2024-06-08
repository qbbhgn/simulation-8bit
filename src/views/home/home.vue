<template>
  <div
    class="home"
  >
    <div class="title">
      8bit
    </div>
    <div class="btns flex-center">
      <div
        v-for="item in btns"
        :key="item.note"
        class="btn"
        @click="play(item.note)"
      >
        {{ item.note }}
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { playMarioTheme } from '../../utils/player.js'
import { ref, onMounted, onUnmounted } from 'vue'

// 上一个按钮code
const previousCode = ref('Key')
const lastExecutionTime = ref(0)
// 按钮
const btns = ref([
  { note: 'C', octave: 4, duration: 125 },
  { note: 'C#', octave: 4, duration: 125 },
  { note: 'D', octave: 4, duration: 125 },
  { note: 'D#', duration: 125 },
  { note: 'E', octave: 4, duration: 125 },
  { note: 'F', octave: 4, duration: 125 },
  { note: 'F#', octave: 4, duration: 125 },
  { note: 'G', octave: 4, duration: 125 },
  { note: 'G#', octave: 4, duration: 125 },
  { note: 'A', octave: 4, duration: 125 },
  { note: 'A#', octave: 4, duration: 125 },
  { note: 'B', octave: 4, duration: 125 }
])
// 键盘按下事件
const handleKeydown = (e) => {
  // 节流，暂时不太完美，只有第二次才会有记录
  if (previousCode.value === e.code) {
    const now = new Date().getTime() // 当前时间
    if (now - lastExecutionTime.value >= 250) {
      // 如果达到了指定的延迟时间，则执行函数
      lastExecutionTime.value = now // 更新上次执行时间为当前时间
    }else {
      return
    }
  }
  previousCode.value = e.code
  if (e.code === 'KeyA') {
    play('C')
  }else if (e.code === 'KeyS') {
    play('C#')
  }else if (e.code === 'KeyD') {
    play('D')
  }else if (e.code === 'KeyF') {
    play('D#')
  }else if (e.code === 'KeyG') {
    play('E')
  }else if (e.code === 'KeyH') {
    play('F')
  }else if (e.code === 'KeyJ') {
    play('G')
  }else if (e.code === 'KeyK') {
    play('G#')
  }else if (e.code === 'KeyL') {
    play('A')
  }else if (e.code === 'Semicolon') {
    play('A#')
  }else if (e.code === 'Quote') {
    play('B')
  }
}
// 键盘弹起时，将上一个按钮code重置，以实现按键连击
const handleKeyup = () => {
  previousCode.value = 'Key'
}

// 播放方法
const play = (note) => {
  const marioTheme = [
    { note: note, octave: 4, duration: 250 }
  ]
  playMarioTheme(marioTheme)
}

onMounted(() => {
  // 监听键盘
  window.addEventListener('keydown', handleKeydown)
  window.addEventListener('keyup', handleKeyup)
})

onUnmounted(() => {
  // 在组件销毁前移除事件监听器
  window.removeEventListener('keydown', handleKeydown)
  window.removeEventListener('keyup', handleKeyup)
})

</script>

<style lang="less">
  .home {
    width: 100%;
    height: calc(95vh - 1px);
    background-color: white;
    padding-top: 1px;
    .title {
      font-size: 50px;
      text-align: center;
      margin-top: 100px;
    }
    .btns {
      // width: 500px;
      margin-left: 50%;
      transform: translateX(-50%) translateY(-50%);
      margin-top: calc(50vh - 200px);
      .btn {
        width: 200px;
        height: 140px;
        background-color: rgba(255, 0, 0, 0.8);
        text-align: center;
        line-height: 100px;
        user-select: none;
      }
      .btn:nth-child(2n) {
        background-color: rgba(44, 140, 219, 0.8);
      }
    }
  }
</style>