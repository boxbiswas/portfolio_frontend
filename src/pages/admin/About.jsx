import React from 'react';
import AboutForm from '../../components/about/AboutForm';

export default function About() {
    return (
        <div className="max-w-3xl">
            <header className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">About Section</h1>
                <p className="mt-1 text-sm text-slate-500">Manage your personal biography and introduction.</p>
            </header>
            
            <AboutForm />
        </div>
    );
}
