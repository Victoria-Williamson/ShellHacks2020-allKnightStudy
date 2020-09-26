import React from 'react';
import './App.css';
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import facebookLogo from "./authImages/Facebook.png";
import googleLogo from "./authImages/Google.png";
import twiiterLogo from "./authImages/Twitter.png";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap';
import titleBar from "./authImages/title-bar.png";
import dividerLine from "./authImages/divider-line.png"
import topRowImg from "./authImages/topImage.png";
import middleRowImg from "./authImages/middleImage.png";
import leftRowImg from "./authImages/bottomImage.png";
var firebase = require('firebase'); // Needed whenever using firestore !!
var firebaseui = require('firebaseui');


// Required for side-effects
require("firebase/firestore");


function App() {
  class User {
    constructor(id, email, lookingFor, major, password, profilePic, school, status, userName)
    {
      this.email = email;
      this.id = id;
      this.lookingFor = lookingFor;
      this.major = major;
      this.password = password;
      this.profilePic = profilePic;
      this.school = school;
      this.status = status;
      this.userName = userName;

    }
  }
  /*firebase.initializeApp({
    apiKey:"AIzaSyAR8bAOpBYHJwJMZ39gMgvuZgsgFf1M8f8",
    authDomain: "studybuddies-99115.firebaseapp.com",
    projectId: "studybuddies-99115",
  });*/
  



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
  var user;
    // Needed to push to cloude firestore !!!!
    firebase.initializeApp(firebaseConfig);
    /*const db = firebase.firestore();
      db.collection("users").add({
        email: "something@google.com",
        lookingFor: "friend",
        major: "Computer Science",
        password: "1235334q32",
        school:"UCF",
        status:"online",
        userName:"ucf111",
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        var currentDoc = db.collection("users").doc(docRef.id);
        var setID = currentDoc.set({
          id: docRef.id},
          {merge: true});

        user = new User(docRef.id,"something@google.com","friend", "Computer Science","1235334q32","img","UCF", "online", "ucf111");
        console.log(user);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    */
  
  

    // Initialize the FirebaseUI Widget using Firebase.
    
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    
      var uiConfig = {
        callbacks: {
          signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            return true;
          },
          uiShown: function() {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById('loader').style.display = 'none';
          }
        },
        // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
        signInFlow: 'popup',
        signInSuccessUrl: '<url-to-redirect-to-on-success>',
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          firebase.auth.TwitterAuthProvider.PROVIDER_ID,
          firebase.auth.GithubAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
          firebase.auth.PhoneAuthProvider.PROVIDER_ID
        ],
        // Terms of service url.
        tosUrl: '<your-tos-url>',
        // Privacy policy url.
        privacyPolicyUrl: '<your-privacy-policy-url>'
      };  

      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          // ...
        } else {
          // User is signed out.
          // ...
        }
     
  
      });

      window.onclick = function(e)
      {
        // Allows Google Sign in 
        if (e.target.id="Google")
          {
            var provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
            firebase.auth().languageCode = 'eng';
            firebase.auth().signInWithRedirect(provider);
            firebase.auth().getRedirectResult().then(function(result) {
              if (result.credential) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken;
                // ...
              }
              // The signed-in user info.
              var user = result.user;
            }).catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
          }
         // Allows Twitter Sign in
         else if(e.target.id="Twitter")
         {
          var provider = new firebase.auth.TwitterAuthProvider();
          firebase.auth().languageCode = 'eng';
          firebase.auth().signInWithRedirect(provider);
          firebase.auth().getRedirectResult().then(function(result) {
            if (result.credential) {
              // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
              // You can use these server side with your app's credentials to access the Twitter API.
              var token = result.credential.accessToken;
              var secret = result.credential.secret;
              // ...
            }
            // The signed-in user info.
            var user = result.user;
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
         }
         
         else if(e.target.id="Facebook")
         {
          var provider = new firebase.auth.FacebookAuthProvider();
          provider.addScope('user_email');
          firebase.auth().signInWithRedirect(provider);
          firebase.auth().getRedirectResult().then(function(result) {
            if (result.credential) {
              // This gives you a Facebook Access Token. You can use it to access the Facebook API.
              var token = result.credential.accessToken;
              // ...
            }
            // The signed-in user info.
            var user = result.user;
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
         }
         else if(e.target.id="Email")
         {
           console.log('email');
         }
      }
     

      
      
      /*
       <div id="tabBar">
        <div id="websiteSymbol"> *insert symbol* </div>
        <div className="tabButton" id="tab1" href="#"> Tab 1</div>
        <div className="tabButton" id="tab2" href="#"> Tab 2</div>
        <div className="tabButton" id="tab3" href="#"> Tab 3</div>
        <div className="tabButton" id="tab4" href="#"> Tab 4</div>
        <div className="tabButton" id="tab5" href="#"> Tab 5</div>
      </div>
      <div className="auth" id="authentication">
        <div id="toggleLogin">
          Log In
        </div>
        <div className="auth" id="signUp">
          Sign Up
        </div>
        */
  return (
    <div className="App">
       <div id="leftSideGraphics">
      <div id="topRow">
        <div className="topgraphicImg" id="topRowImg">
          <img height="200" width="200"src={topRowImg}></img>
        </div>
        <div className="topgraphicImg" id="topRowTxt">
        <img height="200" width="200" src={topRowImg}></img>
        </div>
        <div className="middlegraphicImg" id="middleRowImg">
        <img height="200" width="200" src={middleRowImg}></img>
        </div>
        <div className="middlegraphicImg" id="middleRowTxt">
          <img height="200" width="200" src={middleRowImg}></img>
        </div>
        <div className="bottomgraphicImg" id="leftRowImg">
          <img height="200" width="200" src={leftRowImg}></img>
        </div>
        <div className="bottomgraphicImg" id="leftRowTxt">
          <img height="200" width="200" src={leftRowImg}></img>
        </div>
      </div>
    </div>
      <div id="titleBar">
        <img id ="titleBar" src={titleBar}></img>
      </div>
      <div id="authLogos">
      <div id="Google">
      <img className="authLogo" src={googleLogo}></img>
      </div>
      <div className="authLogo" id="Twitter">
      <img src={twiiterLogo}></img>
      </div>
     <div className="authLogo" id="Facebook">
       <img src={facebookLogo}></img>
     </div>
     </div>
      </div>
  );
}

export default App;
