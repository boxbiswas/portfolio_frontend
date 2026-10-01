import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices, addService, updateService, deleteService } from '../../redux/slices/servicesSlice';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import toast from 'react-hot-toast';

/**
 * ServicesManager Component
 * Manages freelance/consulting services via Redux state and provides toast notifications.
 */
export default function ServicesManager() {
    const dispatch = useDispatch();
    const { items: services, loading } = useSelector((state) => state.services);
    
    // Modal & form states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({ title: '', shortDescription: '', description: '', iconKey: '' });

    // Fetch on mount
    useEffect(() => {
        dispatch(fetchServices());
    }, [dispatch]);

    /**
     * Set up the modal state.
     */
    const handleOpenModal = (service = null) => {
        if (service) {
            setEditingId(service.id);
            setFormData({
                title: service.title,
                shortDescription: service.shortDescription || '',
                description: service.description || '',
                iconKey: service.iconKey || ''
            });
        } else {
            setEditingId(null);
            setFormData({ title: '', shortDescription: '', description: '', iconKey: '' });
        }
        setIsModalOpen(true);
    };

    /**
     * Dispatch delete and trigger toast.
     */
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this service?')) {
            try {
                await dispatch(deleteService(id)).unwrap();
                toast.success('Service deleted successfully');
            } catch (error) {
                toast.error(error || 'Failed to delete service');
            }
        }
    };

    /**
     * Handle Creation or Modification of a service.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await dispatch(updateService({ id: editingId, data: formData })).unwrap();
                toast.success('Service updated successfully');
            } else {
                await dispatch(addService(formData)).unwrap();
                toast.success('Service added successfully');
            }
            setIsModalOpen(false);
        } catch (error) {
            toast.error(error || 'Failed to save service');
        }
    };

    return (
        <div>
            {/* Action Bar */}
            <div className="mb-4 flex justify-end">
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-indigo-600 text-white rounded-xl px-4 py-2.5 font-semibold hover:bg-indigo-700 flex items-center gap-2 transition-all shadow-sm"
                >
                    <Plus className="w-4 h-4" />
                    Add Service
                </button>
            </div>

            {/* Services Table */}
            <div className="bg-white border border-slate-200/80 rounded-2xl shadow-[0_4px_20px_rgba(15,23,42,0.05)] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wide text-xs">
                            <tr>
                                <th className="px-6 py-4">Title</th>
                                <th className="px-6 py-4">Description</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading && services.length === 0 ? (
                                <tr><td colSpan="3" className="px-6 py-4 text-center">Loading...</td></tr>
                            ) : services.length === 0 ? (
                                <tr><td colSpan="3" className="px-6 py-8 text-center text-slate-500">No services found.</td></tr>
                            ) : (
                                services.map((service) => (
                                    <tr key={service.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-900">{service.title}</td>
                                        <td className="px-6 py-4 max-w-xs truncate">{service.shortDescription}</td>
                                        <td className="px-6 py-4 text-right space-x-3">
                                            <button onClick={() => handleOpenModal(service)} className="text-slate-400 hover:text-indigo-600 transition-colors">
                                                <Edit2 className="w-4 h-4 inline" />
                                            </button>
                                            <button onClick={() => handleDelete(service.id)} className="text-slate-400 hover:text-red-600 transition-colors">
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

            {/* Service Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-sm">
                    <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_24px_70px_rgba(15,23,42,0.16)] w-full max-w-md overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-slate-900">{editingId ? 'Edit Service' : 'Add Service'}</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                                <input type="text" required className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Short Description</label>
                                <input type="text" required className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" value={formData.shortDescription} onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Detailed Description</label>
                                <textarea rows="3" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 resize-none" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Icon Key (Optional, e.g., 'code', 'database')</label>
                                <input type="text" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" value={formData.iconKey} onChange={(e) => setFormData({ ...formData, iconKey: e.target.value })} />
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
