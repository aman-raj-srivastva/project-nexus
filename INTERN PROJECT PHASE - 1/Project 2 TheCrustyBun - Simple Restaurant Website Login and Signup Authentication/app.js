const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

const submit_sign_up = document.querySelector("#submit_sign_up")

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "yOUR_MEASSURMENT_ID"
};
    
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
auth.languageCode='en'
const provider = new GoogleAuthProvider();
const fbprovider = new FacebookAuthProvider();

document.getElementById('google-sign-in').addEventListener('click', function() {
  signInWithPopup(auth, provider)
  .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      document.getElementById('username').textContent = auth.currentUser.displayName;
      // document.getElementById('profile').src = auth.currentUser.photoURL;
      document.getElementById('login-section').classList.add('hidden');
      window.location.href = 'home.html';
  })
  .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.error('Error during sign in:', errorCode, errorMessage);
  });
});

document.getElementById('fb-sign-in').addEventListener('click', function() {
  signInWithPopup(auth, fbprovider)
  .then((result) => {
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      document.getElementById('username').textContent = auth.currentUser.displayName;
      // document.getElementById('profile').src = auth.currentUser.photoURL;
      document.getElementById('login-section').classList.add('hidden');
      window.location.href = 'home.html';

  })
  .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.error('Error during sign in:', errorCode, errorMessage);
  });
});

document.getElementById('submit_sign_up').addEventListener('click',function() {
  var email = document.getElementById('email-sign-up').value;
  var password = document.getElementById('pass-sign-up').value;
  //var name = document.getElementById('name').value;
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user);
    alert("You are Successfully Registered!🥳")
    container.classList.remove("sign-up-mode");
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    alert(error)
  });
})

document.getElementById('submit-sign-in').addEventListener('click',function() {
  var email = document.getElementById('email-sign-in').value;
  var password = document.getElementById('pass-sign-in').value;
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
      document.getElementById('login-section').classList.add('hidden');
      window.location.href = 'home.html';
    alert("Welcome back!👋")
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    alert(error)
  });
})


auth.onAuthStateChanged((user) => {
  if (user) {
      document.getElementById('login-section').classList.add('hidden');
      window.location.href = 'home.html';
    } else {
      document.getElementById('login-section').classList.remove('hidden');
  }
});
