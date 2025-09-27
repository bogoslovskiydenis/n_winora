// composables/useAuth.js
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

  // Подключаем новый композабл для агрессивной очистки Nuxt cookies
  const { killAllNuxtCookies, forceReloadAndClear } = useNuxtCookieKiller();

  const initUser = () => {
    // Данные автоматически подтягиваются из cookie благодаря useCookie
    console.log('InitUser called:', {
      user: user.value,
      sessionToken: sessionToken.value,
    });

    // Проверяем localStorage на остаточные данные при инициализации
    if (process.client) {
      const currentUser = localStorage.getItem('currentUser');
      const hasUser = !!user.value;
      const hasToken = !!sessionToken.value;

      console.log('Auth state check on init:', {
        hasUser,
        hasToken,
        localStorage: !!currentUser,
      });

      // Если есть несоответствие между cookies и localStorage, очищаем
      if (!hasUser && !hasToken && currentUser) {
        console.log('Found orphaned localStorage data, cleaning up');
        localStorage.removeItem('currentUser');
      }
    }
  };

  const clearUserData = () => {
    console.log(
      'clearUserData called - запускаем агрессивную очистку Nuxt cookies'
    );

    // Очищаем cookies через useCookie
    user.value = null;
    sessionToken.value = null;

    // Запускаем агрессивную очистку Nuxt cookies
    killAllNuxtCookies();

    console.log('User data cleared completely with Nuxt cookie killer');
  };

  // Вычисляемое свойство для проверки аутентификации
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

  const registerUser = async (userData) => {
    isLoading.value = true;
    try {
      console.log('Registering user:', userData);
      const response = await userAPI.register(userData);

      console.log('Registration response:', response);

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

      // Обработка специфичных ошибок
      if (error.message.includes('Failed to fetch')) {
        return {
          success: false,
          message:
            'Ошибка соединения с сервером. Проверьте интернет-подключение.',
        };
      }

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
      console.log('Login attempt:', credentials);
      const response = await userAPI.login(credentials);

      console.log('Login response:', response);

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

        // Сохраняем в localStorage для совместимости с сокетами
        if (process.client) {
          const userDataForStorage = {
            id,
            login: credentials.login,
            role,
            session,
          };
          localStorage.setItem(
            'currentUser',
            JSON.stringify(userDataForStorage)
          );
          console.log(
            'User data saved to localStorage for socket compatibility'
          );
        }

        console.log('Login successful:', { userData, session });

        return {
          success: true,
          user: userData,
          session: session,
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

      // Обработка специфичных ошибок
      if (error.message.includes('Failed to fetch')) {
        return {
          success: false,
          message:
            'Ошибка соединения с сервером. Проверьте интернет-подключение.',
        };
      }

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
      console.log('Confirming registration with token:', token);
      const response = await userAPI.confirmRegistration(token);

      console.log('Confirmation response:', response);

      if (response.status === 'ok') {
        return {
          success: true,
          message:
            'Email успешно подтвержден! Теперь вы можете войти в систему.',
        };
      } else if (response.status === 'error') {
        // Обработка различных типов ошибок подтверждения
        const errorMessage = response.body?.message || response.message;

        if (
          errorMessage?.includes('token') ||
          errorMessage?.includes('invalid')
        ) {
          return {
            success: false,
            message: 'Ссылка подтверждения недействительна или устарела.',
          };
        }

        return {
          success: false,
          message: errorMessage || 'Ошибка подтверждения регистрации',
        };
      } else {
        throw new Error('Неожиданный формат ответа сервера');
      }
    } catch (error) {
      console.error('Ошибка подтверждения:', error);

      // Обработка специфичных ошибок
      if (error.message.includes('Failed to fetch')) {
        return {
          success: false,
          message:
            'Ошибка соединения с сервером. Проверьте интернет-подключение.',
        };
      }

      if (error.message.includes('404')) {
        return {
          success: false,
          message: 'Ссылка подтверждения не найдена или устарела.',
        };
      }

      return {
        success: false,
        message: error.message || 'Произошла ошибка при подтверждении email',
      };
    } finally {
      isLoading.value = false;
    }
  };

  const logoutUser = () => {
    console.log(
      'Logout initiated - запускаем агрессивную очистку Nuxt cookies'
    );

    // Очищаем все данные через новый метод
    clearUserData();

    // Небольшая задержка для применения изменений
    setTimeout(() => {
      // Дополнительная проверка - если cookies все еще есть, принудительная перезагрузка
      if (process.client) {
        const remainingCookies = document.cookie;
        if (
          remainingCookies.includes('user') ||
          remainingCookies.includes('session')
        ) {
          console.log(
            'Cookies все еще остались, принудительная перезагрузка...'
          );
          forceReloadAndClear();
          return;
        }
      }

      navigateTo('/login');
    }, 500);
  };

  return {
    user: readonly(user),
    sessionToken: readonly(sessionToken),
    isLoading: readonly(isLoading),
    isAuthenticated,
    initUser,
    registerUser,
    loginUser,
    confirmRegistration,
    logoutUser,
    getCurrentUser,
  };
};
