let mediaRecorder;
let recordedBlobs;

const startRecording = async (e) => {
    console.log("Starting screen recording...");
     recordedBlobs  = []; //array to hold the blobs for playback

     //heere we could use stream or mediaStream depending on whether we want to record the camera feed or the screen feed
     mediaRecorder =  new MediaRecorder(stream);  // make a media recorder from the constructor



    mediaRecorder.ondataavailable= (event)=>{
        //ondataavailable will run when the stream ens,or stopped ,or we specifically ask for it
        console.log("Data available from MediaRecorder:", event.data);
        recordedBlobs.push(event.data);
        console.log("Recorded Blobs Array:", recordedBlobs);
    }
    //it will start recording the stream
  mediaRecorder.start();
}

const stopRecording = async(e)=>{
console.log("Stopping screen recording...");
mediaRecorder.stop();
}

const playRecording = async(e)=>{
  console.log("Playing recorded screen...");

  const superBuffer = new Blob(recordedBlobs,{type:"video/webm"}) //superBuffer is a super buffer of our recorded blobs 
  const recordedVideoElement = document.getElementById("their-video");
   
 recordedVideoElement.src = window.URL.createObjectURL(superBuffer); //we create a url for our super buffer and set it as the source of our video element
 recordedVideoElement.controls = true;
 recordedVideoElement.play();
}


document.getElementById("start-record").addEventListener("click", e=>startRecording(e));
document.getElementById("stop-record").addEventListener("click", e=>stopRecording(e));
document.getElementById("play-record").addEventListener("click", e=>playRecording(e));