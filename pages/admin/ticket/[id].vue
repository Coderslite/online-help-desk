<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <h1 class="text-left">Ticket History</h1>
                <div class="chat-container">
                    <h1 v-if="loading" class="text-center">Loading.......</h1>
                    <div v-if="!loading" class="chat-messages">
                        <div v-for="(message, index) in messages" :key="message.id" class="chat-message">
                            <Ticket :message="message"
                                :class="message.userId == uid().value ? `user-message` : `other-message`" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="chat-input col-md-8">
                <input v-model="newMessage" @keyup.enter="sendMessage" class="form-control"
                    placeholder="Type a message..." />
                <button @click="sendMessage" class="btn btn-primary mt-2">Send</button>
            </div>
        </div>
    </div>
</template>

<script>
definePageMeta({
    middleware: ['auth']
})

import { onSnapshot, collection, query, orderBy, getFirestore } from 'firebase/firestore'; // Import necessary Firestore functions
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
export default {
    data() {
        return {
            messages: [],
            newMessage: "",
            ticketId: "",
            loading: true,
            unsubscribeRealtime: null
        };
    },
    methods: {
        async getConversation(ticketId) {
            try {
                const subMessagesQuery = query(
                    collection(db, "tickets", ticketId, "ticket_conversation"),
                    orderBy("createdAt")
                );

                const unsubscribe = onSnapshot(subMessagesQuery, (snapshot) => {
                    this.messages = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    this.loading = false;

                    this.$nextTick(() => {
                        setTimeout(() => {
                            this.scrollToLastMessage();
                        }, 100);
                    });
                });

                this.unsubscribeRealtime = unsubscribe;
            } catch (error) {
                console.log(error);
            } finally {
                this.loading = false;
            }
        },
        async sendMessage() {
            try {
                await sendMessageToTicket(this.ticketId, this.newMessage);
                this.newMessage = '';
            } catch (error) {
                alert(error);
            }
        },
        scrollToLastMessage() {
            const chatContainer = this.$refs.chatContainer;
            if (chatContainer) {
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }
        }
    },
    watch: {
        '$route.params.id': {
            handler(newId, oldId) {
                if (this.unsubscribeRealtime) {
                    this.unsubscribeRealtime();
                }
                this.ticketId = newId;
                this.getConversation(this.ticketId);
            },
            immediate: true
        }
    },
    beforeDestroy() {
        if (this.unsubscribeRealtime) {
            this.unsubscribeRealtime();
        }
    }
};
</script>
  
<style scoped>
.chat-container {
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.chat-messages {
    max-height: 60vh;
    overflow-y: scroll;
}


.chat-message {
    margin: 10px 0;
}

.user-message {
    text-align: right;
}

.other-message {
    text-align: left;
}

.chat-input {
    display: flex;
    margin-top: 10px;
}

@media (max-width: 767px) {
    .chat-input {
        flex-direction: column;
    }

    .chat-input input {
        margin-top: 10px;
    }
}
</style>
  