
const supportedConstraints = navigator.mediaDevices.getSupportedConstraints();
console.log("Supported Media Constraints:", supportedConstraints);


const changeVideoSize = (e)=>{
    
    stream.getVideoTracks().forEach(track=>{
        //now this track is a video track 
        //we can get its capabilities 
        //and we can aapply constraints on this track
    
       const capabilities = track.getCapabilities();

        const height = document.getElementById("vid-height").value;
        const width = document.getElementById("vid-width").value;

        const vConstraints = {
            height:{exact:height<capabilities.height.max?height:capabilities.height.max},
            width:{exact:width<capabilities.width.max?width:capabilities.width.max}, 
            frameRate:30,
        }
        track.applyConstraints(vConstraints);
    })


}


document.getElementById("change-screen-size").addEventListener("click", e=>changeVideoSize(e));
