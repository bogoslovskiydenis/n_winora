<template>
  <header class="header">
    <div class="header-content">
      <div class="header-center">
        <button class="action-btn create-investment">
          <img src="./../../assets/images/add_circle.svg" alt="" />
          СОЗДАТЬ ИНВЕСТИЦИЮ
        </button>
        <div class="balance-display">
          <img src="./../../assets/images/balance-icon.svg" alt="" />
          <span class="balance-amount">{{
            user?.balance?.toLocaleString() || '150,000'
          }}</span>
        </div>
        <div class="balance-display-usdt">
          <span class="balance-usdt-label">USDT</span>
          <span class="balance-usdt-amount">{{
            user?.balance?.toLocaleString() || '100'
          }}</span>
        </div>
        <button class="action-btn top-up-balance">
          <img src="./../../assets/images/add_circle.svg" alt="" />
          ПОПОЛНИТЬ БАЛАНС
        </button>
      </div>

      <div class="header-right">
        <button class="notification-btn" @click="toggleNotifications">
          <img src="./../../assets/images/notif.svg" alt="" />
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
  box-shadow: 0px 4px 4px 0px #00000040;
  background: linear-gradient(180deg, #1b1b1b 0%, #323232 100%);

  border-bottom: 1px solid #00110d45;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 1400px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  width: 100%;
  gap: 24px;
}

/* Header Center */
.header-center {
  height: 26px;
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
  justify-content: center;
}

.action-btn {
  display: flex;
  align-items: center;
  border-radius: 32px;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  font-family: inherit;
  letter-spacing: 0.5px;
  height: 26px;
  gap: 12px;
  padding: 8px 12px 8px 6px;
}

.create-investment {
  background: #07cb38;
  color: #070202;
}

.create-investment:hover {
  background: var(--primary-light);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(74, 222, 128, 0.3);
}

.top-up-balance {
  background: #07cb38;
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
  border: 1px solid #00000040;
  color: #00000040;
  gap: 4px;
  padding-right: 8px;
  padding-left: 1px;
  border-radius: 16px;
}

.balance-display-usdt {
  display: flex;
  align-items: center;
  gap: 4px;
  border: 1px solid #00000040;
  color: #00000040;
  padding: 4px 8px;
  border-radius: 16px;
  border-width: 1px;
}

.balance-usdt-label {
  font-family: Roboto, serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 118%;
  text-align: center;
  vertical-align: middle;
  text-transform: uppercase;
  color: #ffffff;
  padding: 2px 6px;
  border-radius: 8px;
}

.balance-usdt-amount {
  font-family: Roboto, sans-serif;
  font-weight: 700;
  font-size: 16px;
  line-height: 100%;
  text-align: right;
  color: #07cb38;
}

.balance-amount {
  font-family: Roboto, serif;
  font-weight: 700;
  font-size: 16px;
  line-height: 100%;
  text-align: right;
  color: #c8c503;
}

.balance-text {
  font-family: Roboto, serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 118%;
  text-align: center;
  vertical-align: middle;
  text-transform: uppercase;
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
    gap: 12px;
  }

  .action-btn {
    font-size: 10px;
    padding: 8px 12px;
  }

  .balance-display {
  }
}
</style>
