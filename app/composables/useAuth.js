import { userAPI } from './../utils/api.js';

export const useAuth = () => {
  const user = useCookie('user', {
    default: () => null,
    serializer: {
      read: (value) => {
        try {
          return value ? JSON.parse(value) : null;
        } catch {
          return null;
        }
      },
      write: (value) => {
        return value ? JSON.stringify(value) : '';
      },
    },
  });

  const sessionToken = useCookie('sessionToken', { default: () => null });
  const isLoading = ref(false);

  const initUser = () => {
    // Данные автоматически подтягиваются из cookie благодаря useCookie
    console.log('InitUser called:', {
      user: user.value,
      sessionToken: sessionToken.value,
    });
  };

  const clearUserData = () => {
    user.value = null;
    sessionToken.value = null;
    console.log('User data cleared');
  };

  const registerUser = async (userData) => {
    isLoading.value = true;
    try {
      const response = await userAPI.register(userData);

      if (response.status === 'ok') {
        return {
          success: true,
          message:
            'Регистрация прошла успешно! Проверьте вашу почту для подтверждения аккаунта.',
          needsConfirmation: true,
        };
      } else if (response.status === 'error' && response.body?.errors) {
        const errorMessage = Array.isArray(response.body.errors)
          ? response.body.errors.join(', ')
          : 'Ошибка регистрации.';
        return { success: false, message: errorMessage };
      } else {
        throw new Error('Неизвестная ошибка сервера при регистрации');
      }
    } catch (error) {
      console.error('Ошибка регистрации:', error);
      return {
        success: false,
        message:
          error.message || 'Произошла критическая ошибка при регистрации',
      };
    } finally {
      isLoading.value = false;
    }
  };

  const loginUser = async (credentials, rememberMe = false) => {
    isLoading.value = true;
    try {
      const response = await userAPI.login(credentials);

      if (response.status === 'ok' && response.body?.session) {
        const { id, session, role } = response.body;

        const userData = {
          id,
          login: credentials.login,
          role,
        };

        // Устанавливаем cookies с правильным временем жизни
        const cookieOptions = rememberMe
          ? { maxAge: 60 * 60 * 24 * 30, sameSite: 'lax' } // 30 дней
          : { sameSite: 'lax' }; // Сессионные

        user.value = userData;
        sessionToken.value = session;

        console.log('Login successful:', { userData, session });

        return {
          success: true,
          user: userData,
        };
      } else if (response.body?.status === 'error') {
        return {
          success: false,
          message: 'Неверный логин или пароль, или аккаунт не подтвержден.',
        };
      } else {
        throw new Error('Неверные учетные данные');
      }
    } catch (error) {
      console.error('Ошибка авторизации:', error);
      clearUserData();
      return {
        success: false,
        message: error.message || 'Произошла ошибка при авторизации',
      };
    } finally {
      isLoading.value = false;
    }
  };

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

  const logoutUser = () => {
    clearUserData();
    navigateTo('/login');
  };

  // Улучшенная проверка аутентификации
  const isAuthenticated = computed(() => {
    const hasUser = !!user.value;
    const hasToken = !!sessionToken.value;
    const result = hasUser && hasToken;

    console.log('isAuthenticated check:', { hasUser, hasToken, result });
    return result;
  });

  // Добавляем геттер для получения пользователя
  const getCurrentUser = () => {
    return user.value;
  };

  return {
    user: readonly(user),
    sessionToken: readonly(sessionToken),
    isLoading: readonly(isLoading),
    initUser,
    registerUser,
    loginUser,
    confirmRegistration,
    logoutUser,
    getCurrentUser,
    isAuthenticated,
  };
};
