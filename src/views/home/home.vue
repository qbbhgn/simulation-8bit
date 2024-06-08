<template>
  <div
    class="home"
    @mouseup="btnsMouseup()"
  >
    <!-- 标题 -->
    <div class="title">
      8bit
    </div>
    <!-- 音频按钮 -->
    <div class="btns flex-center">
      <div
        v-for="item in btns"
        :key="item.note"
        :ref="item.note"
        class="btn"
        @mousedown="play(item.note)"
      >
        <div class="prosody">
          {{ item.note }}
        </div>
        <div class="btn-name">
          {{ item.code }}
        </div>
      </div>
    </div>
    <!-- 八度选择器 -->
    <div class="octave">
      <el-segmented
        v-model="octave"
        :options="octaveOptions"
        block
      />
      <div class="octave-text">
        选中可按键盘方向键滚动
      </div>
      <div class="music-list">
        <el-button @click="playMusic(1)">
          超级玛丽
        </el-button>
        <el-button
          v-if="false"
          @click="datapro"
        >
          数据处理
        </el-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { playMarioTheme } from '../../utils/player.js'
import { MarioSynth2 } from '../../notes/mario/synth2.js'
import { MarioSynth1 } from '../../notes/mario/synth1.js'
import { MarioBass1 } from '../../notes/mario/bass1.js'
import { ref, onMounted, onUnmounted, getCurrentInstance } from 'vue'
import { datayy } from '../../notes/mario/data'
import { saveAs } from 'file-saver'

// 上一个按钮code
const previousCode = ref('Key')
const lastExecutionTime = ref(0)//上一次按下的时间
const { proxy } = getCurrentInstance()
// 八度
const octave = ref(4)
const octaveOptions = ref([
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 },
  { label: '5', value: 5 },
  { label: '6', value: 6 },
  { label: '7', value: 7 }
])

// 按钮
const btns = ref([
  { note: 'C', octave: 4, duration: 125, code: 'A' },
  { note: 'C#', octave: 4, duration: 125, code: 'S' },
  { note: 'D', octave: 4, duration: 125, code: 'D' },
  { note: 'D#', octave: 4, duration: 125, code: 'Q' },
  { note: 'E', octave: 4, duration: 125, code: 'W' },
  { note: 'F', octave: 4, duration: 125, code: 'E' },
  { note: 'F#', octave: 4, duration: 125, code: 'J' },
  { note: 'G', octave: 4, duration: 125, code: 'K' },
  { note: 'G#', octave: 4, duration: 125, code: 'L' },
  { note: 'A', octave: 4, duration: 125, code: 'U' },
  { note: 'A#', octave: 4, duration: 125, code: 'I' },
  { note: 'B', octave: 4, duration: 125, code: 'O' }
])

// 键盘按下事件
const handleKeydown = (e) => {
  // 节流，暂时不太完美，只有第二次才会有记录
  if (previousCode.value === e.code) {
    const now = new Date().getTime() // 当前时间
    if (now - lastExecutionTime.value >= 220) {
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
  }else if (e.code === 'KeyQ') {
    play('D#')
  }else if (e.code === 'KeyW') {
    play('E')
  }else if (e.code === 'KeyE') {
    play('F')
  }else if (e.code === 'KeyJ') {
    play('F#')
  }else if (e.code === 'KeyK') {
    play('G')
  }else if (e.code === 'KeyL') {
    play('G#')
  }else if (e.code === 'KeyU') {
    play('A')
  }else if (e.code === 'KeyI') {
    play('A#')
  }else if (e.code === 'KeyO') {
    play('B')
  }
}

// 键盘弹起时，将上一个按钮code重置，以实现按键连击
const handleKeyup = () => {
  previousCode.value = 'Key'
  btnsMouseup()
}

// 按钮播放方法
const play = (note) => {
  const refElement = proxy.$refs[note]
  if (refElement instanceof HTMLElement) {
    refElement.classList.add('active')
  }
  const marioTheme = [
    { note: note, octave: octave.value, duration: 250 }
  ]
  playMarioTheme(marioTheme)
}
const datapro = () => {
// 数据处理
  const enhanced = []
  for (let index = 0; index < datayy.length; index++) {
    const element = datayy[index]
    const num = element.note[element.note.length - 1]
    element.octave = num
    element.note = element.note.substring(0, element.note.length - 1)
    element.duration = element.duration * 1000
    element.time = element.time * 1000
    enhanced.push(element)
    if (index < datayy.length - 1) {
      const rest = { note: 'rest', duration: datayy[index + 1].time * 1000 - element.time - element.duration }
      enhanced.push(rest)
    }
  }
  const jsonString = JSON.stringify(enhanced, null, 2)
  const blob = new Blob([ jsonString ], { type: 'application/javascript' })
  saveAs(blob, 'output.text')
  console.log(enhanced)
}
// 音乐播放方法
const playMusic = (num) => {
  if (num === 1) {
    playMarioTheme(MarioBass1)
    // playMarioTheme(MarioBass2)
    playMarioTheme(MarioSynth1)
    playMarioTheme(MarioSynth2)
  }
}

// 页面鼠标弹起，删除样式
const btnsMouseup = () => {
  for (let i = 0; i < btns.value.length; i++) {
    const refElement = proxy.$refs[btns.value[i].note]
    if (refElement instanceof HTMLElement) {
      refElement.classList.remove('active')
    }
  }
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
      margin-left: 50%;
      transform: translateX(-50%) translateY(-50%);
      margin-top: calc(50vh - 200px);
      .btn {
        width: 200px;
        height: 140px;
        background-color: rgba(255, 0, 0, 0.8);
        text-align: center;
        user-select: none;
        .prosody {
          font-size: 20px;
          line-height: 35px;
          color: rgba(72, 255, 0, 0.36);
        }
        .btn-name {
          font-size: 20px;
          line-height: 80px;
        }
      }
      .btn:nth-child(2n) {
        background-color: rgba(85, 158, 255, 1);
      }
      .active {
        opacity: 0.4;
      }
    }
    .octave {
      margin-left: 50%;
      transform: translateX(-50%);
      user-select: none;
      .octave-text {
        width: 100%;
        text-align: center;
        margin-top: 10px;
      }
    }
  }
</style>../../notes/mario/synth2.js