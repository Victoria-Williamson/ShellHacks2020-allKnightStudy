import React from 'react';
import './App.css';
// Firebase App (the core Firebase SDK) is always required and must be listed first
//import * as firebase from "firebase/app";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
var firebase = require('firebase');
var firebaseui = require('firebaseui');


function App() {

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

     window.onclick = function(e)
    {
      console.log(e);
    }
    firebase.initializeApp(firebaseConfig);
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
          console.log("twitter");
         }
         
         else if(e.target.id="Facebook")
         {
          console.log("facebook");
         }
         else if(e.target.id="Email")
         {
           console.log('email');
         }
      }
     

      
      

  return (
    <div className="App">
      <div id="Google"> google </div>
      AuthPage
            <div id="firebaseui-auth-container"></div>
            <div id="loader">Loading...</div>
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
      </div>
      Nothing Here yet, but this can be the main page 
    </div>
  );
}

export default App;
