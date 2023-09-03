<template>
    <div>
        <h1>Admin</h1>
        <div v-if="loading" class="spinner-border text-center d-flex" role="status">
        </div>
        <div class="row grid" v-if="!loading">
            <div class="col-md-4 mb-3">
                <div class="card bg-primary">
                    <div class="card-header">
                        <h3>Total Users</h3>
                        <div class="row justify-content-between">
                            <h1 class="col-6">{{ users.length }}</h1>
                            <p class="col-6"><nuxt-link to="users" class="btn text-white">View Users</nuxt-link></p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4 mb-3">
                <div class="card bg-secondary">
                    <div class="card-header">
                        <h3>Total Courses</h3>
                        <div class="row justify-content-between">
                            <h1 class="col-6">{{ courses.length }}</h1>
                            <p class="col-6"><nuxt-link to="courses/" class="btn text-white">View Courses</nuxt-link></p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4 mb-3">
                <div class="card" style="background-color: rgb(165, 42, 85);">
                    <div class="card-header">
                        <h3>Total Tickets</h3>
                        <div class="row justify-content-between">
                            <h1 class="col-6">{{ allTickets.length }}</h1>
                            <p class="col-6"><nuxt-link to="ticket/" class="btn text-white">View Tickets</nuxt-link></p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4 mb-3">
                <div class="card bg-success">
                    <div class="card-header">
                        <h3>Answered Tickets</h3>
                        <div class="row justify-content-between">
                            <h1 class="col-6">{{ closedTickets.length }}</h1>
                            <p class="col-6"><nuxt-link to="ticket/" class="btn text-white">View Tickets</nuxt-link></p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-4 mb-3">
                <div class="card bg-warning">
                    <div class="card-header">
                        <h3>Unanswered Tickets</h3>
                        <div class="row justify-content-between">
                            <h1 class="col-6">{{ openTickets.length }}</h1>
                            <p class="col-6"><nuxt-link to="ticket/" class="btn text-white">View Tickets</nuxt-link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
definePageMeta({
    middleware: ['auth']
})


export default {
    data() {
        return {
            users: [],
            courses: [],
            allTickets: [],
            openTickets: [],
            closedTickets: [],
            loading: true,
        }
    },
    methods: {
        async getUsers() {
            try {
                this.users = await getAllUsers('All');
                console.log(this.users)
            } catch (error) {
                console.log(error)
            }
        },
        async getCourses() {
            try {
                this.courses = await getAllCourses();
            } catch (error) {

            }
        },
        async getTic() {
            try {
                this.allTickets = await getAllTickets('All');
                this.openTickets = await getAllTickets('Open');
                this.closedTickets = await getAllTickets('Closed');
            } catch (error) {

            }
        },
        async fetch() {
            this.loading = true;
            try {
                await this.getUsers();
                await this.getCourses();
                await this.getTic();
            } catch (error) {

            } finally {
                this.loading = false;
            }
        }
    },
    beforeMount() {
        const type = localStorage.getItem("loginType");
        if (type == 'user') {
            navigateTo('/')
        }
        this.fetch()
    }
}

</script>

<style lang="scss" scoped></style>