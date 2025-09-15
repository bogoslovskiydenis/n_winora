<template>
  <div class="layout">
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
      @toggle-menu="handleToggleMobileMenu"
    />

    <!-- Mobile Menu -->
    <MobileMenu
      v-if="showSidebar && isMobile"
      :show-menu="mobileMenuOpen"
      :user="user"
      @close="closeMobileMenu"
      @logout="handleLogout"
      @navigate-home="navigateToMain"
    />
  </div>
</template>

<script setup>
import MobileHeader from './../components/layout/MobileHeader.vue';
import Header from './../components/layout/Header.vue';
import Sidebar from './../components/layout/Sidebar.vue';
import MobileBottomNav from './../components/layout/MobileBottomNav.vue';
import MobileMenu from './../components/layout/MobileMenu.vue';

const route = useRoute();
const router = useRouter();

// Реактивные данные
const sidebarOpen = ref(false);
const mobileMenuOpen = ref(false);
const user = ref({
  nickname: 'ArcticPulse',
  email: 'email@host.com',
  balance: 150000,
  level: 2,
  isVerified: false,
});

// Вычисляемые свойства
const isMobile = ref(false);
const isTablet = ref(false);
const showSidebar = ref(true);
const currentRoute = computed(() => route.name);
const pageTitle = computed(() => {
  const titles = {
    index: 'Главная',
    investments: 'Инвестиции',
    'investments-create': 'Создать инвестицию',
    chest: 'Сундуки',
    spin: 'Рулетка',
    profile: 'Профиль',
    wallet: 'Кошелек',
    basket: 'Корзина',
    rating: 'Рейтинг',
    support: 'Поддержка',
    shop: 'Магазин',
  };
  return titles[route.name] || 'Winora';
});

// Методы
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

const closeSidebar = () => {
  sidebarOpen.value = false;
};

const handleToggleMobileMenu = (isOpen) => {
  mobileMenuOpen.value = isOpen;
};

const closeMobileMenu = () => {
  mobileMenuOpen.value = false;
};

const handleLogout = () => {
  // Логика выхода
  console.log('Выход из системы');
  closeSidebar();
  closeMobileMenu();
  // Редирект на страницу входа
  router.push('/login');
};

const navigateToMain = () => {
  router.push('/');
  closeSidebar();
  closeMobileMenu();
};

const handleTopUpBalance = () => {
  // Логика пополнения баланса
  console.log('Пополнение баланса');
  router.push('/wallet?action=topup');
};

// Определение размера экрана
const updateScreenSize = () => {
  const width = window.innerWidth;
  isMobile.value = width < 768;
  isTablet.value = width >= 768 && width < 1024;

  // Автоматически закрываем сайдбар на мобильных после навигации
  if (isMobile.value) {
    sidebarOpen.value = false;
  }
};

// Обработка изменения роута
watch(
  () => route.path,
  () => {
    if (isMobile.value) {
      closeSidebar();
      closeMobileMenu();
    }
  }
);

// Lifecycle hooks
onMounted(() => {
  updateScreenSize();
  window.addEventListener('resize', updateScreenSize);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateScreenSize);
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
