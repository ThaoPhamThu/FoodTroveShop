import { createSlice } from '@reduxjs/toolkit';
import * as actions from './asyncActions';

export const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orders: null,
        isLoading: false,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(actions.getAllOrders.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(actions.getAllOrders.fulfilled, (state, action) => {
            state.isLoading = false;
            state.orders = action.payload;
        });
        builder.addCase(actions.getAllOrders.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload.message;
        });
    }
});


export default orderSlice.reducer