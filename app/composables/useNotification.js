export const useNotification = () => {
  const notifications = ref([]);

  // Добавление уведомления
  const addNotification = (notification) => {
    const id = Date.now() + Math.random();
    const newNotification = {
      id,
      type: 'info',
      duration: 4000,
      ...notification,
    };

    notifications.value.push(newNotification);

    // Автозакрытие
    if (newNotification.duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, newNotification.duration);
    }

    return id;
  };

  // Удаление уведомления
  const removeNotification = (id) => {
    const index = notifications.value.findIndex((n) => n.id === id);
    if (index > -1) {
      notifications.value.splice(index, 1);
    }
  };

  // Очистка всех уведомлений
  const clearNotifications = () => {
    notifications.value = [];
  };

  // Вспомогательные функции для разных типов уведомлений
  const showSuccess = (message, title = '', duration = 4000) => {
    return addNotification({
      type: 'success',
      title,
      message,
      duration,
    });
  };

  const showError = (message, title = '', duration = 6000) => {
    return addNotification({
      type: 'error',
      title,
      message,
      duration,
    });
  };

  const showWarning = (message, title = '', duration = 5000) => {
    return addNotification({
      type: 'warning',
      title,
      message,
      duration,
    });
  };

  const showInfo = (message, title = '', duration = 4000) => {
    return addNotification({
      type: 'info',
      title,
      message,
      duration,
    });
  };

  return {
    notifications: readonly(notifications),
    addNotification,
    removeNotification,
    clearNotifications,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
};
