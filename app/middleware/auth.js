// middleware/auth.js
export default defineNuxtRouteMiddleware((to, from) => {
    const { isAuthenticated, initUser } = useAuth()

    // Инициализируем пользователя если еще не сделали
    if (process.client && !isAuthenticated.value) {
        initUser()
    }

    // Даем время на инициализацию в браузере
    if (process.client) {
        // Проверяем есть ли данные в хранилище
        const savedUser = localStorage.getItem('user') || sessionStorage.getItem('user')

        if (!savedUser) {
            console.log('Auth middleware: No user found, redirecting to auth')
            return navigateTo('/auth')
        }

        // Если данные есть, но useAuth еще не инициализирован
        if (!isAuthenticated.value) {
            // Пробуем еще раз инициализировать
            initUser()

            // Если все еще не авторизован - редирект
            if (!isAuthenticated.value) {
                console.log('Auth middleware: User initialization failed')
                return navigateTo('/auth')
            }
        }
    }

    // На сервере просто пропускаем (SSR)
    if (process.server) {
        return
    }
})