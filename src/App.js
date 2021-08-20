import React, { useEffect, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import './App.css';

// Configure Firebase.


var config = {
  apiKey: "AIzaSyBWO_j2Yd06A3yAuyAB4NsTYyQX7SzpnJI",
  authDomain: "responsive-cv-a9788.firebaseapp.com",
  projectId: "responsive-cv-a9788",
  storageBucket: "responsive-cv-a9788.appspot.com",
  messagingSenderId: "898270355549",
  appId: "1:898270355549:web:2ba1523d99d9995bbaadb4"
};
firebase.initializeApp(config);

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
};


function App() {
  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      setIsSignedIn(!!user);
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  if (!isSignedIn) {
    return (
      <div className="App">
        <h3>Hostel Allocation</h3>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </div>
    );
  }

  return (
    <div>
      <h1>My App</h1>
      <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
      <a onClick={() => firebase.auth().signOut()}>Sign-out</a>
    </div>
  );
}

export default App;
