// API Configuration
export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  endpoints: {
    users: '/api/users',
    products: '/api/products',
    health: '/api/health'
  }
};

// Helper function to build full API URLs
export const getApiUrl = (endpoint: string): string => {
  console.log("URL", process.env.NEXT_PUBLIC_API_URL)
  return `${API_CONFIG.baseURL}${endpoint}`;
};

// API endpoints
export const API_ENDPOINTS = {
  USERS: getApiUrl(API_CONFIG.endpoints.users),
  PRODUCTS: getApiUrl(API_CONFIG.endpoints.products),
  HEALTH: getApiUrl(API_CONFIG.endpoints.health),
  USER_BY_ID: (id: number) => getApiUrl(`${API_CONFIG.endpoints.users}/${id}`),
  PRODUCT_BY_ID: (id: number) => getApiUrl(`${API_CONFIG.endpoints.products}/${id}`)
};
