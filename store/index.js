// state
export const state = () => ({
    tickets: []
})

// getters
export const getters = {

}

// actions
export const actions = {
    async getTickets() {
        const userId = uid().value;
        const q = query(
            ticketCol,
            where("userId", "==", userId),
            orderBy('dateTime')
        );
        const ticketsSnapshot = await getDocs(q);
        const ticketsList = ticketsSnapshot.docs.map((doc) => doc.data());
        return ticketsList;
    }
}


export const mutations = {
    addTicket(state,ticketList){
        state.tickets.push({...ticketList})
    }

}