import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExperience } from '../../../redux/slices/experienceSlice';

export default function ExperienceSection() {
    const dispatch = useDispatch();
    const { items: experience = [], loading } = useSelector((state) => state.experience || {});

    useEffect(() => {
        dispatch(fetchExperience());
    }, [dispatch]);

    if (loading && experience.length === 0) return <section id="experience" className="py-24"></section>;

    return (
        <section id="experience" className="py-24 bg-slate-50 relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Experience</h2>
                    <p className="mt-4 text-lg text-slate-600">My professional journey and academic background.</p>
                </div>

                <div className="relative border-l border-indigo-200 ml-4 md:ml-0 md:border-none space-y-12">
                    {/* Centered Line for Desktop */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-indigo-200 -translate-x-1/2"></div>
                    
                    {experience.map((exp, index) => {
                        const isEven = index % 2 === 0;
                        return (
                            <div key={exp.id} className="relative flex flex-col md:flex-row items-center">
                                {/* Timeline Node */}
                                <div className="absolute left-[-5px] md:left-1/2 w-3 h-3 rounded-full bg-indigo-600 border-4 border-slate-50 md:-translate-x-1/2 z-10 box-content"></div>
                                
                                {/* Content Card */}
                                <div className={`w-full md:w-1/2 pl-8 md:pl-0 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16 md:ml-auto'}`}>
                                    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-[0_4px_14px_rgba(15,23,42,0.05)] hover:border-indigo-200 transition-colors">
                                        <div className="text-sm font-semibold text-indigo-600 mb-2 uppercase tracking-wide">
                                            {new Date(exp.startDate).getFullYear()} - {exp.isCurrent ? 'Present' : (exp.endDate ? new Date(exp.endDate).getFullYear() : '')}
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900">{exp.role}</h3>
                                        <h4 className="text-slate-600 font-medium mt-1 mb-4">{exp.company}</h4>
                                        <p className="text-slate-500 text-sm leading-relaxed">{exp.description}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
