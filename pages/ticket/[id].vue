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
import Ticket from '@/components/ticket/ticket.vue'
export default {
    data() {
        return {
            messages: [],
            newMessage: "",
            ticketId: "",
            loading:true,
        };
    },
    methods: {
        async getConversation(ticketId) {
            try {
                this.messages = await getTicketConversation(ticketId);
                console.log("messages", this.messages)
            } catch (error) {
                console.log(error)
            }finally{
                this.loading =false;
            }
        },
        async sendMessage() {
            try {
                await sendMessageToTicket(this.ticketId, this.newMessage);
                this.getConversation(this.ticketId)
                this.newMessage = ''
            } catch (error) {
                alert(error)
            }
        }
    },
    watch: {
        '$route.params.id': {
            handler(newId, oldId) {
                this.ticketId = newId;
                console.log("ticketID", this.ticketId);
                this.getConversation(this.ticketId);
            },
            immediate: true // Trigger the handler immediately on component creation
        }
    },

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
    max-height: 300px;
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
  