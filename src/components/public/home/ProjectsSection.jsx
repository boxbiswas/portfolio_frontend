import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects } from '../../../redux/slices/projectsSlice';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

export default function ProjectsSection() {
    const dispatch = useDispatch();
    const { items: projects = [], loading } = useSelector((state) => state.projects || {});
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        dispatch(fetchProjects());
    }, [dispatch]);

    // Filter published projects
    const publishedProjects = projects.filter(p => p.status === 'published' || p.status === 'completed');
    const displayProjects = showAll ? publishedProjects : publishedProjects.slice(0, 4);

    if (loading && projects.length === 0) {
        return (
            <section id="projects" className="py-24 bg-white"><div className="max-w-7xl mx-auto px-6">
                <div className="mb-12"><div className="h-10 bg-slate-100 animate-pulse rounded-md w-1/3 mb-4"></div><div className="h-4 bg-slate-100 animate-pulse rounded-md w-1/2"></div></div>
                <div className="grid md:grid-cols-2 gap-8">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="bg-white/70 border border-slate-200 rounded-2xl overflow-hidden h-[450px]">
                            <div className="w-full aspect-[16/10] bg-slate-100 animate-pulse"></div>
                            <div className="p-8 space-y-4">
                                <div className="h-8 bg-slate-100 animate-pulse rounded-md w-3/4"></div>
                                <div className="h-4 bg-slate-100 animate-pulse rounded-md w-full"></div>
                                <div className="h-4 bg-slate-100 animate-pulse rounded-md w-2/3"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div></section>
        );
    }

    return (
        <section id="projects" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Selected Work</h2>
                        <p className="mt-4 text-lg text-slate-600 max-w-2xl">A collection of projects that showcase my capabilities.</p>
                    </div>
                    {publishedProjects.length > 4 && (
                        <button onClick={() => setShowAll(!showAll)} className="hidden md:flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-700 transition-colors">
                            {showAll ? 'View less' : 'View all projects'} <ArrowRight className={`w-4 h-4 transition-transform ${showAll ? '-rotate-90' : 'rotate-0'}`} />
                        </button>
                    )}
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {displayProjects.map((project) => (
                        <div key={project.id} className="group bg-white/70 backdrop-blur-xl border border-slate-200 shadow-[0_8px_30px_rgba(15,23,42,0.06)] rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-[0_16px_45px_rgba(15,23,42,0.08)] hover:border-indigo-200 transition-all duration-300">
                            {/* Project Image */}
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <div className="absolute inset-0 flex items-center justify-center text-slate-400">Project Cover Image</div>
                            </div>
                            
                            {/* Project Info */}
                            <div className="p-8">
                                {project.featured && (
                                    <span className="inline-block px-2.5 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-wider rounded-md mb-4">
                                        Featured
                                    </span>
                                )}
                                <h3 className="text-2xl font-bold text-slate-900 mb-3">{project.title}</h3>
                                <p className="text-slate-600 mb-6 line-clamp-2">{project.shortDescription || project.description}</p>
                                
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {project.projectSkills?.map((ps) => (
                                        <span key={ps.skillId} className="px-3 py-1 bg-slate-50 border border-slate-200 text-slate-600 text-xs font-medium rounded-full">
                                            {ps.skill?.name || 'Skill'}
                                        </span>
                                    ))}
                                </div>
                                
                                <a href={project.liveUrl || '#'} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                                    View Project <ArrowUpRight className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobile Show All Button */}
                {publishedProjects.length > 4 && (
                    <div className="mt-8 flex justify-center md:hidden">
                        <button onClick={() => setShowAll(!showAll)} className="flex items-center gap-2 px-6 py-3 bg-slate-50 text-slate-900 font-semibold rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors">
                            {showAll ? 'View less' : 'View all projects'}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
