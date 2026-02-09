
const shareScreen = async(e)=>{
   const options = {
    video:true,
    audio:true,
    surfaceSwitching:'include',
   }
   try{
    mediaStream = await navigator.mediaDevices.getDisplayMedia(options);
    console.log("Got screen media stream:", mediaStream);
   }
   catch(err){
    console.log("Error sharing screen:", err);
   }
}

document.getElementById("share-screen").addEventListener("click", e=>shareScreen(e));