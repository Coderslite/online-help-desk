<template>
    <div>
        <h1>Admin</h1>
        <div class="row grid">
            <div class="col-md-4 mb-3">
                <div class="card bg-primary">
                    <div class="card-header">
                        <h3>Total Users</h3>
                        <div class="row justify-content-between">
                            <h1 class="col-6">{{ users.length }}</h1>
                            <p class="col-6"><nuxt-link to="" class="btn text-white">View Users</nuxt-link></p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4 mb-3">
                <div class="card bg-secondary">
                    <div class="card-header">
                        <h3>Total Courses</h3>
                        <div class="row justify-content-between">
                            <h1 class="col-6">43</h1>
                            <p class="col-6"><nuxt-link to="" class="btn text-white">View Courses</nuxt-link></p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4 mb-3">
                <div class="card" style="background-color: rgb(165, 42, 42);">
                    <div class="card-header">
                        <h3>Levels</h3>
                        <div class="row justify-content-between">
                            <h1 class="col-6">43</h1>
                            <p class="col-6"><nuxt-link to="" class="btn text-white">View Levels</nuxt-link></p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4 mb-3">
                <div class="card" style="background-color: rgb(165, 42, 85);">
                    <div class="card-header">
                        <h3>Total Tickets</h3>
                        <div class="row justify-content-between">
                            <h1 class="col-6">43</h1>
                            <p class="col-6"><nuxt-link to="" class="btn text-white">View Tickets</nuxt-link></p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4 mb-3">
                <div class="card bg-success">
                    <div class="card-header">
                        <h3>Answered Tickets</h3>
                        <div class="row justify-content-between">
                            <h1 class="col-6">43</h1>
                            <p class="col-6"><nuxt-link to="" class="btn text-white">View Tickets</nuxt-link></p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4 mb-3">
                <div class="card bg-warning">
                    <div class="card-header">
                        <h3>Unanswered Tickets</h3>
                        <div class="row justify-content-between">
                            <h1 class="col-6">43</h1>
                            <p class="col-6"><nuxt-link to="" class="btn text-white">View Tickets</nuxt-link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            users: []
        }
    },
    methods: {
        async getUsers() {
            try {
                this.users = await getAllUsers();
                console.log(this.users)
            } catch (error) {
                console.log(error)
            }
        }
    },
    beforeMount() {
        this.getUsers();
    }
}

</script>

<style lang="scss" scoped></style>