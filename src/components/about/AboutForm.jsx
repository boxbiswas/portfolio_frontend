import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAbout, updateAbout } from '../../redux/slices/aboutSlice';
import { Save } from 'lucide-react';
import toast from 'react-hot-toast';

/**
 * AboutForm Component
 * Manages the fetching and updating of the portfolio's About section.
 * Utilizes Redux for state management and react-hot-toast for user feedback.
 */
export default function AboutForm() {
    const dispatch = useDispatch();
    
    // Extract state from the about Redux slice
    const { data, loading } = useSelector((state) => state.about);
    
    // Local state to manage form inputs independently before saving
    const [formData, setFormData] = useState({
        title: '',
        shortBio: '',
        longBio: '',
    });
    const [saving, setSaving] = useState(false);

    // Initial data fetch on mount
    useEffect(() => {
        dispatch(fetchAbout());
    }, [dispatch]);

    // Sync Redux state to local form state when data arrives
    useEffect(() => {
        if (data) {
            setFormData({
                title: data.title || '',
                shortBio: data.shortBio || '',
                longBio: data.longBio || '',
            });
        }
    }, [data]);

    // Handle form submission and update via Redux thunk
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            // unwrap() allows us to catch errors thrown by the thunk's rejectWithValue
            await dispatch(updateAbout(formData)).unwrap();
            toast.success('About section updated successfully!');
        } catch (error) {
            toast.error(error || 'Failed to update about section.');
        } finally {
            setSaving(false);
        }
    };

    // Show a loading state if data is still being fetched for the first time
    if (loading && !data) return <div className="p-4 text-slate-500">Loading...</div>;

    return (
        <div>
            {/* Form layout utilizing Tailwind CSS with glassmorphism touches */}
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_4px_20px_rgba(15,23,42,0.05)] space-y-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                    <input
                        type="text"
                        required
                        className="w-full bg-white border border-slate-200 rounded-xl text-slate-900 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 px-4 py-2.5 outline-none transition-all"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Short Biography</label>
                    <textarea
                        required
                        rows="2"
                        className="w-full bg-white border border-slate-200 rounded-xl text-slate-900 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 px-4 py-2.5 outline-none transition-all resize-none"
                        value={formData.shortBio}
                        onChange={(e) => setFormData({ ...formData, shortBio: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Detailed Biography</label>
                    <textarea
                        required
                        rows="6"
                        className="w-full bg-white border border-slate-200 rounded-xl text-slate-900 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 px-4 py-2.5 outline-none transition-all resize-none"
                        value={formData.longBio}
                        onChange={(e) => setFormData({ ...formData, longBio: e.target.value })}
                    />
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end">
                    <button
                        type="submit"
                        disabled={saving}
                        className="bg-indigo-600 text-white rounded-xl px-6 py-2.5 font-semibold hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500/30 flex items-center gap-2 transition-all disabled:opacity-70"
                    >
                        <Save className="w-4 h-4" />
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
}
