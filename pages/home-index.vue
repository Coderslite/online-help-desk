<template>
    <div class="container">
        <section class="mb-5">
            <div class="row">
                <div class="col-md-4 pb-0">
                    <h1 class="mb-2">Online Help Desk</h1>
                    <h6 class="mt-3">Get assisted with the issues in your course</h6>
                    <nuxt-link to="/auth/Login" class="btn btn-primary mt-3">Get Started</nuxt-link>
                </div>
                <div class="col-md-7">
                    <img src="https://th.bing.com/th/id/R.35bdd9697625d5dec232f01060de5b7c?rik=rIt%2fXkscRDMsIw&pid=ImgRaw&r=0"
                        alt="" class="w-100">
                </div>
            </div>
        </section>

        <!-- Service -->
        <Service />
    </div>
</template>

<script setup>
import About from '@/components/landing/about.vue'
import Service from '@/components/landing/service.vue'
definePageMeta({
    layout: 'custom',
})



</script>

<style scoped></style>