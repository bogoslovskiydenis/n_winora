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
    console.log(`API Request: ${method} ${API_BASE_URL}${endpoint}`);
    if (body) {
      console.log('Request body:', body);
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    // Попытаемся получить JSON ответ
    let data;
    try {
      data = await response.json();
    } catch (jsonError) {
      console.error('Failed to parse JSON response:', jsonError);
      // Если JSON не удалось распарсить, создаем объект ошибки
      data = {
        status: 'error',
        message: `HTTP ${response.status}: ${response.statusText}`,
      };
    }

    console.log('API Response:', { status: response.status, data });

    // Возвращаем данные независимо от HTTP статуса
    // Логика обработки успеха/ошибки будет в вызывающем коде
    return data;
  } catch (error) {
    console.error('API Error:', error);

    // Обработка сетевых ошибок
    if (
      error.name === 'TypeError' &&
      error.message.includes('Failed to fetch')
    ) {
      throw new Error(
        'Ошибка соединения с сервером. Проверьте интернет-подключение.'
      );
    }

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
    // Убираем слеш в начале, если он есть в токене
    const cleanToken = token.replace(/^\//, '');

    return await apiRequest(`/users/confirmation-registration/${cleanToken}`, {
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

// Утилиты для обработки ответов API
export const handleApiResponse = (response, context = '') => {
  console.log(`Handling API response for ${context}:`, response);

  if (!response) {
    return {
      success: false,
      message: 'Пустой ответ от сервера',
    };
  }

  // Если статус "ok", то успех
  if (response.status === 'ok') {
    return {
      success: true,
      data: response.body || response,
      message: response.message || 'Операция выполнена успешно',
    };
  }

  // Если статус "error", то ошибка
  if (response.status === 'error') {
    const errorMessage =
      response.body?.message ||
      response.message ||
      (Array.isArray(response.body?.errors)
        ? response.body.errors.join(', ')
        : 'Произошла ошибка на сервере');

    return {
      success: false,
      message: errorMessage,
    };
  }

  // Неожиданный формат ответа
  return {
    success: false,
    message: 'Неожиданный формат ответа от сервера',
  };
};
