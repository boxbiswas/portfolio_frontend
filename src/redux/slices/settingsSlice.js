import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../https/axios.js';

export const fetchSettings = createAsyncThunk('settings/fetch', async (_, thunkAPI) => {
    try {
        const response = await api.get('/settings');
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch site settings');
    }
});

export const updateSettings = createAsyncThunk('settings/update', async (data, thunkAPI) => {
    try {
        const response = await api.put('/admin/settings', data);
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to update site settings');
    }
});

const settingsSlice = createSlice({
    name: 'settings',
    initialState: { data: null, loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSettings.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchSettings.fulfilled, (state, action) => { state.loading = false; state.data = action.payload; })
            .addCase(fetchSettings.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
            .addCase(updateSettings.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(updateSettings.fulfilled, (state, action) => { state.loading = false; state.data = action.payload; })
            .addCase(updateSettings.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
    }
});

export default settingsSlice.reducer;
