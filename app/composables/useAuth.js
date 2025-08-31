import { userAPI } from './../utils/api.js';

export const useAuth = () => {
  const user = ref(null);
  const sessionToken = ref(null);
  const isLoading = ref(false);

  // Инициализация пользователя из localStorage/sessionStorage
  const initUser = () => {
    if (process.client) {
      const savedUser =
        localStorage.getItem('user') || sessionStorage.getItem('user');
      const savedSession =
        localStorage.getItem('sessionToken') ||
        sessionStorage.getItem('sessionToken');

      if (savedUser && savedSession) {
        try {
          user.value = JSON.parse(savedUser);
          sessionToken.value = savedSession;
        } catch (error) {
          console.error('Ошибка при загрузке данных пользователя:', error);
          clearUserData();
        }
      }
    }
  };

  // Очистка данных пользователя
  const clearUserData = () => {
    if (process.client) {
      localStorage.removeItem('user');
      localStorage.removeItem('sessionToken');
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('sessionToken');
    }
    user.value = null;
    sessionToken.value = null;
  };

  // Регистрация пользователя
  const registerUser = async (userData, rememberMe = false) => {
    isLoading.value = true;

    try {
      const response = await userAPI.register(userData);

      if (response.status === 'ok') {
        // После успешной регистрации показываем сообщение о подтверждении email
        return {
          success: true,
          message:
            'Регистрация прошла успешно! Проверьте вашу почту для подтверждения аккаунта.',
          needsConfirmation: true,
        };
      } else {
        throw new Error('Ошибка регистрации');
      }
    } catch (error) {
      console.error('Ошибка регистрации:', error);
      return {
        success: false,
        message: error.message || 'Произошла ошибка при регистрации',
      };
    } finally {
      isLoading.value = false;
    }
  };

  // Авторизация пользователя
  const loginUser = async (credentials, rememberMe = false) => {
    isLoading.value = true;

    try {
      const response = await userAPI.login(credentials);

      if (response.status === 'ok' && response.body) {
        const { id, session, role } = response.body;

        // Создаем объект пользователя
        const userData = {
          id,
          login: credentials.login,
          email: credentials.email || '', // email может не приходить в ответе
          role,
          balance: 150000, // временно, пока нет в API
        };

        user.value = userData;
        sessionToken.value = session;

        // Сохраняем данные
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem('user', JSON.stringify(userData));
        storage.setItem('sessionToken', session);

        return {
          success: true,
          user: userData,
        };
      } else {
        throw new Error('Неверные учетные данные');
      }
    } catch (error) {
      console.error('Ошибка авторизации:', error);
      return {
        success: false,
        message: error.message || 'Произошла ошибка при авторизации',
      };
    } finally {
      isLoading.value = false;
    }
  };

  // Подтверждение регистрации по токену
  const confirmRegistration = async (token) => {
    isLoading.value = true;

    try {
      const response = await userAPI.confirmRegistration(token);

      if (response.status === 'ok') {
        return {
          success: true,
          message:
            'Email успешно подтвержден! Теперь вы можете войти в систему.',
        };
      } else {
        throw new Error('Ошибка подтверждения');
      }
    } catch (error) {
      console.error('Ошибка подтверждения:', error);
      return {
        success: false,
        message: error.message || 'Ошибка подтверждения email',
      };
    } finally {
      isLoading.value = false;
    }
  };

  // Выход пользователя
  const logoutUser = () => {
    clearUserData();
    navigateTo('/auth');
  };

  // Проверка авторизации
  const isAuthenticated = computed(() => !!user.value && !!sessionToken.value);

  // Получение текущего пользователя
  const getCurrentUser = () => user.value;

  // Получение токена сессии
  const getSessionToken = () => sessionToken.value;

  return {
    user: readonly(user),
    sessionToken: readonly(sessionToken),
    isLoading: readonly(isLoading),
    initUser,
    registerUser,
    loginUser,
    confirmRegistration,
    logoutUser,
    isAuthenticated,
    getCurrentUser,
    getSessionToken,
  };
};
