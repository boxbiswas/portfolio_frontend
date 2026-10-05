import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices } from '../../../redux/slices/servicesSlice';
import { Code, Layout, Database, Smartphone, Cloud, PenTool } from 'lucide-react';

export default function ServicesSection() {
    const dispatch = useDispatch();
    const { items: services = [], loading } = useSelector((state) => state.services || {});

    useEffect(() => {
        dispatch(fetchServices());
    }, [dispatch]);

    // Helper to map icon names (string) to Lucide components if needed, or fallback
    const getIcon = (iconName) => {
        switch (iconName?.toLowerCase()) {
            case 'code': return <Code className="w-6 h-6" />;
            case 'layout': return <Layout className="w-6 h-6" />;
            case 'database': return <Database className="w-6 h-6" />;
            case 'smartphone': return <Smartphone className="w-6 h-6" />;
            case 'cloud': return <Cloud className="w-6 h-6" />;
            case 'design': return <PenTool className="w-6 h-6" />;
            default: return <Code className="w-6 h-6" />;
        }
    };

    if (loading && services.length === 0) return <section id="services" className="py-24"></section>;

    return (
        <section id="services" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Services</h2>
                    <p className="mt-4 text-lg text-slate-600 max-w-2xl">What I can do for you.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => (
                        <div key={service.id} className="bg-white border border-slate-200/80 rounded-2xl p-8 shadow-[0_4px_14px_rgba(15,23,42,0.05)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(15,23,42,0.07)] hover:border-indigo-200 transition-all duration-300">
                            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                                {getIcon(service.iconClass)}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
