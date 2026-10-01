import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTestimonials, addTestimonial, updateTestimonial, deleteTestimonial } from '../../redux/slices/testimonialSlice';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import toast from 'react-hot-toast';

/**
 * TestimonialsManager Component
 * 
 * Provides an interface for CRUD operations on client testimonials.
 * Uses a data table for viewing and a modal overlay for data entry.
 */
export default function TestimonialsManager() {
    const dispatch = useDispatch();
    
    // Pull testimonials array and loading boolean from Redux state
    const { items: testimonials, loading } = useSelector((state) => state.testimonials);
    
    // UI states for modal visibility and determining if we are editing an existing record
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    
    // Form state initialized with empty values
    const [formData, setFormData] = useState({ name: '', role: '', company: '', content: '' });

    // Initial fetch of testimonials on mount
    useEffect(() => {
        dispatch(fetchTestimonials());
    }, [dispatch]);

    /**
     * Prepares the modal form for either adding a new testimonial or editing an existing one.
     */
    const handleOpenModal = (testimonial = null) => {
        if (testimonial) {
            setEditingId(testimonial.id);
            setFormData({
                name: testimonial.name, 
                role: testimonial.role || '', 
                company: testimonial.company || '', 
                content: testimonial.content
            });
        } else {
            setEditingId(null);
            setFormData({ name: '', role: '', company: '', content: '' });
        }
        setIsModalOpen(true);
    };

    /**
     * Dispatches the delete thunk and handles success/error notifications.
     */
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this testimonial?')) {
            try {
                await dispatch(deleteTestimonial(id)).unwrap();
                toast.success('Testimonial deleted successfully');
            } catch (error) {
                toast.error(error || 'Failed to delete testimonial');
            }
        }
    };

    /**
     * Dispatches either an add or update thunk depending on whether editingId is set.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await dispatch(updateTestimonial({ id: editingId, data: formData })).unwrap();
                toast.success('Testimonial updated successfully');
            } else {
                await dispatch(addTestimonial(formData)).unwrap();
                toast.success('Testimonial added successfully');
            }
            setIsModalOpen(false);
        } catch (error) {
            toast.error(error || 'Failed to save testimonial');
        }
    };

    return (
        <div>
            {/* Toolbar section */}
            <div className="mb-4 flex justify-end">
                <button onClick={() => handleOpenModal()} className="bg-indigo-600 text-white rounded-xl px-4 py-2.5 font-semibold hover:bg-indigo-700 flex items-center gap-2 transition-all shadow-sm">
                    <Plus className="w-4 h-4" />
                    Add Testimonial
                </button>
            </div>

            {/* Main Table view */}
            <div className="bg-white border border-slate-200/80 rounded-2xl shadow-[0_4px_20px_rgba(15,23,42,0.05)] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wide text-xs">
                            <tr>
                                <th className="px-6 py-4">Client</th>
                                <th className="px-6 py-4">Content</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {/* Loading state rendering */}
                            {loading && testimonials.length === 0 ? (
                                <tr><td colSpan="3" className="px-6 py-4 text-center">Loading...</td></tr>
                            ) : testimonials.length === 0 ? (
                                /* Empty state rendering */
                                <tr><td colSpan="3" className="px-6 py-8 text-center text-slate-500">No testimonials found.</td></tr>
                            ) : (
                                /* Map through records */
                                testimonials.map((testimonial) => (
                                    <tr key={testimonial.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-900">
                                            {testimonial.name}
                                            <div className="text-xs text-slate-500 font-normal mt-0.5">{testimonial.role} {testimonial.company && `at ${testimonial.company}`}</div>
                                        </td>
                                        <td className="px-6 py-4 max-w-md truncate">{testimonial.content}</td>
                                        <td className="px-6 py-4 text-right space-x-3">
                                            {/* Action buttons mapping back to handlers */}
                                            <button onClick={() => handleOpenModal(testimonial)} className="text-slate-400 hover:text-indigo-600 transition-colors"><Edit2 className="w-4 h-4 inline" /></button>
                                            <button onClick={() => handleDelete(testimonial.id)} className="text-slate-400 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4 inline" /></button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Creation and Edit Modal Form */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-sm">
                    <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_24px_70px_rgba(15,23,42,0.16)] w-full max-w-lg overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center shrink-0">
                            <h3 className="text-lg font-bold text-slate-900">{editingId ? 'Edit Testimonial' : 'Add Testimonial'}</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
                        </div>
                        <div className="p-6">
                            <form id="testimonial-form" onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Client Name</label>
                                    <input type="text" required className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Role/Position</label>
                                        <input type="text" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Company</label>
                                        <input type="text" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Testimonial Content</label>
                                    <textarea rows="4" required className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 resize-none" value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} />
                                </div>
                            </form>
                        </div>
                        <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3 shrink-0">
                            <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors">Cancel</button>
                            <button type="submit" form="testimonial-form" className="px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors">Save</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
