export default defineNuxtRouteMiddleware((to) => {
    const { isAuthenticated } = useAuth()

    // Проверяем авторизацию на клиенте
    if (process.client) {
        if (!isAuthenticated.value) {
            return navigateTo('/auth')
        }
    }
})