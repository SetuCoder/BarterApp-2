import firebase from 'firebase'
require('@firebase/firestore')

const firebaseConfig = {
    apiKey: "AIzaSyD3MiRjjI7HHMEBaW2nN0V42fv1uN9Jpmg",
    authDomain: "barterapp-40e7b.firebaseapp.com",
    projectId: "barterapp-40e7b",
    storageBucket: "barterapp-40e7b.appspot.com",
    messagingSenderId: "602611837587",
    appId: "1:602611837587:web:2f6f720dd540076c07fb66"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


export default firebase.firestore()