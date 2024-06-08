
const context = new window.AudioContext() // 音频上下文，用于处理音频
let gainNode = null // 增益节点，用于控制音量
let oscillator = null // 振荡器，用于生成音频波形
export function playMarioTheme(marioTheme){
  // 创建增益节点并连接到音频输出
  gainNode = context.createGain()
  gainNode.connect(context.destination)
  // 播放旋律
  playNotes(marioTheme)
}
function playNotes(notes){
  let currentTime = context.currentTime // 获取当前音频上下文的时间
  notes.forEach(note => {
    if (note.note !== 'rest') {
      // 如果不是休息，则创建一个新的振荡器
      oscillator = context.createOscillator()
      oscillator.type = 'square' // 设置振荡器类型为方波，模拟8位音乐的声音
      oscillator.frequency.value = noteToFrequency(note.note, note.octave) // 设置振荡器的频率
      oscillator.connect(gainNode) // 将振荡器连接到增益节点
      oscillator.start(currentTime) // 在当前时间开始播放振荡器
      oscillator.stop(currentTime + note.duration / 1000) // 在指定时间后停止播放振荡器
    }
    currentTime += note.duration / 1000 // 更新当前时间，为下一个音符做准备
  })
}

function noteToFrequency(note, octave = 4){
  // 将音符名称转换为对应的频率
  const notes = [ 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B' ]
  const keyNumber = notes.indexOf(note) // 获取音符在音符数组中的索引
  // 计算频率，A4的频率是440Hz，根据音符的索引和八度计算目标频率
  const frequency = 440 * Math.pow(2, (keyNumber - 9) / 12) * Math.pow(2, octave - 4)
  return frequency
}