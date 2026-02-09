const videoElement  = document.getElementById("my-video");

let stream = null;
let mediaStream;

const constraints = {
    audio:true,
    video:true
}
const getMicAndCamera = async (e)=>{
    try{
        stream = await navigator.mediaDevices.getUserMedia(constraints);
        console.log("Got Media Stream:", stream);
    }
catch(err){
    console.log("Error accessing media devices.");
    console.log(err);
}
}

const showMyFeed = (e)=>{
    console.log("Showing my feed...");
   if(!stream){
    console.log("No media stream available. Please share your mic and camera first.");
   }
   videoElement.srcObject = stream;
   const tracks = stream.getTracks();
    console.log("Media Stream Tracks:", tracks);
}
const StopMyFeed = (e)=>{
    if(!stream){
        console.log("No media stream to stop.");
        return;
    }
    const tracks = stream.getTracks();
    tracks.forEach(track=>{
        console.log(`Stopping track: ${track.kind}`);
        track.stop();
    })
}

document.getElementById("share").addEventListener("click", e=>getMicAndCamera(e));

document.getElementById("show-video").addEventListener("click",e=>showMyFeed(e));

document.getElementById("stop-video").addEventListener("click", e=>StopMyFeed(e));