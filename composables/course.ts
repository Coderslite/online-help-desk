import {
  getFirestore,
  collection,
  getDocs,
  where,
  query,
  Firestore,
  deleteDoc,
  addDoc,
  setDoc,
  updateDoc,
  doc,
  orderBy,
} from "firebase/firestore/lite";

import { initializeApp } from "firebase/app";

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
const courseCol = collection(db, "courses");
let dateTime = new Date().toISOString();

export const getAllCourses = async () => {
  const q = query(courseCol, orderBy("createdAt"));
  const courseSnapshot = await getDocs(q);
  const courseList = courseSnapshot.docs.map((doc) => doc.data());
  return courseList;
};

export const getCourseByName = async (courseName: string) => {
  const q = query(
    courseCol,
    where("courseTitle", "==", courseName),
    orderBy("createdAt")
  );
  const courseSnapshot = await getDocs(q);
  const courseList = courseSnapshot.docs.map((doc) => doc.data());
  return courseList;
};

export const addCourse = async (data: any) => {
  try {
    const docRef = await addDoc(courseCol, data);
    const updateData = {
      createdAt: dateTime,
      docId: docRef.id,
    };
    await updateDoc(doc(db, "courses", docRef.id), updateData);
    alert("Course Added");
  } catch (error) {
    console.log(error);
  }
};

export const deleteCourse = async (courseId: string) => {
  try {
    await deleteDoc(doc(db, "courses", courseId));
    console.log("document deleted");
  } catch (error) {
    console.log(error);
  }
};
