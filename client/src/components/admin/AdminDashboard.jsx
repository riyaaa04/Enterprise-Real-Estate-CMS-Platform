import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  FileEdit,
  Inbox,
  Globe,
  History,
  LogOut,
  Eye,
  Save,
  Send,
  Trash2,
  DownloadCloud,
  CheckCircle2,
  Clock,
  Sparkles,
  Search,
  Filter,
  RefreshCw,
  Plus,
  AlertCircle
} from 'lucide-react';
import { apiUrl, getLocalInquiries, updateLocalInquiryStatus, deleteLocalInquiry } from '../../utils/api';

export default function AdminDashboard({ user, onLogout, onViewLiveSite, onContentUpdated }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [sections, setSections] = useState([]);
  const [selectedSectionKey, setSelectedSectionKey] = useState('hero');
  const [editingData, setEditingData] = useState(null);
  const [isDraft, setIsDraft] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ text: '', type: '' });

  // Inquiries State
  const [inquiries, setInquiries] = useState([]);
  const [inquirySearch, setInquirySearch] = useState('');
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState('all');
  const [inquiriesLoading, setInquiriesLoading] = useState(false);

  // Activity Logs State
  const [activityLogs, setActivityLogs] = useState([]);

  // SEO State
  const [seoData, setSeoData] = useState({
    title: '',
    description: '',
    keywords: '',
    ogImage: '',
  });

  const [loading, setLoading] = useState(false);

  // Fetch sections list
  const fetchSections = async () => {
    try {
      const res = await fetch(apiUrl('/api/content/all?drafts=true'));
      const data = await res.json();
      if (data.success && data.sections) {
        setSections(data.sections);
        const current = data.sections.find(s => s.key === selectedSectionKey) || data.sections[0];
        if (current) {
          setSelectedSectionKey(current.key);
          setEditingData(current.data || current.publishedData || {});
          setIsDraft(current.status === 'draft');
        }
      }
    } catch (err) {
      console.error('Error fetching sections:', err);
    }
  };

  // Fetch Inquiries (Merging Server Database + Local Backup)
  const fetchInquiries = async () => {
    setInquiriesLoading(true);
    try {
      const token = localStorage.getItem('codename_token') || 'demo-jwt-token-local';
      let serverFetched = false;
      let serverItems = [];

      try {
        const res = await fetch(apiUrl(`/api/inquiries?search=${encodeURIComponent(inquirySearch)}&status=${inquiryStatusFilter}`), {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success && Array.isArray(data.items)) {
          serverItems = data.items;
          serverFetched = true;
        }
      } catch (networkErr) {
        console.warn('Backend inquiries fetch error, using local fallback:', networkErr);
      }

      if (serverFetched) {
        // When server is healthy, server database (MongoDB) is the single source of truth
        setInquiries(serverItems);
        // Wipe old local browser cache so deletions in MongoDB Compass reflect instantly
        localStorage.removeItem('codename_captured_inquiries');
      } else {
        // Only fallback to local browser cache if server was unreachable
        const localItems = getLocalInquiries();
        let filteredLocal = localItems;
        if (inquiryStatusFilter && inquiryStatusFilter !== 'all') {
          filteredLocal = filteredLocal.filter(i => (i.status || 'new') === inquiryStatusFilter);
        }
        if (inquirySearch) {
          const q = inquirySearch.toLowerCase();
          filteredLocal = filteredLocal.filter(i =>
            (i.name && i.name.toLowerCase().includes(q)) ||
            (i.email && i.email.toLowerCase().includes(q)) ||
            (i.phone && i.phone.includes(q))
          );
        }
        setInquiries(filteredLocal);
      }
    } catch (err) {
      console.error('Error in inquiries handler:', err);
      setInquiries([]);
    } finally {
      setInquiriesLoading(false);
    }
  };

  // Fetch Activity Logs
  const fetchActivityLogs = async () => {
    try {
      const token = localStorage.getItem('codename_token') || 'demo-jwt-token-local';
      const res = await fetch(apiUrl('/api/activity-logs'), {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success && data.logs) {
        setActivityLogs(data.logs);
      }
    } catch (err) {
      console.error('Error fetching logs:', err);
    }
  };

  // Fetch SEO
  const fetchSEO = async () => {
    try {
      const res = await fetch(apiUrl('/api/seo'));
      const data = await res.json();
      if (data.success && data.seo) {
        setSeoData(data.seo);
      }
    } catch (err) {
      console.error('Error fetching SEO:', err);
    }
  };

  useEffect(() => {
    fetchSections();
    fetchInquiries();
    fetchActivityLogs();
    fetchSEO();
  }, []);

  useEffect(() => {
    if (activeTab === 'inquiries') {
      fetchInquiries();
    } else if (activeTab === 'activity') {
      fetchActivityLogs();
    }
  }, [activeTab, inquiryStatusFilter, inquirySearch]);

  const selectSection = (key) => {
    setSelectedSectionKey(key);
    const sec = sections.find(s => s.key === key);
    if (sec) {
      setEditingData(sec.data || sec.publishedData || {});
      setIsDraft(sec.status === 'draft');
    }
    setStatusMessage({ text: '', type: '' });
  };

  const handleSaveSection = async (saveAsDraft = false) => {
    setLoading(true);
    setStatusMessage({ text: '', type: '' });
    try {
      const token = localStorage.getItem('codename_token') || 'demo-jwt-token-local';
      const res = await fetch(apiUrl(`/api/content/${selectedSectionKey}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          data: editingData,
          saveAsDraft
        })
      });
      const result = await res.json();
      if (result.success) {
        setStatusMessage({
          text: saveAsDraft ? 'Draft saved successfully!' : 'Published live immediately!',
          type: 'success'
        });
        setIsDraft(saveAsDraft);
        fetchSections();
        if (onContentUpdated) onContentUpdated();
      } else {
        setStatusMessage({ text: result.message || 'Save error', type: 'error' });
      }
    } catch (err) {
      setStatusMessage({ text: 'Error saving section', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handlePublishDraft = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('codename_token') || 'demo-jwt-token-local';
      const res = await fetch(apiUrl(`/api/content/${selectedSectionKey}/publish`), {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      const result = await res.json();
      if (result.success) {
        setStatusMessage({ text: 'Draft published live!', type: 'success' });
        setIsDraft(false);
        fetchSections();
        if (onContentUpdated) onContentUpdated();
      }
    } catch (err) {
      setStatusMessage({ text: 'Publish failed', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateInquiryStatus = async (id, status) => {
    // 1. Optimistically update local UI state immediately
    setInquiries(prev => prev.map(inq => inq._id === id ? { ...inq, status } : inq));
    updateLocalInquiryStatus(id, status);

    try {
      const token = localStorage.getItem('codename_token') || 'demo-jwt-token-local';
      await fetch(apiUrl(`/api/inquiries/${id}/status`), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
    } catch (err) {
      console.warn('Inquiry status updated locally (server update pending):', err);
    }
  };

  const handleDeleteInquiry = async (id) => {
    if (!confirm('Are you sure you want to permanently delete this inquiry?')) return;
    
    // 1. Optimistically remove from state & local storage
    setInquiries(prev => prev.filter(inq => inq._id !== id));
    deleteLocalInquiry(id);

    try {
      const token = localStorage.getItem('codename_token') || 'demo-jwt-token-local';
      await fetch(apiUrl(`/api/inquiries/${id}`), {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err) {
      console.warn('Inquiry deleted locally (server delete pending):', err);
    }
  };

  const handleSaveSEO = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('codename_token') || 'demo-jwt-token-local';
      const res = await fetch(apiUrl('/api/seo'), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(seoData)
      });
      const data = await res.json();
      if (data.success) {
        alert('SEO Metadata successfully updated!');
      }
    } catch (err) {
      alert('Error updating SEO');
    } finally {
      setLoading(false);
    }
  };

  const exportCSV = () => {
    const token = localStorage.getItem('codename_token') || 'demo-jwt-token-local';
    window.open(apiUrl(`/api/inquiries/export?token=${token}`), '_blank');
  };

  return (
    <div className="min-h-screen bg-[#07090C] text-neutral-100 flex flex-col">
      {/* Top Admin Navigation Header */}
      <header className="bg-[#0C1017] border-b border-neutral-800 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg border border-gold-400 bg-[#161D29] flex items-center justify-center">
            <span className="font-serif italic font-bold text-lg text-gold-300">I</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-base text-white tracking-wide">CODENAME ONE</span>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold tracking-widest uppercase bg-gold-400/20 text-gold-300 border border-gold-400/30">
                CMS CONTROL
              </span>
            </div>
            <span className="text-[10px] text-neutral-400">Production Real Estate Content & Inquiry Platform</span>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onViewLiveSite}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider text-neutral-200 bg-[#151D28] hover:bg-[#1E2938] border border-neutral-700 hover:border-gold-400 transition-all cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-gold-400" />
            <span>View Live Site</span>
          </button>

          <button
            onClick={onLogout}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider text-red-300 bg-red-950/40 hover:bg-red-900/50 border border-red-800/50 transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Admin Content Layout */}
      <div className="flex-1 flex flex-col md:flex-row">
        
        {/* Left Sidebar */}
        <aside className="w-full md:w-64 bg-[#090D13] border-r border-neutral-800 p-4 flex flex-col justify-between">
          <div className="space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium tracking-wider uppercase transition-colors cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-gold-gradient text-neutral-950 font-bold shadow-gold-glow'
                  : 'text-neutral-300 hover:text-white hover:bg-[#121822]'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('sections')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium tracking-wider uppercase transition-colors cursor-pointer ${
                activeTab === 'sections'
                  ? 'bg-gold-gradient text-neutral-950 font-bold shadow-gold-glow'
                  : 'text-neutral-300 hover:text-white hover:bg-[#121822]'
              }`}
            >
              <FileEdit className="w-4 h-4" />
              <span>CMS Sections</span>
            </button>

            <button
              onClick={() => setActiveTab('inquiries')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium tracking-wider uppercase transition-colors cursor-pointer ${
                activeTab === 'inquiries'
                  ? 'bg-gold-gradient text-neutral-950 font-bold shadow-gold-glow'
                  : 'text-neutral-300 hover:text-white hover:bg-[#121822]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Inbox className="w-4 h-4" />
                <span>Inquiries</span>
              </div>
              {inquiries.length > 0 && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  activeTab === 'inquiries' ? 'bg-black text-gold-300' : 'bg-gold-400 text-black'
                }`}>
                  {inquiries.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('seo')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium tracking-wider uppercase transition-colors cursor-pointer ${
                activeTab === 'seo'
                  ? 'bg-gold-gradient text-neutral-950 font-bold shadow-gold-glow'
                  : 'text-neutral-300 hover:text-white hover:bg-[#121822]'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>SEO Metadata</span>
            </button>

            <button
              onClick={() => setActiveTab('activity')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium tracking-wider uppercase transition-colors cursor-pointer ${
                activeTab === 'activity'
                  ? 'bg-gold-gradient text-neutral-950 font-bold shadow-gold-glow'
                  : 'text-neutral-300 hover:text-white hover:bg-[#121822]'
              }`}
            >
              <History className="w-4 h-4" />
              <span>Activity Logs</span>
            </button>
          </div>

          {/* User Card */}
          <div className="p-3.5 rounded-xl bg-[#101520] border border-neutral-800 text-xs">
            <span className="text-[10px] font-semibold tracking-wider text-gold-400 uppercase block">Active Administrator</span>
            <p className="text-white font-medium truncate mt-0.5">{user?.name || 'Executive Director'}</p>
            <p className="text-[11px] text-neutral-400 truncate">{user?.email || 'admin@codenameone.com'}</p>
          </div>
        </aside>

        {/* Content Body Area */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8 max-w-6xl">
              <div>
                <h1 className="font-serif text-3xl text-white font-medium">Platform Command Overview</h1>
                <p className="text-neutral-400 text-sm mt-1">Live status, section publication states & buyer conversion inquiries.</p>
              </div>

              {/* 4 Stat Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="p-6 rounded-2xl bg-[#0F141F] border border-neutral-800 shadow-md">
                  <span className="text-xs font-medium tracking-wider text-neutral-400 uppercase">Total Inquiries</span>
                  <div className="flex items-baseline justify-between mt-2">
                    <span className="font-serif text-3xl font-bold text-white">{inquiries.length}</span>
                    <span className="text-xs text-gold-400 font-semibold bg-gold-400/10 px-2 py-0.5 rounded-full">High Intent</span>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-[#0F141F] border border-neutral-800 shadow-md">
                  <span className="text-xs font-medium tracking-wider text-neutral-400 uppercase">CMS Managed Sections</span>
                  <div className="flex items-baseline justify-between mt-2">
                    <span className="font-serif text-3xl font-bold text-white">{sections.length || 8}</span>
                    <span className="text-xs text-emerald-400 font-semibold bg-emerald-400/10 px-2 py-0.5 rounded-full">100% Dynamic</span>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-[#0F141F] border border-neutral-800 shadow-md">
                  <span className="text-xs font-medium tracking-wider text-neutral-400 uppercase">Site Status</span>
                  <div className="flex items-baseline justify-between mt-2">
                    <span className="font-serif text-2xl font-bold text-emerald-400">Live</span>
                    <span className="text-xs text-neutral-400">Vite + React</span>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-[#0F141F] border border-neutral-800 shadow-md">
                  <span className="text-xs font-medium tracking-wider text-neutral-400 uppercase">Database Architecture</span>
                  <div className="flex items-baseline justify-between mt-2">
                    <span className="font-serif text-2xl font-bold text-gold-300">Dual-Engine</span>
                    <span className="text-[10px] text-neutral-400">Mongo + JSON</span>
                  </div>
                </div>
              </div>

              {/* Quick Jump Buttons */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-[#121824] via-[#0F141F] to-[#121824] border border-gold-400/30 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif text-xl text-white font-medium">Quick Content Actions</h3>
                  <p className="text-neutral-400 text-xs sm:text-sm mt-0.5">Edit hero title, badge, signature address card, or review latest leads.</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => { setActiveTab('sections'); selectSection('hero'); }}
                    className="px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-gold-gradient text-neutral-950 hover:shadow-gold-glow cursor-pointer"
                  >
                    Edit Hero Section
                  </button>
                  <button
                    onClick={() => setActiveTab('inquiries')}
                    className="px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#18202D] text-white hover:border-gold-400 border border-neutral-700 cursor-pointer"
                  >
                    Manage Inquiries
                  </button>
                </div>
              </div>

              {/* Recent Inquiries Preview Table */}
              <div className="p-6 rounded-2xl bg-[#0D121B] border border-neutral-800">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif text-xl text-white font-medium">Recent Buyer Inquiries</h3>
                  <button
                    onClick={() => setActiveTab('inquiries')}
                    className="text-xs text-gold-400 hover:underline uppercase tracking-wider"
                  >
                    View All &gt;
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#121824] text-neutral-400 uppercase tracking-wider">
                      <tr>
                        <th className="p-3">Buyer Name</th>
                        <th className="p-3">Phone</th>
                        <th className="p-3">Preference</th>
                        <th className="p-3">Source</th>
                        <th className="p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800">
                      {inquiries.slice(0, 4).map((inq, idx) => (
                        <tr key={idx} className="hover:bg-[#121722]">
                          <td className="p-3 font-medium text-white">{inq.name}</td>
                          <td className="p-3 text-neutral-300">{inq.phone}</td>
                          <td className="p-3 text-neutral-300">{inq.bhkPreference || '3 & 4 BHK'}</td>
                          <td className="p-3 text-neutral-400">{inq.source}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded-full text-[10px] uppercase font-semibold bg-gold-400/20 text-gold-300">
                              {inq.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: CMS SECTIONS */}
          {activeTab === 'sections' && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="font-serif text-3xl text-white font-medium">Manage CMS Sections</h1>
                  <p className="text-neutral-400 text-sm mt-1">Every title, badge, metric and text on the landing page is editable here.</p>
                </div>

                {/* Section Selector Dropdown & Draft Badge */}
                <div className="flex items-center gap-3">
                  {isDraft && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      Draft Changes Staged
                    </span>
                  )}
                  <select
                    value={selectedSectionKey}
                    onChange={(e) => selectSection(e.target.value)}
                    className="px-4 py-2 rounded-xl bg-[#151D28] border border-neutral-700 text-white text-xs font-semibold uppercase tracking-wider focus:outline-none focus:border-gold-400"
                  >
                    <option value="hero">Hero Section (Image Design)</option>
                    <option value="highlights">Signature Address Glass Card</option>
                    <option value="navigation">Navigation Header</option>
                    <option value="project">The Project Overview</option>
                    <option value="residences">3 & 4 BHK Residences</option>
                    <option value="amenities">Sky Clubhouse & Amenities</option>
                    <option value="connectivity">Connectivity & Transit</option>
                    <option value="developer">Developer & RERA</option>
                  </select>
                </div>
              </div>

              {/* Status Alert Notification */}
              {statusMessage.text && (
                <div className={`p-4 rounded-xl text-xs flex items-center justify-between ${
                  statusMessage.type === 'success'
                    ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-200'
                    : 'bg-red-950/60 border border-red-500/40 text-red-200'
                }`}>
                  <span>{statusMessage.text}</span>
                  <button onClick={() => setStatusMessage({ text: '', type: '' })}>✕</button>
                </div>
              )}

              {/* Dynamic Field Form Editor Based on Selected Section */}
              <div className="p-6 sm:p-8 rounded-2xl bg-[#0F141F] border border-neutral-800 space-y-6 shadow-xl">
                
                {/* HERO EDITOR */}
                {selectedSectionKey === 'hero' && editingData && (
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] font-semibold tracking-wider text-neutral-300 uppercase block mb-1">
                          Location Pill Badge
                        </label>
                        <input
                          type="text"
                          value={editingData.tagBadge || ''}
                          onChange={(e) => setEditingData({ ...editingData, tagBadge: e.target.value })}
                          className="w-full px-4 py-2 rounded-xl bg-[#151C28] border border-neutral-700 text-white text-sm focus:border-gold-400"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold tracking-wider text-neutral-300 uppercase block mb-1">
                          Subtitle (with Gold Dash)
                        </label>
                        <input
                          type="text"
                          value={editingData.subtitle || ''}
                          onChange={(e) => setEditingData({ ...editingData, subtitle: e.target.value })}
                          className="w-full px-4 py-2 rounded-xl bg-[#151C28] border border-neutral-700 text-white text-sm focus:border-gold-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] font-semibold tracking-wider text-neutral-300 uppercase block mb-1">
                          Huge Main Title (Serif)
                        </label>
                        <input
                          type="text"
                          value={editingData.mainTitle || ''}
                          onChange={(e) => setEditingData({ ...editingData, mainTitle: e.target.value })}
                          className="w-full px-4 py-2 rounded-xl bg-[#151C28] border border-neutral-700 text-white text-sm focus:border-gold-400 font-serif text-lg"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold tracking-wider text-neutral-300 uppercase block mb-1">
                          Location Track Under Title
                        </label>
                        <input
                          type="text"
                          value={editingData.locationTrack || ''}
                          onChange={(e) => setEditingData({ ...editingData, locationTrack: e.target.value })}
                          className="w-full px-4 py-2 rounded-xl bg-[#151C28] border border-neutral-700 text-white text-sm focus:border-gold-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold tracking-wider text-neutral-300 uppercase block mb-1">
                        Italic Serif Tagline
                      </label>
                      <input
                        type="text"
                        value={editingData.tagline || ''}
                        onChange={(e) => setEditingData({ ...editingData, tagline: e.target.value })}
                        className="w-full px-4 py-2 rounded-xl bg-[#151C28] border border-neutral-700 text-white text-sm focus:border-gold-400 font-serif italic text-base"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold tracking-wider text-neutral-300 uppercase block mb-1">
                        Body Description Paragraph
                      </label>
                      <textarea
                        rows="3"
                        value={editingData.description || ''}
                        onChange={(e) => setEditingData({ ...editingData, description: e.target.value })}
                        className="w-full px-4 py-2 rounded-xl bg-[#151C28] border border-neutral-700 text-white text-sm focus:border-gold-400 resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] font-semibold tracking-wider text-neutral-300 uppercase block mb-1">
                          Primary CTA Label
                        </label>
                        <input
                          type="text"
                          value={editingData.primaryCtaText || ''}
                          onChange={(e) => setEditingData({ ...editingData, primaryCtaText: e.target.value })}
                          className="w-full px-4 py-2 rounded-xl bg-[#151C28] border border-neutral-700 text-white text-sm focus:border-gold-400"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold tracking-wider text-neutral-300 uppercase block mb-1">
                          Secondary CTA Label
                        </label>
                        <input
                          type="text"
                          value={editingData.secondaryCtaText || ''}
                          onChange={(e) => setEditingData({ ...editingData, secondaryCtaText: e.target.value })}
                          className="w-full px-4 py-2 rounded-xl bg-[#151C28] border border-neutral-700 text-white text-sm focus:border-gold-400"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* HIGHLIGHTS CARD EDITOR */}
                {selectedSectionKey === 'highlights' && editingData && (
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] font-semibold tracking-wider text-neutral-300 uppercase block mb-1">
                          Header Title
                        </label>
                        <input
                          type="text"
                          value={editingData.headerTitle || ''}
                          onChange={(e) => setEditingData({ ...editingData, headerTitle: e.target.value })}
                          className="w-full px-4 py-2 rounded-xl bg-[#151C28] border border-neutral-700 text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold tracking-wider text-neutral-300 uppercase block mb-1">
                          Address Text
                        </label>
                        <input
                          type="text"
                          value={editingData.address || ''}
                          onChange={(e) => setEditingData({ ...editingData, address: e.target.value })}
                          className="w-full px-4 py-2 rounded-xl bg-[#151C28] border border-neutral-700 text-white text-sm"
                        />
                      </div>
                    </div>

                    <div className="pt-2">
                      <span className="text-xs font-semibold tracking-wider text-gold-400 uppercase block mb-3">
                        2x2 Key Highlight Metrics
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {editingData.stats?.map((st, i) => (
                          <div key={i} className="p-4 rounded-xl bg-[#151D28] border border-neutral-700 space-y-2">
                            <span className="text-[10px] text-gold-400 font-bold uppercase">Metric #{i + 1}</span>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                placeholder="Value (e.g. 40+)"
                                value={st.value}
                                onChange={(e) => {
                                  const copy = [...editingData.stats];
                                  copy[i].value = e.target.value;
                                  setEditingData({ ...editingData, stats: copy });
                                }}
                                className="w-1/2 px-3 py-1.5 rounded-lg bg-[#0F141F] border border-neutral-700 text-white text-sm font-serif font-bold"
                              />
                              <input
                                type="text"
                                placeholder="Unit (e.g. SQ.FT)"
                                value={st.unit || ''}
                                onChange={(e) => {
                                  const copy = [...editingData.stats];
                                  copy[i].unit = e.target.value;
                                  setEditingData({ ...editingData, stats: copy });
                                }}
                                className="w-1/2 px-3 py-1.5 rounded-lg bg-[#0F141F] border border-neutral-700 text-white text-xs"
                              />
                            </div>
                            <input
                              type="text"
                              placeholder="Label (e.g. STOREYS ICONIC TOWER)"
                              value={st.label}
                              onChange={(e) => {
                                const copy = [...editingData.stats];
                                copy[i].label = e.target.value;
                                setEditingData({ ...editingData, stats: copy });
                              }}
                              className="w-full px-3 py-1.5 rounded-lg bg-[#0F141F] border border-neutral-700 text-white text-xs"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div>
                        <label className="text-[11px] font-semibold tracking-wider text-neutral-300 uppercase block mb-1">
                          Card Footer Prompt
                        </label>
                        <input
                          type="text"
                          value={editingData.footerLabel || ''}
                          onChange={(e) => setEditingData({ ...editingData, footerLabel: e.target.value })}
                          className="w-full px-4 py-2 rounded-xl bg-[#151C28] border border-neutral-700 text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold tracking-wider text-neutral-300 uppercase block mb-1">
                          Action Button Text
                        </label>
                        <input
                          type="text"
                          value={editingData.actionText || ''}
                          onChange={(e) => setEditingData({ ...editingData, actionText: e.target.value })}
                          className="w-full px-4 py-2 rounded-xl bg-[#151C28] border border-neutral-700 text-white text-sm"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* GENERIC JSON / FIELD FALLBACK FOR OTHER SECTIONS */}
                {selectedSectionKey !== 'hero' && selectedSectionKey !== 'highlights' && editingData && (
                  <div className="space-y-4">
                    <p className="text-xs text-neutral-400">
                      Edit structure parameters for section: <span className="text-gold-300 font-bold uppercase">{selectedSectionKey}</span>
                    </p>
                    <textarea
                      rows="14"
                      value={JSON.stringify(editingData, null, 2)}
                      onChange={(e) => {
                        try {
                          const parsed = JSON.parse(e.target.value);
                          setEditingData(parsed);
                        } catch (err) {
                          // Allow editing freely
                        }
                      }}
                      className="w-full font-mono text-xs p-4 rounded-xl bg-[#121824] border border-neutral-700 text-neutral-200 focus:outline-none focus:border-gold-400"
                    />
                  </div>
                )}

                {/* Draft / Publish Buttons Action Bar */}
                <div className="pt-6 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => handleSaveSection(true)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#18202D] text-amber-300 border border-amber-500/40 hover:bg-amber-950/30 transition-all cursor-pointer disabled:opacity-50"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save as Draft</span>
                    </button>

                    {isDraft && (
                      <button
                        type="button"
                        disabled={loading}
                        onClick={handlePublishDraft}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase bg-emerald-600 text-white hover:bg-emerald-500 transition-all cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Publish Draft Live</span>
                      </button>
                    )}
                  </div>

                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => handleSaveSection(false)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase bg-gold-gradient text-neutral-950 hover:shadow-gold-glow transition-all cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{loading ? 'SAVING...' : 'PUBLISH LIVE IMMEDIATELY'}</span>
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: INQUIRIES */}
          {activeTab === 'inquiries' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="font-serif text-3xl text-white font-medium">Buyer Inquiry Management</h1>
                  <p className="text-neutral-400 text-sm mt-1">Review, filter, track status and export high-net-worth real estate leads.</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={exportCSV}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#161F2E] border border-neutral-700 hover:border-gold-400 text-neutral-200 transition-colors cursor-pointer"
                  >
                    <DownloadCloud className="w-4 h-4 text-gold-400" />
                    <span>Export CSV</span>
                  </button>
                  <button
                    onClick={fetchInquiries}
                    className="p-2 rounded-full bg-[#161F2E] border border-neutral-700 text-neutral-300 hover:text-white hover:border-gold-400"
                    title="Refresh"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Filters & Search Bar */}
              <div className="p-4 rounded-2xl bg-[#0F141F] border border-neutral-800 flex flex-wrap items-center justify-between gap-4">
                <div className="relative flex-1 min-w-[240px]">
                  <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by buyer name, phone, or email..."
                    value={inquirySearch}
                    onChange={(e) => setInquirySearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#151C28] border border-neutral-700 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-gold-400"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-neutral-400 uppercase tracking-wider">Status:</span>
                  {['all', 'new', 'contacted', 'scheduled', 'closed'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setInquiryStatusFilter(st)}
                      className={`px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase transition-colors cursor-pointer ${
                        inquiryStatusFilter === st
                          ? 'bg-gold-gradient text-neutral-950 font-bold'
                          : 'bg-[#151C28] text-neutral-300 hover:text-white border border-neutral-800'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Inquiries Table */}
              <div className="rounded-2xl bg-[#0F141F] border border-neutral-800 overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#121824] text-neutral-400 uppercase tracking-wider">
                      <tr>
                        <th className="p-4">Date</th>
                        <th className="p-4">Buyer Details</th>
                        <th className="p-4">Contact</th>
                        <th className="p-4">Preference / Tour</th>
                        <th className="p-4">Source</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800">
                      {inquiries.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="p-8 text-center text-neutral-400">
                            No inquiries found matching criteria.
                          </td>
                        </tr>
                      ) : (
                        inquiries.map((inq) => (
                          <tr key={inq._id || inq.id} className="hover:bg-[#121722] transition-colors">
                            <td className="p-4 text-neutral-400 whitespace-nowrap">
                              {new Date(inq.createdAt).toLocaleDateString()}
                            </td>
                            <td className="p-4">
                              <span className="font-semibold text-white block text-sm">{inq.name}</span>
                              {inq.message && (
                                <span className="text-[11px] text-neutral-400 block max-w-xs truncate mt-0.5">
                                  "{inq.message}"
                                </span>
                              )}
                            </td>
                            <td className="p-4 space-y-0.5">
                              <div className="text-gold-300 font-medium">{inq.phone}</div>
                              <div className="text-neutral-400 text-[11px]">{inq.email}</div>
                            </td>
                            <td className="p-4 space-y-0.5">
                              <span className="font-medium text-neutral-200 block">{inq.bhkPreference || '3 & 4 BHK'}</span>
                              {inq.siteTourDate && (
                                <span className="text-gold-400 text-[10px] bg-gold-400/10 px-2 py-0.5 rounded-full inline-block">
                                  Tour: {inq.siteTourDate}
                                </span>
                              )}
                            </td>
                            <td className="p-4 text-neutral-400">{inq.source}</td>
                            <td className="p-4">
                              <select
                                value={inq.status}
                                onChange={(e) => handleUpdateInquiryStatus(inq._id || inq.id, e.target.value)}
                                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border focus:outline-none ${
                                  inq.status === 'new'
                                    ? 'bg-amber-950/60 text-amber-300 border-amber-500/40'
                                    : inq.status === 'contacted'
                                    ? 'bg-blue-950/60 text-blue-300 border-blue-500/40'
                                    : inq.status === 'scheduled'
                                    ? 'bg-purple-950/60 text-purple-300 border-purple-500/40'
                                    : 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
                                }`}
                              >
                                <option value="new">NEW</option>
                                <option value="contacted">CONTACTED</option>
                                <option value="scheduled">SCHEDULED</option>
                                <option value="closed">CLOSED</option>
                              </select>
                            </td>
                            <td className="p-4 text-right">
                              <button
                                onClick={() => handleDeleteInquiry(inq._id || inq.id)}
                                className="p-1.5 rounded-lg text-neutral-400 hover:text-red-400 hover:bg-red-950/30 transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SEO METADATA */}
          {activeTab === 'seo' && (
            <div className="space-y-6 max-w-3xl">
              <div>
                <h1 className="font-serif text-3xl text-white font-medium">SEO & Meta Tags Manager</h1>
                <p className="text-neutral-400 text-sm mt-1">Configure search engine titles, open-graph cards, and social share metadata.</p>
              </div>

              <form onSubmit={handleSaveSEO} className="p-6 sm:p-8 rounded-2xl bg-[#0F141F] border border-neutral-800 space-y-5">
                <div>
                  <label className="text-[11px] font-semibold tracking-wider text-neutral-300 uppercase block mb-1">
                    Meta Page Title
                  </label>
                  <input
                    type="text"
                    value={seoData.title || ''}
                    onChange={(e) => setSeoData({ ...seoData, title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#151C28] border border-neutral-700 text-white text-sm focus:border-gold-400"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold tracking-wider text-neutral-300 uppercase block mb-1">
                    Meta Description
                  </label>
                  <textarea
                    rows="3"
                    value={seoData.description || ''}
                    onChange={(e) => setSeoData({ ...seoData, description: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#151C28] border border-neutral-700 text-white text-sm focus:border-gold-400 resize-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold tracking-wider text-neutral-300 uppercase block mb-1">
                    Keywords (comma separated)
                  </label>
                  <input
                    type="text"
                    value={seoData.keywords || ''}
                    onChange={(e) => setSeoData({ ...seoData, keywords: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#151C28] border border-neutral-700 text-white text-sm focus:border-gold-400"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold tracking-wider text-neutral-300 uppercase block mb-1">
                    Open Graph Social Share Image URL
                  </label>
                  <input
                    type="text"
                    value={seoData.ogImage || ''}
                    onChange={(e) => setSeoData({ ...seoData, ogImage: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#151C28] border border-neutral-700 text-white text-sm focus:border-gold-400"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3 rounded-full text-xs font-bold tracking-widest uppercase bg-gold-gradient text-neutral-950 hover:shadow-gold-glow transition-all cursor-pointer"
                  >
                    SAVE SEO METADATA
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 5: ACTIVITY LOGS */}
          {activeTab === 'activity' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h1 className="font-serif text-3xl text-white font-medium">Activity Audit Trail</h1>
                <p className="text-neutral-400 text-sm mt-1">Real-time record of all CMS section changes, publications, and lead activities.</p>
              </div>

              <div className="rounded-2xl bg-[#0F141F] border border-neutral-800 p-6 space-y-4 shadow-xl">
                {activityLogs.length === 0 ? (
                  <p className="text-center text-neutral-500 py-8 text-xs">No activity logs recorded yet.</p>
                ) : (
                  activityLogs.map((log, idx) => (
                    <div
                      key={log._id || idx}
                      className="p-3.5 rounded-xl bg-[#121824] border border-neutral-800 flex items-start justify-between gap-4 text-xs"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gold-400/10 border border-gold-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <History className="w-4 h-4 text-gold-400" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-white">{log.action}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300 uppercase">
                              {log.section}
                            </span>
                          </div>
                          <p className="text-neutral-400 text-[11px] mt-0.5">{log.details}</p>
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0 text-neutral-500 text-[10px]">
                        <div>{new Date(log.timestamp).toLocaleString()}</div>
                        <div className="text-neutral-400 mt-0.5">By: {log.user || 'Admin'}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
