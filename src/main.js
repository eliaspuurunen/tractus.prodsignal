import './assets/bootstrap.min.css'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDa8YsgCOe9hvDeQqL5plg384LJ494WC64",
  authDomain: "tractus-prodconsole.firebaseapp.com",
  databaseURL: "https://tractus-prodconsole-default-rtdb.firebaseio.com",
  projectId: "tractus-prodconsole",
  storageBucket: "tractus-prodconsole.firebasestorage.app",
  messagingSenderId: "70813009308",
  appId: "1:70813009308:web:375d0d401ebc3e3448f459"
};

// Initialize Firebase
const fbApp = initializeApp(firebaseConfig);
window.$firebase = fbApp;

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
