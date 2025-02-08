// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const websiteService = {
  createWebsite: async (websiteData) => {
    try {
      const response = await api.post('/websites', websiteData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getWebsites: async () => {
    try {
      const response = await api.get('/websites');
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getWebsiteById: async (id, userId) => {
    try {
      const response = await api.post(`/websites/${id}`, { userId });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "An error occurred" };
    }
  },
  
  getAllWebsites: async (userId) => {
    try {
      const response = await api.post('/websites/get-all', { userId });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },


  getRecentlyCreatedWebsites: async (userId, limit = 5) => {
    try {
      const response = await api.post(`/websites/recently-created/${limit}`, { userId });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  updateWebsite: async (id, websiteData, userId) => {
    try {
      const response = await api.put(`/websites/${id}`, { ...websiteData, userId });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
},


  deleteWebsite: async (id) => {
    try {
      const response = await api.delete(`/websites/${id}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  applyDiscount: async (id, discountData, userId) => {
    try {
      const response = await api.put(`/websites/discount/${id}`, { ...discountData, userId });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
},


highlightMedia: async (id, highlightData, userId) => {
  try {
    const response = await api.put(`/websites/highlight/${id}`, { ...highlightData, userId });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
},

  getWebsitesNotApproved: async (userId) => {
    try {
      const response = await api.post('/websites/notApproved', { userId });
      return response.data;
    } catch (error) {
      console.error('Error:', error.response?.data || error);
      throw error.response?.data || error;
    }
  },

  getWebsitesApproved: async (userId) => {
    try {
      const response = await api.post('/websites/approved', { userId });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  viewWebsite: async (id, userId) => {
    try {
      const response = await api.post(`/websites/view/${id}`, { userId });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};


export const promoService = {
  createPromo: async (promoData) => {
    try {
      const response = await api.post('/promos', promoData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getPromos: async (userId) => {
    try {
      const response = await api.post('/promos/getPromos', { userId });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getPromoById: async (id) => {
    try {
      const response = await api.get(`/promos/${id}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getAllPromos: async () => {
    try {
      const response = await api.get('/promos/get-all');
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getRecentlyCreatedPromos: async (limit = 5) => {
    try {
      const response = await api.get(`/promos/recently-created/${limit}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  updatePromo: async (id, promoData) => {
    try {
      const response = await api.put(`/promos/${id}`, promoData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  deletePromo: async (id) => {
    try {
      const response = await api.delete(`/promos/${id}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};


export const profileService = {
  createProfile: async (profileData) => {
    try {
      const response = await api.post('/profile/create', profileData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getProfile: async (userId) => {
    try {
      const response = await api.post('/profile/get', { userId });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  updateProfile: async (id, profileData) => {
    try {
      const response = await api.put(`/profile/update/${id}`, profileData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  deleteProfile: async (id) => {
    try {
      const response = await api.delete(`/profile/delete/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export const invoiceAccountService = {
  createInvoiceAccount: async (invoiceAccountData) => {
    try {
      const response = await api.post('/invoice-account/create', invoiceAccountData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getInvoiceAccounts: async (userId) => {
    try {
      const response = await api.post('/invoice-account/get-all', { userId });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getInvoiceAccountById: async (id) => {
    try {
      const response = await api.get(`/invoice-account/get/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  updateInvoiceAccount: async (id, invoiceAccountData) => {
    try {
      const response = await api.put(`/invoice-account/update/${id}`, invoiceAccountData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  deleteInvoiceAccount: async (id) => {
    try {
      const response = await api.delete(`/invoice-account/delete/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export const emailChangeService = {
  requestEmailChange: async (userId, newEmail) => {
    try {
      const response = await api.post('/email-change/request-email-change', { userId, newEmail });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  verifyEmailChange: async (userId, verificationToken, newEmail) => {
    try {
      const response = await api.post('/email-change/verify-email-change', { 
        userId, 
        verificationToken, 
        newEmail 
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};



export const searchService = {
  searchWebsites: async ({
    userId,
    searchQuery,
    minPrice,
    maxPrice,
    da,
    ascore,
    mediaType,
    category,
    country,
    gambling,
    cbd,
    adult,
    trading,
    googleNews
  }) => {
    try {
      // Clean search query if present
      const cleanQuery = searchQuery?.toLowerCase()
        .replace(/^(https?:\/\/)?(www\.)?/, '')
        .replace(/\/$/, '');

      const response = await api.post('/advertiser/search-websites', {
        userId,
        searchQuery: cleanQuery,
        minPrice,
        maxPrice,
        da,
        ascore,
        mediaType,
        category,
        country,
        gambling,
        cbd,
        adult,
        trading,
        googleNews
      });

      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};
export const cartService = {
  getCarts: async (userId) => {
    try {
      const response = await api.post('/advertiser/carts/get-all', { userId });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  createCart: async (userId, websiteId) => {
    try {
      const response = await api.post('/advertiser/carts', { userId, websiteId });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getCartById: async (userId, cartId) => {
    try {
      const response = await api.get(`/advertiser/carts/${cartId}`, { params: { userId } });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  updateCart: async (userId, cartId, websiteId) => {
    try {
      const response = await api.put(`/advertiser/carts/${cartId}`, { userId, websiteId });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  deleteCart: async (userId, cartId) => {
    try {
      const response = await api.delete(`/advertiser/carts/${cartId}`, { data: { userId } });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};

export const favouriteService = {
  getFavourites: async (userId) => {
    try {
      const response = await api.post('/advertiser/favourites/get-all', { userId });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  createFavourite: async (userId, websiteId) => {
    try {
      const response = await api.post('/advertiser/favourites', { userId, websiteId });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getFavouriteById: async (favouriteId, userId) => {
    try {
      const response = await api.get(`/advertiser/favourites/${favouriteId}`, {
        data: { userId }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  updateFavourite: async (favouriteId, userId, websiteId) => {
    try {
      const response = await api.put(`/advertiser/favourites/${favouriteId}`, {
        userId,
        websiteId
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  deleteFavourite: async (favouriteId, userId) => {
    try {
      const response = await api.delete(`/advertiser/favourites/${favouriteId}`, {
        data: { userId }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};


export const userService = {
  searchUsers: async (adminId, query) => {
    try {
      const response = await api.post('/admin/users/search', { adminId, query });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getAllUsers: async (adminId) => {
    try {
      const response = await api.post('/admin/users/all', { adminId });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getUsersByStatus: async (adminId, active) => {
    try {
      const response = await api.post('/admin/users/status', { adminId, active });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  changeUserStatus: async (adminId, userId, status) => {
    try {
      const response = await api.put('/admin/users/change-status', { adminId, userId, status });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  deleteUser: async (adminId, userId) => {
    try {
      const response = await api.delete('/admin/users/delete', { data: { adminId, userId } });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  sendEmailByAdmin: async (adminId, email, subject, message) => {
    try {
      const response = await api.post('/admin/users/send-email', { adminId, email, subject, message });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getUsersByVerification: async (adminId, isVerified) => {
    try {
      const response = await api.post('/admin/users/verification', { adminId, isVerified });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};


export const adminWebsiteService = {
  getWebsitesCountByStatus: async (adminId, status) => {
    try {
      const response = await api.post('/admin/content/count', { adminId, status });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  searchWebsites: async (adminId, searchInput) => {
    try {
      const response = await api.post('/admin/content/search', { adminId, searchInput });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getWebsitesByStatus: async (adminId, status) => {
    try {
      const response = await api.post('/admin/content/status', { adminId, status });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  changeWebsiteStatus: async (adminId, websiteId, status) => {
    try {
      const response = await api.post('/admin/content/change-status', { 
        adminId, 
        websiteId, 
        status 
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  deleteWebsite: async (adminId, websiteId) => {
    try {
      const response = await api.post('/admin/content/delete', { adminId, websiteId });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getWebsiteData: async (adminId, websiteId) => {
    try {
      const response = await api.post('/admin/content/data', { adminId, websiteId });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  sendEmail: async (adminId, email, subject, message) => {
    try {
      const response = await api.post('/admin/content/send-email', {
        adminId,
        email,
        subject,
        message
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

   getUserById: async (adminId, userId) => {
    try {
      const response = await api.post('/admin/content/get-user', { adminId, userId });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

};

export const faqService = {
  // Admin: Add new category
  addCategory: async (adminId, name) => {
    try {
      const response = await api.post('/category/add', { adminId, name });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Admin: Delete category
  deleteCategory: async (adminId, categoryId) => {
    try {
      const response = await api.post('/category/delete', { adminId, categoryId });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Admin: Get all categories
  getAllCategories: async (adminId) => {
    try {
      const response = await api.post('/category/all', { adminId });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Admin: Create new FAQ
  createFAQ: async (adminId, faqData) => {
    try {
      const response = await api.post('/faq/create', {
        adminId,
        ...faqData
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Admin: Update FAQ
  updateFAQ: async (adminId, faqId, faqData) => {
    try {
      const response = await api.post('/faq/update', {
        adminId,
        faqId,
        ...faqData
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Admin: Delete FAQ
  deleteFAQ: async (adminId, faqId) => {
    try {
      const response = await api.post('/faq/delete', { adminId, faqId });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Admin: Change FAQ status
  changeFAQStatus: async (adminId, faqId, active) => {
    try {
      const response = await api.post('/faq/change-status', {
        adminId,
        faqId,
        active
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Admin: Search FAQs
  searchFAQsAdmin: async (adminId, query) => {
    try {
      const response = await api.post('/faq/search', { adminId, query });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Admin: Get FAQs by category
  getFAQsByCategory: async (adminId, categoryId) => {
    try {
      const response = await api.post('/faq/category', { adminId, categoryId });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Public: Get all categories
  getAllCategoriesPublic: async () => {
    try {
      const response = await api.get('/public/categories');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Public: Get FAQs by category
  getFAQsByCategoryPublic: async (categoryId) => {
    try {
      const response = await api.get(`/public/faqs/${categoryId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Public: Search FAQs
  searchFAQsPublic: async (query) => {
    try {
      // console.log('Sending search request for:', query); // Debug log
      const response = await api.get('/public/faqs/search', {
        params: { query }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};

export const statsService = {
  getMonthlyStats: async (userId, websiteId, year, month) => {
    try {
      const response = await api.post('/stats/get-monthly', { userId, websiteId, year, month });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getLast30DaysStats: async (userId, websiteId) => {
    try {
      const response = await api.post('/stats/get-last30days', { userId, websiteId });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getLast12MonthsStats: async (userId, websiteId) => {
    try {
      const response = await api.post('/stats/get-last12months', { userId, websiteId });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};