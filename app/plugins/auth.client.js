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
    // Функция логина (без изменений)
    window.loginUser = async (userData, rememberMe = false) => {
      try {
        const credentials = {
          login: userData.login || userData.email || userData.nickname,
          password: userData.password,
        };

        console.log('Window.loginUser called with:', credentials);

        const result = await loginUser(credentials, rememberMe);

        if (result.success) {
          // Сохраняем данные в localStorage для совместимости с сокетами
          const userDataForStorage = {
            id: result.user.id,
            login: result.user.login,
            role: result.user.role,
            session: result.session || 'session_from_login',
          };

          localStorage.setItem(
            'currentUser',
            JSON.stringify(userDataForStorage)
          );
          console.log('User data saved to localStorage:', userDataForStorage);

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

    // МАКСИМАЛЬНО АГРЕССИВНАЯ функция выхода
    window.logoutUser = () => {
      console.log('Window.logoutUser called - запуск максимальной очистки');

      // Импортируем новый композабл
      const { killAllNuxtCookies, forceReloadAndClear } = useNuxtCookieKiller();

      // Запускаем агрессивную очистку
      killAllNuxtCookies();

      // Отключаем сокет
      if (window.$socket) {
        window.$socket.disconnect();
        console.log('Socket force disconnected');
      }

      // Вызываем оригинальную функцию логаута
      logoutUser();

      // Проверяем результат и при необходимости перезагружаем
      setTimeout(() => {
        const remainingCookies = document.cookie;
        if (
          remainingCookies.includes('user') ||
          remainingCookies.includes('session')
        ) {
          console.log(
            'Cookies упорно не удаляются, принудительная перезагрузка...'
          );
          forceReloadAndClear();
        }
      }, 1000);

      console.log('Complete aggressive logout performed');
    };

    // Функция получения текущего пользователя (без изменений)
    window.getCurrentUser = () => {
      const currentUser = getCurrentUser();
      console.log('Window.getCurrentUser called:', currentUser);
      return currentUser;
    };

    // Остальные функции (без изменений)
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
