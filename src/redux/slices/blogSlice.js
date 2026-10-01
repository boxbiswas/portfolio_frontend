import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../https/axios.js';

export const fetchBlogs = createAsyncThunk('blogs/fetch', async (_, thunkAPI) => {
    try {
        const response = await api.get('/blogs');
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch blogs');
    }
});

export const addBlog = createAsyncThunk('blogs/add', async (data, thunkAPI) => {
    try {
        const response = await api.post('/admin/blogs', data);
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to add blog');
    }
});

export const updateBlog = createAsyncThunk('blogs/update', async ({ id, data }, thunkAPI) => {
    try {
        const response = await api.put(`/admin/blogs/${id}`, data);
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to update blog');
    }
});

export const deleteBlog = createAsyncThunk('blogs/delete', async (id, thunkAPI) => {
    try {
        await api.delete(`/admin/blogs/${id}`);
        return id;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to delete blog');
    }
});

const blogSlice = createSlice({
    name: 'blogs',
    initialState: { items: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBlogs.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchBlogs.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
            .addCase(fetchBlogs.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
            .addCase(addBlog.fulfilled, (state, action) => { state.items.unshift(action.payload); })
            .addCase(updateBlog.fulfilled, (state, action) => {
                const index = state.items.findIndex(item => item.id === action.payload.id);
                if (index !== -1) state.items[index] = action.payload;
            })
            .addCase(deleteBlog.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item.id !== action.payload);
            });
    }
});

export default blogSlice.reducer;
