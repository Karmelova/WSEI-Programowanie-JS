const recordedChannels = [[], [], [], []];
let recordingChannel = 0;
let recordingStartTime = null;
const MAX_RECORDING_DURATION = 10 * 1000;
document.addEventListener('keypress', onKeyPress)

const KeyToSound = {
    'a': document.querySelector('#s1'),
    's': document.querySelector('#s2'),
    'd': document.querySelector('#s3'),
    'f': document.querySelector('#s4'),
    'g': document.querySelector('#s5'),
    'h': document.querySelector('#s6'),
    'j': document.querySelector('#s7'),
    'k': document.querySelector('#s8'),
    'l': document.querySelector('#s9'),
}

function onKeyPress(event) {
    const sound = KeyToSound[event.key]
    playSound(sound)
    recordSound(sound)
}
function playSound(sound) {
    sound.currentTime = 0
    sound.play()
}

function recordSound(sound) {
    const recordedChannel = recordedChannels[recordingChannel];
    recordedChannel.push({ sound: sound.cloneNode(), timestamp: Date.now() });

    if (!recordingStartTime) {
        recordingStartTime = Date.now();
        setTimeout(stopRecording, MAX_RECORDING_DURATION);
    }
}

function switchRecordingChannel(channelIndex) {
    recordingChannel = channelIndex;
    recordingStartTime = null;
}

function playRecordedChannel(channelIndex) {
    const channel = recordedChannels[channelIndex];
    for (const { sound, timestamp } of channel) {
        const delay = Date.now() - timestamp;
        setTimeout(() => {
            sound.currentTime = 0;
            sound.play();
        }, delay);
    }
}

function playAllRecordedChannels() {
    for (const channel of recordedChannels) {
        playRecordedChannel(channel);
    }
}