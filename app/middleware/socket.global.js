export default defineNuxtRouteMiddleware((to, from) => {
  // Выполняем только на клиенте
  if (process.server) return;

  // Проверяем доступность socket API
  if (!window.$socket) {
    console.log('Socket Middleware: Socket API not ready yet');
    return;
  }

  // Получаем данные пользователя
  const currentUser = localStorage.getItem('currentUser');
  const isAuthenticated = !!currentUser;

  console.log('Socket Middleware:', {
    route: to.path,
    isAuthenticated,
    socketConnected: window.$socket.isConnected(),
  });

  // Если пользователь авторизован, но сокет не подключен
  if (isAuthenticated && !window.$socket.isConnected()) {
    console.log(
      'Socket Middleware: User authenticated but socket disconnected, reconnecting...'
    );
    window.$socket.connect();
  }

  // Если пользователь не авторизован, но сокет подключен
  if (!isAuthenticated && window.$socket.isConnected()) {
    console.log(
      'Socket Middleware: User not authenticated but socket connected, disconnecting...'
    );
    window.$socket.disconnect();
  }

  // Специальные маршруты требующие сокет-соединения
  const socketRequiredRoutes = ['/main', '/investments', '/profile'];

  if (socketRequiredRoutes.some((route) => to.path.startsWith(route))) {
    if (isAuthenticated && !window.$socket.isConnected()) {
      console.log(
        'Socket Middleware: Route requires socket, ensuring connection...'
      );
      window.$socket.connect();

      // Ждем подключения до 3 секунд
      let attempts = 0;
      const checkConnection = setInterval(() => {
        attempts++;
        if (window.$socket.isConnected() || attempts > 30) {
          clearInterval(checkConnection);
          if (!window.$socket.isConnected()) {
            console.warn(
              'Socket Middleware: Failed to establish socket connection'
            );
          }
        }
      }, 100);
    }
  }
});
