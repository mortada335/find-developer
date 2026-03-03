/**
 * API Service Layer
 *
 * Currently uses localStorage + mock data.
 * When backend is ready, replace the function bodies with real API calls using axios.
 *
 * Usage:
 *   import { api } from '@/services/api';
 *   const developers = await api.developers.getAll();
 *   const user = await api.auth.login(email, password);
 */

import {
  mockDevelopers,
  mockServices,
  mockBlogs,
  mockBadgeDetails,
  mockChartData,
  filterOptions,
} from "@/data/mock";

// localStorage keys
const STORAGE_KEYS = {
  USERS: "devconnect_users",
  CURRENT_USER: "devconnect_current_user",
  AUTH_TOKEN: "devconnect_auth_token",
};

// Helper: simulate async delay (remove when using real API)
const delay = (ms = 200) => new Promise((r) => setTimeout(r, ms));

// Helper: get/set localStorage
const storage = {
  get(key) {
    try {
      const val = localStorage.getItem(key);
      return val ? JSON.parse(val) : null;
    } catch {
      return null;
    }
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  remove(key) {
    localStorage.removeItem(key);
  },
};

// ─────────────────────────────────────────────
// AUTH
// ─────────────────────────────────────────────
const auth = {
  /**
   * Register a new developer
   * @param {Object} data - { name, email, password, jobTitle, phone, bio, linkedinUrl, githubUrl, portfolioUrl }
   * @returns {Object} { user, token }
   */
  async register(data) {
    await delay();
    const users = storage.get(STORAGE_KEYS.USERS) || [];

    // Check if email already exists
    if (users.find((u) => u.email === data.email)) {
      throw new Error("A user with this email already exists.");
    }

    const newUser = {
      id: Date.now(),
      slug: data.name.toLowerCase().replace(/\s+/g, "-"),
      name: data.name,
      email: data.email,
      password: data.password, // In real app, never store plain text
      jobTitle: data.jobTitle || "",
      phone: data.phone || "",
      bio: data.bio || "",
      avatar: null,
      linkedinUrl: data.linkedinUrl || "",
      githubUrl: data.githubUrl || "",
      portfolioUrl: data.portfolioUrl || "",
      skills: [],
      badges: [],
      experienceYears: 0,
      location: "",
      availabilityType: "",
      isRecommended: false,
      isSpecialNeeds: false,
      projects: [],
      recommendations: [],
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    storage.set(STORAGE_KEYS.USERS, users);

    const token = `token_${newUser.id}_${Date.now()}`;
    const { password: _, ...safeUser } = newUser;
    storage.set(STORAGE_KEYS.CURRENT_USER, safeUser);
    storage.set(STORAGE_KEYS.AUTH_TOKEN, token);

    return { user: safeUser, token };
  },

  /**
   * Login with email and password
   * @param {string} email
   * @param {string} password
   * @returns {Object} { user, token }
   */
  async login(email, password) {
    await delay();
    const users = storage.get(STORAGE_KEYS.USERS) || [];
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      throw new Error("Invalid email or password.");
    }

    const token = `token_${user.id}_${Date.now()}`;
    const { password: _, ...safeUser } = user;
    storage.set(STORAGE_KEYS.CURRENT_USER, safeUser);
    storage.set(STORAGE_KEYS.AUTH_TOKEN, token);

    return { user: safeUser, token };
  },

  /**
   * Logout current user
   */
  async logout() {
    await delay(100);
    storage.remove(STORAGE_KEYS.CURRENT_USER);
    storage.remove(STORAGE_KEYS.AUTH_TOKEN);
  },

  /**
   * Get current authenticated user
   * @returns {Object|null} user or null
   */
  async getUser() {
    await delay(50);
    const token = storage.get(STORAGE_KEYS.AUTH_TOKEN);
    if (!token) return null;
    return storage.get(STORAGE_KEYS.CURRENT_USER);
  },

  /**
   * Update current user's profile
   * @param {Object} data - partial user data to update
   * @returns {Object} updated user
   */
  async updateProfile(data) {
    await delay();
    const currentUser = storage.get(STORAGE_KEYS.CURRENT_USER);
    if (!currentUser) throw new Error("Not authenticated.");

    const users = storage.get(STORAGE_KEYS.USERS) || [];
    const idx = users.findIndex((u) => u.id === currentUser.id);
    if (idx === -1) throw new Error("User not found.");

    const updatedUser = { ...users[idx], ...data };
    users[idx] = updatedUser;
    storage.set(STORAGE_KEYS.USERS, users);

    const { password: _, ...safeUser } = updatedUser;
    storage.set(STORAGE_KEYS.CURRENT_USER, safeUser);

    return safeUser;
  },
};

// ─────────────────────────────────────────────
// DEVELOPERS
// ─────────────────────────────────────────────
const developers = {
  /**
   * Get all developers (mock + localStorage registered)
   * @param {Object} filters - { search, jobTitle, skills, location, availability }
   * @returns {Array} developers
   */
  async getAll(filters = {}) {
    await delay();
    const registeredUsers = (storage.get(STORAGE_KEYS.USERS) || []).map(
      ({ password: _, ...u }) => u
    );
    const allDevs = [...mockDevelopers, ...registeredUsers];

    return allDevs.filter((dev) => {
      if (
        filters.search &&
        !dev.name.toLowerCase().includes(filters.search.toLowerCase())
      )
        return false;
      if (filters.jobTitle && dev.jobTitle !== filters.jobTitle) return false;
      if (filters.location && dev.location !== filters.location) return false;
      if (
        filters.availability &&
        dev.availabilityType !== filters.availability
      )
        return false;
      if (
        filters.skills?.length > 0 &&
        !filters.skills.some((skill) => (dev.skills || []).includes(skill))
      )
        return false;
      return true;
    });
  },

  /**
   * Get a developer by slug
   * @param {string} slug
   * @returns {Object|null}
   */
  async getBySlug(slug) {
    await delay();
    const registeredUsers = (storage.get(STORAGE_KEYS.USERS) || []).map(
      ({ password: _, ...u }) => u
    );
    const allDevs = [...mockDevelopers, ...registeredUsers];
    return allDevs.find((dev) => dev.slug === slug) || null;
  },
};

// ─────────────────────────────────────────────
// BLOGS
// ─────────────────────────────────────────────
const blogs = {
  async getAll() {
    await delay();
    return mockBlogs;
  },

  async getBySlug(slug) {
    await delay();
    return mockBlogs.find((b) => b.slug === slug) || null;
  },
};

// ─────────────────────────────────────────────
// BADGES
// ─────────────────────────────────────────────
const badges = {
  async getAll() {
    await delay();
    return mockBadgeDetails;
  },
};

// ─────────────────────────────────────────────
// CHARTS
// ─────────────────────────────────────────────
const charts = {
  async getData() {
    await delay();
    return mockChartData;
  },
};

// ─────────────────────────────────────────────
// SERVICES
// ─────────────────────────────────────────────
const services = {
  async getAll() {
    await delay();
    return mockServices;
  },
};

// ─────────────────────────────────────────────
// FILTER OPTIONS
// ─────────────────────────────────────────────
const filters = {
  async getOptions() {
    await delay(50);
    return filterOptions;
  },
};

// ─────────────────────────────────────────────
// EXPORT
// ─────────────────────────────────────────────
export const api = {
  auth,
  developers,
  blogs,
  badges,
  charts,
  services,
  filters,
};

export default api;
