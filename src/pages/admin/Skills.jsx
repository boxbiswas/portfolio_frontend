import React from 'react';
import SkillsManager from '../../components/skills/SkillsManager';

export default function Skills() {
    return (
        <div>
            <header className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Skills</h1>
                <p className="mt-1 text-sm text-slate-500">Manage your technical skills and tools.</p>
            </header>
            
            <SkillsManager />
        </div>
    );
}
