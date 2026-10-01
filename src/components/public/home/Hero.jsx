import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-scroll';

export default function Hero() {
    const { data: settings } = useSelector((state) => state.settings);

    return (
        <section id="hero" className="relative min-h-[90vh] flex items-center pt-24 pb-12 overflow-hidden bg-slate-50">
            {/* Ambient Gradients */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-400/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute top-40 right-0 w-[400px] h-[400px] bg-violet-400/5 rounded-full blur-[80px] translate-x-1/3"></div>

            <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                    <div className="inline-block px-3 py-1 bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold tracking-wider uppercase rounded-full">
                        {settings?.siteTitle || 'Available for Work'}
                    </div>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-[1.05] tracking-tight">
                        FULL STACK<br /><span className="text-indigo-600">DEVELOPER.</span>
                    </h1>
                    <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
                        {settings?.siteDescription || 'I design and build scalable web applications using modern frontend, backend, and database technologies.'}
                    </p>
                    <div className="flex flex-wrap gap-4 pt-4">
                        <Link to="projects" smooth={true} duration={500} offset={-100} className="bg-indigo-600 text-white rounded-xl px-8 py-3.5 font-semibold hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500/30 shadow-md transition-all cursor-pointer">
                            View Work
                        </Link>
                        <Link to="contact" smooth={true} duration={500} offset={-100} className="bg-white/65 backdrop-blur-lg border border-white/70 text-slate-800 rounded-xl px-8 py-3.5 font-semibold hover:bg-white/85 shadow-sm transition-all cursor-pointer">
                            Contact Me
                        </Link>
                    </div>
                </div>

                {/* Right Visual Panel */}
                <div className="relative w-full aspect-[4/5] md:aspect-square lg:aspect-[4/5] bg-white/80 backdrop-blur-2xl border border-white/70 shadow-[0_16px_45px_rgba(15,23,42,0.08)] rounded-[24px] overflow-hidden flex items-center justify-center p-8">
                    {/* Placeholder for Profile/Hero Image */}
                    <div className="w-full h-full bg-slate-100 rounded-xl border border-slate-200/50 flex flex-col items-center justify-center text-slate-400">
                        <svg className="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        <span className="text-sm font-medium">Hero Image</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
