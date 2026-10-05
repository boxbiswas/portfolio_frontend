import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Briefcase, FileText, Code, Award, MessageSquare, Image as ImageIcon } from 'lucide-react';
import { fetchProjects } from '../../redux/slices/projectsSlice';
import { fetchBlogs } from '../../redux/slices/blogSlice';
import { fetchSkills } from '../../redux/slices/skillsSlice';
import { fetchExperience } from '../../redux/slices/experienceSlice';
import { fetchMessages } from '../../redux/slices/messageSlice';
import { fetchMedia } from '../../redux/slices/mediaSlice';

export default function Dashboard() {
    const dispatch = useDispatch();

    const { items: projects = [] } = useSelector((state) => state.projects || {});
    const { items: blogs = [] } = useSelector((state) => state.blogs || {});
    const { items: skills = [] } = useSelector((state) => state.skills || {});
    const { items: experience = [] } = useSelector((state) => state.experience || {});
    const { items: messages = [] } = useSelector((state) => state.messages || {});
    const { items: media = [] } = useSelector((state) => state.media || {});

    useEffect(() => {
        dispatch(fetchProjects());
        dispatch(fetchBlogs());
        dispatch(fetchSkills());
        dispatch(fetchExperience());
        dispatch(fetchMessages());
        dispatch(fetchMedia());
    }, [dispatch]);

    // Calculate dynamic stats
    const publishedProjects = projects.filter(p => p.status === 'published' || p.status === 'completed').length;
    const draftBlogs = blogs.filter(b => b.status === 'draft').length;
    const activeSkills = skills.length;
    const experienceRoles = experience.length;
    const unreadMessages = messages.filter(m => m.status === 'NEW' || m.status === 'UNREAD').length;
    
    // Calculate total media size if size is provided (assuming size is in bytes)
    const totalMediaBytes = media.reduce((acc, file) => acc + (file.size || 0), 0);
    const mediaSizeMB = (totalMediaBytes / (1024 * 1024)).toFixed(1);

    const stats = [
        { name: 'Projects', value: projects.length, description: `${publishedProjects} published`, icon: Briefcase, color: 'bg-indigo-50 text-indigo-700' },
        { name: 'Blog Posts', value: blogs.length, description: `${draftBlogs} drafts`, icon: FileText, color: 'bg-blue-50 text-blue-700' },
        { name: 'Skills', value: activeSkills, description: 'Active', icon: Code, color: 'bg-emerald-50 text-emerald-700' },
        { name: 'Experience', value: experienceRoles, description: 'Roles', icon: Award, color: 'bg-amber-50 text-amber-700' },
        { name: 'Messages', value: messages.length, description: `${unreadMessages} unread`, icon: MessageSquare, color: 'bg-rose-50 text-rose-700' },
        { name: 'Media Files', value: media.length, description: `${mediaSizeMB} MB total`, icon: ImageIcon, color: 'bg-purple-50 text-purple-700' },
    ];

    return (
        <div>
            <header className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
                <p className="mt-1 text-sm text-slate-500">Overview of your portfolio content and activity.</p>
            </header>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {stats.map((stat) => (
                    <div
                        key={stat.name}
                        className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_4px_20px_rgba(15,23,42,0.05)] flex items-start gap-4"
                    >
                        <div className={`p-3 rounded-xl ${stat.color}`}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">{stat.name}</p>
                            <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                            <p className="text-xs text-slate-400 mt-1">{stat.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Quick Actions or Recent Activity could go here later */}
        </div>
    );
}
