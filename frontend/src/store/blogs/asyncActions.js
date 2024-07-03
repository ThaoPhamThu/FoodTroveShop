import { createAsyncThunk } from '@reduxjs/toolkit';
import * as apis from '../../apis';

export const getNewBlogs = createAsyncThunk('blog/blogCategories', async (data, { rejectWithValue }) => {
    const response = await apis.apiGetBlogs({ sort: '-createdAt' });
    if (!response.success) return rejectWithValue(response);
    return response.blogs;
})
