export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/token',
    REFRESH: '/refresh-token', // Placeholder, confirm with backend
    REGISTER: '/register',
  },
  SERVICES: {
    LIST: '/services',
    DETAILS: (id: string) => `/services/${id}`,
  },
  BOOKING: {
    CREATE: '/bookings',
    MY_BOOKINGS: '/bookings/me',
  },
};
