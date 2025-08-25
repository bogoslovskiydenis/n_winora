export default defineNuxtPlugin(() => {
    const { loginUser, logoutUser, getCurrentUser } = useAuth()

    // Регистрируем глобальные функции для совместимости
    if (process.client) {
        window.loginUser = loginUser
        window.logoutUser = logoutUser
        window.getCurrentUser = getCurrentUser
    }
})