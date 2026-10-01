import React from 'react';
import MessagesManager from '../../components/messages/MessagesManager';

export default function Messages() {
    return (
        <div>
            <header className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Contact Messages</h1>
                <p className="mt-1 text-sm text-slate-500">Read and respond to inquiries from your portfolio.</p>
            </header>
            
            <MessagesManager />
        </div>
    );
}
