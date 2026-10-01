import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../https/axios.js';

export const fetchExperience = createAsyncThunk('experience/fetch', async (_, thunkAPI) => {
    try {
        const response = await api.get('/experience');
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch experience');
    }
});

export const addExperience = createAsyncThunk('experience/add', async (data, thunkAPI) => {
    try {
        const response = await api.post('/admin/experience', data);
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to add experience');
    }
});

export const updateExperience = createAsyncThunk('experience/update', async ({ id, data }, thunkAPI) => {
    try {
        const response = await api.put(`/admin/experience/${id}`, data);
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to update experience');
    }
});

export const deleteExperience = createAsyncThunk('experience/delete', async (id, thunkAPI) => {
    try {
        await api.delete(`/admin/experience/${id}`);
        return id;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to delete experience');
    }
});

const experienceSlice = createSlice({
    name: 'experience',
    initialState: { items: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchExperience.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchExperience.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
            .addCase(fetchExperience.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
            .addCase(addExperience.fulfilled, (state, action) => { state.items.unshift(action.payload); })
            .addCase(updateExperience.fulfilled, (state, action) => {
                const index = state.items.findIndex(item => item.id === action.payload.id);
                if (index !== -1) state.items[index] = action.payload;
            })
            .addCase(deleteExperience.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item.id !== action.payload);
            });
    }
});

export default experienceSlice.reducer;
