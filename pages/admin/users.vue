<template>
    <div>
        <div class="row">
            <h1 class="col-md-4">Users</h1>
            <div class="col-md-8">
                <label for="filter">Filter Users</label>
                <select id="filter" class="form-control mb-5" v-on:change="getTickets" v-model="filter" value="All">
                    <option value="All">All</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
        </div>
        <!-- <nuxt-link to="/ticket/create-ticket" class="btn btn-primary mr-auto">New</nuxt-link> -->
        <v-table height="300px">
            <thead>
                <tr>
                    <th>
                        ID
                    </th>
                    <th>
                        User ID
                    </th>
                    <th>
                        Email
                    </th>
                    <th>
                       Role
                    </th>
                    <th>
                        Delete
                    </th>
                </tr>
            </thead>
            <div v-if="loading" class="spinner-border text-center d-flex" role="status">
            </div>
            <tbody>
                <tr v-for="(item, index) in users" :key="item.docId">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.userId }}</td>
                    <td>{{ item.email }}</td>
                    <td>{{ item.role }}</td>
                    <td><button class="btn btn-danger">Delete</button></td>
                </tr>
            </tbody>
        </v-table>
        <p class="text-center text-danger" v-if="users.length < 1 && !loading">NO USER AVAILABLE</p>
    </div>
</template>
<script>
import { CheckIcon } from 'vue-tabler-icons';

definePageMeta({
    middleware: ['auth']
})


export default {
    data() {
        return {
            loading: true,
            deleting: 0,
            users: [],
            filter: 'All',
        };
    },
    methods: {
        async delTicket(ticketId) {
            try {
                this.deleting = ticketId;
                const ref = await deleteTicketAndSubcollections(ticketId);
                this.getTicket();
            }
            catch (error) {
                console.log(error);
                alert(error);
            }
            finally {
                this.deleting = 0;
            }
        },
        async getTickets() {
            this.loading = true;
            try {
                this.users = await getAllUsers(this.filter);
            }
            catch (error) {
                console.log(error);
            }
            finally {
                this.loading = false;
            }
        },
        async updateTicketStatus(ticketId, status) {
            this.loading = true;
            try {
                await updateTicketStatus(ticketId, status);
                this.getTickets();
            }
            catch (error) {
            }
            finally {
                this.loading = false;
            }
        }
    },
    beforeMount() {
        this.getTickets();
    },
    components: { CheckIcon }
};
</script>
<style lang="scss" scoped></style>
