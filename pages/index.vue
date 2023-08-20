<script setup>
/*Call Components*/
 import SalesOverview from '@/components/dashboard/SalesOverview.vue';
import YearlyBreakup from '@/components/dashboard/YearlyBreakup.vue';
import MonthlyEarning from '@/components/dashboard/MonthlyEarnings.vue';
import RecentTransaction from '@/components/dashboard/RecentTransaction.vue';
import ProductPerformance from '@/components/dashboard/ProductPerformance.vue';
import ProductCards from '@/components/dashboard/ProductCards.vue';

definePageMeta({
    middleware:['auth']
})

const firebaseUser = userFirebaseUser();
</script>
<template>
    <v-row>
        <v-col cols="12">
    Welcome Back {{ firebaseUser.email }}
        </v-col>
    </v-row>
</template>