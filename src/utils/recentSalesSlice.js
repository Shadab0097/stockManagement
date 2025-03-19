import { createSlice } from "@reduxjs/toolkit";

const recentSalesSlice = createSlice({
    name: 'recentSales',
    initialState: null,
    reducers: {
        addRecentSales: (state, action) => {
            return action.payload
        },

        addTotalSales: (state, action) => {
            return action.payload
        }
    }
})


export const { addRecentSales, addTotalSales } = recentSalesSlice.actions
export default recentSalesSlice.reducer