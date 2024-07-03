import { createAsyncThunk } from '@reduxjs/toolkit';
import * as apis from '../../apis';
export const getAllOrders = createAsyncThunk('order/allOrders', async (data, { rejectWithValue }) => {
    const response = await apis.apiGetAllOrders();

    if (!response.success) return rejectWithValue(response);
    return response.orders;
})