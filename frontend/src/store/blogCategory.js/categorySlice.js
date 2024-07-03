import { createSlice } from '@reduxjs/toolkit';
import * as actions from './asyncActions';

export const blogCategorySlice = createSlice({
    name: 'blogCategory',
    initialState: {
        blogCategories: null,
        isLoading: false,
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(actions.getBlogCategories.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(actions.getBlogCategories.fulfilled, (state, action) => {
            state.isLoading = false;
            state.blogCategories = action.payload;
        });
        builder.addCase(actions.getBlogCategories.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload.message;
        });
    }
});


export default blogCategorySlice.reducer