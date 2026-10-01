import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from '../../../redux/slices/blogSlice';
import { ArrowUpRight } from 'lucide-react';

export default function BlogPreview() {
    const dispatch = useDispatch();
    const { items: blogs = [], loading } = useSelector((state) => state.blogs || {});

    useEffect(() => {
        dispatch(fetchBlogs());
    }, [dispatch]);

    const publishedBlogs = blogs.filter(b => b.status === 'published').slice(0, 3);

    if (loading && blogs.length === 0) return null;
    if (publishedBlogs.length === 0) return null;

    return (
        <section id="blog" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Writing</h2>
                        <p className="mt-4 text-lg text-slate-600 max-w-2xl">Thoughts, tutorials, and insights.</p>
                    </div>
                    <a href="#" className="hidden md:flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-700">
                        View all articles <ArrowUpRight className="w-4 h-4" />
                    </a>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {publishedBlogs.map((blog) => (
                        <div key={blog.id} className="group cursor-pointer">
                            <div className="w-full aspect-video bg-slate-100 rounded-2xl overflow-hidden mb-6 border border-slate-200 group-hover:border-indigo-200 transition-colors relative">
                                <div className="absolute inset-0 flex items-center justify-center text-slate-400">Cover Image</div>
                            </div>
                            <div className="flex items-center gap-3 text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-3">
                                <span>Article</span>
                                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                <span className="text-slate-500">{new Date(blog.publishedAt || blog.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2">
                                {blog.title}
                            </h3>
                            <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                                {blog.excerpt}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
