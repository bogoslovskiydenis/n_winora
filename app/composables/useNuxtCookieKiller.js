// composables/useNuxtCookieKiller.js
export const useNuxtCookieKiller = () => {
  // Агрессивная очистка Nuxt cookies
  const killAllNuxtCookies = () => {
    if (!process.client) return;

    console.log('🔥 Запуск агрессивной очистки Nuxt cookies...');

    // 1. Очистка через useCookie (правильный способ для Nuxt)
    try {
      const userCookie = useCookie('user');
      const sessionCookie = useCookie('sessionToken');

      userCookie.value = null;
      sessionCookie.value = null;

      console.log('✅ Nuxt cookies очищены через useCookie');
    } catch (e) {
      console.error('Ошибка очистки через useCookie:', e);
    }

    // 2. Принудительная очистка через document.cookie с разными вариантами
    const cookieNames = ['user', 'sessionToken', 'session', 'auth', 'token'];
    const domains = ['', 'localhost', '127.0.0.1', window.location.hostname];
    const paths = ['/', '/login', '/main'];
    const sameSiteOptions = ['', 'Strict', 'Lax', 'None'];

    cookieNames.forEach((name) => {
      domains.forEach((domain) => {
        paths.forEach((path) => {
          sameSiteOptions.forEach((sameSite) => {
            // Формируем разные варианты удаления cookie
            const variations = [
              `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};`,
              `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}; domain=${domain};`,
              `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}; domain=${domain}; SameSite=${sameSite};`,
              `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}; SameSite=${sameSite};`,
              `${name}=; Max-Age=0; path=${path};`,
              `${name}=; Max-Age=0; path=${path}; domain=${domain};`,
            ];

            variations.forEach((cookieString) => {
              try {
                if (cookieString.trim()) {
                  document.cookie = cookieString;
                }
              } catch (e) {
                // Игнорируем ошибки
              }
            });
          });
        });
      });
    });

    // 3. Очистка всех cookies начинающихся с определенных префиксов
    if (document.cookie) {
      const allCookies = document.cookie.split(';');
      allCookies.forEach((cookie) => {
        const [name] = cookie.trim().split('=');
        if (
          name &&
          (name.includes('user') ||
            name.includes('session') ||
            name.includes('auth') ||
            name.includes('token') ||
            name.startsWith('nuxt-') ||
            name.startsWith('__'))
        ) {
          // Удаляем найденный cookie всеми возможными способами
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
          document.cookie = `${name}=; Max-Age=0; path=/;`;
          console.log(`🗑️ Принудительно удален cookie: ${name}`);
        }
      });
    }

    // 4. Агрессивная очистка localStorage и sessionStorage
    try {
      // Сначала удаляем конкретные ключи
      const storageKeys = [
        'currentUser',
        'user',
        'sessionToken',
        'session',
        'auth',
        'token',
        'authToken',
      ];
      storageKeys.forEach((key) => {
        localStorage.removeItem(key);
        sessionStorage.removeItem(key);
        console.log(`🗑️ Удален storage ключ: ${key}`);
      });

      // Затем ищем и удаляем все ключи содержащие auth данные
      Object.keys(localStorage).forEach((key) => {
        if (
          key.includes('user') ||
          key.includes('session') ||
          key.includes('auth') ||
          key.includes('token') ||
          key.includes('login') ||
          key.includes('id')
        ) {
          localStorage.removeItem(key);
          console.log(`🗑️ Найден и удален localStorage ключ: ${key}`);
        }
      });

      Object.keys(sessionStorage).forEach((key) => {
        if (
          key.includes('user') ||
          key.includes('session') ||
          key.includes('auth') ||
          key.includes('token') ||
          key.includes('login') ||
          key.includes('id')
        ) {
          sessionStorage.removeItem(key);
          console.log(`🗑️ Найден и удален sessionStorage ключ: ${key}`);
        }
      });

      // Полная очистка для guarantee
      localStorage.clear();
      sessionStorage.clear();

      console.log('✅ localStorage и sessionStorage полностью очищены');
    } catch (e) {
      console.error('Ошибка очистки storage:', e);
    }

    // 5. Проверяем результат
    setTimeout(() => {
      const remainingCookies = document.cookie;
      console.log(
        'Оставшиеся cookies после агрессивной очистки:',
        remainingCookies
      );

      if (
        remainingCookies.includes('user') ||
        remainingCookies.includes('session')
      ) {
        console.warn(
          '⚠️ Некоторые cookies все еще остались, пробуем reload страницы'
        );
        // Принудительная перезагрузка если cookies не удалились
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        console.log('✅ Все auth cookies успешно удалены');
      }
    }, 1000);
  };

  // Функция для перезагрузки страницы с очисткой кеша
  const forceReloadAndClear = () => {
    if (!process.client) return;

    console.log('🔄 Принудительная перезагрузка с очисткой...');

    // Очищаем все что можно
    killAllNuxtCookies();

    // Перезагружаем страницу с очисткой кеша
    setTimeout(() => {
      window.location.href = window.location.origin + '/login?cleared=true';
    }, 1000);
  };

  return {
    killAllNuxtCookies,
    forceReloadAndClear,
  };
};
