import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCZom22SCaq1uuerI2mDcdpTxqwE0od9CA",
  authDomain: "ppt-vr.firebaseapp.com",
  databaseURL: "https://ppt-vr.firebaseio.com",
  projectId: "ppt-vr",
  storageBucket: "ppt-vr.appspot.com",
  messagingSenderId: "200196049991",
  appId: "1:200196049991:web:91d3d74f981f239c00b562"
  };
firebase.initializeApp(firebaseConfig);

export default firebase;