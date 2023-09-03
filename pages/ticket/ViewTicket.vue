<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="chat-container">
          <div class="chat-messages">
            <div v-for="(message, index) in messages" :key="index" class="chat-message">
              <span :class="{ 'user-message': message.isUser, 'other-message': !message.isUser }">
                {{ message.text }}
              </span>
            </div>
          </div>
          <div class="chat-input">
            <input v-model="newMessage" @keyup.enter="sendMessage" class="form-control" placeholder="Type a message..." />
            <button @click="sendMessage" class="btn btn-primary mt-2">Send</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
definePageMeta({
  middleware: ['auth']
})

export default {
  data() {
    return {
      messages: [
        { text: "Hello!", isUser: false },
        { text: "Hi there!", isUser: true },
      ],
      newMessage: "",
    };
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim() === "") return;

      this.messages.push({ text: this.newMessage, isUser: true });
      this.newMessage = "";

      // Simulate a reply after a delay
      setTimeout(() => {
        this.messages.push({ text: "I'm good, how about you?", isUser: false });
      }, 1000);
    },
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
  background-color: #e2f7ff;
  padding: 5px 10px;
  border-radius: 10px;
  align-self: flex-end;
}

.other-message {
  background-color: #f5f5f5;
  padding: 5px 10px;
  border-radius: 10px;
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
  