<template>
  <header class="header">
    <div class="header-content">
      <div class="header-center">
        <button class="action-btn create-investment">
          <span class="btn-icon">📈</span>
          СОЗДАТЬ ИНВЕСТИЦИЮ
        </button>
        <div class="balance-display">
          <span class="balance-icon">💰</span>
          <span class="balance-amount">{{
            user?.balance?.toLocaleString() || '150,000'
          }}</span>
          <span class="balance-text">USDT</span>
          <span class="balance-count">{{
            Math.floor((user?.balance || 150000) / 100)
          }}</span>
        </div>
        <button class="action-btn top-up-balance">
          <span class="btn-icon">💳</span>
          ПОПОЛНИТЬ БАЛАНС
        </button>
      </div>

      <div class="header-right">
        <button class="notification-btn" @click="toggleNotifications">
          <span class="notification-icon">🔔</span>
          <span v-if="notificationCount > 0" class="notification-badge">{{
            notificationCount
          }}</span>
        </button>

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
import { ref } from 'vue';

defineProps({
  user: {
    type: Object,
    default: () => ({}),
  },
});

const showNotifications = ref(false);
const notificationCount = ref(3);

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value;
};
</script>

<style scoped>
/* Header */
.header {
  background: linear-gradient(135deg, #0a3d2e 0%, #1a5940 100%);
  border-bottom: 1px solid rgba(74, 222, 128, 0.2);
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  width: 100%;
  gap: 24px;
}

/* Header Center */
.header-center {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
  justify-content: center;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  font-family: inherit;
  letter-spacing: 0.5px;
}

.create-investment {
  background: var(--primary-color);
  color: #0a3d2e;
}

.create-investment:hover {
  background: var(--primary-light);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(74, 222, 128, 0.3);
}

.top-up-balance {
  background: transparent;
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
}

.top-up-balance:hover {
  background: rgba(74, 222, 128, 0.1);
  transform: translateY(-1px);
}

.btn-icon {
  font-size: 14px;
}

.balance-display {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 10px 16px;
}

.balance-icon {
  font-size: 16px;
}

.balance-amount {
  font-size: 16px;
  font-weight: 700;
  color: #fbbf24;
}

.balance-text {
  font-size: 12px;
  color: var(--text-secondary);
  margin-right: 8px;
}

.balance-count {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}

/* Header Right */
.header-right {
  display: flex;
  align-items: center;
  position: relative;
}

.notification-btn {
  position: relative;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.notification-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.notification-icon {
  font-size: 20px;
  color: var(--text-secondary);
}

.notification-badge {
  position: absolute;
  top: 2px;
  right: 2px;
  background: #ef4444;
  color: white;
  font-size: 10px;
  font-weight: 700;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: pulse 2s infinite;
}

/* Notifications Dropdown */
.notifications-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  width: 320px;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  margin-top: 8px;
  z-index: 1000;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.notification-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: var(--primary-color);
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
  color: var(--text-primary);
  margin-bottom: 4px;
}

.notification-text {
  font-size: 11px;
  color: var(--text-secondary);
  line-height: 1.4;
  margin-bottom: 6px;
}

.notification-link {
  font-size: 11px;
  color: var(--primary-color);
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

/* Mobile Responsive */
@media (max-width: 1023px) {
  .header-content {
    padding: 12px 16px;
  }

  .header-center {
    flex-direction: column;
    gap: 12px;
  }

  .action-btn {
    font-size: 10px;
    padding: 8px 12px;
  }

  .balance-display {
    padding: 8px 12px;
  }
}
</style>
