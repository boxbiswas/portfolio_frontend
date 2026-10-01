import React from 'react';
import ExperienceManager from '../../components/experience/ExperienceManager';

export default function Experience() {
    return (
        <div>
            <header className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Experience</h1>
                <p className="mt-1 text-sm text-slate-500">Manage your work history and timeline.</p>
            </header>
            
            <ExperienceManager />
        </div>
    );
}
