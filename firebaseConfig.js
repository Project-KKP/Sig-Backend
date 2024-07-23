const { initializeApp } = require('firebase/app');

const firebaseConfig = {
  apiKey: "AIzaSyBkJMm6S9UNPbMXbp8UB5p5ydHE0EsGbrY",
  authDomain: "kkp-demo-d8435.firebaseapp.com",
  projectId: "kkp-demo-d8435",
  storageBucket: "kkp-demo-d8435.appspot.com",
  messagingSenderId: "60011130049",
  appId: "1:60011130049:web:b25237b5825cb12120f840",
  measurementId: "G-W1MGZ3X3TP"
};

const app = initializeApp(firebaseConfig);

module.exports = { app };
