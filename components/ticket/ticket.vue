<template>
    <div class="pb-1">
        <p :class="message.userId!=uid().value? `badge-secondary p-1`:`badge-primary p-1`" style="display:inline">
            {{ message.message }}</p>
        <small v-if="message.userId != userId"><i>sent by HOD</i></small>
    </div>
</template>

<script setup>
const {message} = defineProps(['message'])
const userId = uid().value;
</script>

<style lang="scss" scoped></style>