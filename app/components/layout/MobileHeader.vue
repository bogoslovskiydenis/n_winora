<!-- components/MobileHeader.vue -->
<template>
  <header class="mobile-header" :class="{ 'mobile-header--inline': inline }">
    <div class="mobile-header__content">
      <!-- Левая часть - Логотип -->
      <div class="mobile-header__left">
        <NuxtLink to="/main" class="logo-link" @click="$emit('navigate-home')">
          <div class="logo-container">
            <img
              src="~/assets/images/Winora_logo.png"
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
            <div class="balance-icon">W</div>
            <span class="balance-value">{{ formattedWinBalance }}</span>
          </div>

          <!-- Разделитель -->
          <div class="balance-divider">×</div>

          <!-- USDT баланс -->
          <div class="balance-item balance-item--secondary">
            <span class="balance-label">USDT</span>
            <span class="balance-value">{{ formattedUsdtBalance }}</span>
          </div>
        </div>
      </div>

      <!-- Правая часть - Действия -->
      <div class="mobile-header__right">
        <!-- Кнопка пополнения -->
        <button
          class="action-btn action-btn--add"
          @click="$emit('top-up-balance')"
        >
          <span class="btn-icon">+</span>
        </button>

        <!-- Уведомления -->
        <button
          class="action-btn action-btn--notifications"
          @click="toggleNotifications"
          :class="{ 'action-btn--active': showNotifications }"
        >
          <span class="btn-icon">🔔</span>
          <span v-if="notificationCount > 0" class="notification-badge">
            {{ notificationCount }}
          </span>
        </button>
      </div>
    </div>

    <!-- Dropdown уведомлений -->
    <Transition name="notifications-slide">
      <div v-if="showNotifications" class="notifications-dropdown">
        <div class="notifications-header">
          <h3 class="notifications-title">Уведомления</h3>
          <button class="notifications-close" @click="closeNotifications">
            ×
          </button>
        </div>

        <div class="notifications-content">
          <div v-if="notifications.length === 0" class="notifications-empty">
            <span class="empty-icon">🔕</span>
            <p>Нет новых уведомлений</p>
          </div>

          <div v-else class="notifications-list">
            <div
              v-for="notification in notifications"
              :key="notification.id"
              class="notification-item"
              :class="{ 'notification-item--unread': !notification.read }"
            >
              <div class="notification-icon">{{ notification.icon }}</div>
              <div class="notification-content">
                <p class="notification-title">{{ notification.title }}</p>
                <p class="notification-message">{{ notification.message }}</p>
                <span class="notification-time">{{
                  formatTime(notification.time)
                }}</span>
              </div>
              <button
                v-if="!notification.read"
                class="notification-close"
                @click="markAsRead(notification.id)"
              >
                ×
              </button>
            </div>
          </div>
        </div>

        <div class="notifications-footer">
          <button class="notifications-action" @click="markAllAsRead">
            Отметить все как прочитанное
          </button>
        </div>
      </div>
    </Transition>

    <!-- Overlay для закрытия уведомлений -->
    <div
      v-if="showNotifications"
      class="notifications-overlay"
      @click="closeNotifications"
    ></div>
  </header>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

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

// Данные уведомлений (в реальном проекте из store или API)
const notifications = ref([
  {
    id: 1,
    icon: '💰',
    title: 'Инвестиция завершена',
    message: 'Ваша инвестиция в проект "Tech Startup" принесла прибыль +1,250₽',
    time: new Date(Date.now() - 5 * 60000), // 5 минут назад
    read: false,
  },
  {
    id: 2,
    icon: '🎁',
    title: 'Новый сундук доступен',
    message: 'Получите ежедневный бонус - откройте сундук прямо сейчас',
    time: new Date(Date.now() - 30 * 60000), // 30 минут назад
    read: false,
  },
  {
    id: 3,
    icon: '📈',
    title: 'Рост портфеля',
    message: 'Ваш инвестиционный портфель вырос на 5.2% за последнюю неделю',
    time: new Date(Date.now() - 2 * 60 * 60000), // 2 часа назад
    read: true,
  },
]);

// Вычисляемые свойства
const notificationCount = computed(
  () => notifications.value.filter((n) => !n.read).length
);

// Форматируем балансы как в дизайне
const formattedWinBalance = computed(() => {
  const balance = props.user?.winBalance || 10000;
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

const closeNotifications = () => {
  showNotifications.value = false;
};

const markAsRead = (id) => {
  const notification = notifications.value.find((n) => n.id === id);
  if (notification) {
    notification.read = true;
  }
};

const markAllAsRead = () => {
  notifications.value.forEach((n) => (n.read = true));
  closeNotifications();
};

const onLogoError = () => {
  logoError.value = true;
};

const formatTime = (time) => {
  const now = new Date();
  const diff = now - time;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}д назад`;
  if (hours > 0) return `${hours}ч назад`;
  if (minutes > 0) return `${minutes}м назад`;
  return 'Только что';
};

// Закрываем уведомления при клике вне области
watch(showNotifications, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

onUnmounted(() => {
  document.body.style.overflow = '';
});
</script>

<style scoped>
/* Основной хедер */
.mobile-header {
  background: linear-gradient(
    90deg,
    rgba(26, 75, 60, 0.95) 0%,
    rgba(10, 47, 35, 0.95) 100%
  );
  backdrop-filter: blur(15px);
  border-bottom: 1px solid rgba(74, 222, 128, 0.2);
  padding: 12px 20px;
  margin-bottom: 20px;
  position: relative;
}

.mobile-header--inline {
  margin: 0 0 20px 0;
}

.mobile-header__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
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
}

.balance-container {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(74, 222, 128, 0.2);
  border-radius: 20px;
  padding: 8px 16px;
}

.balance-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.balance-item--primary .balance-icon {
  width: 24px;
  height: 24px;
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 900;
  color: white;
}

.balance-item--primary .balance-value {
  font-size: 16px;
  font-weight: 700;
  color: #fbbf24;
}

.balance-item--secondary .balance-label {
  font-size: 12px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
}

.balance-item--secondary .balance-value {
  font-size: 16px;
  font-weight: 700;
  color: #4ade80;
}

.balance-divider {
  color: rgba(255, 255, 255, 0.4);
  font-size: 14px;
  margin: 0 4px;
}

/* Правая часть - Действия */
.mobile-header__right {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.action-btn {
  position: relative;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: inherit;
}

.action-btn--add {
  background: #4ade80;
  color: #0a2f23;
  box-shadow: 0 4px 12px rgba(74, 222, 128, 0.3);
}

.action-btn--add:hover {
  background: #22c55e;
  transform: scale(1.05);
  box-shadow: 0 6px 16px rgba(74, 222, 128, 0.4);
}

.action-btn--add .btn-icon {
  font-size: 20px;
  font-weight: 700;
}

.action-btn--notifications {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.action-btn--notifications:hover,
.action-btn--notifications.action-btn--active {
  background: rgba(255, 255, 255, 0.15);
  color: white;
  border-color: rgba(255, 255, 255, 0.3);
}

.btn-icon {
  font-size: 18px;
}

.notification-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: #ef4444;
  color: white;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 8px;
  min-width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);
}

/* Dropdown уведомлений */
.notifications-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.98);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  max-height: 400px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  z-index: 1000;
}

.notifications-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.3);
}

.notifications-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.notifications-title {
  font-size: 16px;
  font-weight: 600;
  color: white;
  margin: 0;
}

.notifications-close {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  font-size: 20px;
  cursor: pointer;
  padding: 4px;
  transition: color 0.2s ease;
}

.notifications-close:hover {
  color: white;
}

.notifications-content {
  flex: 1;
  overflow-y: auto;
}

.notifications-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
}

.empty-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.notifications-list {
  padding: 8px 0;
}

.notification-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: background 0.2s ease;
  position: relative;
}

.notification-item:hover {
  background: rgba(255, 255, 255, 0.02);
}

.notification-item--unread {
  background: rgba(74, 222, 128, 0.03);
}

.notification-item--unread::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: #4ade80;
}

.notification-icon {
  font-size: 20px;
  flex-shrink: 0;
  margin-top: 2px;
}

.notification-content {
  flex: 1;
  min-width: 0;
}

.notification-title {
  font-size: 14px;
  font-weight: 600;
  color: white;
  margin: 0 0 4px 0;
}

.notification-message {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 4px 0;
  line-height: 1.4;
}

.notification-time {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
}

.notification-close {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.4);
  font-size: 16px;
  cursor: pointer;
  padding: 4px;
  transition: color 0.2s ease;
  flex-shrink: 0;
}

.notification-close:hover {
  color: rgba(255, 255, 255, 0.8);
}

.notifications-footer {
  padding: 16px 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.notifications-action {
  width: 100%;
  background: rgba(74, 222, 128, 0.1);
  border: 1px solid rgba(74, 222, 128, 0.2);
  color: #4ade80;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-family: inherit;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.notifications-action:hover {
  background: rgba(74, 222, 128, 0.15);
  border-color: rgba(74, 222, 128, 0.3);
}

/* Анимации */
.notifications-slide-enter-active,
.notifications-slide-leave-active {
  transition: all 0.3s ease;
}

.notifications-slide-enter-from,
.notifications-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}

/* Адаптивность */
@media (max-width: 480px) {
  .mobile-header {
    padding: 10px 16px;
    margin-bottom: 16px;
  }

  .mobile-header__content {
    gap: 12px;
  }

  .balance-container {
    gap: 8px;
    padding: 6px 12px;
  }

  .action-btn {
    width: 36px;
    height: 36px;
  }

  .btn-icon {
    font-size: 16px;
  }

  .balance-item--primary .balance-value,
  .balance-item--secondary .balance-value {
    font-size: 14px;
  }
}

/* Скрытие на больших экранах */
@media (min-width: 768px) {
  .mobile-header {
    display: none;
  }
}
</style>
