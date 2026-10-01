import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../https/axios.js';

export const fetchSkills = createAsyncThunk('skills/fetch', async (_, thunkAPI) => {
    try {
        const response = await api.get('/skills');
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch skills');
    }
});

export const addSkill = createAsyncThunk('skills/add', async (data, thunkAPI) => {
    try {
        const response = await api.post('/admin/skills', data);
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to add skill');
    }
});

export const updateSkill = createAsyncThunk('skills/update', async ({ id, data }, thunkAPI) => {
    try {
        const response = await api.put(`/admin/skills/${id}`, data);
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to update skill');
    }
});

export const deleteSkill = createAsyncThunk('skills/delete', async (id, thunkAPI) => {
    try {
        await api.delete(`/admin/skills/${id}`);
        return id;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to delete skill');
    }
});

const skillsSlice = createSlice({
    name: 'skills',
    initialState: { items: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSkills.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchSkills.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
            .addCase(fetchSkills.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
            // We can optimistic update or just fetch again in the component. To be clean, we update state directly.
            .addCase(addSkill.fulfilled, (state, action) => { state.items.unshift(action.payload); })
            .addCase(updateSkill.fulfilled, (state, action) => {
                const index = state.items.findIndex(item => item.id === action.payload.id);
                if (index !== -1) state.items[index] = action.payload;
            })
            .addCase(deleteSkill.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item.id !== action.payload);
            });
    }
});

export default skillsSlice.reducer;
