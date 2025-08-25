export default defineNuxtConfig({
  devtools: { enabled: true },

  // CSS файлы
  css: ['~/assets/css/main.css'],

  // Конфигурация приложения
  app: {
    head: {
      title: 'Winora - Инвестиционная платформа',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Winora - современная инвестиционная платформа с высокой доходностью'
        }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  // SPA режим (без серверного рендеринга)
  ssr: false,

  // Автоматический импорт компонентов
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    }
  ],

  // Конфигурация сборки
  nitro: {
    preset: 'static'
  },

  // Экспериментальные функции
  experimental: {
    payloadExtraction: false
  },

  // Конфигурация рантайма
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL || 'http://localhost:3000'
    }
  }
})