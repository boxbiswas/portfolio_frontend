import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../https/axios.js';

export const fetchSocialLinks = createAsyncThunk('social/fetch', async (_, thunkAPI) => {
    try {
        const response = await api.get('/social-links');
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch social links');
    }
});

export const addSocialLink = createAsyncThunk('social/add', async (data, thunkAPI) => {
    try {
        const response = await api.post('/admin/social-links', data);
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to add social link');
    }
});

export const updateSocialLink = createAsyncThunk('social/update', async ({ id, data }, thunkAPI) => {
    try {
        const response = await api.put(`/admin/social-links/${id}`, data);
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to update social link');
    }
});

export const deleteSocialLink = createAsyncThunk('social/delete', async (id, thunkAPI) => {
    try {
        await api.delete(`/admin/social-links/${id}`);
        return id;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to delete social link');
    }
});

const socialSlice = createSlice({
    name: 'social',
    initialState: { items: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSocialLinks.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchSocialLinks.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
            .addCase(fetchSocialLinks.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
            .addCase(addSocialLink.fulfilled, (state, action) => { state.items.push(action.payload); })
            .addCase(updateSocialLink.fulfilled, (state, action) => {
                const index = state.items.findIndex(item => item.id === action.payload.id);
                if (index !== -1) state.items[index] = action.payload;
            })
            .addCase(deleteSocialLink.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item.id !== action.payload);
            });
    }
});

export default socialSlice.reducer;
