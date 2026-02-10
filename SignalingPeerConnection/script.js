

 const localVideoEL = document.getElementById("local-video");
 const remoteVideoEL = document.getElementById("remote-video");

 let localStream;
 let remoteStream;
 let peerConnection;

 //stun server configuration to get the ice candidates for the peer connection 
 let peerConfiguration = {
    iceServers:[{
        urls:[
            'stun:stun.l.google.com:19302',
            'stun:stun1.l.google.com:19302'
        ]
    }]
 }


 const call = async ()=>{
    const stream = await navigator.mediaDevices.getUserMedia({video:true,

        });
        console.log("Got local media stream:", stream)
  localVideoEL.srcObject = stream;
    localStream = stream;

//peer connection is allset with our stun servers sent over 
    await createPeerConnection();

    //we add the tracks of our local stream to the peer connection so that they can be sent to the remote peer
    //create offer time!!!

    try{
    console.log("Creating offer.....");
    const offer = await peerConnection.createOffer();
    console.log("Offer created:", offer);
    
    }catch(err){
        console.log(err);
    }

 }


 const createPeerConnection = ()=>{
return new Promise(async (resolve,reject)=>{

    //RTC peer connection is the thing that creates the connection 
    //we can pass a config objec and that config object can contain stun servers and turn servers that will help us get the ice candidates for the peer connection 

    peerConnection =await new RTCPeerConnection(peerConfiguration);

    localStream.getTracks().forEach(track=>{
        peerConnection.addTrack(track,localStream);
    })

    peerConnection.addEventListener('icecandidate',e=>{
        console.log("........ICE candidates found!........");
        console.log(e);
    })
  resolve();  
})
 }



 document.getElementById("call").addEventListener("click", async (e)=>call(e));