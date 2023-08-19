<script>
export default {
    data() {
        return {
            name: '',
            email: '',
            password: '',
            level: '',
        }
    }
    ,
    methods: {
        async register() {
            const user = await registerUser(this.email, this.password, this.level);
            console.log(user);
        }
    }
}
</script>

<template>
    <v-row class="d-flex mb-3">
        <v-col cols="12">
            <v-label class="font-weight-bold mb-1">Name</v-label>
            <v-text-field v-model="name" variant="outlined" hide-details color="primary"></v-text-field>
        </v-col>
        <v-col cols="12">
            <v-label class="font-weight-bold mb-1">Email Address</v-label>
            <v-text-field variant="outlined" v-model="email" type="email" hide-details color="primary"></v-text-field>
        </v-col>
        <v-col cols="12">
            <v-label class="font-weight-bold mb-1">Password</v-label>
            <v-text-field variant="outlined" v-model="password" type="password" hide-details color="primary"></v-text-field>
        </v-col>
        <v-col cols="12">
            <v-label class="font-weight-bold mb-1" hide-details color="primary" variant="outlined">Level</v-label>
            <v-select v-model="level" label="Select Level" :items="['100', '200', '300', '400']">
            </v-select>
        </v-col>
        <v-col cols="12">
            <v-btn color="primary" size="large" block flat @click="register">Sign up</v-btn>
        </v-col>
    </v-row>
</template>
