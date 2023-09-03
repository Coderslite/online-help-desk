<template>
    <v-row class="d-flex mb-3 col-lg-6 mx-auto">
        <h1>New Course</h1>
        <v-col cols="12">
            <v-label class="font-weight-bold mb-1">Course Title</v-label>
            <v-text-field v-model="courseTitle" variant="outlined" color="primary"></v-text-field>
        </v-col>
        <v-col cols="12">
            <v-label class="font-weight-bold mb-1">Course Code</v-label>
            <v-text-field v-model="courseCode" variant="outlined" color="primary"></v-text-field>
        </v-col>
        <v-col cols="12">
            <v-label class="font-weight-bold mb-1">Lecturer</v-label>
            <v-text-field v-model="lecturer" variant="outlined" color="primary"></v-text-field>
        </v-col>
        <v-col cols="12">
            <v-label class="font-weight-bold mb-1" hide-details color="primary" >Level</v-label>
            <v-select variant="outlined" v-model="level" :items="['100', '200', '300', '400']">
            </v-select>
        </v-col>
        <v-col cols="12" class="pt-0">
            <v-btn color="primary" size="large" block flat @click="add">
                <div v-if="loading" class="spinner-border text-center d-flex" role="status">
                </div>
                <span v-if="!loading">Add Ticket</span>
            </v-btn>
        </v-col>
    </v-row>
</template>

<script>
definePageMeta({
    middleware: ['auth']
})

export default {
    data() {
        return {
            courseTitle: "",
            courseCode: "",
            lecturer: "",
            level: "",
            loading: false,
        }
    },
    methods: {
        async add() {
            try {
                this.loading = true
                const data = {
                    "courseTitle": this.courseTitle,
                    "courseCode": this.courseCode,
                    "lecturer": this.lecturer,
                    "level":this.level,
                }
                await addCourse(data);
                this.courseTitle = "";
                this.courseCode = "";
                this.lecturer = "";
            } catch (error) {
                alert(error)
            }
            finally {
                this.loading = false
            }
        }
    }
}
</script>

<style lang="scss" scoped></style>