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
document.addEventListener('keydown', onKeyPress);
document.addEventListener('keyup', onKeyRelease);


function onKeyPress(event) {
    const sound = KeyToSound[event.key]
    if (sound) {
        sound.currentTime = 0;
        sound.play();
    }
    sound.parentElement.classList.add("pressed");
    
}

function onKeyRelease(event) {
    const sound = KeyToSound[event.key];
    sound.parentElement.classList.remove("pressed");
}




function recordSound(sound) {
    const recordedChannel = recordedChannels[recordingChannel];
    recordedChannel.push({ sound: sound.cloneNode(), timestamp: Date.now() });

    if (!recordingStartTime) {
        recordingStartTime = Date.now();
        setTimeout(stopRecording, MAX_RECORDING_DURATION);
    }
}

function stopRecording() {
    recordingStartTime = null;
}

function startRecordingChannel(channelIndex) {
    recordingChannel = channelIndex;
    recordingStartTime = null;
    recordSound(this);
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
    for (let i = 0; i < recordedChannels.length; i++) {
        if (recordedChannels[i].length > 0) {
            playRecordedChannel(i);
        }
    }
}