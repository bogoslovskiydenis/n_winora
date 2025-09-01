export default defineNuxtRouteMiddleware((to, from) => {
  // Пропускаем проверку на сервере для избежания ошибок SSR
  if (process.server) {
    return;
  }

  const { isAuthenticated, user, sessionToken } = useAuth();

  // Проверяем наличие пользователя и токена сессии
  const hasUser =
    user.value && typeof user.value === 'string'
      ? JSON.parse(user.value)
      : user.value;
  const hasToken = sessionToken.value;

  console.log('Auth middleware check:', {
    hasUser: !!hasUser,
    hasToken: !!hasToken,
    isAuthenticated: isAuthenticated.value,
    route: to.path,
  });

  // Если нет аутентификации - редирект на login
  if (!hasUser || !hasToken) {
    console.log(
      'Auth middleware: No authentication found, redirecting to login'
    );
    return navigateTo('/login');
  }

  // Если аутентификация есть, продолжаем
  console.log('Auth middleware: User authenticated, allowing access');
});
