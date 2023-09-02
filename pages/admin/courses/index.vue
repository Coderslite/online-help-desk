<template>
    <div>
        <h1>Courses</h1>
        <nuxt-link to="create-course" class="btn btn-primary mb-4">NEW COURSE</nuxt-link>
        <v-table height="300px">
            <thead>
                <th>ID</th>
                <th>Course Title</th>
                <th>Course Code</th>
                <th>Lecturer</th>
                <th>Delete</th>
                <!-- <th>Edit</th> -->
            </thead>
            <div v-if="loading" class="spinner-border text-center d-flex" role="status">
            </div>
            <tbody>
                <tr v-for="(course, index) in courses">
                    <td>{{ index + 1 }}</td>
                    <td>{{ course.courseTitle }}</td>
                    <td>{{ course.courseCode }}</td>
                    <td>{{ course.lecturer }}</td>
                    <td><button class="btn btn-danger" @click="deleteCours(course.docId)">Delete</button></td>
                    <!-- <td><button class="btn btn-primary">Edit</button></td> -->
                </tr>
            </tbody>
        </v-table>
        <p class="text-center text-danger" v-if="courses.length < 1 && !loading">NO COURSE AVAILABLE</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            courses: [],
            loading: true,
        }
    },
    methods: {
        async getCourses() {
            try {
                this.loading = true
                this.courses = await getAllCourses();
            } catch (error) {
                console.log(error)
            } finally {
                this.loading = false
            }
        },
        async deleteCours(courseId) {
            console.log(courseId)
            try {
                await deleteCourse(courseId)
                this.getCourses()
            } catch (error) {
                console.log(error);
            }
        }
    },
    beforeMount() {
        this.getCourses();
    }

}

</script>

<style lang="scss" scoped></style>