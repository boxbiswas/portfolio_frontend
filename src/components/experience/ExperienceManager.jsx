import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExperience, addExperience, updateExperience, deleteExperience } from '../../redux/slices/experienceSlice';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import toast from 'react-hot-toast';

/**
 * ExperienceManager Component
 * Manages the user's professional experience records, using Redux and react-hot-toast.
 * Includes a date-picker logic that clears the end date when "currently working here" is checked.
 */
export default function ExperienceManager() {
    const dispatch = useDispatch();
    const { items: experiences, loading } = useSelector((state) => state.experience);
    
    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        company: '', role: '', location: '', employmentType: '',
        startDate: '', endDate: '', isCurrent: false, description: ''
    });

    // Fetch on mount
    useEffect(() => {
        dispatch(fetchExperience());
    }, [dispatch]);

    /**
     * Initializes the form with existing data (formatting ISO dates to standard HTML inputs)
     * or empty strings if adding a new entry.
     */
    const handleOpenModal = (exp = null) => {
        if (exp) {
            setEditingId(exp.id);
            setFormData({
                company: exp.company, role: exp.role, location: exp.location || '', employmentType: exp.employmentType,
                // Parse dates for `<input type="date">`
                startDate: exp.startDate ? new Date(exp.startDate).toISOString().split('T')[0] : '', 
                endDate: exp.endDate ? new Date(exp.endDate).toISOString().split('T')[0] : '', 
                isCurrent: exp.isCurrent || false, description: exp.description || ''
            });
        } else {
            setEditingId(null);
            setFormData({
                company: '', role: '', location: '', employmentType: 'Full-time',
                startDate: '', endDate: '', isCurrent: false, description: ''
            });
        }
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this experience?')) {
            try {
                await dispatch(deleteExperience(id)).unwrap();
                toast.success('Experience deleted successfully');
            } catch (error) {
                toast.error(error || 'Failed to delete experience');
            }
        }
    };

    /**
     * Formats dates back to ISO string for backend consumption before dispatching Redux thunk.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Data formatting: Clear endDate if currently working there. Convert dates to ISO.
            const dataToSubmit = { ...formData, endDate: formData.isCurrent ? null : (formData.endDate || null), startDate: new Date(formData.startDate).toISOString() };
            if (dataToSubmit.endDate) dataToSubmit.endDate = new Date(dataToSubmit.endDate).toISOString();

            if (editingId) {
                await dispatch(updateExperience({ id: editingId, data: dataToSubmit })).unwrap();
                toast.success('Experience updated successfully');
            } else {
                await dispatch(addExperience(dataToSubmit)).unwrap();
                toast.success('Experience added successfully');
            }
            setIsModalOpen(false);
        } catch (error) {
            toast.error(error || 'Failed to save experience');
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
                    Add Experience
                </button>
            </div>

            {/* Experience Table */}
            <div className="bg-white border border-slate-200/80 rounded-2xl shadow-[0_4px_20px_rgba(15,23,42,0.05)] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wide text-xs">
                            <tr>
                                <th className="px-6 py-4">Role & Company</th>
                                <th className="px-6 py-4">Timeline</th>
                                <th className="px-6 py-4">Type</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading && experiences.length === 0 ? (
                                <tr><td colSpan="4" className="px-6 py-4 text-center">Loading...</td></tr>
                            ) : experiences.length === 0 ? (
                                <tr><td colSpan="4" className="px-6 py-8 text-center text-slate-500">No experience records found.</td></tr>
                            ) : (
                                experiences.map((exp) => (
                                    <tr key={exp.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-900">
                                            {exp.role}
                                            <div className="text-xs text-slate-500 font-normal mt-0.5">{exp.company} {exp.location && `· ${exp.location}`}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {new Date(exp.startDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })} - {exp.isCurrent ? 'Present' : (exp.endDate ? new Date(exp.endDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : 'Unknown')}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md text-xs font-medium border border-slate-200">
                                                {exp.employmentType}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-3">
                                            <button onClick={() => handleOpenModal(exp)} className="text-slate-400 hover:text-indigo-600 transition-colors">
                                                <Edit2 className="w-4 h-4 inline" />
                                            </button>
                                            <button onClick={() => handleDelete(exp.id)} className="text-slate-400 hover:text-red-600 transition-colors">
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

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-sm">
                    <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_24px_70px_rgba(15,23,42,0.16)] w-full max-w-xl overflow-hidden max-h-[90vh] flex flex-col">
                        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center shrink-0">
                            <h3 className="text-lg font-bold text-slate-900">{editingId ? 'Edit Experience' : 'Add Experience'}</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto flex-1">
                            <form id="exp-form" onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Company</label>
                                        <input type="text" required className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
                                        <input type="text" required className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                                        <input type="text" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Employment Type</label>
                                        <input type="text" required className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" value={formData.employmentType} onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Start Date</label>
                                        <input type="date" required className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">End Date</label>
                                        <input type="date" disabled={formData.isCurrent} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 disabled:bg-slate-50 disabled:text-slate-400" value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} />
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500" checked={formData.isCurrent} onChange={(e) => setFormData({ ...formData, isCurrent: e.target.checked })} />
                                        <span className="text-sm font-medium text-slate-700">I currently work here</span>
                                    </label>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                                    <textarea rows="4" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 resize-none" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                                </div>
                            </form>
                        </div>
                        <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3 shrink-0">
                            <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors">Cancel</button>
                            <button type="submit" form="exp-form" className="px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors">Save</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
