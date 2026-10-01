import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects, addProject, updateProject, deleteProject } from '../../redux/slices/projectsSlice';
import { Plus, Edit2, Trash2, X, ExternalLink, Code } from 'lucide-react';
import toast from 'react-hot-toast';

/**
 * ProjectsManager Component
 * Manages the portfolio's project data. Includes a responsive data table and a scrollable modal form.
 * Uses Redux for global state management and hot-toast for notifications.
 */
export default function ProjectsManager() {
    const dispatch = useDispatch();
    const { items: projects, loading } = useSelector((state) => state.projects);
    
    // Modal state and form data
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        title: '', slug: '', description: '', shortDescription: '',
        repoUrl: '', liveUrl: '', status: 'draft', featured: false, sortOrder: 0
    });

    // Fetch projects on mount
    useEffect(() => {
        dispatch(fetchProjects());
    }, [dispatch]);

    /**
     * Initializes the modal state for either creating or editing.
     */
    const handleOpenModal = (project = null) => {
        if (project) {
            setEditingId(project.id);
            setFormData({
                title: project.title, slug: project.slug,
                description: project.description || '', shortDescription: project.shortDescription || '',
                repoUrl: project.repoUrl || '', liveUrl: project.liveUrl || '',
                status: project.status || 'draft', featured: project.featured || false, sortOrder: project.sortOrder || 0
            });
        } else {
            setEditingId(null);
            setFormData({
                title: '', slug: '', description: '', shortDescription: '',
                repoUrl: '', liveUrl: '', status: 'draft', featured: false, sortOrder: 0
            });
        }
        setIsModalOpen(true);
    };

    /**
     * Prompts for confirmation before dispatching a delete action.
     */
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await dispatch(deleteProject(id)).unwrap();
                toast.success('Project deleted successfully');
            } catch (error) {
                toast.error(error || 'Failed to delete project');
            }
        }
    };

    /**
     * Validates and dispatches the save/update action.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Ensure sortOrder is a number before submitting to API
            const payload = { ...formData, sortOrder: parseInt(formData.sortOrder) };

            if (editingId) {
                await dispatch(updateProject({ id: editingId, data: payload })).unwrap();
                toast.success('Project updated successfully');
            } else {
                await dispatch(addProject(payload)).unwrap();
                toast.success('Project created successfully');
            }
            setIsModalOpen(false);
        } catch (error) {
            toast.error(error || 'Failed to save project');
        }
    };

    return (
        <div>
            {/* Toolbar */}
            <div className="mb-4 flex justify-end">
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-indigo-600 text-white rounded-xl px-4 py-2.5 font-semibold hover:bg-indigo-700 flex items-center gap-2 transition-all shadow-sm"
                >
                    <Plus className="w-4 h-4" />
                    Create Project
                </button>
            </div>

            {/* Projects Table */}
            <div className="bg-white border border-slate-200/80 rounded-2xl shadow-[0_4px_20px_rgba(15,23,42,0.05)] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wide text-xs">
                            <tr>
                                <th className="px-6 py-4">Title</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Featured</th>
                                <th className="px-6 py-4">Links</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading && projects.length === 0 ? (
                                <tr><td colSpan="5" className="px-6 py-4 text-center">Loading...</td></tr>
                            ) : projects.length === 0 ? (
                                <tr><td colSpan="5" className="px-6 py-8 text-center text-slate-500">No projects found.</td></tr>
                            ) : (
                                projects.map((project) => (
                                    <tr key={project.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-900">
                                            {project.title}
                                            <div className="text-xs text-slate-400 font-normal mt-0.5">{project.slug}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-md text-xs font-medium border ${project.status === 'published' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                                                {project.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {project.featured ? <span className="bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-md text-xs font-medium border border-indigo-100">Yes</span> : '-'}
                                        </td>
                                        <td className="px-6 py-4 space-x-2">
                                            {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-indigo-600"><ExternalLink className="w-4 h-4 inline" /></a>}
                                            {project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-900"><Code className="w-4 h-4 inline" /></a>}
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-3">
                                            <button onClick={() => handleOpenModal(project)} className="text-slate-400 hover:text-indigo-600 transition-colors">
                                                <Edit2 className="w-4 h-4 inline" />
                                            </button>
                                            <button onClick={() => handleDelete(project.id)} className="text-slate-400 hover:text-red-600 transition-colors">
                                                <Trash2 className="w-4 h-4 inline" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Full Form Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-sm">
                    <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_24px_70px_rgba(15,23,42,0.16)] w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col">
                        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center shrink-0">
                            <h3 className="text-lg font-bold text-slate-900">{editingId ? 'Edit Project' : 'Create Project'}</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto flex-1">
                            <form id="project-form" onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                                        <input type="text" required className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Slug</label>
                                        <input type="text" required className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Short Description</label>
                                    <input type="text" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" value={formData.shortDescription} onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Description</label>
                                    <textarea rows="4" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 resize-none" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Live URL</label>
                                        <input type="text" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" value={formData.liveUrl} onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Repository URL</label>
                                        <input type="text" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" value={formData.repoUrl} onChange={(e) => setFormData({ ...formData, repoUrl: e.target.value })} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                                        <select className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                                            <option value="draft">Draft</option>
                                            <option value="published">Published</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Sort Order</label>
                                        <input type="number" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" value={formData.sortOrder} onChange={(e) => setFormData({ ...formData, sortOrder: e.target.value })} />
                                    </div>
                                    <div className="flex items-center mt-6">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="checkbox" className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500" checked={formData.featured} onChange={(e) => setFormData({ ...formData, featured: e.target.checked })} />
                                            <span className="text-sm font-medium text-slate-700">Featured Project</span>
                                        </label>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3 shrink-0">
                            <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors">Cancel</button>
                            <button type="submit" form="project-form" className="px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors">Save Project</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
