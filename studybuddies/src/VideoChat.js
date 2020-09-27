import React from 'react';
import "./VideoChat.css";
import divider from "./img/divider-line.png";
import titleBar from "./authImages/title-bar.png";
import receiveText from "./videoImgs/Union-3.png";
import sendText from "./videoImgs/Union-4.png";
var firebase = require('firebase'); // Needed whenever using firestore !!

function VideoChat ()
{
    class TextMessage{
        TextMessage(message,userid,date)
        {
            this.message = message;
            this.userid = userid;
            this.date = date;
        }
    }

    var firebase = require('firebase');
    const firebaseConfig = {
    
        apiKey: "AIzaSyAR8bAOpBYHJwJMZ39gMgvuZgsgFf1M8f8",
        authDomain: "studybuddies-99115.firebaseapp.com",
        databaseURL: "https://studybuddies-99115.firebaseio.com",
        projectId: "studybuddies-99115",
        storageBucket: "studybuddies-99115.appspot.com",
        messagingSenderId: "32121492623",
        appId: "1:32121492623:web:a0d1cf11d163079ddfccfa",
        measurementId: "G-228FFW8HMV"
      };
      firebase.initializeApp(firebaseConfig);
      var db = firebase.firestore();
      for (var i = 0; i < 50; i++)
      {
        db.collection("users").add({
            textMessage : "New Message #:" +i,
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            var currentDoc = db.collection("users").doc(docRef.id);
            var setID = currentDoc.set({
              id: docRef.id},
              {merge: true});
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
      }
      var numAdded=0;
      var j=0;
      db.collection("users")
        .onSnapshot(function(snapshot){
            snapshot.docChanges().forEach(function(change){
                var item = change.doc.data();
                console.log(item);
                var convoDiv = document.getElementById("convoDiv");
                if(item.textMessage !== undefined)
                {
                    if(j % 2 == 1)
                    {
                   
                    var newItemDiv = document.createElement("div");
                    newItemDiv.setAttribute("id", "messageDiv");
                    newItemDiv.style.marginTop = numAdded + "px";
                    var textMessage = document.createElement("img");
                    textMessage.setAttribute("src", receiveText);
                    
                    textMessage.innerHTML = item.textMessage;
                    textMessage.setAttribute("id", "textMessage");
                    console.log(textMessage.style.marginTop);
                    
                    console.log(textMessage.style.marginTop);
                    var text = document.createElement("h1");
                    text.innerHTML = item.textMessage;
                    text.setAttribute("id", "text")
                    numAdded += 100;
                    newItemDiv.appendChild(textMessage);
                    newItemDiv.appendChild(text);

                    var container = document.getElementById("convoDiv");
                    convoDiv.appendChild(newItemDiv);
                    j++;
                    }

                    else
                    {
                    console.log("yes")
                    var newItemDiv = document.createElement("div");
                    newItemDiv.setAttribute("id", "messageDiv");
                    newItemDiv.style.marginTop = numAdded + "px";
                    var textMessage = document.createElement("img");
                    textMessage.setAttribute("src", sendText);
                    
                    textMessage.innerHTML = item.textMessage;
                    textMessage.setAttribute("id", "textMessage");
                    textMessage.setAttribute("className", "sendText");
                    textMessage.style.marginRight="200px";
                    console.log(textMessage.style.marginTop);
                    
                    console.log(textMessage.style.marginTop);
                    var text = document.createElement("h1");
                    text.innerHTML = item.textMessage;
                    text.setAttribute("id", "text")
                    text.setAttribute("className", "sendtext");
                    numAdded += 100;
                    text.style.color = "#eb575775";
                    newItemDiv.appendChild(textMessage);
                    newItemDiv.appendChild(text);

                    var container = document.getElementById("convoDiv");
                    convoDiv.appendChild(newItemDiv);
                    j++;
                    }
                }
            })
        });
            


    //mdc.ripple.MDCRipple.attachTo(document.querySelector('.mdc-button'));
    // Source Code from Firebase to get the VideoChat working
    const configuration = {
        iceServers: [
          {
            urls: [
              'stun:stun1.l.google.com:19302',
              'stun:stun2.l.google.com:19302',
            ],
          },
        ],
        iceCandidatePoolSize: 10,
      };


let peerConnection = null;
let localStream = null;
let remoteStream = null;
let roomDialog = null;
let roomId = null;

function init() {
    window.onclick = function(e)
    {
        console.log(e);
        if(e.target.innerText=== "OPEN CAMERA & MICROPHONE" || e.target.id==="toggleCall")
        {
            console.log("openCamera");
            openUserMedia(e);
        }
        else if(e.target.id === "hangupBtn")
        {
            hangUp();
        }
        else if(e.target.id === "createBtn")
        {
            createRoom();
        }
        else if(e.target.id === "joinBtn")
        {
            joinRoom();
        }
    }
}

async function createRoom() {
  document.querySelector('#createBtn').disabled = true;
  document.querySelector('#joinBtn').disabled = true;
  const db = firebase.firestore();

  console.log('Create PeerConnection with configuration: ', configuration);
  peerConnection = new RTCPeerConnection(configuration);

  registerPeerConnectionListeners();

  // Add code for creating a room here
  
  // Code for creating room above
  
  localStream.getTracks().forEach(track => {
    peerConnection.addTrack(track, localStream);
  });

  // Code for creating a room below

  // Code for creating a room above

  // Code for collecting ICE candidates below

  // Code for collecting ICE candidates above

  peerConnection.addEventListener('track', event => {
    console.log('Got remote track:', event.streams[0]);
    event.streams[0].getTracks().forEach(track => {
      console.log('Add a track to the remoteStream:', track);
      remoteStream.addTrack(track);
    });
  });

  // Listening for remote session description below

  // Listening for remote session description above

  // Listen for remote ICE candidates below

  // Listen for remote ICE candidates above
}

function joinRoom() {
  document.querySelector('#createBtn').disabled = true;
  document.querySelector('#joinBtn').disabled = true;

  document.querySelector('#confirmJoinBtn').
      addEventListener('click', async () => {
        roomId = document.querySelector('#room-id').value;
        console.log('Join room: ', roomId);
        document.querySelector(
            '#currentRoom').innerText = `Current room is ${roomId} - You are the callee!`;
        await joinRoomById(roomId);
      }, {once: true});
  roomDialog.open();
}

async function joinRoomById(roomId) {
  const db = firebase.firestore();
  const roomRef = db.collection('rooms').doc(`${roomId}`);
  const roomSnapshot = await roomRef.get();
  console.log('Got room:', roomSnapshot.exists);

  if (roomSnapshot.exists) {
    console.log('Create PeerConnection with configuration: ', configuration);
    peerConnection = new RTCPeerConnection(configuration);
    registerPeerConnectionListeners();
    localStream.getTracks().forEach(track => {
      peerConnection.addTrack(track, localStream);
    });

    // Code for collecting ICE candidates below

    // Code for collecting ICE candidates above

    peerConnection.addEventListener('track', event => {
      console.log('Got remote track:', event.streams[0]);
      event.streams[0].getTracks().forEach(track => {
        console.log('Add a track to the remoteStream:', track);
        remoteStream.addTrack(track);
      });
    });

    // Code for creating SDP answer below

    // Code for creating SDP answer above

    // Listening for remote ICE candidates below

    // Listening for remote ICE candidates above
  }
}

async function openUserMedia(e) {
    const mediaSource = await navigator.mediaDevices.getUserMedia({video: true});
const video = document.getElementById("videoElement");
// Older browsers may not have srcObject
if ('srcObject' in video) {
  try {
    video.srcObject = mediaSource;
    video.play();
    
    console.log(video);
  } catch (err) {
    if (err.name != "TypeError") {
      throw err;
    }
    // Even if they do, they may only support MediaStream
    video.src = URL.createObjectURL(mediaSource);
    ;
    console.log(video);
  }
} else {
  video.src = URL.createObjectURL(mediaSource);
  
  console.log(video);
}




  /*const stream = await navigator.mediaDevices.getUserMedia(
      {video: true, audio: true});
      var video = document.getElementById("localVideo");
      console.log(video, "Video ");
      video.srcObject = stream;
      video.onload = function(e)
      {
          video.play();
      }
  //document.querySelector('#localVideo').srcObject = stream;
  localStream = stream;
  remoteStream = new MediaStream();
  //document.querySelector('#remoteVideo').srcObject = remoteStream;

  console.log('Stream:', document.getElementById("localVideo").srcObject);
  document.getElementById("cameraBtn")
  /*document.querySelector('#cameraBtn').disabled = true;
  document.querySelector('#joinBtn').disabled = false;
  document.querySelector('#createBtn').disabled = false;
  document.querySelector('#hangupBtn').disabled = false;*/
}

async function hangUp(e) {
  const tracks = document.querySelector('#localVideo').srcObject.getTracks();
  tracks.forEach(track => {
    track.stop();
  });

  if (remoteStream) {
    remoteStream.getTracks().forEach(track => track.stop());
  }

  if (peerConnection) {
    peerConnection.close();
  }

  document.querySelector('#localVideo').srcObject = null;
  document.querySelector('#remoteVideo').srcObject = null;
  document.querySelector('#cameraBtn').disabled = false;
  document.querySelector('#joinBtn').disabled = true;
  document.querySelector('#createBtn').disabled = true;
  document.querySelector('#hangupBtn').disabled = true;
  document.querySelector('#currentRoom').innerText = '';

  // Delete room on hangup
  if (roomId) {
    const db = firebase.firestore();
    const roomRef = db.collection('rooms').doc(roomId);
    const calleeCandidates = await roomRef.collection('calleeCandidates').get();
    calleeCandidates.forEach(async candidate => {
      await candidate.delete();
    });
    const callerCandidates = await roomRef.collection('callerCandidates').get();
    callerCandidates.forEach(async candidate => {
      await candidate.delete();
    });
    await roomRef.delete();
  }

  document.location.reload(true);
}

function registerPeerConnectionListeners() {
  peerConnection.addEventListener('icegatheringstatechange', () => {
    console.log(
        `ICE gathering state changed: ${peerConnection.iceGatheringState}`);
  });

  peerConnection.addEventListener('connectionstatechange', () => {
    console.log(`Connection state change: ${peerConnection.connectionState}`);
  });

  peerConnection.addEventListener('signalingstatechange', () => {
    console.log(`Signaling state change: ${peerConnection.signalingState}`);
  });

  peerConnection.addEventListener('iceconnectionstatechange ', () => {
    console.log(
        `ICE connection state change: ${peerConnection.iceConnectionState}`);
  });
}

init();
    return (
       
    <div>
        <div id="container">
	<video autoplay="true" id="videoElement">
	
	</video>
    </div>
        <div id="convo">
        <div id="convoDiv"></div>
        </div>
        <div id="videoButtons">
            <div className="videoBtn" id="leaveCall"> Leave Call </div>
            <div className="videoBtn"  id="findNewBuddy"> Find New Buddy </div>
        </div>
        <div className="videoBtn" id="toggleCall"> Enter Call </div>
        <div id="videos"></div>
            <div id="titleBar">
            <img id ="titleBar"  src={titleBar}></img>
            </div>
            <div id="divider"></div>
            <div id="messageContainer">
            <div id="messageDiv2">
                <input type="text" id="textInput"></input>
            </div>
            </div>
            <div id="submit"> Submit

            </div>
           </div>
    
    );
};

export default VideoChat;