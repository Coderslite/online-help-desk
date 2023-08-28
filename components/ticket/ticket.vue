<template>
    <div class="pb-1">
        <small class="col-md-6 text-right" v-if="userId == message.userId">From ME</small><br>
        <p :class="message.userId != userId ? `badge-secondary p-1` : `badge-primary p-1`" style="display:inline">
            {{ message.message }}</p><br>
        <small class="col-md-6 text-right">{{ formatDate(message.createdAt) }}</small><br>
        <small v-if="userId == message.userId && loginType=='admin'">sent by HOD {{ loginType }}</small>
    </div>
</template>


<script setup>
import { ref, defineProps } from 'vue'

const { message } = defineProps(['message'])
const userId = uid().value
const loginType = localStorage.getItem('loginType')

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', options)
}
</script>

<style lang="scss" scoped></style>