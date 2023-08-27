<template>
    <div>
        <h1>Tickets Created</h1>
        <nuxt-link to="/ticket/create-ticket" class="btn btn-primary mr-auto">New</nuxt-link>
        <v-table height="300px">
            <thead>
                <tr>
                    <th class="text-left">
                        ID
                    </th>
                    <th class="text-left">
                        Ticket ID
                    </th>
                    <th class="text-left">
                        Subject
                    </th>
                    <th class="text-right">EDIT</th>
                    <th class="text-right">DELETE</th>
                    <th class="text-right">View Ticket</th>
                </tr>
            </thead>
            <div v-if="loading" class="spinner-border text-center d-flex" role="status">
            </div>
            <tbody>
                <tr v-for="(item, index) in myTicketList" :key="item.docId">
                    <td class="text-left">{{ index + 1 }}</td>
                    <td class="text-left">{{ item.docId }}</td>
                    <td class="text-left">{{ item.subject }}</td>
                    <td class="text-right"><button class="btn btn-primary">Edit</button></td>
                    <td class="text-right">
                        <button class="btn btn-danger" @click="delTicket(item.docId)">
                            <div v-if="deleting === item.docId" class="spinner-border text-center d-flex" role="status">
                            </div>
                            <span v-else>Delete</span>
                        </button>
                    </td>
                    <td class="text-right"><nuxt-link class="btn btn-success" :to="`${item.docId}`">
                            <EyeIcon />
                        </nuxt-link></td>
                </tr>
            </tbody>
        </v-table>
        <p class="text-center text-danger" v-if="myTicketList.length < 1 && !loading">NO TICKET CREATED YET</p>
    </div>
</template>
<script>
definePageMeta({
    middleware: ['auth']
})


export default {
    data() {
        return {
            loading: true,
            deleting: 0,
            myTicketList: []
        };
    },
    methods: {
        async delTicket(ticketId) {
            try {
                this.deleting = ticketId;
                const ref = await deleteTicketAndSubcollections(ticketId);
                this.getTicket()
            } catch (error) {
                console.log(error);
                alert(error);
            } finally {
                this.deleting = 0;
            }
        }
        ,
        async getTickets() {
            this.loading =true;
            try {
                this.myTicketList = await getTickets()
            } catch (error) {
                console.log(error)
            }finally{
                this.loading=false
            }
        }
    },
    beforeMount() {
        this.getTickets();  
    },
};
</script>
<style lang="scss" scoped></style>
