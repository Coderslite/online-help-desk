<template>
    <v-row class="d-flex mb-3">
        <v-col cols="12">
            <v-label class="font-weight-bold mb-1">Course</v-label>
            <v-select v-model="course" label="Course" :items="courses">
            </v-select>
        </v-col>
        <v-col cols="12">
            <v-label class="font-weight-bold mb-1">Subject</v-label>
            <v-text-field v-model="subject" variant="outlined" color="primary"></v-text-field>
        </v-col>
        <v-col cols="12">
            <v-label class="font-weight-bold mb-1">Message</v-label>
            <v-textarea variant="outlined" v-model="message" type="password" color="primary"></v-textarea>
        </v-col>
        <v-col cols="12" class="pt-0">
            <v-btn color="primary" size="large" block flat @click="createTickets">Create Ticket</v-btn>
        </v-col>
    </v-row>
</template>

<script>
export default {
    data() {
        return {
            subject: '',
            message: '',
            courses: ['English', 'Maths', 'Chemistry', 'Physics'],
            course: ''

        }
    }
    ,
    methods: {
        async createTickets() {
            try {
                await createTicket(this.subject,this.message,this.course);
            } catch (error) {
                console.log(error);
            }
        }
    }
}

</script>

<style lang="scss" scoped></style>