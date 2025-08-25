<template>
  <div class="layout">
    <Sidebar
        v-if="showSidebar"
        :is-open="sidebarOpen"
        :user="user"
        @toggle="toggleSidebar"
        @logout="handleLogout"
        @navigate-home="navigateToMain"
    />

    <div v-if="sidebarOpen && isMobile && showSidebar" class="sidebar-overlay" @click="closeSidebar"></div>

    <div class="main-wrapper" :class="{
      'main-wrapper--sidebar-open': sidebarOpen && !isMobile && showSidebar,
      'main-wrapper--no-sidebar': !showSidebar
    }">
      <Header v-if="showSidebar" :user="user" />
      <slot />
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { user, logoutUser } = useAuth()

// Состояние компонента
const sidebarOpen = ref(false)
const windowWidth = ref(1200)

// Computed properties
const isMobile = computed(() => windowWidth.value < 1024)
const showSidebar = computed(() => route.name !== 'auth' && route.name !== 'index')

// Методы
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const closeSidebar = () => {
  sidebarOpen.value = false
}

const handleLogout = () => {
  logoutUser()
}

const navigateToMain = () => {
  navigateTo('/main')
  if (isMobile.value) {
    sidebarOpen.value = false
  }
}

const handleResize = () => {
  windowWidth.value = window.innerWidth
  if (!isMobile.value) {
    sidebarOpen.value = false
  }
}

// Закрываем сайдбар при переходе на мобильных
watch(route, () => {
  if (isMobile.value) {
    sidebarOpen.value = false
  }
})

// Lifecycle
onMounted(() => {
  windowWidth.value = window.innerWidth
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.layout {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f2027 0%, #203a43 30%, #2c5364 100%);
  color: var(--text-primary);
  display: flex;
  position: relative;
}

/* Sidebar Overlay */
.sidebar-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

/* Main Wrapper */
.main-wrapper {
  flex: 1;
  margin-left: 80px;
  transition: margin-left 0.3s ease;
}

.main-wrapper--sidebar-open {
  margin-left: 320px;
}

.main-wrapper--no-sidebar {
  margin-left: 0;
}

/* Mobile Responsive */
@media (max-width: 1023px) {
  .main-wrapper {
    margin-left: 0;
  }

  .main-wrapper--sidebar-open {
    margin-left: 0;
  }
}
</style>