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
    var currentInvite;
    var yourId = Math.floor(Math.random()*1000000000);
var servers = {'iceServers': [{'urls': 'stun:stun.services.mozilla.com'}, {'urls': 'stun:stun.l.google.com:19302'}, {'urls': 'turn:numb.viagenie.ca','credential': 'webrtc','username': 'websitebeaver@mail.com'}]};
    var firebase = require('firebase');
    const firebaseConfig = {
    
        apiKey: "AIzaSyAGw-B8kOlJXzuOITmkbunYB2zlEJkI1tU",
        authDomain: "knightstudy-a9976.firebaseapp.com",
        databaseURL: "https://knightstudy-a9976.firebaseio.com",
        projectId: "knightstudy-a9976",
        storageBucket: "knightstudy-a9976.appspot.com",
        messagingSenderId: "90619046772",
        appId: "1:90619046772:web:ac404cb50c6e04d074da21",
        measurementId: "G-ZKFNJF5DXC"
      };
      firebase.initializeApp(firebaseConfig);
      var db = firebase.firestore();
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
      console.log('Create PeerConnection with configuration: ', configuration);
      var peerConnection = new RTCPeerConnection(configuration);
    
     /* for (var i = 0; i < 50; i++)
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
      }*/
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
                    if(item.id !== null && item.id !== undefined)
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
            }
            })
        }); 
        
        
function init() {
    window.onclick = function(e)
    {
        console.log(e);
        if(e.target.innerText=== "OPEN CAMERA & MICROPHONE" || e.target.id==="toggleCall")
        {
            console.log("openCamera");
            openUserMedia(e);
        }
    }
}
peerConnection.onicecandidate = (event => db.collection("rooms").set(currentInvite)({sender:yourId, ice: event.candidate}).then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
    var currentDoc = db.collection("users").doc(docRef.id);
    var setID = currentDoc.set({
      id: docRef.id},
      {merge: true});
})
.catch(function(error) {
    console.error("Error adding document: ", error);
})
)
peerConnection.onaddstream = function(event)
{document.getElementById("friendVideo").srcObject = event.stream}
db.collection("rooms")
    .onSnapshot(function(snapshot){
        snapshot.docChanges().forEach(function(change){
            var item = change.doc.data();
            if(change.status === "added")
            {
                peerConnection.setRemoteDescription(new RTCSessionDescription(item.sdp))
                peerConnection.addIceCandidate(new RTCIceCandidate(item.ice));
            }
        })
    })
async function createRoom() {
  const db = firebase.firestore();
  sendMessage(yourId, "come Join");
  function sendMessage(sendId, data)
  {
      peerConnection.createOffer()
        .then(offer => peerConnection.setLocalDescription(offer));
      db.collection("rooms").add({ sender: sendId, message:data, sdp: peerConnection.localDescription}).then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        var currentDoc = db.collection("users").doc(docRef.id);
        currentInvite = currentDoc;
        var setID = currentDoc.set({
          id: docRef.id},
          {merge: true});
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    })
  }

  function readMessage(data) {
    var msg = JSON.parse(data.val().message);
    var sender = data.val().sender;
    if (sender != yourId) {
    if (msg.ice != undefined)
    peerConnection.addIceCandidate(new RTCIceCandidate(msg.ice));
    else if (msg.sdp.type == "offer")
    peerConnection.setRemoteDescription(new RTCSessionDescription(msg.sdp))
    .then(() => peerConnection.createAnswer())
    .then(answer => peerConnection.setLocalDescription(answer))
    .then(() => sendMessage(yourId, JSON.stringify({'sdp': peerConnection.localDescription})));
    else if (msg.sdp.type == "answer")
    peerConnection.setRemoteDescription(new RTCSessionDescription(msg.sdp));
    }
   };
   function showMyFace() {
    navigator.mediaDevices.getUserMedia({audio:true, video:true})
    .then(stream => document.getElementById("video").srcObject = stream)
    .then(stream => peerConnection.addStream(stream));
   }
   
   function showFriendsFace() {
    peerConnection.createOffer()
    .then(offer => peerConnection.setLocalDescription(offer) )
    .then(() => sendMessage(yourId, JSON.stringify({'sdp': peerConnection.localDescription})) );
   }
  registerPeerConnectionListeners();
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
}
window.onchange= function(e)
{
    console.log(document.getElementById("textInput").value);
    db.collection("users").add({
        textMessage : document.getElementById("textInput").value
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

function submitHandler(e)
{
    console.log(document.getElementById("textInput").value);
    db.collection("users").add({
        textMessage : document.getElementById("textInput").value
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
	<video autoplay="true" id="videoElement"/>
	<video autoplay="true" id="friendVideo"/>
    </div>
        <div id="convo">
        <div id="convoDiv"></div>
        </div>
        <div id="videoButtons">
            <div className="videoBtn" id="leaveCall"> Leave Call </div>
            <div className="videoBtn"  id="findNewBuddy" onClick={createRoom}> Find New Buddy </div>
        </div>
        <div className="videoBtn" id="toggleCall" onClick={(e) => {this.handleChange(e)}}> Enter Call </div>
        <div id="videos"></div>
            <div id="titleBar">
            <img id ="titleBar"  src={titleBar}></img>
            </div>
            <div id="divider"></div>
            <div id="messageContainer">
            <div id="messageDiv2">
                <input type="text" id="textInput" onSubmit={submitHandler}></input>
            </div>
            </div>
            <div id="submit" onChange={(e) => {this.handleChange(e)}} onClick={submitHandler}> Submit

            </div>
           </div>
    
    );
};

export default VideoChat;