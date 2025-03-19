import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import adminReducer from "./adminSlice";
import userManagementReducer from "./userManagementSlice";
import productReducer from "./productSlice";
import salesDataReducer from "./salesDataSlice";
import recentSalesReducer from "./recentSalesSlice";







const appStore = configureStore({
    reducer: {
        user: userReducer,
        admin: adminReducer,
        userManagements: userManagementReducer,
        product: productReducer,
        salesData: salesDataReducer,
        recentSales: recentSalesReducer,

    }
})

export default appStore;