<template>
  <div class="layout">
    <a href="#main-content" class="skip-link">Перейти к основному содержанию</a>

    <Sidebar
      v-if="showSidebar"
      :is-open="sidebarOpen"
      :user="user"
      @toggle="toggleSidebar"
      @logout="handleLogout"
      @navigate-home="navigateToMain"
    />

    <div
      v-if="sidebarOpen && isMobile && showSidebar"
      class="sidebar-overlay"
      @click="closeSidebar"
      aria-hidden="true"
    ></div>

    <div
      class="main-wrapper"
      :class="{
        'main-wrapper--sidebar-open': sidebarOpen && !isMobile && showSidebar,
        'main-wrapper--no-sidebar': !showSidebar,
      }"
    >
      <Header v-if="showSidebar" :user="user" />

      <main id="main-content" class="main-content">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const { user, logoutUser } = useAuth();

const sidebarOpen = ref(false);
const windowWidth = ref(1200);

const isMobile = computed(() => windowWidth.value < 1024);
const showSidebar = computed(
  () => route.name !== 'auth' && route.name !== 'index'
);

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

const closeSidebar = () => {
  sidebarOpen.value = false;
};

const handleLogout = () => {
  logoutUser();
};

const navigateToMain = () => {
  navigateTo('/main');
  if (isMobile.value) {
    sidebarOpen.value = false;
  }
};

const handleResize = () => {
  windowWidth.value = window.innerWidth;
  if (!isMobile.value) {
    sidebarOpen.value = false;
  }
};

watch(route, () => {
  if (isMobile.value) {
    sidebarOpen.value = false;
  }
});

watch(sidebarOpen, (isOpen) => {
  if (isMobile.value) {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
});

onMounted(() => {
  windowWidth.value = window.innerWidth;
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  document.body.style.overflow = '';
});

// SEO и метаданные
useHead({
  htmlAttrs: {
    lang: 'ru',
  },
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'theme-color', content: '#4ade80' },
  ],
});
</script>

<style scoped>
.layout {
  min-height: 100vh;
  color: var(--text-primary);
  display: flex;
  position: relative;
}

.sidebar-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 999;
  opacity: 0;
  animation: fadeIn 0.3s ease forwards;
}

.main-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 80px;
  transition: margin-left var(--transition-normal);
  min-height: 100vh;
}

.main-wrapper--sidebar-open {
  margin-left: 320px;
}

.main-wrapper--no-sidebar {
  margin-left: 0;
}

.main-content {
  flex: 1;
  padding: 0;
  min-height: calc(100vh - 80px); /* Учитываем высоту хедера */
}

.main-wrapper--no-sidebar .main-content {
  min-height: 100vh;
}

@media (max-width: 1023px) {
  .main-wrapper {
    margin-left: 0;
  }

  .main-wrapper--sidebar-open {
    margin-left: 0;
  }
}

@media (max-width: 480px) {
  .main-content {
    min-height: calc(100vh - 70px);
  }
}

.layout.loading {
  pointer-events: none;
}

.layout.loading .main-content {
  opacity: 0.7;
}

.main-content {
  animation: fadeIn 0.5s ease;
}

.sidebar-overlay[aria-hidden='true'] {
}

.main-content:focus {
  outline: none;
}

@media (prefers-color-scheme: dark) {
}

@media (prefers-contrast: high) {
  .sidebar-overlay {
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .main-wrapper {
    transition: none;
  }

  .sidebar-overlay {
    animation: none;
    opacity: 1;
  }

  .main-content {
    animation: none;
  }
}
</style>
