<template>
    <Header />
    <!-- Jumbotron -->
    <div class="p-5 text-center bg-light" style="margin-top: 58px;">
        <slot />

    </div>
    <!-- Jumbotron -->
    <Footer />

    <div>

    </div>
</template>
<script setup>
import Footer from "@/components/landing/footer.vue";
import Header from "@/components/landing/header.vue";

</script>

<style scoped></style>
