import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTestimonials } from '../../../redux/slices/testimonialSlice';

export default function TestimonialsSection() {
    const dispatch = useDispatch();
    const { items: testimonials = [], loading } = useSelector((state) => state.testimonials || {});

    useEffect(() => {
        dispatch(fetchTestimonials());
    }, [dispatch]);

    if (loading && testimonials.length === 0) return null;
    if (testimonials.length === 0) return null; // Don't show section if empty

    return (
        <section id="testimonials" className="py-24 bg-slate-50 relative overflow-hidden">
            {/* Ambient Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 to-transparent pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Client Feedback</h2>
                    <p className="mt-4 text-lg text-slate-600">What people say about my work.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.slice(0, 3).map((testimonial) => (
                        <div key={testimonial.id} className="bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgba(15,23,42,0.06)] rounded-2xl p-8 relative flex flex-col h-full">
                            {/* Quote Mark Decoration */}
                            <div className="absolute top-6 right-6 text-6xl font-serif text-indigo-100 leading-none pointer-events-none">"</div>
                            
                            <p className="text-slate-700 text-lg leading-relaxed flex-1 relative z-10 mb-8 italic">
                                "{testimonial.content}"
                            </p>
                            
                            <div className="flex items-center gap-4 mt-auto">
                                <div className="w-12 h-12 bg-slate-200 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center text-slate-400 font-bold">
                                    {testimonial.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mt-1">
                                        {testimonial.role} {testimonial.company ? `· ${testimonial.company}` : ''}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
