import React from 'react';
import TestimonialsManager from '../../components/testimonials/TestimonialsManager';

export default function Testimonials() {
    return (
        <div>
            <header className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Testimonials</h1>
                <p className="mt-1 text-sm text-slate-500">Manage client reviews and feedback.</p>
            </header>
            
            <TestimonialsManager />
        </div>
    );
}
