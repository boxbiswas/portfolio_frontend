import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchSettings } from '../../redux/slices/settingsSlice';
import { fetchSocialLinks } from '../../redux/slices/socialSlice';

import Navbar from '../../components/public/layout/Navbar';
import Hero from '../../components/public/home/Hero';
import AboutSection from '../../components/public/home/AboutSection';
import SkillsSection from '../../components/public/home/SkillsSection';
import ProjectsSection from '../../components/public/home/ProjectsSection';
import ExperienceSection from '../../components/public/home/ExperienceSection';
import ServicesSection from '../../components/public/home/ServicesSection';
import TestimonialsSection from '../../components/public/home/TestimonialsSection';
import BlogPreview from '../../components/public/home/BlogPreview';
import ContactSection from '../../components/public/home/ContactSection';
import Footer from '../../components/public/layout/Footer';

export default function Home() {
    const dispatch = useDispatch();

    // Fetch global data needed across multiple sections
    useEffect(() => {
        dispatch(fetchSettings());
        dispatch(fetchSocialLinks());
    }, [dispatch]);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
            <Navbar />
            <main>
                <Hero />
                <AboutSection />
                <SkillsSection />
                <ProjectsSection />
                <ExperienceSection />
                <ServicesSection />
                <TestimonialsSection />
                <BlogPreview />
                <ContactSection />
            </main>
            <Footer />
        </div>
    );
}
