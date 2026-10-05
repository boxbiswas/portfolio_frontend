import React from 'react';
import toast from 'react-hot-toast';
import { AlertTriangle } from 'lucide-react';

export const customConfirm = (message, onConfirm) => {
    toast((t) => (
        <div className="flex flex-col gap-3 min-w-[280px]">
            <div className="flex items-center gap-2 text-rose-600">
                <AlertTriangle className="w-5 h-5" />
                <h4 className="font-bold text-sm uppercase tracking-wide">Confirm Action</h4>
            </div>
            <p className="text-sm font-medium text-slate-700">{message}</p>
            <div className="flex gap-2 justify-end mt-2">
                <button 
                    onClick={() => toast.dismiss(t.id)} 
                    className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                    Cancel
                </button>
                <button 
                    onClick={() => { 
                        toast.dismiss(t.id); 
                        onConfirm(); 
                    }} 
                    className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors shadow-sm"
                >
                    Yes, Delete
                </button>
            </div>
        </div>
    ), { duration: Infinity, id: 'confirm-toast', position: 'top-center' });
};
