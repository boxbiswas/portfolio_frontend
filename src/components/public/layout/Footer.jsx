import React from 'react';
import { useSelector } from 'react-redux';

export default function Footer() {
    const { data: settings } = useSelector((state) => state.settings);

    return (
        <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
                <div className="text-2xl font-bold text-slate-900 tracking-tight mb-4">
                    {settings?.siteTitle ? settings.siteTitle.split(' ')[0].toUpperCase() : 'INDRASISH'}<span className="text-indigo-600">.</span>
                </div>
                <p className="text-slate-500 text-sm mb-8 text-center">
                    &copy; {new Date().getFullYear()} {settings?.siteTitle || 'Indrasish'}. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
