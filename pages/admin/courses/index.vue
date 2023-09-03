<template>
    <div>
        <h1>Courses</h1>
        <nuxt-link to="create-course" class="btn btn-primary mb-4">NEW COURSE</nuxt-link>
        <div class="col-md-8">
            <label for="filter">Filter Course</label>
            <select id="filter" class="form-control mb-5" v-on:change="getCourseByLev()" v-model="filter" value="All">
                <option value="All">All</option>
                <option value="100">100</option>
                <option value="200">200</option>
                <option value="300">300</option>
                <option value="400">400</option>
            </select>
        </div>
        <v-table height="300px">
            <thead>
                <th>ID</th>
                <th>Course Title</th>
                <th>Course Code</th>
                <th>Lecturer</th>
                <th>Level</th>
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
                    <td>{{ course.level }}</td>
                    <td><button class="btn btn-danger" @click="deleteCours(course.docId)">
                            <div v-if="deleting === course.docId" class="spinner-border text-center d-flex" role="status">
                            </div>
                            <span v-else>Delete</span>
                        </button></td>
                    <!-- <td><button class="btn btn-primary">Edit</button></td> -->
                </tr>
            </tbody>
        </v-table>
        <p class="text-center text-danger" v-if="courses.length < 1 && !loading">NO COURSE AVAILABLE</p>
    </div>
</template>

<script>
definePageMeta({
    middleware: ['auth']
})

export default {
    data() {
        return {
            courses: [],
            loading: true,
            deleting: 0,
            filter: "All"
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
        async getCourseByLev() {
            try {
                this.loading = true;
                this.courses = await getCourseByLevel(this.filter);
            } catch (error) {
                console.log(error)
            }
            finally {
                this.loading = false
            }
        },
        async deleteCours(courseId) {
            console.log(courseId)
            this.deleting = courseId;
            try {
                await deleteCourse(courseId)
                this.getCourses()
            } catch (error) {
                console.log(error);
            } finally {
                this.deleting = 0;
            }
        }
    },
    beforeMount() {
        this.getCourses();
    }

}

</script>

<style lang="scss" scoped></style>