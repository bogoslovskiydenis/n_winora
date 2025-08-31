// utils/errorHandler.js
export const handleApiError = (error, context = '') => {
  console.error(`API Error ${context}:`, error);

  // Определяем тип ошибки и возвращаем понятное сообщение
  if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
    return {
      message:
        'Проблема с подключением к серверу. Проверьте интернет-соединение.',
      code: 'CONNECTION_ERROR',
    };
  }

  if (error.message.includes('400')) {
    return {
      message: 'Некорректные данные. Проверьте правильность заполнения полей.',
      code: 'BAD_REQUEST',
    };
  }

  if (error.message.includes('401')) {
    return {
      message: 'Неверные учетные данные или сессия истекла.',
      code: 'UNAUTHORIZED',
    };
  }

  if (error.message.includes('403')) {
    return {
      message: 'Доступ запрещен. Возможно, аккаунт не подтвержден.',
      code: 'FORBIDDEN',
    };
  }

  if (error.message.includes('404')) {
    return {
      message: 'Ресурс не найден. Возможно, ссылка устарела.',
      code: 'NOT_FOUND',
    };
  }

  if (error.message.includes('429')) {
    return {
      message: 'Слишком много запросов. Попробуйте позже.',
      code: 'RATE_LIMIT',
    };
  }

  if (error.message.includes('500')) {
    return {
      message:
        'Внутренняя ошибка сервера. Мы уже работаем над устранением проблемы.',
      code: 'SERVER_ERROR',
    };
  }
};
// Возвращ
