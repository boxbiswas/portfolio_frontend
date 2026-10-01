import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../https/axios.js';

// Thunk to fetch About data
export const fetchAbout = createAsyncThunk('about/fetch', async (_, thunkAPI) => {
    try {
        const response = await api.get('/about');
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch about data');
    }
});

// Thunk to update About data
export const updateAbout = createAsyncThunk('about/update', async (data, thunkAPI) => {
    try {
        const response = await api.put('/admin/about', data);
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to update about data');
    }
});

const aboutSlice = createSlice({
    name: 'about',
    initialState: { data: null, loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch cases
            .addCase(fetchAbout.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchAbout.fulfilled, (state, action) => { state.loading = false; state.data = action.payload; })
            .addCase(fetchAbout.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
            // Update cases
            .addCase(updateAbout.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(updateAbout.fulfilled, (state, action) => { state.loading = false; state.data = action.payload; })
            .addCase(updateAbout.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
    }
});

export default aboutSlice.reducer;
