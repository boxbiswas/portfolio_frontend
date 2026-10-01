import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../https/axios.js';

// Load user from localStorage if it exists
const user = JSON.parse(localStorage.getItem('user'));

export const login = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
    try {
        const response = await api.post('/auth/login', credentials);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        return response.data.user;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message || 'Login failed');
    }
});

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    try {
        await api.post('/auth/logout');
        localStorage.removeItem('user');
        return null;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message || 'Logout failed');
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: user ? user : null,
        isAuthenticated: !!user,
        loading: false,
        error: null,
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
            });
    }
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
