import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSkills } from '../../../redux/slices/skillsSlice';

export default function SkillsSection() {
    const dispatch = useDispatch();
    const { items: skills = [], loading } = useSelector((state) => state.skills || {});

    useEffect(() => {
        dispatch(fetchSkills());
    }, [dispatch]);

    // Group skills by category
    const groupedSkills = skills.reduce((acc, skill) => {
        const cat = skill.category || 'Other';
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(skill);
        return acc;
    }, {});

    if (loading && skills.length === 0) {
        return (
            <section className="py-24 bg-slate-50"><div className="max-w-7xl mx-auto px-6">
                <div className="mb-16 text-center flex flex-col items-center"><div className="h-10 bg-slate-100 animate-pulse rounded-md w-1/3 mb-4"></div><div className="h-4 bg-slate-100 animate-pulse rounded-md w-1/2"></div></div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="bg-white border border-slate-200/80 rounded-2xl p-6 h-48">
                            <div className="h-6 bg-slate-100 animate-pulse rounded-md w-1/3 mb-6"></div>
                            <div className="flex gap-3"><div className="w-20 h-16 bg-slate-100 animate-pulse rounded-xl"></div><div className="w-20 h-16 bg-slate-100 animate-pulse rounded-xl"></div></div>
                        </div>
                    ))}
                </div>
            </div></section>
        );
    }

    return (
        <section id="skills" className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Technical Skills</h2>
                    <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">Technologies and tools I use to build modern digital products.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Object.entries(groupedSkills).map(([category, catSkills]) => (
                        <div key={category} className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-[0_4px_14px_rgba(15,23,42,0.05)]">
                            <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                                {category}
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {catSkills.map((skill) => (
                                    <div key={skill.id} className="flex flex-col items-center p-3 bg-slate-50 border border-slate-100 rounded-xl min-w-[80px] hover:border-indigo-200 hover:bg-indigo-50/50 transition-colors">
                                        {/* Icon Placeholder */}
                                        <div className="w-8 h-8 bg-slate-200 rounded-lg mb-2 flex items-center justify-center text-xs text-slate-500">Img</div>
                                        <span className="text-xs font-medium text-slate-700">{skill.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
