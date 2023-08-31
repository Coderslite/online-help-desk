<template>
    <div>
  <div class="row">
    <h1 class="col-md-4">Tickets Created</h1>
        <div class="col-md-8">
                <label for="filter">Filter Order</label>
                <select id="filter" class="form-control mb-5" v-on:change="getTickets" v-model="filter" value="All">
                    <option value="All">All</option>
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
                </select>
            </div>
  </div>
        <!-- <nuxt-link to="/ticket/create-ticket" class="btn btn-primary mr-auto">New</nuxt-link> -->
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
                    <th class="text-right">Action</th>
                    <th class="text-right">Delete</th>
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
                    <td class="text-right">
                        <button v-if="item.status == 'Open'" class="btn btn-success" @click="updateTicketStatus(item.docId,'Closed')">Close</button>
                        <button v-if="item.status != 'Open'" class="btn btn-danger" @click="updateTicketStatus(item.docId,'Open')">Re-open</button>
                    </td>
                    <td class="text-right">
                        <button class="btn btn-danger" @click="delTicket(item.docId)">
                            <div v-if="deleting === item.docId" class="spinner-border text-center d-flex" role="status">
                            </div>
                            <span v-else>Delete</span>
                        </button>
                    </td>
                    <td class="text-right"><nuxt-link class="btn btn-success" :to="`${item.docId}`" v-if="item.status !='Closed'" >
                            <EyeIcon />
                        </nuxt-link>
                    <span v-if="item.status =='Closed'">Answered <span><CheckIcon/><CheckIcon/></span></span>
                    </td>
                </tr>
            </tbody>
        </v-table>
        <p class="text-center text-danger" v-if="myTicketList.length < 1 && !loading">NO TICKET CREATED YET</p>
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
            myTicketList: [],
            filter: '',
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
                this.myTicketList = await getAllTickets(this.filter);
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
