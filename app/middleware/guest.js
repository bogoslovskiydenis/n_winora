export default defineNuxtRouteMiddleware((to, from) => {
  // Пропускаем проверку на сервере для избежания ошибок SSR
  if (process.server) {
    return;
  }

  const { isAuthenticated, user, sessionToken } = useAuth();

  // Проверяем наличие пользователя и токена сессии
  const hasUser =
    user.value &&
    (typeof user.value === 'string' ? JSON.parse(user.value) : user.value);
  const hasToken = sessionToken.value;

  console.log('Guest middleware check:', {
    hasUser: !!hasUser,
    hasToken: !!hasToken,
    isAuthenticated: isAuthenticated.value,
    route: to.path,
  });

  // Если пользователь авторизован - редирект на главную
  if (hasUser && hasToken) {
    console.log('Guest middleware: User authenticated, redirecting to home');
    return navigateTo('/');
  }

  // Если не авторизован, продолжаем на страницу login/registration
  console.log(
    'Guest middleware: User not authenticated, allowing access to',
    to.path
  );
});
