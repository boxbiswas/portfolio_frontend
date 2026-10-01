import React, { useState } from 'react';
import { Link } from 'react-scroll';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { name: 'About', to: 'about' },
        { name: 'Skills', to: 'skills' },
        { name: 'Projects', to: 'projects' },
        { name: 'Experience', to: 'experience' },
        { name: 'Contact', to: 'contact' }
    ];

    return (
        <div className="fixed top-4 left-0 right-0 z-50 px-4">
            <nav className="max-w-7xl mx-auto bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgba(15,23,42,0.06)] rounded-2xl px-6 py-4 transition-all duration-300">
                <div className="flex justify-between items-center">
                    <div className="text-xl font-bold text-slate-900 tracking-tight">
                        INDRASISH<span className="text-indigo-600">.</span>
                    </div>
                    <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
                        {links.map(link => (
                            <Link key={link.name} to={link.to} smooth={true} duration={500} offset={-100} className="hover:text-indigo-600 cursor-pointer transition-colors">
                                {link.name}
                            </Link>
                        ))}
                    </div>
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-slate-900 outline-none">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                            </svg>
                        </button>
                    </div>
                </div>
                
                {/* Mobile Menu Dropdown */}
                {isOpen && (
                    <div className="md:hidden mt-4 pt-4 border-t border-slate-200 flex flex-col gap-4 text-sm font-medium text-slate-600">
                        {links.map(link => (
                            <Link key={link.name} to={link.to} smooth={true} duration={500} offset={-100} onClick={() => setIsOpen(false)} className="hover:text-indigo-600 cursor-pointer transition-colors py-1">
                                {link.name}
                            </Link>
                        ))}
                    </div>
                )}
            </nav>
        </div>
    );
}
