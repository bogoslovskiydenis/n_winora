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
    // Существующие функции для обратной совместимости
    window.loginUser = async (userData, rememberMe = false) => {
      const credentials = {
        login: userData.login || userData.email,
        password: userData.password || '12345678', // временный пароль для демо
        email: userData.email,
      };

      const result = await loginUser(credentials, rememberMe);

      if (result.success) {
        navigateTo('/main');
      }

      return result;
    };

    window.logoutUser = logoutUser;
    window.getCurrentUser = getCurrentUser;

    // Новые функции для работы с API
    window.registerUser = registerUser;
    window.confirmRegistration = confirmRegistration;
  }
});
