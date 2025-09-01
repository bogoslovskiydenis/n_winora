export default defineNuxtPlugin(() => {
  const {
    loginUser,
    logoutUser,
    getCurrentUser,
    registerUser,
    confirmRegistration,
  } = useAuth();

  // Регистрируем глобальные функции для совместимости
  if (process.client) {
    // Исправленная функция логина
    window.loginUser = async (userData, rememberMe = false) => {
      try {
        // Правильно формируем credentials
        const credentials = {
          login: userData.login || userData.email || userData.nickname,
          password: userData.password,
        };

        console.log('Window.loginUser called with:', credentials);

        const result = await loginUser(credentials, rememberMe);

        if (result.success) {
          // Небольшая задержка для обновления состояния
          await nextTick();
          navigateTo('/main');
        }

        return result;
      } catch (error) {
        console.error('Window loginUser error:', error);
        return {
          success: false,
          message: 'Ошибка при входе в систему',
        };
      }
    };

    // Исправленная функция выхода
    window.logoutUser = () => {
      console.log('Window.logoutUser called');
      logoutUser();
    };

    // Функция получения текущего пользователя
    window.getCurrentUser = () => {
      const currentUser = getCurrentUser();
      console.log('Window.getCurrentUser called:', currentUser);
      return currentUser;
    };

    // Новые функции для работы с API
    window.registerUser = async (userData) => {
      console.log('Window.registerUser called with:', userData);
      return await registerUser(userData);
    };

    window.confirmRegistration = async (token) => {
      console.log('Window.confirmRegistration called with token:', token);
      return await confirmRegistration(token);
    };

    // Функция для проверки аутентификации
    window.checkAuth = () => {
      const { isAuthenticated } = useAuth();
      console.log('Window.checkAuth called:', isAuthenticated.value);
      return isAuthenticated.value;
    };

    console.log('Auth plugin initialized with global functions');
  }
});
