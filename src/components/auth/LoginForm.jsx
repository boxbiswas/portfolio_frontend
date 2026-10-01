import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(clearError());
        const resultAction = await dispatch(login({ email, password }));
        if (login.fulfilled.match(resultAction)) {
            navigate('/admin');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-slate-700">Email Address</label>
                <input
                    type="email"
                    required
                    className="mt-1 block w-full bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 px-4 py-3 outline-none transition-all"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-700">Password</label>
                <input
                    type="password"
                    required
                    className="mt-1 block w-full bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 px-4 py-3 outline-none transition-all"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            {error && <div className="text-sm text-red-600 bg-red-50 border border-red-200 p-3 rounded-lg">{error}</div>}

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white rounded-xl py-3 font-semibold hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500/30 shadow-sm transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {loading ? 'Signing in...' : 'Sign In'}
            </button>
        </form>
    );
}
