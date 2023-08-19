import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
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

const user = ref(auth.currentUser);

auth.onAuthStateChanged((_user) => {
  user.value = _user;
});

export const registerUser = async (email: any, password: any, level: any) => {
  try {
    console.log("registering");
    console.log(auth);
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    user.value = userCredential.user;
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
    user.value = userCredential.user;
    console.log(user)
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    console.log("logging out")
    await auth.signOut();
    user.value = null;
    console.log("log out successful")
  } catch (error) {
    throw error;
  }
};

export const isAuthenticated = () => {
  const myuser = auth.currentUser;
    console.log(myuser?.uid!== null)
    console.log(myuser);
    console.log(user)
    return myuser?.uid !== null;
  };
  