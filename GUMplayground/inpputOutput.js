const audioInputElement = document.getElementById("audio-input");
const audioOutputElement = document.getElementById("audio-output");
const videoInputElement = document.getElementById("video-input");

const getDevices = async () => {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    devices.forEach((device) => {
      const option = document.createElement("option");
      option.value = device.deviceId;
      option.text =
        device.label || `${device.kind} ${audioInputElement.length + 1}`;
      if (device.kind === "audioinput") {
        audioInputElement.appendChild(option); //add the option to the audio input select element
      } else if (device.kind === "audiooutput") {
        audioOutputElement.appendChild(option); //add the option to the audio output select element
      } else if (device.kind === "videoinput") {
        videoInputElement.appendChild(option); //add the option to the video input select element
      }
    });
    console.log("Available media devices:", devices);
  } catch (err) {
    console.log(err);
  }
};

const changeAudioInput = async (e) => {
  console.log("Changing audio input to:", e.target.value);
  const deviceId = e.target.value;
  const newConstraints = {
    audio: { deviceId: { exact: deviceId } },
    video: true,
  };
  try {
    stream = await navigator.mediaDevices.getUserMedia(newConstraints);
    console.log("Got new media stream with selected audio input:", stream);

    const tracks  = stream.getAudioTracks();
    console.log("Audio tracks in the new stream:", tracks);
  } catch (err) {
    console.log("Error changing audio input:", err);
  }
};

const changeAudioOutput = async (e) => {
    const deviceId = e.target.value;
    await videoElement.setSinkId(deviceId);
};

const changeVideoInput = async (e) => {
    const deviceId = e.target.value;
    const newConstraints = {
        audio:true,
        video:{deviceId:{exact:deviceId}},
    }
    try{
        stream  = await navigator.mediaDevices.getUserMedia(newConstraints);
        console.log(stream);
        const tracks = stream.getVideoTracks();
        console.log(tracks);
    }
    catch(err){
        console.log(err);
    }
};


getDevices();

document
  .getElementById("audio-input")
  .addEventListener("change", (e) => changeAudioInput(e));
document
  .getElementById("audio-output")
  .addEventListener("change", (e) => changeAudioOutput(e));
document
  .getElementById("video-input")
  .addEventListener("change", (e) => changeVideoInput(e));
