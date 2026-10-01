import React from 'react';
import SettingsManager from '../../components/settings/SettingsManager';

export default function Settings() {
    return (
        <div>
            <header className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Site Settings</h1>
                <p className="mt-1 text-sm text-slate-500">Configure global metadata and preferences.</p>
            </header>
            
            <SettingsManager />
        </div>
    );
}
