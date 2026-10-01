import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs, addBlog, updateBlog, deleteBlog } from '../../redux/slices/blogSlice';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import toast from 'react-hot-toast';

/**
 * BlogsManager Component
 * 
 * Responsible for rendering the list of blog posts and providing a modal
 * for creating or editing a blog post. Integrates with Redux for state 
 * and react-hot-toast for UI feedback.
 */
export default function BlogsManager() {
    const dispatch = useDispatch();
    
    // Select blogs state from Redux store
    const { items: blogs, loading } = useSelector((state) => state.blogs);
    
    // Local state to control the visibility of the Create/Edit modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Tracks the ID of the blog currently being edited. If null, we are creating a new blog.
    const [editingId, setEditingId] = useState(null);
    
    // Local form state mapped to the Blog database model
    const [formData, setFormData] = useState({
        title: '', slug: '', excerpt: '', content: '',
        status: 'draft', publishedAt: ''
    });

    // Fetch the list of blogs from the API on component mount
    useEffect(() => {
        dispatch(fetchBlogs());
    }, [dispatch]);

    /**
     * Opens the modal.
     * @param {Object|null} blog - If a blog object is passed, populates the form for editing.
     *                             If null is passed, clears the form for creating a new blog.
     */
    const handleOpenModal = (blog = null) => {
        if (blog) {
            setEditingId(blog.id);
            // Format the publishedAt date for the HTML <input type="date"> component (YYYY-MM-DD)
            setFormData({
                title: blog.title, slug: blog.slug, excerpt: blog.excerpt || '', content: blog.content || '',
                status: blog.status || 'draft',
                publishedAt: blog.publishedAt ? new Date(blog.publishedAt).toISOString().split('T')[0] : ''
            });
        } else {
            setEditingId(null);
            // Reset form for a fresh entry
            setFormData({
                title: '', slug: '', excerpt: '', content: '', status: 'draft', publishedAt: ''
            });
        }
        setIsModalOpen(true);
    };

    /**
     * Handles blog deletion after prompting the user for confirmation.
     */
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this blog post?')) {
            try {
                // Dispatch the delete thunk and unwrap the promise to catch errors
                await dispatch(deleteBlog(id)).unwrap();
                toast.success('Blog deleted successfully');
            } catch (error) {
                toast.error(error || 'Failed to delete blog');
            }
        }
    };

    /**
     * Submits the form data to either create a new blog or update an existing one.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Convert the date string back into an ISO string for the backend API
            const dataToSubmit = { 
                ...formData, 
                publishedAt: formData.publishedAt ? new Date(formData.publishedAt).toISOString() : null 
            };
            
            // Check if we are editing an existing record or creating a new one
            if (editingId) {
                await dispatch(updateBlog({ id: editingId, data: dataToSubmit })).unwrap();
                toast.success('Blog updated successfully');
            } else {
                await dispatch(addBlog(dataToSubmit)).unwrap();
                toast.success('Blog created successfully');
            }
            
            // Close the modal on success
            setIsModalOpen(false);
        } catch (error) {
            toast.error(error || 'Failed to save blog');
        }
    };

    return (
        <div>
            {/* Top action bar with Create button */}
            <div className="mb-4 flex justify-end">
                <button onClick={() => handleOpenModal()} className="bg-indigo-600 text-white rounded-xl px-4 py-2.5 font-semibold hover:bg-indigo-700 flex items-center gap-2 transition-all shadow-sm">
                    <Plus className="w-4 h-4" />
                    Create Blog
                </button>
            </div>

            {/* Blogs Data Table */}
            <div className="bg-white border border-slate-200/80 rounded-2xl shadow-[0_4px_20px_rgba(15,23,42,0.05)] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wide text-xs">
                            <tr>
                                <th className="px-6 py-4">Title</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Published At</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {/* Loading State */}
                            {loading && blogs.length === 0 ? (
                                <tr><td colSpan="4" className="px-6 py-4 text-center">Loading...</td></tr>
                            ) : blogs.length === 0 ? (
                                // Empty State
                                <tr><td colSpan="4" className="px-6 py-8 text-center text-slate-500">No blog posts found.</td></tr>
                            ) : (
                                // Render blog rows
                                blogs.map((blog) => (
                                    <tr key={blog.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-900">
                                            {blog.title}
                                            <div className="text-xs text-slate-400 font-normal mt-0.5">{blog.slug}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {/* Dynamic badge color based on status */}
                                            <span className={`px-2.5 py-1 rounded-md text-xs font-medium border ${blog.status === 'published' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                                                {blog.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">{blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString() : '-'}</td>
                                        <td className="px-6 py-4 text-right space-x-3">
                                            <button onClick={() => handleOpenModal(blog)} className="text-slate-400 hover:text-indigo-600 transition-colors">
                                                <Edit2 className="w-4 h-4 inline" />
                                            </button>
                                            <button onClick={() => handleDelete(blog.id)} className="text-slate-400 hover:text-red-600 transition-colors">
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

            {/* Slide-over/Modal Form */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-sm">
                    {/* Modal Container */}
                    <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_24px_70px_rgba(15,23,42,0.16)] w-full max-w-3xl overflow-hidden max-h-[90vh] flex flex-col">
                        
                        {/* Modal Header */}
                        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center shrink-0">
                            <h3 className="text-lg font-bold text-slate-900">{editingId ? 'Edit Blog' : 'Create Blog'}</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
                        </div>
                        
                        {/* Scrollable Form Body */}
                        <div className="p-6 overflow-y-auto flex-1">
                            <form id="blog-form" onSubmit={handleSubmit} className="space-y-4">
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
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Excerpt</label>
                                    <textarea rows="2" required className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 resize-none" value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Content (Markdown/HTML)</label>
                                    <textarea rows="8" required className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 resize-none font-mono text-sm" value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                                        <select className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                                            <option value="draft">Draft</option>
                                            <option value="published">Published</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Publish Date</label>
                                        <input type="date" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" value={formData.publishedAt} onChange={(e) => setFormData({ ...formData, publishedAt: e.target.value })} />
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3 shrink-0">
                            <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors">Cancel</button>
                            <button type="submit" form="blog-form" className="px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors">Save Blog</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
