import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDFh5uy3zfyl_QiJK9L_xGhaXJV069y0N8",
    authDomain: "temp-f2d4e.firebaseapp.com",
    databaseURL: "https://temp-f2d4e.firebaseio.com",
    projectId: "temp-f2d4e",
    storageBucket: "temp-f2d4e.appspot.com",
    messagingSenderId: "372170167593",
    appId: "1:372170167593:web:672db772aa9ba7a4155338",
    measurementId: "G-ELN3Q5GM9D"
  };
firebase.initializeApp(firebaseConfig);

export default firebase;