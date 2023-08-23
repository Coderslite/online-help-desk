<template>
    <div class="p-3">
        <h5 :class="message.userId!=uid().value? `badge-secondary`:`badge-primary`" style="display:inline">
            {{ message.message }}</h5>
        <small v-if="message.userId != userId"><i>sent by HOD</i></small>
    </div>
</template>

<script setup>
const {message} = defineProps(['message'])
const userId = uid().value;
</script>

<style lang="scss" scoped></style>