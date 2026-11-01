import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { isConnectedToMongo } from '../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../../data');

const memoryStore = {
  sections: [],
  inquiries: [],
  activity_logs: [],
  users: []
};

try {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
} catch (e) {
  // Read-only filesystem in serverless environments
}

const getFilePath = (file) => path.join(DATA_DIR, `${file}.json`);

const readJson = (file, defaultVal = []) => {
  try {
    const p = getFilePath(file);
    if (!fs.existsSync(p)) {
      try {
        fs.writeFileSync(p, JSON.stringify(defaultVal, null, 2), 'utf-8');
      } catch (writeErr) {
        // Read-only filesystem (e.g. Vercel)
      }
      return memoryStore[file] && memoryStore[file].length > 0 ? memoryStore[file] : defaultVal;
    }
    const raw = fs.readFileSync(p, 'utf-8');
    const parsed = JSON.parse(raw);
    memoryStore[file] = parsed;
    return parsed;
  } catch (err) {
    if (memoryStore[file] && memoryStore[file].length > 0) {
      return memoryStore[file];
    }
    return defaultVal;
  }
};

const writeJson = (file, data) => {
  memoryStore[file] = data;
  try {
    const p = getFilePath(file);
    fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf-8');
  } catch (e) {
    // Graceful fallback for read-only environments (e.g., Vercel serverless)
  }
};

// ================= MONGOOSE SCHEMAS =================
const sectionSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  title: String,
  subtitle: String,
  status: { type: String, enum: ['published', 'draft'], default: 'published' },
  publishedData: { type: mongoose.Schema.Types.Mixed, default: {} },
  draftData: { type: mongoose.Schema.Types.Mixed, default: {} },
  updatedAt: { type: Date, default: Date.now },
  updatedBy: String
});

const inquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  bhkPreference: { type: String, default: '3 & 4 BHK' },
  budget: { type: String, default: 'On Request' },
  source: { type: String, default: 'Hero CTA' },
  message: { type: String, default: '' },
  siteTourDate: { type: String, default: null },
  status: { type: String, enum: ['new', 'contacted', 'scheduled', 'closed'], default: 'new' },
  createdAt: { type: Date, default: Date.now }
});

const activityLogSchema = new mongoose.Schema({
  action: { type: String, required: true },
  section: { type: String, required: true },
  details: { type: String, default: '' },
  user: { type: String, default: 'Admin' },
  ip: { type: String, default: '127.0.0.1' },
  timestamp: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' },
  createdAt: { type: Date, default: Date.now }
});

let SectionModel, InquiryModel, ActivityLogModel, UserModel;
try {
  SectionModel = mongoose.model('Section', sectionSchema);
  InquiryModel = mongoose.model('Inquiry', inquirySchema);
  ActivityLogModel = mongoose.model('ActivityLog', activityLogSchema);
  UserModel = mongoose.model('User', userSchema);
} catch (e) {
  SectionModel = mongoose.models.Section;
  InquiryModel = mongoose.models.Inquiry;
  ActivityLogModel = mongoose.models.ActivityLog;
  UserModel = mongoose.models.User;
}

// ================= STORAGE SERVICE API =================
export const StorageService = {
  // ---- SECTIONS (CMS) ----
  async getAllSections(includeDrafts = false) {
    if (isConnectedToMongo && mongoose.connection.readyState === 1) {
      try {
        const docs = await SectionModel.find().lean();
        if (docs && docs.length > 0) {
          return docs.map(d => ({
            key: d.key,
            title: d.title,
            subtitle: d.subtitle,
            status: d.status,
            updatedAt: d.updatedAt,
            data: includeDrafts ? (d.draftData || d.publishedData) : d.publishedData,
            draftData: d.draftData,
            publishedData: d.publishedData
          }));
        }
      } catch (err) {
        console.warn('Mongo getAllSections note:', err.message);
      }
    }
    const items = readJson('sections', []);
    return items.map(d => ({
      key: d.key,
      title: d.title,
      subtitle: d.subtitle,
      status: d.status,
      updatedAt: d.updatedAt,
      data: includeDrafts ? (d.draftData || d.publishedData) : d.publishedData,
      draftData: d.draftData,
      publishedData: d.publishedData
    }));
  },

  async getSectionByKey(key, includeDrafts = false) {
    if (isConnectedToMongo && mongoose.connection.readyState === 1) {
      try {
        const doc = await SectionModel.findOne({ key }).lean();
        if (doc) {
          return {
            key: doc.key,
            title: doc.title,
            subtitle: doc.subtitle,
            status: doc.status,
            updatedAt: doc.updatedAt,
            data: includeDrafts ? (doc.draftData || doc.publishedData) : doc.publishedData,
            draftData: doc.draftData,
            publishedData: doc.publishedData
          };
        }
      } catch (err) {
        console.warn('Mongo getSectionByKey note:', err.message);
      }
    }
    const items = readJson('sections', []);
    const item = items.find(s => s.key === key);
    if (!item) return null;
    return {
      key: item.key,
      title: item.title,
      subtitle: item.subtitle,
      status: item.status,
      updatedAt: item.updatedAt,
      data: includeDrafts ? (item.draftData || item.publishedData) : item.publishedData,
      draftData: item.draftData,
      publishedData: item.publishedData
    };
  },

  async saveSection(key, payload, saveAsDraft = false, user = 'admin') {
    const now = new Date();
    if (isConnectedToMongo && mongoose.connection.readyState === 1) {
      try {
        let doc = await SectionModel.findOne({ key });
        if (!doc) {
          doc = new SectionModel({
            key,
            title: payload.title || key,
            subtitle: payload.subtitle || '',
            status: saveAsDraft ? 'draft' : 'published',
            publishedData: saveAsDraft ? {} : (payload.data || payload),
            draftData: payload.data || payload,
            updatedAt: now,
            updatedBy: user
          });
        } else {
          doc.title = payload.title || doc.title;
          doc.subtitle = payload.subtitle || doc.subtitle;
          doc.updatedAt = now;
          doc.updatedBy = user;
          if (saveAsDraft) {
            doc.draftData = payload.data || payload;
            doc.status = 'draft';
          } else {
            doc.publishedData = payload.data || payload;
            doc.draftData = payload.data || payload;
            doc.status = 'published';
          }
        }
        await doc.save();
        await this.logActivity(saveAsDraft ? 'Draft Saved' : 'Section Published', key, `Updated section ${key}`, user);
        return doc;
      } catch (err) {
        console.warn('Mongo saveSection note:', err.message);
      }
    }
    const items = readJson('sections', []);
    let index = items.findIndex(s => s.key === key);
    let item = index >= 0 ? items[index] : null;

    if (!item) {
      item = {
        key,
        title: payload.title || key,
        subtitle: payload.subtitle || '',
        status: saveAsDraft ? 'draft' : 'published',
        publishedData: saveAsDraft ? {} : (payload.data || payload),
        draftData: payload.data || payload,
        updatedAt: now.toISOString(),
        updatedBy: user
      };
      items.push(item);
    } else {
      item.title = payload.title || item.title;
      item.subtitle = payload.subtitle || item.subtitle;
      item.updatedAt = now.toISOString();
      item.updatedBy = user;
      if (saveAsDraft) {
        item.draftData = payload.data || payload;
        item.status = 'draft';
      } else {
        item.publishedData = payload.data || payload;
        item.draftData = payload.data || payload;
        item.status = 'published';
      }
      items[index] = item;
    }
    writeJson('sections', items);
    await this.logActivity(saveAsDraft ? 'Draft Saved' : 'Section Published', key, `Updated section ${key}`, user);
    return item;
  },

  async publishSection(key, user = 'admin') {
    const now = new Date();
    if (isConnectedToMongo && mongoose.connection.readyState === 1) {
      try {
        const doc = await SectionModel.findOne({ key });
        if (doc) {
          doc.publishedData = doc.draftData || doc.publishedData;
          doc.status = 'published';
          doc.updatedAt = now;
          doc.updatedBy = user;
          await doc.save();
          await this.logActivity('Section Published', key, `Published draft changes to live site`, user);
          return doc;
        }
      } catch (err) {
        console.warn('Mongo publishSection note:', err.message);
      }
    }
    const items = readJson('sections', []);
    const index = items.findIndex(s => s.key === key);
    if (index === -1) return null;
    items[index].publishedData = items[index].draftData || items[index].publishedData;
    items[index].status = 'published';
    items[index].updatedAt = now.toISOString();
    items[index].updatedBy = user;
    writeJson('sections', items);
    await this.logActivity('Section Published', key, `Published draft changes to live site`, user);
    return items[index];
  },

  // ---- INQUIRIES ----
  async createInquiry(data) {
    const inquiryData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      bhkPreference: data.bhkPreference || '3 & 4 BHK',
      budget: data.budget || 'On Request',
      source: data.source || 'Website Hero CTA',
      message: data.message || '',
      siteTourDate: data.siteTourDate || null,
      status: 'new',
      createdAt: new Date()
    };

    if (isConnectedToMongo && mongoose.connection.readyState === 1) {
      try {
        const doc = new InquiryModel(inquiryData);
        await doc.save();
        await this.logActivity('Inquiry Received', 'Inquiries', `New inquiry from ${data.name} (${data.phone})`, 'System');
        return doc;
      } catch (err) {
        console.warn('Mongo createInquiry note:', err.message);
      }
    }
    const list = readJson('inquiries', []);
    const newRecord = {
      _id: 'inq_' + Date.now() + Math.random().toString(36).substring(2, 7),
      ...inquiryData,
      createdAt: inquiryData.createdAt.toISOString()
    };
    list.unshift(newRecord);
    writeJson('inquiries', list);
    await this.logActivity('Inquiry Received', 'Inquiries', `New inquiry from ${data.name} (${data.phone})`, 'System');
    return newRecord;
  },

  async getInquiries({ search = '', status = '', page = 1, limit = 50 } = {}) {
    if (isConnectedToMongo && mongoose.connection.readyState === 1) {
      try {
        const query = {};
        if (status && status !== 'all') query.status = status;
        if (search) {
          query.$or = [
            { name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
            { phone: { $regex: search, $options: 'i' } }
          ];
        }
        const total = await InquiryModel.countDocuments(query);
        const items = await InquiryModel.find(query)
          .sort({ createdAt: -1 })
          .skip((page - 1) * limit)
          .limit(Number(limit))
          .lean();
        return { total, items, page: Number(page), limit: Number(limit) };
      } catch (err) {
        console.warn('Mongo getInquiries note:', err.message);
      }
    }
    let list = readJson('inquiries', []);
    if (status && status !== 'all') {
      list = list.filter(item => item.status === status);
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(item =>
        item.name?.toLowerCase().includes(q) ||
        item.email?.toLowerCase().includes(q) ||
        item.phone?.includes(q)
      );
    }
    const total = list.length;
    const start = (page - 1) * limit;
    const items = list.slice(start, start + Number(limit));
    return { total, items, page: Number(page), limit: Number(limit) };
  },

  async updateInquiryStatus(id, status, user = 'admin') {
    if (isConnectedToMongo && mongoose.connection.readyState === 1) {
      try {
        const doc = await InquiryModel.findByIdAndUpdate(id, { status }, { new: true });
        if (doc) {
          await this.logActivity('Inquiry Updated', 'Inquiries', `Inquiry ${id} status changed to ${status}`, user);
          return doc;
        }
      } catch (err) {
        console.warn('Mongo updateInquiryStatus note:', err.message);
      }
    }
    const list = readJson('inquiries', []);
    const index = list.findIndex(i => i._id === id || i.id === id);
    if (index === -1) return null;
    list[index].status = status;
    writeJson('inquiries', list);
    await this.logActivity('Inquiry Updated', 'Inquiries', `Inquiry ${id} status changed to ${status}`, user);
    return list[index];
  },

  async deleteInquiry(id, user = 'admin') {
    if (isConnectedToMongo && mongoose.connection.readyState === 1) {
      try {
        const res = await InquiryModel.findByIdAndDelete(id);
        if (res) {
          await this.logActivity('Inquiry Deleted', 'Inquiries', `Inquiry ${id} removed`, user);
          return res;
        }
      } catch (err) {
        console.warn('Mongo deleteInquiry note:', err.message);
      }
    }
    let list = readJson('inquiries', []);
    const filtered = list.filter(i => i._id !== id && i.id !== id);
    writeJson('inquiries', filtered);
    await this.logActivity('Inquiry Deleted', 'Inquiries', `Inquiry ${id} removed`, user);
    return true;
  },

  // ---- ACTIVITY LOGS ----
  async logActivity(action, section, details = '', user = 'Admin', ip = '127.0.0.1') {
    try {
      const entry = {
        action,
        section,
        details,
        user,
        ip,
        timestamp: new Date()
      };
      if (isConnectedToMongo && mongoose.connection.readyState === 1) {
        try {
          const doc = new ActivityLogModel(entry);
          await doc.save();
          return;
        } catch (err) {
          console.warn('Mongo activity log note:', err.message);
        }
      }
      const list = readJson('activity_logs', []);
      list.unshift({
        _id: 'act_' + Date.now() + Math.random().toString(36).substring(2, 6),
        ...entry,
        timestamp: entry.timestamp.toISOString()
      });
      // keep last 200 logs
      writeJson('activity_logs', list.slice(0, 200));
    } catch (err) {
      console.warn('StorageService.logActivity non-fatal note:', err.message);
    }
  },

  async getActivityLogs(limit = 50) {
    if (isConnectedToMongo && mongoose.connection.readyState === 1) {
      try {
        return await ActivityLogModel.find().sort({ timestamp: -1 }).limit(Number(limit)).lean();
      } catch (e) {
        console.warn('Mongo getActivityLogs note:', e.message);
      }
    }
    const list = readJson('activity_logs', []);
    return list.slice(0, Number(limit));
  },

  // ---- USERS ----
  async getUserByEmail(email) {
    if (!email) return null;
    const clean = email.toLowerCase().trim();
    if (isConnectedToMongo && mongoose.connection.readyState === 1) {
      try {
        const doc = await UserModel.findOne({ email: clean }).lean();
        if (doc) return doc;
      } catch (e) {
        console.warn('Mongo getUserByEmail note:', e.message);
      }
    }
    const users = readJson('users', []);
    return users.find(u => u.email && u.email.toLowerCase() === clean);
  },

  async saveUser(user) {
    if (isConnectedToMongo && mongoose.connection.readyState === 1) {
      try {
        return await UserModel.findOneAndUpdate({ email: user.email }, user, { upsert: true, new: true });
      } catch (e) {
        console.warn('Mongo saveUser note:', e.message);
      }
    }
    const users = readJson('users', []);
    const idx = users.findIndex(u => u.email === user.email);
    if (idx >= 0) {
      users[idx] = { ...users[idx], ...user };
    } else {
      users.push({ _id: 'usr_' + Date.now(), ...user });
    }
    writeJson('users', users);
    return user;
  },

  // ---- SEO METADATA ----
  async getSEO() {
    return await this.getSectionByKey('seo', false) || {
      data: {
        title: 'Codename ONE Chembur | Ultra-Luxury 3 & 4 BHK Landmark Residences Mumbai',
        description: 'Discover Codename ONE at Subhash Nagar, Chembur, Mumbai. 40+ Storeys iconic tower with 25K sq.ft Sky Clubhouse, 3 & 4 BHK grand suites with handcrafted 360° dusk views.',
        keywords: 'Codename One, Chembur Mumbai, Luxury apartments Chembur, 3 BHK luxury Chembur, 4 BHK Chembur, RERA registered Mumbai projects',
        ogImage: '/images/hero-building.jpg',
        canonicalUrl: 'https://codenameone-chembur.com'
      }
    };
  },

  async updateSEO(data, user = 'admin') {
    return await this.saveSection('seo', { data }, false, user);
  }
};
