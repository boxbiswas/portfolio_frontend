import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAbout } from '../../../redux/slices/aboutSlice';

export default function AboutSection() {
    const dispatch = useDispatch();
    const { data: about, loading } = useSelector((state) => state.about);

    useEffect(() => {
        dispatch(fetchAbout());
    }, [dispatch]);

    if (loading) return null;

    return (
        <section id="about" className="py-24 bg-white relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-[1fr_1.5fr] gap-16 items-center">
                    {/* Profile Image Column */}
                    <div className="bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgba(15,23,42,0.06)] rounded-2xl p-4 aspect-square">
                        <div className="w-full h-full bg-slate-100 rounded-xl overflow-hidden flex items-center justify-center">
                            {/* Image Placeholder */}
                            <span className="text-slate-400 font-medium">Profile Picture</span>
                        </div>
                    </div>
                    
                    {/* Text Column */}
                    <div className="space-y-6">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">About Me</h2>
                        <h3 className="text-xl font-semibold text-indigo-600">{about?.shortIntroduction || 'Developer & Designer'}</h3>
                        <div className="prose prose-slate prose-lg max-w-none text-slate-600">
                            {about?.biography ? (
                                <div dangerouslySetInnerHTML={{ __html: about.biography }} />
                            ) : (
                                <p>No biography available yet.</p>
                            )}
                        </div>
                        
                        {/* Key Facts / Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-slate-100">
                            <div>
                                <div className="text-3xl font-bold text-slate-900">3+</div>
                                <div className="text-sm font-medium text-slate-500 mt-1">Years Experience</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-slate-900">20+</div>
                                <div className="text-sm font-medium text-slate-500 mt-1">Projects Completed</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-slate-900">100%</div>
                                <div className="text-sm font-medium text-slate-500 mt-1">Client Satisfaction</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
