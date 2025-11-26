/**
 * API Service Layer
 * 
 * This file contains all API calls for the hospital website.
 * Replace the mock implementations with actual API endpoints.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Generic fetch wrapper with error handling
 */
async function fetchAPI(endpoint, options = {}) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

/**
 * Appointments API
 */
export const appointmentsAPI = {
  /**
   * Create a new appointment request
   * @param {Object} appointmentData - Appointment details
   * @returns {Promise<Object>} Created appointment
   */
  create: async (appointmentData) => {
    // Mock implementation - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: Date.now(),
          ...appointmentData,
          status: 'pending',
          createdAt: new Date().toISOString(),
        });
      }, 1000);
    });

    // Actual implementation:
    // return fetchAPI('/appointments', {
    //   method: 'POST',
    //   body: JSON.stringify(appointmentData),
    // });
  },

  /**
   * Get all appointments (for admin/staff)
   * @returns {Promise<Array>} List of appointments
   */
  getAll: async () => {
    return fetchAPI('/appointments');
  },

  /**
   * Get appointment by ID
   * @param {string} id - Appointment ID
   * @returns {Promise<Object>} Appointment details
   */
  getById: async (id) => {
    return fetchAPI(`/appointments/${id}`);
  },

  /**
   * Update appointment status
   * @param {string} id - Appointment ID
   * @param {string} status - New status
   * @returns {Promise<Object>} Updated appointment
   */
  updateStatus: async (id, status) => {
    return fetchAPI(`/appointments/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },
};

/**
 * Doctors API
 */
export const doctorsAPI = {
  /**
   * Get all doctors
   * @param {Object} filters - Optional filters (specialty, available, etc.)
   * @returns {Promise<Array>} List of doctors
   */
  getAll: async (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    return fetchAPI(`/doctors${queryParams ? `?${queryParams}` : ''}`);
  },

  /**
   * Get doctor by ID
   * @param {string} id - Doctor ID
   * @returns {Promise<Object>} Doctor details
   */
  getById: async (id) => {
    return fetchAPI(`/doctors/${id}`);
  },

  /**
   * Get doctor's available time slots
   * @param {string} doctorId - Doctor ID
   * @param {string} date - Date in YYYY-MM-DD format
   * @returns {Promise<Array>} Available time slots
   */
  getAvailableSlots: async (doctorId, date) => {
    return fetchAPI(`/doctors/${doctorId}/slots?date=${date}`);
  },
};

/**
 * Departments API
 */
export const departmentsAPI = {
  /**
   * Get all departments
   * @returns {Promise<Array>} List of departments
   */
  getAll: async () => {
    return fetchAPI('/departments');
  },

  /**
   * Get department by ID
   * @param {string} id - Department ID
   * @returns {Promise<Object>} Department details
   */
  getById: async (id) => {
    return fetchAPI(`/departments/${id}`);
  },
};

/**
 * Contact API
 */
export const contactAPI = {
  /**
   * Send contact form message
   * @param {Object} messageData - Contact form data
   * @returns {Promise<Object>} Response
   */
  sendMessage: async (messageData) => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Message sent successfully',
        });
      }, 1000);
    });

    // Actual implementation:
    // return fetchAPI('/contact', {
    //   method: 'POST',
    //   body: JSON.stringify(messageData),
    // });
  },
};

/**
 * Authentication API (for future patient portal)
 */
export const authAPI = {
  /**
   * Login user
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<Object>} User data and token
   */
  login: async (email, password) => {
    return fetchAPI('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  /**
   * Register new user
   * @param {Object} userData - User registration data
   * @returns {Promise<Object>} Created user
   */
  register: async (userData) => {
    return fetchAPI('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  /**
   * Logout user
   * @returns {Promise<void>}
   */
  logout: async () => {
    return fetchAPI('/auth/logout', {
      method: 'POST',
    });
  },

  /**
   * Get current user profile
   * @returns {Promise<Object>} User profile
   */
  getProfile: async () => {
    return fetchAPI('/auth/profile');
  },
};

const api = {
  appointments: appointmentsAPI,
  doctors: doctorsAPI,
  departments: departmentsAPI,
  contact: contactAPI,
  auth: authAPI,
};

export default api;
