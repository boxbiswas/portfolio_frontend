import React from 'react';
import ProjectsManager from '../../components/projects/ProjectsManager';

export default function Projects() {
    return (
        <div>
            <header className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Projects</h1>
                <p className="mt-1 text-sm text-slate-500">Manage your portfolio showcase.</p>
            </header>
            
            <ProjectsManager />
        </div>
    );
}
