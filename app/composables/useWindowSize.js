export const useWindowSize = () => {
    const windowWidth = useState('windowWidth', () => process.client ? window.innerWidth : 1200)
    const isMobile = computed(() => windowWidth.value < 1024)

    const handleResize = () => {
        windowWidth.value = window.innerWidth
    }

    onMounted(() => {
        if (process.client) {
            window.addEventListener('resize', handleResize)
        }
    })

    onUnmounted(() => {
        if (process.client) {
            window.removeEventListener('resize', handleResize)
        }
    })

    return { windowWidth, isMobile }
}