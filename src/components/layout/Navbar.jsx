import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { LogOut, Menu } from 'lucide-react';

export default function Navbar({ onMenuClick }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    const handleLogout = async () => {
        await dispatch(logout());
        navigate('/login');
    };

    return (
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 shrink-0">
            <button className="md:hidden text-slate-500 hover:text-slate-700 p-2 -ml-2" onClick={onMenuClick}>
                <Menu className="w-6 h-6" />
            </button>

            <div className="flex-1" />

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 pr-4 border-r border-slate-200">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                        {user?.name?.charAt(0) || 'A'}
                    </div>
                    <span className="text-sm font-medium text-slate-700 hidden sm:block">
                        {user?.name || 'Admin'}
                    </span>
                </div>
                
                <button
                    onClick={handleLogout}
                    className="text-slate-500 hover:text-red-600 transition-colors flex items-center gap-2 text-sm font-medium"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="hidden sm:block">Logout</span>
                </button>
            </div>
        </header>
    );
}
