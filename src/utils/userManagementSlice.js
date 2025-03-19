import { createSlice } from "@reduxjs/toolkit";


const userManagementSlice = createSlice({
    name: "userManagements",
    initialState: null,
    reducers: {
        addUserManagement: (state, action) => {
            return action.payload
        },
        removeUserManagement: () => {
            return null
        }


    }

})

export const { addUserManagement, removeUserManagement } = userManagementSlice.actions
export default userManagementSlice.reducer