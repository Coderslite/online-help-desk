<template>
    <div>
        <h1>Tickets Created</h1>
        <nuxt-link to="/ticket/create-ticket" class="btn btn-primary mr-auto">New</nuxt-link>
        <table class="table table-responsive">
            <thead>
                <th>Id</th>
                <th>Ticket ID</th>
                <th>Title</th>
                <th>Message</th>
                <th>CreatedAt</th>
                <th>Edit</th>
                <th>Delete</th>
            </thead>
            <tbody>
                <tr v-for="(ticket, index) in ticketList">
                    <td>{{ index + 1 }}</td>
                    <td>1</td>
                    <td>{{ ticket.subject }}</td>
                    <td>{{ ticket.message }}</td>
                    <td>1</td>
                    <td><button class="btn btn-primary">Edit</button></td>
                    <td><button class="btn btn-danger" @click="delTickect()">Delete</button></td>
                </tr>
            </tbody>
        </table>
        <p class="text-center text-danger" v-if="ticketList.length < 1">NO TICKET CREATED YET</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            ticketList: []
        }
    },
    methods: {
        async getTicket() {
            try {
                this.ticketList = await getTickets()
                console.log("tickets", this.ticketList)
            } catch (error) {
                console.log(error)
            }
        },
        async delTickect() {
            try {
                const ref = await deleteTicket();
                console.log(ref)
            } catch (error) {
console.log(error)
            }
        }
    },

    beforeMount() {
        this.getTicket()

        console.log("ticket mounted", this.ticketList)
    }
}
</script>

<style lang="scss" scoped></style>