<template>
    <div class="pb-1">
            <small class="col-md-6 text-right">From ME</small><br>
        <p :class="message.userId != uid().value ? `badge-secondary p-1` : `badge-primary p-1`" style="display:inline">
            {{ message.message }}</p><br>
            <small class="col-md-6 text-right">time : {{ message.createdAt }}</small><br>
        <small v-if="message.userId != userId"><i>sent by HOD</i></small>
    </div>
</template>

<script setup>
const { message } = defineProps(['message'])
const userId = uid().value;
</script>

<style lang="scss" scoped></style>