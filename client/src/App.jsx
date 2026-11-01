import React, { useState, useEffect } from 'react';
import HeaderNav from './components/HeaderNav';
import HeroSection from './components/HeroSection';
import ProjectSection from './components/ProjectSection';
import ResidencesSection from './components/ResidencesSection';
import AmenitiesSection from './components/AmenitiesSection';
import ConnectivitySection from './components/ConnectivitySection';
import ExperienceVideoSection from './components/ExperienceVideoSection';
import GallerySection from './components/GallerySection';
import DeveloperSection from './components/DeveloperSection';
import SwastikGroupSection from './components/SwastikGroupSection';
import Footer from './components/Footer';

import InquiryModal from './components/InquiryModal';
import SiteTourModal from './components/SiteTourModal';
import BrochureModal from './components/BrochureModal';

import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import { apiUrl } from './utils/api';

export default function App() {
  const [viewMode, setViewMode] = useState('landing'); // 'landing' | 'admin-login' | 'admin-dashboard'
  const [currentUser, setCurrentUser] = useState(null);

  // Modals
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [enquirySource, setEnquirySource] = useState('Hero Primary CTA');
  const [siteTourOpen, setSiteTourOpen] = useState(false);
  const [brochureOpen, setBrochureOpen] = useState(false);

  // Dynamic CMS Content State
  const [cmsData, setCmsData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchCmsContent = async () => {
    try {
      const res = await fetch(apiUrl('/api/content/all'));
      const json = await res.json();
      if (json.success && json.data) {
        setCmsData(json.data);
      }
    } catch (err) {
      console.warn('Backend content fetch error, using built-in defaults:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const checkRoute = () => {
    const token = localStorage.getItem('codename_token');
    const path = window.location.pathname;
    const hash = window.location.hash;

    if (path.startsWith('/admin') || hash === '#admin') {
      if (token) {
        setViewMode('admin-dashboard');
      } else {
        setViewMode('admin-login');
      }
    } else {
      setViewMode('landing');
    }
  };

  useEffect(() => {
    fetchCmsContent();

    // Check if user session exists
    const token = localStorage.getItem('codename_token');
    const storedUser = localStorage.getItem('codename_user');
    if (token && storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (e) {}
    }

    // Initial route check (/ vs /admin)
    checkRoute();

    // Handle browser back and forward button clicks
    const handlePopState = () => {
      checkRoute();
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleOpenEnquiry = (source = 'Hero CTA') => {
    setEnquirySource(source);
    setEnquiryOpen(true);
  };

  const handleOpenSiteTour = (source = 'Signature Card') => {
    setSiteTourOpen(true);
  };

  const handleOpenBrochure = () => {
    setBrochureOpen(true);
  };

  const navigateTo = (mode, urlPath) => {
    setViewMode(mode);
    if (typeof window !== 'undefined' && window.location.pathname !== urlPath) {
      window.history.pushState({ mode }, '', urlPath);
    }
  };

  const handleAdminClick = () => {
    const token = localStorage.getItem('codename_token');
    const targetMode = token ? 'admin-dashboard' : 'admin-login';
    navigateTo(targetMode, '/admin');
  };

  const handleBackToLiveSite = () => {
    navigateTo('landing', '/');
  };

  const handleLoginSuccess = (user, token) => {
    setCurrentUser(user);
    navigateTo('admin-dashboard', '/admin');
  };

  const handleLogout = () => {
    localStorage.removeItem('codename_token');
    localStorage.removeItem('codename_user');
    setCurrentUser(null);
    navigateTo('landing', '/');
  };

  // If in Admin Login View
  if (viewMode === 'admin-login') {
    return (
      <AdminLogin
        onLoginSuccess={handleLoginSuccess}
        onBackToSite={handleBackToLiveSite}
      />
    );
  }

  // If in Admin Dashboard View
  if (viewMode === 'admin-dashboard') {
    return (
      <AdminDashboard
        user={currentUser}
        onLogout={handleLogout}
        onViewLiveSite={handleBackToLiveSite}
        onContentUpdated={fetchCmsContent}
      />
    );
  }

  // Public Landing Page
  return (
    <div className="min-h-screen bg-[#07090C] text-neutral-100 font-sans selection:bg-gold-400 selection:text-black">
      {/* Floating Header Navigation */}
      <HeaderNav
        navigationData={cmsData.navigation}
        onOpenEnquiry={handleOpenEnquiry}
        onOpenBrochure={handleOpenBrochure}
        onAdminClick={handleAdminClick}
      />

      <main>
        {/* Hero Section (Recreated exactly as in supplied design) */}
        <HeroSection
          heroData={cmsData.hero}
          highlightsData={cmsData.highlights}
          onOpenEnquiry={handleOpenEnquiry}
          onOpenSiteTour={handleOpenSiteTour}
          onExploreResidences={() => {
            const el = document.getElementById('residences');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* The Project Overview */}
        <ProjectSection
          projectData={cmsData.project}
          onOpenEnquiry={handleOpenEnquiry}
          onOpenBrochure={handleOpenBrochure}
        />

        {/* Bespoke 3 & 4 BHK Residences */}
        <ResidencesSection
          residencesData={cmsData.residences}
          onOpenEnquiry={handleOpenEnquiry}
        />

        {/* 25K Sq.Ft Sky Clubhouse & Amenities */}
        <AmenitiesSection
          amenitiesData={cmsData.amenities}
          onOpenEnquiry={handleOpenEnquiry}
        />

        {/* Strategic Connectivity Advantage */}
        <ConnectivitySection
          connectivityData={cmsData.connectivity}
          onOpenEnquiry={handleOpenEnquiry}
        />

        {/* Experience One Chembur Video Walkthrough */}
        <ExperienceVideoSection
          experienceData={cmsData.experience}
          onOpenEnquiry={handleOpenEnquiry}
        />

        {/* Curated Visual Gallery with Lightbox */}
        <GallerySection
          galleryData={cmsData.gallery}
        />

        {/* Developer Legacy & MahaRERA Registration */}
        <DeveloperSection
          developerData={cmsData.developer}
          onOpenEnquiry={handleOpenEnquiry}
        />

        {/* Swastik Group & Key Project Consultants */}
        <SwastikGroupSection
          swastikData={cmsData.swastik}
          onOpenEnquiry={handleOpenEnquiry}
        />
      </main>

      {/* Luxury Footer with Sunset Banner */}
      <Footer
        onAdminClick={handleAdminClick}
        onOpenEnquiry={handleOpenEnquiry}
        onOpenBrochure={handleOpenBrochure}
        onOpenSiteTour={handleOpenSiteTour}
      />

      {/* Modals */}
      <InquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        defaultSource={enquirySource}
      />

      <SiteTourModal
        isOpen={siteTourOpen}
        onClose={() => setSiteTourOpen(false)}
      />

      <BrochureModal
        isOpen={brochureOpen}
        onClose={() => setBrochureOpen(false)}
      />
    </div>
  );
}
