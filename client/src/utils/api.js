// Centralized API configuration & fallback store
export const getApiBase = () => {
  // If explicitly configured in env
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  // When running locally in browser (port 5173 or other), connect directly to backend port 5001
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    return 'http://localhost:5001';
  }
  return '';
};

export const API_BASE = getApiBase();

export const apiUrl = (endpoint) => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_BASE}${cleanEndpoint}`;
};

// Local storage backup for zero-drop lead capture
const LOCAL_INQ_KEY = 'codename_captured_inquiries';

export const getLocalInquiries = () => {
  try {
    const raw = localStorage.getItem(LOCAL_INQ_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};

export const saveLocalInquiry = (inquiry) => {
  try {
    const list = getLocalInquiries();
    const newRecord = {
      _id: inquiry._id || 'inq_loc_' + Date.now() + Math.random().toString(36).substring(2, 6),
      name: inquiry.name,
      email: inquiry.email,
      phone: inquiry.phone,
      bhkPreference: inquiry.bhkPreference || '3 & 4 BHK',
      budget: inquiry.budget || 'On Request',
      source: inquiry.source || 'Hero Primary CTA',
      message: inquiry.message || '',
      siteTourDate: inquiry.siteTourDate || null,
      status: inquiry.status || 'new',
      createdAt: inquiry.createdAt || new Date().toISOString(),
    };
    list.unshift(newRecord);
    localStorage.setItem(LOCAL_INQ_KEY, JSON.stringify(list));
    return newRecord;
  } catch (e) {
    console.error('Failed saving local inquiry backup:', e);
    return inquiry;
  }
};

export const updateLocalInquiryStatus = (id, newStatus) => {
  try {
    const list = getLocalInquiries();
    const updated = list.map(item => item._id === id ? { ...item, status: newStatus } : item);
    localStorage.setItem(LOCAL_INQ_KEY, JSON.stringify(updated));
  } catch (e) {}
};

export const deleteLocalInquiry = (id) => {
  try {
    const list = getLocalInquiries().filter(item => item._id !== id);
    localStorage.setItem(LOCAL_INQ_KEY, JSON.stringify(list));
  } catch (e) {}
};
