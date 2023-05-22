import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import "firebase/compat/auth";



const firebaseConfig = {
  apiKey: "AIzaSyBnEM7IVuVCcNUHRi48FAgurjOaNW6eQVI",
  authDomain: "aplikacja-wedkarska.firebaseapp.com",
  projectId: "aplikacja-wedkarska",
  storageBucket: "aplikacja-wedkarska.appspot.com",
  messagingSenderId: "632578869169",
  appId: "1:632578869169:web:43f8df0795b27bd8831f90"
};


let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()
const db = firebase.firestore();
export { auth, db};