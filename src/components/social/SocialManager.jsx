import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSocialLinks, addSocialLink, updateSocialLink, deleteSocialLink } from '../../redux/slices/socialSlice';
import { Plus, Edit2, Trash2, X, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';

/**
 * SocialManager Component
 * 
 * Allows the admin to manage their social media URLs. Features a toggleable 
 * 'isActive' state so links can be hidden without deleting them entirely.
 */
export default function SocialManager() {
    const dispatch = useDispatch();
    
    // Retrieve social links array and loading status from Redux
    const { items: socialLinks, loading } = useSelector((state) => state.social);
    
    // Local state for the modal form
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({ platform: '', url: '', iconClass: '', isActive: true });

    // Component mounts, fetch links
    useEffect(() => {
        dispatch(fetchSocialLinks());
    }, [dispatch]);

    /**
     * Initializes modal state. Populates the form if a link is passed in.
     */
    const handleOpenModal = (link = null) => {
        if (link) {
            setEditingId(link.id);
            setFormData({
                platform: link.platform, url: link.url, iconClass: link.iconClass || '', isActive: link.isActive
            });
        } else {
            setEditingId(null);
            setFormData({ platform: '', url: '', iconClass: '', isActive: true });
        }
        setIsModalOpen(true);
    };

    /**
     * Deletes a social link permanently.
     */
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this social link?')) {
            try {
                await dispatch(deleteSocialLink(id)).unwrap();
                toast.success('Social link deleted successfully');
            } catch (error) {
                toast.error(error || 'Failed to delete social link');
            }
        }
    };

    /**
     * Commits the form data to the Redux store via Thunk (creates or updates).
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await dispatch(updateSocialLink({ id: editingId, data: formData })).unwrap();
                toast.success('Social link updated successfully');
            } else {
                await dispatch(addSocialLink(formData)).unwrap();
                toast.success('Social link added successfully');
            }
            setIsModalOpen(false);
        } catch (error) {
            toast.error(error || 'Failed to save social link');
        }
    };

    /**
     * Quick action handler that flips the 'isActive' boolean directly from the table,
     * without needing to open the full edit modal.
     */
    const toggleActive = async (link) => {
        try {
            await dispatch(updateSocialLink({ id: link.id, data: { ...link, isActive: !link.isActive } })).unwrap();
            toast.success(`Link ${!link.isActive ? 'activated' : 'deactivated'}`);
        } catch (error) {
            toast.error('Failed to toggle status');
        }
    };

    return (
        <div>
            {/* Top Toolbar */}
            <div className="mb-4 flex justify-end">
                <button onClick={() => handleOpenModal()} className="bg-indigo-600 text-white rounded-xl px-4 py-2.5 font-semibold hover:bg-indigo-700 flex items-center gap-2 transition-all shadow-sm">
                    <Plus className="w-4 h-4" />
                    Add Link
                </button>
            </div>

            {/* List View Container */}
            <div className="bg-white border border-slate-200/80 rounded-2xl shadow-[0_4px_20px_rgba(15,23,42,0.05)] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wide text-xs">
                            <tr>
                                <th className="px-6 py-4">Platform</th>
                                <th className="px-6 py-4">URL</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading && socialLinks.length === 0 ? (
                                <tr><td colSpan="4" className="px-6 py-4 text-center">Loading...</td></tr>
                            ) : socialLinks.length === 0 ? (
                                <tr><td colSpan="4" className="px-6 py-8 text-center text-slate-500">No social links found.</td></tr>
                            ) : (
                                socialLinks.map((link) => (
                                    <tr key={link.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-900">{link.platform}</td>
                                        <td className="px-6 py-4">
                                            {/* Link wrapper showing external icon */}
                                            <a href={link.url} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline flex items-center gap-1">
                                                {link.url} <ExternalLink className="w-3 h-3" />
                                            </a>
                                        </td>
                                        <td className="px-6 py-4">
                                            {/* Quick toggle button acting as a status badge */}
                                            <button onClick={() => toggleActive(link)} className={`px-2.5 py-1 rounded-md text-xs font-medium border ${link.isActive ? 'bg-green-50 text-green-700 border-green-200' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                                                {link.isActive ? 'Active' : 'Hidden'}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-3">
                                            <button onClick={() => handleOpenModal(link)} className="text-slate-400 hover:text-indigo-600 transition-colors"><Edit2 className="w-4 h-4 inline" /></button>
                                            <button onClick={() => handleDelete(link.id)} className="text-slate-400 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4 inline" /></button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create/Edit Link Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-sm">
                    <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_24px_70px_rgba(15,23,42,0.16)] w-full max-w-md overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center shrink-0">
                            <h3 className="text-lg font-bold text-slate-900">{editingId ? 'Edit Link' : 'Add Link'}</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
                        </div>
                        <div className="p-6">
                            <form id="social-form" onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Platform Name (e.g., GitHub, LinkedIn)</label>
                                    <input type="text" required className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" value={formData.platform} onChange={(e) => setFormData({ ...formData, platform: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">URL</label>
                                    <input type="url" required className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" value={formData.url} onChange={(e) => setFormData({ ...formData, url: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Icon Key/Class (Optional)</label>
                                    <input type="text" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" value={formData.iconClass} onChange={(e) => setFormData({ ...formData, iconClass: e.target.value })} />
                                </div>
                                <div className="flex items-center">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500" checked={formData.isActive} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} />
                                        <span className="text-sm font-medium text-slate-700">Display on Portfolio</span>
                                    </label>
                                </div>
                            </form>
                        </div>
                        <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3 shrink-0">
                            <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors">Cancel</button>
                            <button type="submit" form="social-form" className="px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors">Save</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
