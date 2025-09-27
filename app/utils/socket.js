// Глобальные утилиты для работы с сокетами
export const SocketUtils = {
  // Инициализация сокета после логина
  initializeAfterLogin: (userData) => {
    if (process.server) return;

    console.log(
      'SocketUtils: Initializing socket after login for user:',
      userData.id
    );

    // Сохраняем данные пользователя в localStorage
    localStorage.setItem('currentUser', JSON.stringify(userData));

    // Подключаемся к сокету
    if (window.$socket) {
      window.$socket.connect();
    }
  },

  // Отключение сокета при выходе
  disconnectOnLogout: () => {
    if (process.server) return;

    console.log('SocketUtils: Disconnecting socket on logout');

    // Удаляем данные пользователя
    localStorage.removeItem('currentUser');

    // Отключаем сокет
    if (window.$socket) {
      window.$socket.disconnect();
    }
  },

  // Проверка и переподключение
  ensureConnection: () => {
    if (process.server) return false;

    if (!window.$socket) {
      console.warn('SocketUtils: Socket API not available');
      return false;
    }

    if (!window.$socket.isConnected()) {
      console.log('SocketUtils: Socket not connected, attempting reconnect');
      window.$socket.reconnect();
      return false;
    }

    return true;
  },

  // Отправка события с проверкой подключения
  safeEmit: (event, data) => {
    if (process.server) return false;

    if (!window.$socket) {
      console.warn('SocketUtils: Socket API not available');
      return false;
    }

    if (SocketUtils.ensureConnection()) {
      return window.$socket.emit(event, data);
    }

    // Попытка отправить через некоторое время
    setTimeout(() => {
      if (window.$socket?.isConnected()) {
        window.$socket.emit(event, data);
      }
    }, 2000);

    return false;
  },

  // Подписка на события с автоматической очисткой
  subscribeWithCleanup: (event, callback, cleanup = true) => {
    if (process.server) return () => {};

    if (!window.$socket) {
      console.warn('SocketUtils: Socket API not available');
      return () => {};
    }

    console.log(`SocketUtils: Subscribing to event "${event}"`);
    window.$socket.on(event, callback);

    // Возвращаем функцию для отписки
    return () => {
      if (window.$socket && cleanup) {
        console.log(`SocketUtils: Unsubscribing from event "${event}"`);
        window.$socket.off(event, callback);
      }
    };
  },

  // Получение статуса подключения
  getConnectionStatus: () => {
    if (process.server) return false;

    return {
      isConnected: window.$socket?.isConnected() || false,
      socketId: window.$socket?.getSocketId() || null,
      adminUsersCount: window.$socket?.getAdminUsersCount() || 0,
    };
  },

  // Логирование событий сокета
  enableDebugMode: () => {
    if (process.server) return;

    console.log('SocketUtils: Enabling debug mode');

    const events = [
      'connect',
      'disconnect',
      'connect_error',
      'admin_users_count',
      'notification',
    ];

    events.forEach((event) => {
      SocketUtils.subscribeWithCleanup(
        event,
        (data) => {
          console.log(`Socket Debug [${event}]:`, data);
        },
        false
      );
    });
  },
};

// Интеграция с системой аутентификации
export const integrateSocketWithAuth = () => {
  if (process.server) return;

  // Переопределяем глобальные функции аутентификации
  const originalLoginUser = window.loginUser;
  const originalLogoutUser = window.logoutUser;

  if (originalLoginUser) {
    window.loginUser = async (...args) => {
      const result = await originalLoginUser(...args);

      if (result?.success && result?.data) {
        SocketUtils.initializeAfterLogin(result.data);
      }

      return result;
    };
  }

  if (originalLogoutUser) {
    window.logoutUser = (...args) => {
      SocketUtils.disconnectOnLogout();
      return originalLogoutUser(...args);
    };
  }

  console.log('SocketUtils: Socket integration with auth completed');
};

// Автоматическая интеграция при загрузке
if (process.client) {
  // Ждем загрузки всех плагинов
  window.addEventListener('load', () => {
    setTimeout(() => {
      integrateSocketWithAuth();

      // Включаем debug режим в development
      if (process.dev) {
        SocketUtils.enableDebugMode();
      }
    }, 1000);
  });
}
