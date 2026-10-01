import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSkills, addSkill, updateSkill, deleteSkill } from '../../redux/slices/skillsSlice';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import toast from 'react-hot-toast';

/**
 * SkillsManager Component
 * Renders a data table of skills and provides a modal for creating/updating them.
 * Integrates with Redux for state management and react-hot-toast for UI feedback.
 */
export default function SkillsManager() {
    const dispatch = useDispatch();
    const { items: skills, loading } = useSelector((state) => state.skills);
    
    // Local state for modal visibility and form data
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({ name: '', slug: '', category: '', level: '', description: '' });

    // Fetch skills from backend via Redux on mount
    useEffect(() => {
        dispatch(fetchSkills());
    }, [dispatch]);

    /**
     * Opens the modal. If a skill is provided, it populates the form for editing.
     * Otherwise, it clears the form for creating a new skill.
     */
    const handleOpenModal = (skill = null) => {
        if (skill) {
            setEditingId(skill.id);
            setFormData({
                name: skill.name,
                slug: skill.slug,
                category: skill.category || '',
                level: skill.level || '',
                description: skill.description || ''
            });
        } else {
            setEditingId(null);
            setFormData({ name: '', slug: '', category: '', level: '', description: '' });
        }
        setIsModalOpen(true);
    };

    /**
     * Handles skill deletion with a confirmation prompt.
     */
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this skill?')) {
            try {
                await dispatch(deleteSkill(id)).unwrap();
                toast.success('Skill deleted successfully');
            } catch (error) {
                toast.error(error || 'Failed to delete skill');
            }
        }
    };

    /**
     * Handles form submission to either create or update a skill.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await dispatch(updateSkill({ id: editingId, data: formData })).unwrap();
                toast.success('Skill updated successfully');
            } else {
                await dispatch(addSkill(formData)).unwrap();
                toast.success('Skill added successfully');
            }
            setIsModalOpen(false);
        } catch (error) {
            toast.error(error || 'Failed to save skill');
        }
    };

    return (
        <div>
            {/* Toolbar for Actions */}
            <div className="mb-4 flex justify-end">
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-indigo-600 text-white rounded-xl px-4 py-2.5 font-semibold hover:bg-indigo-700 flex items-center gap-2 transition-all shadow-sm"
                >
                    <Plus className="w-4 h-4" />
                    Add Skill
                </button>
            </div>

            {/* Data Table */}
            <div className="bg-white border border-slate-200/80 rounded-2xl shadow-[0_4px_20px_rgba(15,23,42,0.05)] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wide text-xs">
                            <tr>
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Category</th>
                                <th className="px-6 py-4">Level</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading && skills.length === 0 ? (
                                <tr><td colSpan="4" className="px-6 py-4 text-center">Loading...</td></tr>
                            ) : skills.length === 0 ? (
                                <tr><td colSpan="4" className="px-6 py-8 text-center text-slate-500">No skills found. Add your first one!</td></tr>
                            ) : (
                                skills.map((skill) => (
                                    <tr key={skill.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-900">{skill.name}</td>
                                        <td className="px-6 py-4">
                                            <span className="bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-md text-xs font-medium border border-indigo-100">
                                                {skill.category || 'Uncategorized'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">{skill.level || '-'}</td>
                                        <td className="px-6 py-4 text-right space-x-3">
                                            <button onClick={() => handleOpenModal(skill)} className="text-slate-400 hover:text-indigo-600 transition-colors">
                                                <Edit2 className="w-4 h-4 inline" />
                                            </button>
                                            <button onClick={() => handleDelete(skill.id)} className="text-slate-400 hover:text-red-600 transition-colors">
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

            {/* Slide-over Modal for Create/Edit */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-sm">
                    <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_24px_70px_rgba(15,23,42,0.16)] w-full max-w-md overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-slate-900">{editingId ? 'Edit Skill' : 'Add Skill'}</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                                <input type="text" required className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Slug (URL friendly)</label>
                                <input type="text" required className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Category (e.g., Frontend, Backend)</label>
                                <input type="text" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Level (e.g., Expert, Intermediate)</label>
                                <input type="text" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" value={formData.level} onChange={(e) => setFormData({ ...formData, level: e.target.value })} />
                            </div>
                            <div className="pt-4 flex justify-end gap-3">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors">Cancel</button>
                                <button type="submit" className="px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
