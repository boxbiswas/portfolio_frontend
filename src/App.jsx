import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/layout/AdminLayout';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import About from './pages/admin/About';
import Skills from './pages/admin/Skills';
import Projects from './pages/admin/Projects';
import Experience from './pages/admin/Experience';
import Services from './pages/admin/Services';
import Blogs from './pages/admin/Blogs';
import Testimonials from './pages/admin/Testimonials';
import Social from './pages/admin/Social';
import Settings from './pages/admin/Settings';
import Media from './pages/admin/Media';
import Messages from './pages/admin/Messages';
import Home from './pages/public/Home';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
      {/* Global Toast Notifications Configured here */}
      <Toaster position="top-right" />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        
        {/* Admin Authentication */}
        <Route path="/admin/login" element={<Login />} />
        
        {/* Protected Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="about" element={<About />} />
          <Route path="skills" element={<Skills />} />
          <Route path="projects" element={<Projects />} />
          <Route path="experience" element={<Experience />} />
          <Route path="services" element={<Services />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="social" element={<Social />} />
          <Route path="settings" element={<Settings />} />
          <Route path="media" element={<Media />} />
          <Route path="messages" element={<Messages />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
