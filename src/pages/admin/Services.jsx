import React from 'react';
import ServicesManager from '../../components/services/ServicesManager';

export default function Services() {
    return (
        <div>
            <header className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Services</h1>
                <p className="mt-1 text-sm text-slate-500">Manage the services you offer to clients.</p>
            </header>
            
            <ServicesManager />
        </div>
    );
}
