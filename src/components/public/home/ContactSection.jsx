import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Mail, MapPin, Send } from 'lucide-react';
import api from '../../../https/axios';
import toast from 'react-hot-toast';

export default function ContactSection() {
    const { data: settings } = useSelector((state) => state.settings);
    const { items: socialLinks = [] } = useSelector((state) => state.social || {});
    
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const activeSocials = socialLinks?.filter(link => link.isActive) || [];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await api.post('/contact', formData); // Unprotected route in backend
            toast.success("Message sent successfully! I'll get back to you soon.");
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to send message.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="bg-white/70 backdrop-blur-xl border border-slate-200/80 shadow-[0_16px_45px_rgba(15,23,42,0.05)] rounded-[32px] overflow-hidden">
                    <div className="grid md:grid-cols-2">
                        {/* Contact Info (Left) */}
                        <div className="p-10 md:p-16 bg-indigo-600 text-white flex flex-col justify-between">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">Let's work together.</h2>
                                <p className="text-indigo-100 text-lg mb-12 max-w-sm">
                                    Have a project in mind or want to discuss a potential opportunity? I'm currently open for new collaborations.
                                </p>
                                
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                                            <Mail className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="text-sm text-indigo-200 font-medium">Email</div>
                                            <a href={`mailto:${settings?.contactEmail}`} className="text-lg font-semibold hover:underline">
                                                {settings?.contactEmail || 'hello@example.com'}
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                                            <MapPin className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="text-sm text-indigo-200 font-medium">Location</div>
                                            <div className="text-lg font-semibold">Remote / Worldwide</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {activeSocials.length > 0 && (
                                <div className="mt-16 pt-8 border-t border-white/20">
                                    <h3 className="text-sm font-semibold uppercase tracking-wider text-indigo-200 mb-6">Connect</h3>
                                    <div className="flex flex-wrap gap-4">
                                        {activeSocials.map(social => (
                                            <a key={social.id} href={social.url} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-indigo-600 transition-colors">
                                                <span className="text-xs font-bold">{social.platform.charAt(0)}</span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        {/* Contact Form (Right) */}
                        <div className="p-10 md:p-16 bg-white">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Your Name</label>
                                        <input type="text" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="John Doe" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Your Email</label>
                                        <input type="email" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="john@example.com" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Subject</label>
                                    <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all" value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} placeholder="Project Inquiry" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Message</label>
                                    <textarea required rows="5" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all resize-none" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} placeholder="Tell me about your project..."></textarea>
                                </div>
                                <button type="submit" disabled={isSubmitting} className="w-full bg-indigo-600 text-white rounded-xl px-8 py-4 font-bold hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500/30 flex justify-center items-center gap-2 transition-all shadow-md disabled:opacity-70 disabled:cursor-not-allowed">
                                    <Send className="w-5 h-5" /> {isSubmitting ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
