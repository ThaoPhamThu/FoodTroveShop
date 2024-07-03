import { createAsyncThunk } from '@reduxjs/toolkit';
import * as apis from '../../apis';
export const getInforUser = createAsyncThunk('user/inforUser', async (data, { rejectWithValue }) => {
    const response = await apis.apiGetInforUser();
    if (!response.success) return rejectWithValue(response);
    return response.user;
})
