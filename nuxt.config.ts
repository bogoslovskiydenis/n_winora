// nuxt.config.ts (или nuxt.config.js)
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
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
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
        index: false,
        headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate' },
      },
      // Страница авторизации
      '/auth': {
        ssr: false,
        index: false,
      },
      // Главная страница
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
