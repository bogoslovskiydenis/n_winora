<template>
  <div class="main-page">
    <div
      class="main-wrapper"
      :class="{ 'main-wrapper--sidebar-open': sidebarOpen && !isMobile }"
    >
      <MainContent :current-section="getCurrentSection()" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import MainContent from '../components/main/MainContent.vue';

const props = defineProps({
  user: {
    type: Object,
    default: () => ({}),
  },
  activeSection: {
    type: String,
    default: 'main',
  },
});

const emit = defineEmits(['logout']);

const route = useRoute();
const router = useRouter();

// Состояние компонента
const sidebarOpen = ref(false);
const windowWidth = ref(
  typeof window !== 'undefined' ? window.innerWidth : 1200
);

// Computed properties
const isMobile = computed(() => windowWidth.value < 1024);

// Методы
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

const closeSidebar = () => {
  sidebarOpen.value = false;
};

const handleLogout = () => {
  window.logoutUser();
};

const navigateToMain = () => {
  router.push('/main');
  if (isMobile.value) {
    sidebarOpen.value = false;
  }
};

const getCurrentSection = () => {
  if (props.activeSection) {
    return props.activeSection;
  }

  const routeMap = {
    Main: 'main',
    Investments: 'investments',
    Chests: 'chests',
    Roulette: 'roulette',
    Shop: 'shop',
    Rating: 'rating',
    Profile: 'profile',
    Support: 'support',
  };

  return routeMap[route.name] || 'main';
};

const handleResize = () => {
  windowWidth.value = window.innerWidth;
  if (!isMobile.value) {
    sidebarOpen.value = false;
  }
};

// Закрываем сайдбар при переходе на мобильных
watch(route, () => {
  if (isMobile.value) {
    sidebarOpen.value = false;
  }
});

// Lifecycle
onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', handleResize);
  }
});

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', handleResize);
  }
});
</script>

<style scoped>
.main-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #01614b, #032019 70%);
  color: var(--text-primary);
  display: flex;
  position: relative;
}

/* Main Wrapper */
.main-wrapper {
  flex: 1;
  transition: margin-left 0.3s ease;
}

.main-wrapper--sidebar-open {
  margin-left: 320px;
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
