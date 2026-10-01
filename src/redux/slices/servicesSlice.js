import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../https/axios.js';

export const fetchServices = createAsyncThunk('services/fetch', async (_, thunkAPI) => {
    try {
        const response = await api.get('/services');
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch services');
    }
});

export const addService = createAsyncThunk('services/add', async (data, thunkAPI) => {
    try {
        const response = await api.post('/admin/services', data);
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to add service');
    }
});

export const updateService = createAsyncThunk('services/update', async ({ id, data }, thunkAPI) => {
    try {
        const response = await api.put(`/admin/services/${id}`, data);
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to update service');
    }
});

export const deleteService = createAsyncThunk('services/delete', async (id, thunkAPI) => {
    try {
        await api.delete(`/admin/services/${id}`);
        return id;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to delete service');
    }
});

const servicesSlice = createSlice({
    name: 'services',
    initialState: { items: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchServices.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchServices.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
            .addCase(fetchServices.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
            .addCase(addService.fulfilled, (state, action) => { state.items.unshift(action.payload); })
            .addCase(updateService.fulfilled, (state, action) => {
                const index = state.items.findIndex(item => item.id === action.payload.id);
                if (index !== -1) state.items[index] = action.payload;
            })
            .addCase(deleteService.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item.id !== action.payload);
            });
    }
});

export default servicesSlice.reducer;
