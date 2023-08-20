import {
  getFirestore,
  collection,
  getDocs,
  where,
  query,
  Firestore,
  deleteDoc,
  addDoc,
  doc,
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
const ticketCol = collection(db, "tickets");
const ticket = tickets();

export const getTickets = async () => {
  const userId = uid().value;
  const q = query(
    ticketCol,
    where("userId", "==", "P8Ygf9YZKOXHQvyLtPH6jOiVHL23")
  );
  const ticketsSnapshot = await getDocs(q);
  const ticketsList = ticketsSnapshot.docs.map((doc) => doc.data());
  ticket.value = ticketsList;
  return ticketsList;
};

export const createTicket = async (
  subject: string,
  message: string,
  course: string
) => {
  const userId = uid().value;

  const data = {
    subject,
    message,
    course,
    userId,
  };
  console.log(data);
  const docRef = await addDoc(ticketCol, data);
  console.log("Document written with ID:", docRef.id);
};

export const deleteTicket = async (ticketId: string) => {
  const docRef = doc(db, "tickets", ticketId);
  const ref = await deleteDoc(docRef);
  return ref;
};
