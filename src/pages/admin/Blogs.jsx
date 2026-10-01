import React from 'react';
import BlogsManager from '../../components/blogs/BlogsManager';

export default function Blogs() {
    return (
        <div>
            <header className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Blogs</h1>
                <p className="mt-1 text-sm text-slate-500">Manage your blog posts and articles.</p>
            </header>
            
            <BlogsManager />
        </div>
    );
}
