import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User,
} from "firebase/auth";

import {
  getFirestore,
  collection,
  getDocs,
  where,
  query,
  Firestore,
  addDoc,
} from "firebase/firestore/lite";

import { initializeApp } from "firebase/app";
import { isLogin } from "./useState";

// const config = useRuntimeConfig();
const firebaseConfig = {
  apiKey: "AIzaSyAcxuzMwl_j0ePCIZvTHv-JIlxs_SQjBMA",
  authDomain: "online-help-desk-3aace.firebaseapp.com",
  projectId: "online-help-desk-3aace",
  storageBucket: "online-help-desk-3aace.appspot.com",
  messagingSenderId: "371284053019",
  appId: "1:371284053019:web:b90037d0faca2c3a193cbe",
};
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);



export const initUser =async ()=>{
  const firebaseUser = userFirebaseUser();
  const userLogin = isLogin();
  firebaseUser.value = auth.currentUser;
  onAuthStateChanged(auth,(user)=>{
    if(user){
      userLogin.value =true
      localStorage.setItem('isLogin','true');
    }
    else{
      console.log("auth changed",user)
      userLogin.value =false
      localStorage.setItem('isLogin','false');
    }
    firebaseUser.value =user;
    console.log("auth changed",user)

})

}

export const registerUser = async (email: any, password: any, level: any) => {
  try {
    console.log("registering");
    console.log(auth);
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const userInfo = {
      email: email,
      password: password,
      level: level,
      role: "user",
    };
    await addUser(userInfo);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const addUser = async (user: any) => {
  try {
    const userCol = collection(db, "users");
    const userRef = await addDoc(userCol, user);
    console.log("Document written with ID:", userRef.id);
  } catch (error) {
    console.error("Error adding document:", error);
  }
};

export const login = async (email: any, password: any) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    navigateTo('/')
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    console.log("logging out")
    await auth.signOut();
    console.log("log out successful")
    navigateTo('/auth/login')
  } catch (error) {
    throw error;
  }
};

