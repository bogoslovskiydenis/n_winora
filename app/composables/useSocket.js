import { io } from 'socket.io-client';

let socketInstance = null;
let connectionAttempts = 0;
const maxConnectionAttempts = 5;

export const useSocket = () => {
  const socketId = ref(null);
  const isConnected = ref(false);
  const connectionError = ref(null);
  const adminUsersCount = ref(0);

  // Создание подключения к сокету
  const createSocketConnection = () => {
    if (process.server) return null;

    // ИСПРАВЛЕНО: Получаем данные из системы аутентификации, а не из localStorage
    const { user, sessionToken, isAuthenticated } = useAuth();

    if (!isAuthenticated.value) {
      console.log('Socket: User not authenticated, skipping connection');
      return null;
    }

    const userData = user.value;
    const session = sessionToken.value;

    const userId = userData?.id || '';

    if (!userId || !session) {
      console.log('Socket: Missing userId or session, skipping connection');
      return null;
    }

    console.log('Socket: Creating connection for authenticated user:', userId);

    // Если сокет уже существует и подключен
    if (socketInstance && socketInstance.connected) {
      console.log('Socket: Reusing existing connection');
      return socketInstance;
    }

    // Отключаем старое соединение если есть
    if (socketInstance) {
      socketInstance.disconnect();
    }

    // Создаем новое соединение
    socketInstance = io('https://api.dev-site.site', {
      path: '/api/socket.io',
      withCredentials: true,
      transports: ['websocket', 'polling'],
      timeout: 10000,
      auth: {
        userId,
        session,
        location: 'front',
      },
    });

    // Обработчики событий
    socketInstance.on('connect', () => {
      console.log('Socket: Connected successfully with ID:', socketInstance.id);
      socketId.value = socketInstance.id;
      isConnected.value = true;
      connectionError.value = null;
      connectionAttempts = 0;
    });

    socketInstance.on('disconnect', (reason) => {
      console.log('Socket: Disconnected:', reason);
      socketId.value = null;
      isConnected.value = false;

      // Автоматическое переподключение только для определенных причин
      if (reason === 'io server disconnect') {
        console.log('Socket: Server disconnected, will not auto-reconnect');
      }
    });

    socketInstance.on('connect_error', (error) => {
      console.error('Socket: Connection error:', error);
      connectionError.value = error.message;
      connectionAttempts++;

      if (connectionAttempts >= maxConnectionAttempts) {
        console.error('Socket: Max connection attempts reached');
      }
    });

    socketInstance.on('admin_users_count', (count) => {
      console.log('Socket: Admin users count changed:', count);
      adminUsersCount.value = count;
    });

    socketInstance.on('notification', (data) => {
      console.log('Socket: New notification received:', data);
      // Тут можно добавить обработку уведомлений через store
      if (process.client && window.showNotification) {
        window.showNotification(data);
      }
    });

    return socketInstance;
  };

  // Подключение к сокету
  const connect = () => {
    if (process.server) return;

    // ИСПРАВЛЕНО: Проверяем аутентификацию через композабл
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated.value) {
      console.log('Socket: Cannot connect - user not authenticated');
      return;
    }

    if (!socketInstance || !socketInstance.connected) {
      createSocketConnection();
    }
  };

  // Отключение от сокета
  const disconnect = () => {
    if (socketInstance) {
      console.log('Socket: Manual disconnect');
      socketInstance.disconnect();
      socketInstance = null;
      socketId.value = null;
      isConnected.value = false;
    }
  };

  // Переподключение
  const reconnect = () => {
    disconnect();
    setTimeout(() => {
      connect();
    }, 1000);
  };

  // Отправка сообщения через сокет
  const emit = (event, data) => {
    if (socketInstance && socketInstance.connected) {
      console.log(`Socket: Emitting event "${event}"`, data);
      socketInstance.emit(event, data);
      return true;
    } else {
      console.warn(`Socket: Cannot emit "${event}" - not connected`);
      return false;
    }
  };

  // Подписка на событие
  const on = (event, callback) => {
    if (socketInstance) {
      console.log(`Socket: Subscribing to event "${event}"`);
      socketInstance.on(event, callback);
    }
  };

  // Отписка от события
  const off = (event, callback) => {
    if (socketInstance) {
      console.log(`Socket: Unsubscribing from event "${event}"`);
      socketInstance.off(event, callback);
    }
  };

  // Получение текущего экземпляра сокета
  const getSocket = () => socketInstance;

  return {
    // Состояние
    socketId: readonly(socketId),
    isConnected: readonly(isConnected),
    connectionError: readonly(connectionError),
    adminUsersCount: readonly(adminUsersCount),

    // Методы
    connect,
    disconnect,
    reconnect,
    emit,
    on,
    off,
    getSocket,
  };
};
