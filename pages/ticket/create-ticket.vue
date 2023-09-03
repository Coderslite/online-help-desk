<template>
    <v-row class="d-flex mb-3 col-lg-6 mx-auto">
        <h1>Create Tickets</h1>
        <v-col cols="12">
            <v-label class="font-weight-bold mb-1">Course</v-label>
            <v-select v-model="course" label="Course" :items="courses" variant="outlined">
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
            <v-btn color="primary" size="large" block flat @click="createTickets">
                <div v-if="loading" class="spinner-border text-center d-flex" role="status">
                </div>
                <span v-if="!loading">Create Ticket</span>
            </v-btn>
        </v-col>
    </v-row>
</template>

<script>
export default {
    data() {
        return {
            subject: '',
            message: '',
            courses: [],
            course: '',
            loading: false,

        }
    }
    ,
    methods: {
        async createTickets() {
            try {
                this.loading = true;
                await createTicket(this.subject, this.message, this.course);
                this.subject = '';
                this.message = '';
                this.course = '';
                alert("Ticket Created")
            } catch (error) {
                console.log(error);
                alert(error)
            } finally {
                this.loading = false
            }
        },
        async getCourses() {
            this.loading = true;
            const array = [];
            try {
                this.array = await getAllCourses();
                console.log("array",this.array)
                this.array.forEach(element => {
                    this.courses.push(element['courseTitle'])
                });
                console.log("courses",this.courses)
            } catch (error) {

            }
            finally {
                this.loading = false;
            }
        }
    },
    mounted() {
        this.getCourses()
    }
}

</script>

<style lang="scss" scoped></style>