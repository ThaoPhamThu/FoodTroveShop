import { createSlice } from '@reduxjs/toolkit';
import * as actions from './asyncActions';

export const blogSlice = createSlice({
    name: 'blog',
    initialState: {
        newBlogs: null,
        isLoading: false,
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(actions.getNewBlogs.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(actions.getNewBlogs.fulfilled, (state, action) => {
            state.isLoading = false;
            state.newBlogs = action.payload;
        });
        builder.addCase(actions.getNewBlogs.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload.message;
        });
    }
});

// export const { showModal } = blogsSlice.actions;

export default blogSlice.reducer