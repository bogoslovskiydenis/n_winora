export default defineNuxtPlugin(async (nuxtApp) => {
  const socket = useSocket();

  // Функция для проверки авторизации
  const checkAuth = () => {
    if (process.server) return false;

    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) return false;

    try {
      const userData = JSON.parse(currentUser);
      return !!(userData.id && userData.session);
    } catch {
      return false;
    }
  };

  // Автоматическое подключение при инициализации
  if (checkAuth()) {
    console.log('Socket Plugin: User authenticated, connecting...');
    socket.connect();
  } else {
    console.log('Socket Plugin: User not authenticated, skipping connection');
  }

  // Глобальные функции для работы с сокетом
  const globalSocketAPI = {
    connect: socket.connect,
    disconnect: socket.disconnect,
    reconnect: socket.reconnect,
    emit: socket.emit,
    on: socket.on,
    off: socket.off,

    // Получение состояния
    isConnected: () => socket.isConnected.value,
    getSocketId: () => socket.socketId.value,
    getAdminUsersCount: () => socket.adminUsersCount.value,

    // Утилиты
    checkConnection: () => {
      if (!socket.isConnected.value) {
        console.warn('Socket: Not connected. Attempting to reconnect...');
        socket.reconnect();
        return false;
      }
      return true;
    },
  };

  // Добавляем в контекст Nuxt
  nuxtApp.provide('socket', globalSocketAPI);

  // Делаем доступным глобально в window
  if (process.client) {
    window.$socket = globalSocketAPI;

    // Функция для показа уведомлений (можно переопределить)
    window.showNotification = (data) => {
      console.log('Global notification:', data);
      // Здесь можно добавить toast или другую систему уведомлений
    };

    console.log('Socket Plugin: Global socket API initialized');
  }

  // Обработка изменения роута - переподключение если нужно
  nuxtApp.hook('app:mounted', () => {
    console.log('Socket Plugin: App mounted, checking socket connection');

    // Проверяем подключение каждые 30 секунд
    const checkInterval = setInterval(() => {
      if (checkAuth() && !socket.isConnected.value) {
        console.log('Socket Plugin: Reconnecting due to lost connection');
        socket.reconnect();
      } else if (!checkAuth() && socket.isConnected.value) {
        console.log('Socket Plugin: Disconnecting due to logout');
        socket.disconnect();
      }
    }, 30000);

    // Очищаем интервал при уничтожении приложения
    nuxtApp.hook('app:beforeUnmount', () => {
      clearInterval(checkInterval);
      socket.disconnect();
    });
  });

  // Обработка изменения состояния окна
  if (process.client) {
    // Переподключение при фокусе окна
    window.addEventListener('focus', () => {
      if (checkAuth() && !socket.isConnected.value) {
        console.log('Socket Plugin: Window focused, reconnecting...');
        socket.reconnect();
      }
    });

    // Отключение при потере соединения с интернетом
    window.addEventListener('online', () => {
      console.log('Socket Plugin: Internet connection restored');
      if (checkAuth()) {
        socket.reconnect();
      }
    });

    window.addEventListener('offline', () => {
      console.log('Socket Plugin: Internet connection lost');
      socket.disconnect();
    });

    // Отключение при закрытии страницы
    window.addEventListener('beforeunload', () => {
      socket.disconnect();
    });
  }
});
