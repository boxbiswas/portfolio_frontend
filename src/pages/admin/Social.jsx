import React from 'react';
import SocialManager from '../../components/social/SocialManager';

export default function Social() {
    return (
        <div>
            <header className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Social Links</h1>
                <p className="mt-1 text-sm text-slate-500">Manage links to your social profiles.</p>
            </header>
            
            <SocialManager />
        </div>
    );
}
