<template>
  <nav
    class="mobile-bottom-nav"
    :class="{ 'mobile-bottom-nav--hidden': !isVisible }"
  >
    <NuxtLink
      to="/shop"
      class="nav-item"
      :class="{ 'nav-item--active': activeRoute === 'shop' }"
    >
      <div class="nav-item__icon-wrapper">
        <div class="nav-item__icon">🛒</div>
        <span v-if="shopBadge" class="nav-item__badge red">{{
          shopBadge
        }}</span>
      </div>
      <span class="nav-item__label">Магазин</span>
    </NuxtLink>

    <NuxtLink
      to="/investments/create"
      class="nav-item"
      :class="{ 'nav-item--active': activeRoute === 'investments-create' }"
    >
      <div class="nav-item__icon-wrapper">
        <div class="nav-item__icon nav-item__icon--create">⊕</div>
      </div>
      <span class="nav-item__label">Создать<br />инвестицию</span>
    </NuxtLink>

    <NuxtLink
      to="/investments"
      class="nav-item"
      :class="{ 'nav-item--active': activeRoute === 'investments' }"
    >
      <div class="nav-item__icon-wrapper">
        <div class="nav-item__icon">💼</div>
        <span v-if="investmentsBadge" class="nav-item__badge green">{{
          investmentsBadge
        }}</span>
      </div>
      <span class="nav-item__label">Мои<br />инвестиции</span>
    </NuxtLink>

    <button
      class="nav-item nav-item--menu"
      :class="{ 'nav-item--active': showMenu }"
      @click="toggleMenu"
    >
      <div class="nav-item__icon-wrapper">
        <div class="nav-item__icon">☰</div>
      </div>
      <span class="nav-item__label">Меню</span>
    </button>

    <!-- Выдвижное меню -->
    <Transition name="menu-slide">
      <div v-if="showMenu" class="mobile-menu-overlay" @click="closeMenu">
        <div class="mobile-menu" @click.stop>
          <div class="mobile-menu__header">
            <h3 class="mobile-menu__title">Меню</h3>
            <button class="mobile-menu__close" @click="closeMenu">×</button>
          </div>

          <div class="mobile-menu__content">
            <!-- Основные разделы -->
            <div class="menu-section">
              <NuxtLink to="/main" class="menu-item" @click="closeMenu">
                <div class="menu-item__icon">🏠</div>
                <span class="menu-item__text">Главная</span>
              </NuxtLink>

              <NuxtLink to="/chests" class="menu-item" @click="closeMenu">
                <div class="menu-item__icon">📦</div>
                <span class="menu-item__text">Сундуки</span>
                <span class="menu-item__badge green">3</span>
              </NuxtLink>

              <NuxtLink to="/roulette" class="menu-item" @click="closeMenu">
                <div class="menu-item__icon">🎰</div>
                <span class="menu-item__text">Рулетка</span>
              </NuxtLink>

              <NuxtLink to="/rating" class="menu-item" @click="closeMenu">
                <div class="menu-item__icon">👤</div>
                <span class="menu-item__text">Рейтинг</span>
                <div class="menu-item__level">{{ userLevel || '1' }}</div>
              </NuxtLink>
            </div>

            <div class="menu-divider"></div>

            <!-- Профиль и настройки -->
            <div class="menu-section">
              <NuxtLink to="/profile" class="menu-item" @click="closeMenu">
                <div class="menu-item__icon">⚙️</div>
                <span class="menu-item__text">Профиль</span>
              </NuxtLink>

              <NuxtLink to="/support" class="menu-item" @click="closeMenu">
                <div class="menu-item__icon">💬</div>
                <span class="menu-item__text">Служба поддержки</span>
                <span class="menu-item__badge green">?</span>
              </NuxtLink>
            </div>

            <div class="menu-divider"></div>

            <!-- Дополнительные функции -->
            <div class="menu-section">
              <button class="menu-item referral-btn" @click="handleReferral">
                <div class="menu-item__icon">🔗</div>
                <span class="menu-item__text">Реферальная ссылка</span>
                <span class="menu-item__arrow">→</span>
              </button>

              <button class="menu-item logout-btn" @click="handleLogout">
                <div class="menu-item__icon">🚪</div>
                <span class="menu-item__text">Выход</span>
              </button>
            </div>

            <!-- Предупреждение о верификации -->
            <div v-if="!isVerified" class="verification-warning">
              <span class="warning-icon">⚠️</span>
              <div class="warning-text">
                <span>Верификация аккаунта</span>
                Подтвердите свою личность, чтобы получить доступ ко всем
                возможностям
                <button class="warning-link" @click="handleVerification">
                  Подтвердить
                </button>
              </div>
            </div>

            <!-- Баланс -->
            <div class="mobile-balance">
              <div class="balance-item">
                <span class="balance-label">Баланс</span>
                <span class="balance-value">{{ userBalance || '0' }}₽</span>
              </div>
              <div class="balance-item">
                <span class="balance-label">Кошельков</span>
                <span class="balance-count">{{ walletCount || '0' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  user: {
    type: Object,
    default: () => ({}),
  },
  activeRoute: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['logout', 'navigate']);

// Состояние компонента
const showMenu = ref(false);
const isVisible = ref(true);
const lastScrollY = ref(0);

// Вычисляемые свойства
const userLevel = computed(() => props.user?.level);
const userBalance = computed(() => props.user?.balance);
const walletCount = computed(() => props.user?.walletCount);
const isVerified = computed(() => props.user?.isVerified || false);

// Бейджи для уведомлений (можно получать из store или API)
const shopBadge = ref(null);
const investmentsBadge = ref(null);

// Методы
const toggleMenu = () => {
  showMenu.value = !showMenu.value;

  // Блокируем скролл при открытом меню
  if (showMenu.value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
};

const closeMenu = () => {
  showMenu.value = false;
  document.body.style.overflow = '';
};

const handleLogout = () => {
  closeMenu();
  emit('logout');
};

const handleReferral = () => {
  // Логика копирования реферальной ссылки
  console.log('Копируем реферальную ссылку');
  closeMenu();
};

const handleVerification = () => {
  // Переход к странице верификации
  navigateTo('/profile?tab=verification');
  closeMenu();
};

// Закрытие меню при смене роута
watch(
  () => props.activeRoute,
  () => {
    closeMenu();
  }
);

// Lifecycle hooks
onMounted(() => {
  // Убираем обработчик скролла - навигация всегда видна
});

onUnmounted(() => {
  document.body.style.overflow = '';
});
</script>

<style scoped>
/* Основная навигация */
.mobile-bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 8px 0 calc(8px + env(safe-area-inset-bottom));
  display: flex;
  justify-content: space-around;
  align-items: center;
  /* Убираем трансформацию - навигация всегда видна */
}

/* Элементы навигации */
.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 12px;
  transition: all 0.3s ease;
  min-width: 60px;
  background: none;
  border: none;
  font-family: inherit;
  cursor: pointer;
}

.nav-item:hover,
.nav-item--active {
  color: #4ade80;
  background: rgba(74, 222, 128, 0.1);
}

.nav-item__icon-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-item__icon {
  font-size: 20px;
  line-height: 1;
}

.nav-item__icon--create {
  background: #4ade80;
  color: #0a2f23;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  box-shadow: 0 4px 12px rgba(74, 222, 128, 0.3);
}

.nav-item__label {
  font-size: 10px;
  font-weight: 600;
  text-align: center;
  line-height: 1.2;
  letter-spacing: 0.3px;
}

.nav-item__badge {
  position: absolute;
  top: -4px;
  right: -4px;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 8px;
  min-width: 16px;
  text-align: center;
  font-weight: 700;
  line-height: 1;
}

.nav-item__badge.red {
  background: #ef4444;
  color: white;
}

.nav-item__badge.green {
  background: #22c55e;
  color: white;
}

/* Выдвижное меню */
.mobile-menu-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 1001;
  display: flex;
  align-items: flex-end;
}

.mobile-menu {
  width: 100%;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px 20px 0 0;
  padding: 20px;
  padding-bottom: calc(20px + env(safe-area-inset-bottom));
  max-height: 80vh;
  overflow-y: auto;
}

.mobile-menu__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.mobile-menu__title {
  font-size: 20px;
  font-weight: 700;
  color: white;
  margin: 0;
}

.mobile-menu__close {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  font-size: 24px;
  cursor: pointer;
  padding: 4px;
  transition: color 0.2s ease;
}

.mobile-menu__close:hover {
  color: white;
}

/* Элементы меню */
.menu-section {
  margin-bottom: 16px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 16px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  border-radius: 12px;
  margin-bottom: 8px;
  transition: all 0.3s ease;
  background: none;
  border: none;
  font-family: inherit;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  text-align: left;
}

.menu-item:hover {
  background: rgba(255, 255, 255, 0.05);
  color: white;
}

.menu-item__icon {
  font-size: 20px;
  width: 24px;
  display: flex;
  justify-content: center;
}

.menu-item__text {
  flex: 1;
  font-weight: 500;
}

.menu-item__badge {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 8px;
  min-width: 20px;
  text-align: center;
  font-weight: 700;
}

.menu-item__level {
  width: 28px;
  height: 28px;
  background: linear-gradient(135deg, #ff6b35, #f7931e);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  color: white;
}

.menu-item__arrow {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.4);
}

.menu-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 16px 0;
}

/* Специальные кнопки */
.logout-btn:hover {
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
}

/* Предупреждение о верификации */
.verification-warning {
  background: rgba(249, 115, 22, 0.1);
  border: 1px solid rgba(249, 115, 22, 0.2);
  border-radius: 12px;
  padding: 16px;
  margin: 16px 0;
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.warning-icon {
  font-size: 20px;
  color: #f97316;
}

.warning-text {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.4;
}

.warning-text span {
  display: block;
  font-weight: 600;
  margin-bottom: 4px;
  color: white;
}

.warning-link {
  background: none;
  border: none;
  color: #4ade80;
  text-decoration: underline;
  cursor: pointer;
  font-family: inherit;
  font-size: 14px;
  margin-top: 8px;
}

/* Баланс */
.mobile-balance {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
}

.balance-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.balance-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
}

.balance-value {
  font-size: 16px;
  font-weight: 700;
  color: #fbbf24;
}

.balance-count {
  font-size: 16px;
  font-weight: 600;
  color: white;
}

/* Анимации */
.menu-slide-enter-active,
.menu-slide-leave-active {
  transition: all 0.3s ease;
}

.menu-slide-enter-from,
.menu-slide-leave-to {
  opacity: 0;
}

.menu-slide-enter-from .mobile-menu,
.menu-slide-leave-to .mobile-menu {
  transform: translateY(100%);
}

/* Адаптивность */
@media (max-width: 480px) {
  .nav-item {
    padding: 6px 8px;
    min-width: 50px;
  }

  .nav-item__label {
    font-size: 9px;
  }

  .nav-item__icon {
    font-size: 18px;
  }
}

/* Скрытие на больших экранах */
@media (min-width: 1024px) {
  .mobile-bottom-nav {
    display: none;
  }
}
</style>
