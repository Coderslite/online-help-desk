<script>
import { ref } from 'vue';
const checkbox = ref(true);
export default {
    data() {
        return {
            email: '',
            password: '',
            loading: false,
        }
    },
    methods: {
        async login() {
            this.loading = true;
            try {
                await login(this.email, this.password);
            } catch (error) {
                console.log(error)
            }
            finally {
                this.loading = false;
            }
        }
    },
}
</script>

<template>
    <v-row class="d-flex mb-3">
        <v-col cols="12">
            <v-label class="font-weight-bold mb-1">Username</v-label>
            <v-text-field v-model="email" variant="outlined" hide-details color="primary"></v-text-field>
        </v-col>
        <v-col cols="12">
            <v-label class="font-weight-bold mb-1">Password</v-label>
            <v-text-field variant="outlined" v-model="password" type="password" hide-details color="primary"></v-text-field>
        </v-col>
        <v-col cols="12" class="pt-0">
            <div class="d-flex flex-wrap align-center ml-n2">
                <v-checkbox v-model="checkbox" color="primary" hide-details>
                    <template v-slot:label class="text-body-1">Remeber this Device</template>
                </v-checkbox>
                <div class="ml-sm-auto">
                    <NuxtLink to="/" class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium">
                        Forgot
                        Password ?</NuxtLink>
                </div>
            </div>
        </v-col>
        <v-col cols="12" class="pt-0">
            <v-btn color="primary" size="large" block flat @click="login">
                <span v-if="loading" class="spinner-border text-center d-flex" role="status"></span>
                <span v-if="!loading">Sign in</span>
            </v-btn>
        </v-col>
    </v-row>
</template>
