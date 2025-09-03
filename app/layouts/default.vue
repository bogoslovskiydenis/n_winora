<template>
  <div class="layout">
    <a href="#main-content" class="skip-link">Перейти к основному содержанию</a>

    <!-- Desktop Sidebar -->
    <Sidebar
      v-if="showSidebar && !isMobile"
      :is-open="sidebarOpen"
      :user="user"
      @toggle="toggleSidebar"
      @logout="handleLogout"
      @navigate-home="navigateToMain"
    />

    <!-- Mobile Sidebar Overlay (для планшетов) -->
    <div
      v-if="sidebarOpen && isTablet && showSidebar"
      class="sidebar-overlay"
      @click="closeSidebar"
      aria-hidden="true"
    ></div>

    <!-- Tablet Sidebar -->
    <Sidebar
      v-if="showSidebar && isTablet"
      :is-open="sidebarOpen"
      :user="user"
      @toggle="toggleSidebar"
      @logout="handleLogout"
      @navigate-home="navigateToMain"
      class="sidebar--tablet"
    />

    <div
      class="main-wrapper"
      :class="{
        'main-wrapper--sidebar-open': sidebarOpen && !isMobile && showSidebar,
        'main-wrapper--no-sidebar': !showSidebar,
        'main-wrapper--mobile': isMobile && showSidebar,
      }"
    >
      <!-- Desktop/Tablet Header -->
      <Header
        v-if="showSidebar && !isMobile"
        :user="user"
        @toggle-sidebar="toggleSidebar"
      />

      <main
        id="main-content"
        class="main-content"
        :class="{ 'main-content--mobile': isMobile && showSidebar }"
      >
        <!-- Mobile Header внутри контента -->
        <MobileHeader
          v-if="showSidebar && isMobile"
          :user="user"
          :page-title="pageTitle"
          @navigate-home="navigateToMain"
          @top-up-balance="handleTopUpBalance"
          class="mobile-header--inline"
        />

        <slot />
      </main>
    </div>

    <!-- Mobile Bottom Navigation -->
    <MobileBottomNav
      v-if="showSidebar && isMobile"
      :user="user"
      :active-route="currentRoute"
      @logout="handleLogout"
      @navigate="handleNavigate"
    />
  </div>
</template>

<script setup>
const route = useRoute();
const { user, logoutUser } = useAuth();

const sidebarOpen = ref(false);
const windowWidth = ref(1200);

// Вычисляемые свойства для разных размеров экрана
const isMobile = computed(() => windowWidth.value < 768);
const isTablet = computed(
  () => windowWidth.value >= 768 && windowWidth.value < 1024
);
const isDesktop = computed(() => windowWidth.value >= 1024);

const showSidebar = computed(
  () => route.name !== 'login' && route.name !== 'registration'
);

// Определяем текущий активный роут для мобильной навигации
const currentRoute = computed(() => {
  const name = route.name;
  const path = route.path;

  // Маппинг роутов для мобильной навигации
  if (path.startsWith('/shop')) return 'shop';
  if (path.startsWith('/investments/create')) return 'investments-create';
  if (path.startsWith('/investments')) return 'investments';
  if (name === 'main') return 'main';

  return '';
});

// Определяем заголовок страницы для мобильного хедера
const pageTitle = computed(() => {
  const routeTitles = {
    main: 'Главная',
    shop: 'Магазин',
    investments: 'Инвестиции',
    'investments-create': 'Создать инвестицию',
    chests: 'Сундуки',
    roulette: 'Рулетка',
    rating: 'Рейтинг',
    profile: 'Профиль',
    support: 'Поддержка',
  };

  return routeTitles[currentRoute.value] || 'Winora';
});

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

const closeSidebar = () => {
  sidebarOpen.value = false;
};

const handleLogout = () => {
  logoutUser();
  closeSidebar();
};

const navigateToMain = () => {
  navigateTo('/');
  if (!isDesktop.value) {
    sidebarOpen.value = false;
  }
};

const handleNavigate = (route) => {
  navigateTo(route);
};

const handleTopUpBalance = () => {
  // Логика пополнения баланса
  console.log('Открываем страницу пополнения баланса');
  // Можно открыть модал или перейти на страницу пополнения
};

const handleResize = () => {
  windowWidth.value = window.innerWidth;

  // Автоматически закрываем сайдбар при смене размера экрана
  if (isMobile.value) {
    sidebarOpen.value = false;
  }
};

// Закрываем сайдбар при смене роута на мобильных и планшетах
watch(route, () => {
  if (!isDesktop.value) {
    sidebarOpen.value = false;
  }
});

// Блокируем скролл при открытом сайдбаре на планшетах
watch(sidebarOpen, (isOpen) => {
  if (isTablet.value) {
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
    { name: 'format-detection', content: 'telephone=no' },
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

.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: #4ade80;
  color: #0a2f23;
  padding: 8px 16px;
  text-decoration: none;
  border-radius: 4px;
  z-index: 1002;
  font-weight: 600;
  transition: top 0.3s ease;
}

.skip-link:focus {
  top: 6px;
}

/* Overlay для планшетов */
.sidebar-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 999;
  opacity: 0;
  animation: fadeIn 0.3s ease forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

/* Main wrapper */
.main-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 80px;
  transition: margin-left var(--transition-normal, 0.3s ease);
  min-height: 100vh;
}

.main-wrapper--sidebar-open {
  margin-left: 320px;
}

.main-wrapper--no-sidebar {
  margin-left: 0;
}

.main-wrapper--mobile {
  margin-left: 0;
  padding-bottom: 80px; /* Только место для мобильной навигации */
}

/* Main content */
.main-content {
  flex: 1;
  padding: 0;
  min-height: calc(100vh - 80px);
}

.main-content--mobile {
  min-height: calc(100vh - 80px); /* Только навигация снизу */
  padding-bottom: 0;
}

.main-wrapper--no-sidebar .main-content {
  min-height: 100vh;
}

/* Планшетные стили */
.sidebar--tablet {
  position: fixed;
  z-index: 1000;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
}

.sidebar--tablet.sidebar--open {
  transform: translateX(0);
}

/* Адаптивные стили */
@media (max-width: 1023px) {
  .main-wrapper {
    margin-left: 0;
  }

  .main-wrapper--sidebar-open {
    margin-left: 0;
  }
}

@media (max-width: 767px) {
  .main-content {
    min-height: calc(100vh - 70px);
  }

  .main-content--mobile {
    min-height: calc(100vh - 135px); /* Хедер + навигация */
  }
}

@media (max-width: 480px) {
  .main-wrapper--mobile {
    padding-bottom: 75px;
  }

  .main-content--mobile {
    min-height: calc(100vh - 75px);
  }
}

/* Состояния загрузки */
.layout.loading {
  pointer-events: none;
}

.layout.loading .main-content {
  opacity: 0.7;
}

/* Анимации */
.main-content {
  animation: fadeIn 0.5s ease;
}

/* Accessibility */
.main-content:focus {
  outline: none;
}

@media (prefers-color-scheme: dark) {
  /* Дополнительные темные стили если нужны */
}

@media (prefers-contrast: high) {
  .sidebar-overlay {
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .main-wrapper,
  .sidebar--tablet {
    transition: none;
  }

  .sidebar-overlay,
  .main-content {
    animation: none;
  }
}

/* Стили для состояний фокуса */
@media (min-width: 1024px) {
  .main-wrapper:focus-within {
    outline: 2px solid #4ade80;
    outline-offset: 2px;
  }
}
</style>
