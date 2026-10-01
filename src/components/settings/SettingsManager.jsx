import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSettings, updateSettings } from '../../redux/slices/settingsSlice';
import { Save } from 'lucide-react';
import toast from 'react-hot-toast';

/**
 * SettingsManager Component
 * 
 * Manages the global site metadata (SEO tags, titles, contact email).
 * Because Settings is generally a singleton in this architecture, there is no
 * list/table view—only a single form that edits the one underlying record.
 */
export default function SettingsManager() {
    const dispatch = useDispatch();
    
    // Select the singleton 'data' object from settings slice
    const { data, loading } = useSelector((state) => state.settings);
    
    // Local form state
    const [formData, setFormData] = useState({
        siteTitle: '',
        siteDescription: '',
        metaKeywords: '',
        contactEmail: '',
    });
    
    // Tracks the active submit state to disable the save button
    const [saving, setSaving] = useState(false);

    // Mount fetch
    useEffect(() => {
        dispatch(fetchSettings());
    }, [dispatch]);

    // Whenever the Redux data updates (e.g. after a fetch), sync it into our local form state
    useEffect(() => {
        if (data) {
            setFormData({
                siteTitle: data.siteTitle || '',
                siteDescription: data.siteDescription || '',
                metaKeywords: data.metaKeywords || '',
                contactEmail: data.contactEmail || '',
            });
        }
    }, [data]);

    /**
     * Submits the updated singleton record back to the backend API.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await dispatch(updateSettings(formData)).unwrap();
            toast.success('Site settings updated successfully!');
        } catch (error) {
            toast.error(error || 'Failed to update site settings.');
        } finally {
            setSaving(false);
        }
    };

    // If loading for the first time and we have no cached data, show a loader
    if (loading && !data) return <div className="p-4 text-slate-500">Loading...</div>;

    return (
        <div>
            {/* The single settings form wrapped in a sleek card component */}
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_4px_20px_rgba(15,23,42,0.05)] space-y-6 max-w-3xl">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Site Title</label>
                    <input
                        type="text"
                        required
                        className="w-full bg-white border border-slate-200 rounded-xl text-slate-900 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 px-4 py-2.5 outline-none transition-all"
                        value={formData.siteTitle}
                        onChange={(e) => setFormData({ ...formData, siteTitle: e.target.value })}
                        placeholder="e.g. John Doe - Full Stack Developer"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Contact Email</label>
                    <input
                        type="email"
                        required
                        className="w-full bg-white border border-slate-200 rounded-xl text-slate-900 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 px-4 py-2.5 outline-none transition-all"
                        value={formData.contactEmail}
                        onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                        placeholder="Where contact forms will be sent"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Site Description (SEO)</label>
                    <textarea
                        rows="3"
                        className="w-full bg-white border border-slate-200 rounded-xl text-slate-900 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 px-4 py-2.5 outline-none transition-all resize-none"
                        value={formData.siteDescription}
                        onChange={(e) => setFormData({ ...formData, siteDescription: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Meta Keywords</label>
                    <input
                        type="text"
                        className="w-full bg-white border border-slate-200 rounded-xl text-slate-900 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 px-4 py-2.5 outline-none transition-all"
                        value={formData.metaKeywords}
                        onChange={(e) => setFormData({ ...formData, metaKeywords: e.target.value })}
                        placeholder="e.g. developer, portfolio, react, node"
                    />
                </div>

                {/* Submit actions */}
                <div className="pt-4 border-t border-slate-100 flex justify-end">
                    <button
                        type="submit"
                        disabled={saving}
                        className="bg-indigo-600 text-white rounded-xl px-6 py-2.5 font-semibold hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500/30 flex items-center gap-2 transition-all disabled:opacity-70"
                    >
                        <Save className="w-4 h-4" />
                        {saving ? 'Saving...' : 'Save Settings'}
                    </button>
                </div>
            </form>
        </div>
    );
}
