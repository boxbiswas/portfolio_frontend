import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../https/axios.js';

export const fetchMessages = createAsyncThunk('messages/fetch', async (_, thunkAPI) => {
    try {
        const response = await api.get('/admin/messages');
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch messages');
    }
});

export const updateMessage = createAsyncThunk('messages/update', async ({ id, data }, thunkAPI) => {
    try {
        const response = await api.put(`/admin/messages/${id}`, data);
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to update message status');
    }
});

export const deleteMessage = createAsyncThunk('messages/delete', async (id, thunkAPI) => {
    try {
        await api.delete(`/admin/messages/${id}`);
        return id;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to delete message');
    }
});

const messageSlice = createSlice({
    name: 'messages',
    initialState: { items: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMessages.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchMessages.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
            .addCase(fetchMessages.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
            .addCase(updateMessage.fulfilled, (state, action) => {
                const index = state.items.findIndex(item => item.id === action.payload.id);
                if (index !== -1) state.items[index] = action.payload;
            })
            .addCase(deleteMessage.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item.id !== action.payload);
            });
    }
});

export default messageSlice.reducer;
