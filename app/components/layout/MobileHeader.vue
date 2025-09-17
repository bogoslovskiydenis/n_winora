<template>
  <header class="mobile-header" :class="{ 'mobile-header--inline': inline }">
    <div class="mobile-header__content">
      <!-- Левая часть - Логотип -->
      <div class="mobile-header__left">
        <NuxtLink to="/main" class="logo-link" @click="$emit('navigate-home')">
          <div class="logo-container">
            <img
              src="~/assets/images/logo_mob_header.svg"
              alt="Winora"
              class="logo-image"
              @error="onLogoError"
            />
            <span v-if="logoError" class="logo-fallback">W</span>
          </div>
        </NuxtLink>
      </div>

      <!-- Центральная часть - Баланс -->
      <div class="mobile-header__center">
        <div class="balance-container">
          <!-- Основной баланс W -->
          <div class="balance-item balance-item--primary">
            <div class="balance-icon">
              <img src="~/assets/images/balance-icon.svg" />
            </div>
            <span class="balance-value">{{ formattedWinBalance }}</span>
          </div>
        </div>
        <!-- USDT баланс -->
        <div class="balance-usdt">
          <div class="balance-item balance-item--secondary">
            <span class="balance-label">USDT</span>
            <span class="balance-value">{{ formattedUsdtBalance }}</span>
            <button class="action-btn" @click="$emit('top-up-balance')">
              <img src="~/assets/images/add_balance.svg" />
            </button>
          </div>
        </div>
      </div>

      <!-- Правая часть - Действия -->
      <div class="mobile-header__right">
        <!-- Уведомления -->
        <button class="notification-btn" @click="toggleNotifications">
          <img src="~/assets/images/notif.svg" alt="" />
          <span v-if="notificationCount > 0" class="notification-badge">{{
            notificationCount
          }}</span>
        </button>

        <!-- Dropdown уведомлений -->
        <div v-if="showNotifications" class="notifications-dropdown">
          <div class="notification-header">
            <span>Пополнение баланса на 100 USDT</span>
            <button class="notification-close" @click="toggleNotifications">
              ×
            </button>
          </div>

          <div class="notification-item">
            <div class="notification-icon-item">💰</div>
            <div class="notification-content">
              <div class="notification-title">Заголовок</div>
              <div class="notification-text">
                Вспомогательная информация, которая появляется на экране и
                помогает пользователю при работе
              </div>
              <a href="#" class="notification-link">Детальнее</a>
            </div>
            <button class="notification-close">×</button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  user: {
    type: Object,
    default: () => ({}),
  },
  pageTitle: {
    type: String,
    default: 'Winora',
  },
  inline: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits([
  'navigate-home',
  'top-up-balance',
  'notification-action',
]);

// Состояние компонента
const showNotifications = ref(false);
const logoError = ref(false);
const notificationCount = ref(3);

// Форматируем балансы как в дизайне
const formattedWinBalance = computed(() => {
  const balance = props.user?.winBalance || props.user?.balance || 150000;
  return new Intl.NumberFormat('ru-RU').format(balance);
});

const formattedUsdtBalance = computed(() => {
  const balance = props.user?.usdtBalance || 100;
  return new Intl.NumberFormat('ru-RU').format(balance);
});

// Методы
const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value;
};

const onLogoError = () => {
  logoError.value = true;
};
</script>

<style scoped>
/* Основной хедер */
.mobile-header {
  height: 45px;
  gap: 8px;
  border-bottom-width: 1px;
  padding: 8px;
  background: linear-gradient(180deg, #1b1b1b 0%, #323232 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 4px 0px #00000040;
  border-bottom: 1px solid #00110d45;
  position: sticky;
  top: 0;
  z-index: 100;
}

.mobile-header__content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 100%;
}

/* Логотип */
.mobile-header__left {
  flex-shrink: 0;
}

.logo-link {
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.logo-link:active {
  opacity: 0.7;
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-image {
  width: 24px;
  height: 24px;
  border-radius: 4px;
}

.logo-fallback {
  font-size: 20px;
  font-weight: 900;
  color: #0a2f23;
}

/* Центральная часть - Баланс */
.mobile-header__center {
  flex: 1;
  display: flex;
  justify-content: center;
  gap: 4px;
}

.balance-container {
  height: 26px;
  display: flex;
  align-items: center;
  gap: 4px;
  padding-right: 8px;
  padding-left: 1px;
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.25);
  background: rgba(0, 0, 0, 0.25);
}

.balance-usdt {
  padding-left: 8px;
  padding-right: 8px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 4px;
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.25);
  background: rgba(0, 0, 0, 0.25);
}

.balance-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.balance-item--primary .balance-icon {
  width: 24px;
  height: 24px;
  display: flex;
}

.balance-item--primary .balance-value {
  font-family: Roboto, serif;
  font-weight: 700;
  font-size: 16px;
  line-height: 100%;
  text-align: right;
  color: #c8c503;
}

.balance-item--secondary .balance-label {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 12px;
  text-align: center;
  vertical-align: middle;
  text-transform: uppercase;
  color: #ffffff;
  padding: 2px 6px;
  border-radius: 8px;
}

.balance-item--secondary .balance-value {
  font-family: Roboto, sans-serif;
  font-weight: 700;
  font-size: 16px;
  line-height: 100%;
  text-align: right;
  color: #07cb38;
}

/* Правая часть - Действия */
.mobile-header__right {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
  position: relative;
}

.action-btn {
  display: flex;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.action-btn img {
  width: 26px;
  height: 26px;
}

/* Кнопка уведомлений */
.notification-btn {
  position: relative;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.notification-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.notification-btn img {
  width: 26px;
  height: 26px;
}

.notification-badge {
  position: absolute;
  top: 0;
  right: 0;
  background: #ef4444;
  color: white;
  font-size: 10px;
  font-weight: 700;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: pulse 2s infinite;
}

/* Dropdown уведомлений */
.notifications-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 320px;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  z-index: 1000;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.notification-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: #07cb38;
  color: #0a3d2e;
  border-radius: 16px 16px 0 0;
  font-size: 12px;
  font-weight: 600;
}

.notification-close {
  background: none;
  border: none;
  color: currentColor;
  font-size: 16px;
  cursor: pointer;
  padding: 2px;
}

.notification-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
}

.notification-item:last-child {
  border-bottom: none;
  border-radius: 0 0 16px 16px;
}

.notification-icon-item {
  font-size: 24px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
}

.notification-content {
  flex: 1;
}

.notification-title {
  font-size: 12px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 4px;
}

.notification-text {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.4;
  margin-bottom: 6px;
}

.notification-link {
  font-size: 11px;
  color: #07cb38;
  text-decoration: none;
  font-weight: 500;
}

.notification-link:hover {
  text-decoration: underline;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* Адаптивность для мобильного хедера */
@media (max-width: 480px) {
  .mobile-header {
    padding: 10px 16px;
  }

  .mobile-header__content {
    gap: 12px;
  }

  .balance-container {
    gap: 8px;
    padding: 6px 12px;
  }

  .balance-item--primary .balance-value,
  .balance-item--secondary .balance-value {
    font-size: 14px;
  }

  .notifications-dropdown {
    width: calc(100vw - 32px);
    right: -16px;
  }
}

/* Скрытие на больших экранах */
@media (min-width: 768px) {
  .mobile-header {
    display: none;
  }
}
</style>
