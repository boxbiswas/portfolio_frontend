import React from 'react';
import MediaManager from '../../components/media/MediaManager';

export default function Media() {
    return (
        <div>
            <header className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Media Library</h1>
                <p className="mt-1 text-sm text-slate-500">Manage your uploaded images and files.</p>
            </header>
            
            <MediaManager />
        </div>
    );
}
