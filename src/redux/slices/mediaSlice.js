import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../https/axios.js';

export const fetchMedia = createAsyncThunk('media/fetch', async (_, thunkAPI) => {
    try {
        const response = await api.get('/admin/media');
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch media');
    }
});

export const uploadMedia = createAsyncThunk('media/upload', async (formData, thunkAPI) => {
    try {
        const response = await api.post('/admin/media/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to upload media');
    }
});

export const deleteMedia = createAsyncThunk('media/delete', async (id, thunkAPI) => {
    try {
        await api.delete(`/admin/media/${id}`);
        return id;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to delete media');
    }
});

const mediaSlice = createSlice({
    name: 'media',
    initialState: { items: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMedia.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchMedia.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
            .addCase(fetchMedia.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
            .addCase(uploadMedia.fulfilled, (state, action) => { 
                // Using unshift to show the newest media first
                state.items.unshift(action.payload); 
            })
            .addCase(deleteMedia.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item.id !== action.payload);
            });
    }
});

export default mediaSlice.reducer;
