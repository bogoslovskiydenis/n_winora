<template>
  <div id="app">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
// Слушатели сокета
let socketUnsubscribers = [];

// Функция для получения данных аутентификации
const getAuthData = () => {
  const { user, sessionToken, isAuthenticated } = useAuth();

  // Проверяем и localStorage на всякий случай
  const localUser = process.client ? localStorage.getItem('currentUser') : null;
  let localUserData = null;

  if (localUser) {
    try {
      localUserData = JSON.parse(localUser);
    } catch (e) {
      console.warn('Ошибка парсинга currentUser из localStorage:', e);
      localUserData = null;
    }
  }

  // Используем более строгую проверку аутентификации
  const userData = user.value;
  const session = sessionToken.value;
  const authenticated = isAuthenticated.value;

  // Если пользователь не аутентифицирован, очищаем localStorage
  if (!authenticated && localUser) {
    console.log('🧹 Очищаем устаревшие данные из localStorage');
    localStorage.removeItem('currentUser');
  }

  return {
    userId: authenticated && userData?.id ? userData.id : '',
    session: authenticated && session ? session : '',
    location: 'front',
    isAuthenticated: authenticated,
    // Добавляем отладочную информацию
    debug: {
      cookieUser: !!userData,
      cookieSession: !!session,
      localStorage: !!localUserData,
      computedAuth: authenticated,
    },
  };
};

// Логирование состояния сокета
const logSocketState = (event, authData, additionalInfo = '') => {
  const authStatus = authData.isAuthenticated ? 'ЗАЛОГИНЕН' : 'НЕ ЗАЛОГИНЕН';
  const logData = {
    event,
    authStatus,
    userId: authData.userId || 'пустой',
    session: authData.session ? 'есть' : 'пустой',
    location: authData.location,
    debug: authData.debug,
    additionalInfo,
  };

  console.log(`🔌 SOCKET [${authStatus}]:`, logData);

  // Дополнительное предупреждение если есть несоответствие
  if (
    !authData.isAuthenticated &&
    (authData.debug.localStorage || authData.userId)
  ) {
    console.warn(
      '⚠️ ВНИМАНИЕ: Пользователь не аутентифицирован, но остались данные!'
    );
  }
};

// Инициализация сокетов
const initializeSockets = () => {
  console.log('Root App: Initializing socket listeners');

  const unsubscribeConnect = SocketUtils.subscribeWithCleanup('connect', () => {
    const authData = getAuthData();
    logSocketState(
      'ПОДКЛЮЧЕН',
      authData,
      `Socket ID: ${SocketUtils.getConnectionStatus().socketId}`
    );
  });

  const unsubscribeDisconnect = SocketUtils.subscribeWithCleanup(
    'disconnect',
    (reason) => {
      const authData = getAuthData();
      logSocketState('ОТКЛЮЧЕН', authData, `Причина: ${reason}`);
    }
  );

  const unsubscribeError = SocketUtils.subscribeWithCleanup(
    'connect_error',
    (error) => {
      const authData = getAuthData();
      logSocketState(
        'ОШИБКА ПОДКЛЮЧЕНИЯ',
        authData,
        `Ошибка: ${error.message}`
      );
    }
  );

  // Дополнительные события для отслеживания аутентификации
  const unsubscribeAuthSuccess = SocketUtils.subscribeWithCleanup(
    'auth_success',
    (data) => {
      const authData = getAuthData();
      logSocketState(
        'АУТЕНТИФИКАЦИЯ УСПЕШНА',
        authData,
        `Данные: ${JSON.stringify(data)}`
      );
    }
  );

  const unsubscribeAuthError = SocketUtils.subscribeWithCleanup(
    'auth_error',
    (error) => {
      const authData = getAuthData();
      logSocketState(
        'ОШИБКА АУТЕНТИФИКАЦИИ',
        authData,
        `Ошибка: ${error.message}`
      );
    }
  );

  socketUnsubscribers = [
    unsubscribeConnect,
    unsubscribeDisconnect,
    unsubscribeError,
    unsubscribeAuthSuccess,
    unsubscribeAuthError,
  ];
};

// Функция для отслеживания изменений состояния аутентификации
const watchAuthChanges = () => {
  const { user, sessionToken, isAuthenticated } = useAuth();

  // Отслеживаем изменения аутентификации (самый точный способ)
  watch(isAuthenticated, (newAuth, oldAuth) => {
    const authData = getAuthData();

    if (newAuth && !oldAuth) {
      logSocketState(
        'ПОЛЬЗОВАТЕЛЬ ЗАЛОГИНИЛСЯ',
        authData,
        'isAuthenticated изменился с false на true'
      );

      // Переподключаем сокет с новыми данными аутентификации
      if (window.$socket && window.$socket.isConnected()) {
        console.log(
          '🔄 Переподключение сокета с новыми данными аутентификации...'
        );
        window.$socket.reconnect();
      }
    } else if (!newAuth && oldAuth) {
      logSocketState(
        'ПОЛЬЗОВАТЕЛЬ РАЗЛОГИНИЛСЯ',
        authData,
        'isAuthenticated изменился с true на false'
      );

      // Принудительно очищаем localStorage при разлогине
      if (process.client) {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('user');
        localStorage.removeItem('sessionToken');

        // Очищаем все ключи связанные с аутентификацией
        Object.keys(localStorage).forEach((key) => {
          if (
            key.includes('user') ||
            key.includes('session') ||
            key.includes('auth')
          ) {
            localStorage.removeItem(key);
          }
        });

        // ПРИНУДИТЕЛЬНАЯ ОЧИСТКА COOKIES
        const cookiesToClear = [
          'user',
          'sessionToken',
          'session',
          'auth',
          'token',
        ];

        cookiesToClear.forEach((cookieName) => {
          document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
          document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=localhost;`;
          document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=;`;
        });

        console.log(
          '🧹 localStorage и cookies принудительно очищены полностью'
        );
        console.log('Оставшиеся cookies:', document.cookie);

        // Дополнительно отключаем сокет
        if (window.$socket) {
          window.$socket.disconnect();
          console.log('🔌 Сокет принудительно отключен');
        }
      }
    }
  });

  // Дополнительно отслеживаем изменения пользователя
  watch(user, (newUser, oldUser) => {
    const authData = getAuthData();

    if (newUser && !oldUser) {
      logSocketState(
        'COOKIE USER УСТАНОВЛЕН',
        authData,
        `Новый пользователь: ${newUser.id}`
      );
    } else if (!newUser && oldUser) {
      logSocketState(
        'COOKIE USER ОЧИЩЕН',
        authData,
        `Удален пользователь: ${oldUser.id}`
      );
    }
  });

  // Отслеживаем изменения токена сессии
  watch(sessionToken, (newToken, oldToken) => {
    const authData = getAuthData();

    if (newToken && !oldToken) {
      logSocketState(
        'SESSION TOKEN УСТАНОВЛЕН',
        authData,
        'Токен сессии создан'
      );
    } else if (!newToken && oldToken) {
      logSocketState('SESSION TOKEN ОЧИЩЕН', authData, 'Токен сессии удален');
    }
  });
};

// Инициализация пользователя при загрузке приложения
onMounted(() => {
  const { initUser } = useAuth();
  initUser();

  // Логируем начальное состояние аутентификации
  const initialAuthData = getAuthData();
  logSocketState(
    'ИНИЦИАЛИЗАЦИЯ ПРИЛОЖЕНИЯ',
    initialAuthData,
    'Начальная проверка состояния аутентификации'
  );

  // Инициализация сокетов с небольшой задержкой
  setTimeout(() => {
    // Проверяем состояние аутентификации перед подключением сокета
    const authData = getAuthData();
    logSocketState(
      'ПОПЫТКА ПОДКЛЮЧЕНИЯ СОКЕТА',
      authData,
      'Проверка данных перед подключением'
    );

    // Инициализируем сокеты
    initializeSockets();

    // Запускаем отслеживание изменений аутентификации
    watchAuthChanges();

    console.log('Root App: Socket initialization completed');
  }, 500);
});

onUnmounted(() => {
  // Отписываемся от всех событий сокета
  socketUnsubscribers.forEach((unsubscribe) => {
    if (typeof unsubscribe === 'function') {
      unsubscribe();
    }
  });
  socketUnsubscribers = [];
});
</script>

<style>
:root {
  --primary-color: #4ade80;
  --primary-dark: #22c55e;
  --primary-light: #86efac;
  --secondary-color: #f97316;
  --secondary-dark: #ea580c;
  --background-primary: #0f2027;
  --background-secondary: #203a43;
  --background-tertiary: #2c5364;
  --text-primary: rgba(255, 255, 255, 0.95);
  --text-secondary: rgba(255, 255, 255, 0.7);
  --text-muted: rgba(255, 255, 255, 0.5);
  --border-color: rgba(255, 255, 255, 0.15);
  --border-color-hover: rgba(255, 255, 255, 0.25);
  --error-color: #ef4444;
  --success-color: #22c55e;
  --warning-color: #f59e0b;
  --glass-bg: rgba(255, 255, 255, 0.05);
  --glass-border: rgba(255, 255, 255, 0.1);
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  --border-radius-sm: 8px;
  --border-radius-md: 12px;
  --border-radius-lg: 16px;
  --border-radius-xl: 24px;
  --border-radius-full: 9999px;
  --transition-fast: 0.15s ease;
  --transition-normal: 0.3s ease;
  --transition-slow: 0.5s ease;
}

#app {
  min-height: 100vh;
}

:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}
</style>
