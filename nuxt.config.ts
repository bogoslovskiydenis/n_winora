export default defineNuxtConfig({
  devtools: { enabled: true },

  // CSS конфигурация
  css: ['~/assets/css/main.css'],

  // Компоненты
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  // Настройки приложения
  app: {
    head: {
      title: 'Winora - Инвестиционная платформа',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Winora - современная платформа для инвестиций и торговли',
        },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        // Google Fonts - первый набор (Roboto и Tomorrow)
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&family=Tomorrow:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap',
        },
        // Google Fonts - второй набор (только Tomorrow)
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Tomorrow:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap',
        },
      ],
    },
  },

  // Настройки SSR
  ssr: true,

  // Настройки роутера
  router: {
    options: {
      linkActiveClass: 'nuxt-link-active',
      linkExactActiveClass: 'nuxt-link-exact-active',
    },
  },

  // Переменные среды
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL || 'https://api.dev-site.site/api',
    },
  },

  // Настройки сборки
  nitro: {
    routeRules: {
      // Страница подтверждения email не должна кэшироваться
      '/confirmation/**': {
        ssr: false,
        headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate' },
      },
      // Страницы авторизации
      '/login': {
        ssr: false,
      },
      '/register': {
        ssr: false,
      },
      '/registration': {
        ssr: false,
      },
      // Главная страница (теперь это /)
      '/': {
        ssr: false,
        prerender: false,
      },
      // Редирект со старого /main
      '/main': {
        ssr: false,
        prerender: false,
      },
      // Статические ресурсы
      '/assets/**': {
        headers: { 'Cache-Control': 'max-age=31536000' },
      },
    },
  },

  // Экспериментальные функции
  experimental: {
    payloadExtraction: false,
  },
});
