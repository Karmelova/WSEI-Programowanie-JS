const KeyToSound = {
  a: document.getElementById('clap'),
  s: document.getElementById('hithat'),
  d: document.getElementById('kick'),
  f: document.getElementById('openhat'),
  g: document.getElementById('boom'),
  h: document.getElementById('ride'),
  j: document.getElementById('snare'),
  k: document.getElementById('tom'),
  l: document.getElementById('tink')
}

document.addEventListener('keydown', onKeyPress)
document.addEventListener('keyup', onKeyRelease)

function onKeyPress (event) {
  const sound = KeyToSound[event.key]
  if (sound) {
    sound.currentTime = 0
    sound.play()
    sound.parentElement.classList.add('pressed')
    if (recordingChannel !== undefined) {
      const time = Date.now() - channelStartTimes[recordingChannel - 1]
      const soundData = {
        sound: event.key,
        time: time
      }
      channels[recordingChannel - 1].push(soundData)
    }
  }
}

function onKeyRelease (event) {
  const sound = KeyToSound[event.key]
  if (sound) {
    sound.parentElement.classList.remove('pressed')
  }
}

let channelStartTimes = [0, 0, 0, 0]
let recordingChannel

const channels = [
  [], // Channel 1
  [], // Channel 2
  [], // Channel 3
  [] // Channel 4
]

function recordChannel (channelNumber) {
  //if there is existing records, clean channel
  if (channels[channelNumber - 1].length > 0) {
    channels[channelNumber - 1] = []
  }
  const playElementId = `channel${channelNumber}Play`
  document.getElementById(playElementId).classList.add('hidden')
  const recElementId = `channel${channelNumber}Rec`
  const icon = document.getElementById(recElementId).querySelector('.icon')
  icon.classList.toggle('blink')
  setRecordingParams(channelNumber)
  setTimeout(() => {
    stopRecording(channelNumber)
  }, 5000)
}

function setRecordingParams (channelNumber) {
  console.log(channelNumber)
  if (channelNumber >= 1 && channelNumber <= 4) {
    recordingChannel = channelNumber
    channelStartTimes[channelNumber - 1] = Date.now()
  } else {
    console.error('Invalid channel number')
  }
}

function stopRecording (channelNumber) {
  recordingChannel = undefined
  const playElementId = `channel${channelNumber}Play`
  document.getElementById(playElementId).classList.remove('hidden')
  const recElementId = `channel${channelNumber}Rec`
  const icon = document.getElementById(recElementId).querySelector('.icon')
  icon.classList.toggle('blink')
}
function playChannel (channelNumber) {
  channels[channelNumber - 1].forEach(sound => {
    setTimeout(() => {
      playSound(KeyToSound[sound.sound])
    }, sound.time)
  })
}
function playSound (sound) {
  sound.currentTime = 0
  sound.play()
}

function playAllChannels () {
  if (channels[0].length > 0) playChannel(1)
  if (channels[1].length > 0) playChannel(2)
  if (channels[2].length > 0) playChannel(3)
  if (channels[3].length > 0) playChannel(4)
}
