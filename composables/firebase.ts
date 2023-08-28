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
import { userEmail } from "./useState";
import { getTickets } from "./ticket";

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

export const initUser = async () => {
  const firebaseUser = userFirebaseUser();
  const loginEmail = userEmail();
  const loginUid = uid();
  // firebaseUser.value = auth.currentUser;
  onAuthStateChanged(auth, (user) => {
    if (user) {
      localStorage.setItem("isLogin", "true");
      loginEmail.value = user.email;
      loginUid.value = user.uid;
      getTickets();
      return true;
    } else {
      console.log("auth changed", user);
      localStorage.setItem("isLogin", "false");
      loginEmail.value = "";
      loginUid.value = "";
    }
    firebaseUser.value = user;
    console.log("auth changed", user);
    return false;
  });
};

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
      userId: userCredential.user.uid,
    };
    localStorage.setItem("userId", userCredential.user.uid);
    await addUser(userInfo);
    localStorage.setItem("logiinType", "user");
  } catch (error) {
    console.error(error);
    alert(error);
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
    const userCol = collection(db, "users");
    const q = query(userCol, where("email", "==", email));
    const ticketsSnapshot = await getDocs(q);
    const ticketsList = ticketsSnapshot.docs.map((doc) => doc.data());
    const type = ticketsList[0].role;
    console.log("loginType is: ", type);
    localStorage.setItem("loginType", type);
    localStorage.setItem("userId", userCredential.user.uid);
    type == "admin" ? navigateTo("/admin/") : navigateTo("/");
    return userCredential.user;
  } catch (error) {
    alert(error);
    throw error;
  }
};

export const logout = async () => {
  try {
    console.log("logging out");
    await auth.signOut();
    console.log("log out successful");
    navigateTo("/auth/login");
    localStorage.removeItem("userId");
    localStorage.removeItem("loginType");
  } catch (error) {
    alert(error);
    throw error;
  }
};
