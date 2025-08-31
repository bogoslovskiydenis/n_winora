// utils/api.js
export const API_BASE_URL = 'https://api.dev-site.site/api';

// Базовая функция для API запросов
export const apiRequest = async (endpoint, options = {}) => {
  const { method = 'GET', body, headers = {} } = options;

  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Функции для работы с пользователями
export const userAPI = {
  // Регистрация
  register: async (userData) => {
    return await apiRequest('/users/register', {
      method: 'POST',
      body: {
        login: userData.login,
        email: userData.email,
        password: userData.password,
      },
    });
  },

  // Логин
  login: async (credentials) => {
    return await apiRequest('/users/login', {
      method: 'POST',
      body: {
        login: credentials.login,
        password: credentials.password,
      },
    });
  },

  // Подтверждение регистрации
  confirmRegistration: async (token) => {
    return await apiRequest(`/users/confirmation-registration/${token}`, {
      method: 'GET',
    });
  },

  // Получение данных пользователя (если есть такой endpoint)
  getProfile: async (sessionToken) => {
    return await apiRequest('/users/profile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    });
  },
};
