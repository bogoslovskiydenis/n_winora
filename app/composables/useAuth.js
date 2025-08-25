export const useAuth = () => {
    const user = ref(null)

    // Инициализация пользователя из localStorage/sessionStorage
    const initUser = () => {
        if (process.client) {
            const savedUser = localStorage.getItem('user') || sessionStorage.getItem('user')
            if (savedUser) {
                try {
                    user.value = JSON.parse(savedUser)
                } catch (error) {
                    console.error('Ошибка при загрузке данных пользователя:', error)
                    localStorage.removeItem('user')
                    sessionStorage.removeItem('user')
                }
            }
        }
    }

    // Авторизация пользователя
    const loginUser = (userData, rememberMe = false) => {
        user.value = userData
        if (process.client) {
            const storage = rememberMe ? localStorage : sessionStorage
            storage.setItem('user', JSON.stringify(userData))
        }
        navigateTo('/main')
    }

    // Выход пользователя
    const logoutUser = () => {
        user.value = null
        if (process.client) {
            localStorage.removeItem('user')
            sessionStorage.removeItem('user')
        }
        navigateTo('/auth')
    }

    // Проверка авторизации
    const isAuthenticated = computed(() => !!user.value)

    // Получение текущего пользователя
    const getCurrentUser = () => user.value

    return {
        user: readonly(user),
        initUser,
        loginUser,
        logoutUser,
        isAuthenticated,
        getCurrentUser
    }
}