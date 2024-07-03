import { createAsyncThunk } from '@reduxjs/toolkit';
import * as apis from '../../apis';

export const getBlogCategories = createAsyncThunk('blogCategory/blog-categories', async (data, { rejectWithValue }) => {
    const response = await apis.apiGetBlogCategories();

    if (!response.success) return rejectWithValue(response);
    return response.categories;
})