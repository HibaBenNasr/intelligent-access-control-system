import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import Swal from 'sweetalert2'
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

//Firebase configuration *****


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();
export const auth = getAuth(firebaseApp ); 

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
 try {
     const res = await signInWithPopup(auth, googleProvider);
     const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
     const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
       uid: user.uid,
       name: user.displayName,
       authProvider: "google",
       email: user.email,
     });
   }
 } catch (err) {
    console.error(err);
    alert(err.message);
  }
};


// User's login *****
const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    

  }
};

// Admin's Login ****
var mail="admin@gmail.com";
var pass='admin12345'
const logInWithEmailAndPassword2 = async (mail, pass) => {
  try {
    await signInWithEmailAndPassword(auth, mail, pass);
    
  } catch (err) {
    console.error(err);
    
  }
};

// ADD users ******
const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    logout();
    logInWithEmailAndPassword2(mail,pass);

  } catch (err) {
    console.error(err);
  
  }
};


// Reset password function ****
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
   
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: "Password reset link sent!",
      showConfirmButton: false,
      timer: 1500
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};


//Logout function *****
const logout = () => {
  signOut(auth);
};
export {
 
signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};