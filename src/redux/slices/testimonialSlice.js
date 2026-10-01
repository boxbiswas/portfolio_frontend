import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../https/axios.js';

export const fetchTestimonials = createAsyncThunk('testimonials/fetch', async (_, thunkAPI) => {
    try {
        const response = await api.get('/testimonials');
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch testimonials');
    }
});

export const addTestimonial = createAsyncThunk('testimonials/add', async (data, thunkAPI) => {
    try {
        const response = await api.post('/admin/testimonials', data);
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to add testimonial');
    }
});

export const updateTestimonial = createAsyncThunk('testimonials/update', async ({ id, data }, thunkAPI) => {
    try {
        const response = await api.put(`/admin/testimonials/${id}`, data);
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to update testimonial');
    }
});

export const deleteTestimonial = createAsyncThunk('testimonials/delete', async (id, thunkAPI) => {
    try {
        await api.delete(`/admin/testimonials/${id}`);
        return id;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to delete testimonial');
    }
});

const testimonialSlice = createSlice({
    name: 'testimonials',
    initialState: { items: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTestimonials.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchTestimonials.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
            .addCase(fetchTestimonials.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
            .addCase(addTestimonial.fulfilled, (state, action) => { state.items.unshift(action.payload); })
            .addCase(updateTestimonial.fulfilled, (state, action) => {
                const index = state.items.findIndex(item => item.id === action.payload.id);
                if (index !== -1) state.items[index] = action.payload;
            })
            .addCase(deleteTestimonial.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item.id !== action.payload);
            });
    }
});

export default testimonialSlice.reducer;
