import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../https/axios.js';

export const fetchProjects = createAsyncThunk('projects/fetch', async (_, thunkAPI) => {
    try {
        const response = await api.get('/projects');
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch projects');
    }
});

export const addProject = createAsyncThunk('projects/add', async (data, thunkAPI) => {
    try {
        const response = await api.post('/admin/projects', data);
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to add project');
    }
});

export const updateProject = createAsyncThunk('projects/update', async ({ id, data }, thunkAPI) => {
    try {
        const response = await api.put(`/admin/projects/${id}`, data);
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to update project');
    }
});

export const deleteProject = createAsyncThunk('projects/delete', async (id, thunkAPI) => {
    try {
        await api.delete(`/admin/projects/${id}`);
        return id;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to delete project');
    }
});

const projectsSlice = createSlice({
    name: 'projects',
    initialState: { items: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProjects.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchProjects.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
            .addCase(fetchProjects.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
            .addCase(addProject.fulfilled, (state, action) => { state.items.unshift(action.payload); })
            .addCase(updateProject.fulfilled, (state, action) => {
                const index = state.items.findIndex(item => item.id === action.payload.id);
                if (index !== -1) state.items[index] = action.payload;
            })
            .addCase(deleteProject.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item.id !== action.payload);
            });
    }
});

export default projectsSlice.reducer;
