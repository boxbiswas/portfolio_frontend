import React from 'react';
import { Briefcase, FileText, Code, Award, MessageSquare, Image as ImageIcon } from 'lucide-react';

export default function Dashboard() {
    // In a real app, you would fetch these stats from the backend
    const stats = [
        { name: 'Projects', value: '12', description: '+2 this month', icon: Briefcase, color: 'bg-indigo-50 text-indigo-700' },
        { name: 'Blog Posts', value: '8', description: '1 draft', icon: FileText, color: 'bg-blue-50 text-blue-700' },
        { name: 'Skills', value: '24', description: 'Active', icon: Code, color: 'bg-emerald-50 text-emerald-700' },
        { name: 'Experience', value: '4', description: 'Roles', icon: Award, color: 'bg-amber-50 text-amber-700' },
        { name: 'Messages', value: '5', description: '3 unread', icon: MessageSquare, color: 'bg-rose-50 text-rose-700' },
        { name: 'Media Files', value: '145', description: '2.4 MB total', icon: ImageIcon, color: 'bg-purple-50 text-purple-700' },
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
