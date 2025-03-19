import { createSlice } from "@reduxjs/toolkit";

const salesDataSlice = createSlice({
    name: 'salesData',
    initialState: null,
    reducers: {
        addSales: (state, action) => {
            return action.payload
        }
    }
})


export const { addSales } = salesDataSlice.actions
export default salesDataSlice.reducer