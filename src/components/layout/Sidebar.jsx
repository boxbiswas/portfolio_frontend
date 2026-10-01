import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Settings, User, FileText, Code, Briefcase, MessageSquare, Image, Award, Layout, Zap, X } from 'lucide-react';

export default function Sidebar({ isOpen, setIsOpen }) {
    const navItems = [
        { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
        { name: 'Site Settings', path: '/admin/settings', icon: Settings },
        { name: 'About', path: '/admin/about', icon: User },
        { name: 'Skills', path: '/admin/skills', icon: Code },
        { name: 'Projects', path: '/admin/projects', icon: Briefcase },
        { name: 'Experience', path: '/admin/experience', icon: Award },
        { name: 'Services', path: '/admin/services', icon: Zap },
        { name: 'Testimonials', path: '/admin/testimonials', icon: MessageSquare },
        { name: 'Blogs', path: '/admin/blogs', icon: FileText },
        { name: 'Media Library', path: '/admin/media', icon: Image },
        { name: 'Messages', path: '/admin/messages', icon: MessageSquare },
    ];

    return (
        <>
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-slate-900/50 z-40 md:hidden" 
                    onClick={() => setIsOpen(false)}
                />
            )}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200 shrink-0">
                    <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        <Layout className="w-6 h-6 text-indigo-600" />
                        <span>CMS Panel</span>
                    </h1>
                    <button className="md:hidden text-slate-400 hover:text-slate-600" onClick={() => setIsOpen(false)}>
                        <X className="w-5 h-5" />
                    </button>
                </div>
            
                <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            end={item.path === '/admin'}
                            onClick={() => setIsOpen(false)}
                            className={({ isActive }) =>
                                `group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors relative ${
                                    isActive
                                        ? 'bg-indigo-50 text-indigo-700'
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    {isActive && (
                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-600 rounded-r-full" />
                                    )}
                                    <item.icon
                                        className={`flex-shrink-0 -ml-1 mr-3 h-5 w-5 ${
                                            isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-500'
                                        }`}
                                    />
                                    <span className="truncate">{item.name}</span>
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>
            </aside>
        </>
    );
}
