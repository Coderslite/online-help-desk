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
} from "firebase/firestore/lite";

import { initializeApp } from "firebase/app";
import { Timestamp } from "firebase/firestore";

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

export const createTicket = async (subject: any, message: any, course: any) => {
  const userId = uid().value;
  let dateTime = new Date();

  const ticketData = {
    subject: subject,
    course: course,
    userId: userId,
    status: dateTime,
  };

  const subMessageData = {
    message: message,
    createdAt: dateTime,
    userId: userId,
  };

  // Add the ticket document to the "tickets" collection
  const ticketRef = await addDoc(collection(db, "tickets"), ticketData);
  const ticketId = ticketRef.id; // Get the ticket document ID

  // Add the sub-message document to the "sub_messages" sub-collection under the ticket document
  const subMessageRef = await addDoc(
    collection(ticketRef, "ticket_conversation"),
    subMessageData
  );
  const subMessageId = subMessageRef.id; // Get the sub-message document ID

  console.log("Ticket document written with ID:", ticketId);
  console.log("Sub-message document written with ID:", subMessageId);

  // Update the ticket document with the sub-message ID and timestamp
  const dataWithIds = {
    ...ticketData,
    docId: ticketId,
    dateTime,
    subMessageId: subMessageId,
  };
  await updateDoc(doc(db, "tickets", ticketId), dataWithIds);

  return true;
};

export const deleteTicket = async (ticketId: string) => {
  console.log("ticket id", ticketId);
  try {
    const docRef = doc(db, "tickets", ticketId);
    const ref = await deleteDoc(docRef);
    console.log(ref);
    return ref;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getTicketConversation = async (
  ticketId: string
): Promise<SubMessage[]> => {
  try {
    const subMessagesQuery = query(
      collection(db, "tickets", ticketId, "ticket_conversation")
    );
    const subMessagesSnapshot = await getDocs(subMessagesQuery);
    const subMessages: SubMessage[] = [];
    subMessagesSnapshot.forEach((doc) => {
      subMessages.push({ id: doc.id, ...doc.data() } as SubMessage);
    });
    return subMessages;
  } catch (error) {
    console.error("Error fetching ticket conversation:", error);
    throw error;
  }
};

export const sendMessageToTicket = async (ticketId:any, message:any) => {
  const userId = uid().value;
  const subMessageData = {
    message: message,
    createdAt: new Date().toISOString(),
    userId: userId,
  };

  try {
    // Add the sub-message document to the "sub_messages" sub-collection under the ticket document
    const subMessageRef = await addDoc(collection(db, 'tickets', ticketId, 'ticket_conversation'), subMessageData);
    const subMessageId = subMessageRef.id; // Get the sub-message document ID

    console.log("Sub-message document written with ID:", subMessageId);
    
    return true;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

interface SubMessage {
  id: string;
  message: string;
  createdAt: string;
  userId: string;
}