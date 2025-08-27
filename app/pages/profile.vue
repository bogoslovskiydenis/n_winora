<template>
  <div class="profile-page">
    <!-- Хедер профиля -->
    <ProfileHeader
      :user="user"
      @upload-avatar="handleAvatarUpload"
      @open-settings="activeTab = 'settings'"
      @logout="handleLogout"
    />

    <!-- Навигация по вкладкам -->
    <div class="profile-tabs">
      <button
        class="tab-btn"
        :class="{ active: activeTab === 'overview' }"
        @click="activeTab = 'overview'"
      >
        📊 Обзор
      </button>
      <button
        class="tab-btn"
        :class="{ active: activeTab === 'verification' }"
        @click="activeTab = 'verification'"
      >
        ✅ Верификация
      </button>
      <button
        class="tab-btn"
        :class="{ active: activeTab === 'security' }"
        @click="activeTab = 'security'"
      >
        🔒 Безопасность
      </button>
      <button
        class="tab-btn"
        :class="{ active: activeTab === 'settings' }"
        @click="activeTab = 'settings'"
      >
        ⚙️ Настройки
      </button>
    </div>

    <!-- Контент вкладок -->
    <div class="tab-content">
      <!-- Вкладка "Обзор" -->
      <div v-if="activeTab === 'overview'" class="tab-panel">
        <div class="overview-grid">
          <!-- Статистика аккаунта -->
          <ProfileStats
            :user="user"
            :total-investments="statistics.totalInvestments"
            :active-investments="statistics.activeInvestments"
            :total-profit="statistics.totalProfit"
          />

          <!-- Уровень лояльности -->
          <LoyaltyLevel
            :current-level="loyalty.currentLevel"
            :loyalty-progress="loyalty.progress"
            :current-cashback="loyalty.cashback"
          />

          <!-- Недавняя активность -->
          <ActivityFeed :activities="recentActivity" />
        </div>
      </div>

      <!-- Вкладка "Верификация" -->
      <div v-if="activeTab === 'verification'" class="tab-panel">
        <VerificationForm
          :loading="isVerificationLoading"
          @submit="handleVerificationSubmit"
          @upload-document="handleDocumentUpload"
        />
      </div>

      <!-- Вкладка "Безопасность" -->
      <div v-if="activeTab === 'security'" class="tab-panel">
        <SecuritySettings
          :loading="isPasswordLoading"
          :two-factor-enabled="twoFactorEnabled"
          :sessions="activeSessions"
          @change-password="handlePasswordChange"
          @toggle-2fa="handleToggle2FA"
          @terminate-session="handleTerminateSession"
        />
      </div>

      <!-- Вкладка "Настройки" -->
      <div v-if="activeTab === 'settings'" class="tab-panel">
        <UserSettings
          :settings="userSettings"
          @update-settings="handleUpdateSettings"
          @show-delete-confirm="showDeleteConfirm = true"
        />
      </div>
    </div>

    <!-- Модальное окно подтверждения удаления -->
    <ConfirmModal
      :show="showDeleteConfirm"
      title="Подтверждение удаления"
      message="Вы действительно хотите удалить свой аккаунт? Это действие нельзя отменить."
      confirm-text="Удалить"
      cancel-text="Отмена"
      @close="showDeleteConfirm = false"
      @confirm="handleDeleteAccount"
    />

    <!-- Уведомление об успешном сохранении -->
    <div v-if="showNotification" class="notification success">
      <span class="notification-icon">✅</span>
      <span class="notification-text">{{ notificationText }}</span>
      <button class="notification-close" @click="hideNotification">×</button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import ProfileHeader from '../components/profile/ProfileHeader.vue';
import ProfileStats from '../components/profile/ProfileStats.vue';
import LoyaltyLevel from '../components/profile/LoyaltyLevel.vue';
import ActivityFeed from '../components/profile/ActivityFeed.vue';
import VerificationForm from '../components/profile/VerificationForm.vue';
import SecuritySettings from '../components/profile/SecuritySettings.vue';
import ConfirmModal from '../components/profile/ui/ConfirmModal.vue';

// Middleware для проверки авторизации
definePageMeta({
  middleware: 'auth',
});

// Получаем данные пользователя
const { user, logoutUser } = useAuth();

// Основные состояния
const activeTab = ref('overview');
const showDeleteConfirm = ref(false);
const showNotification = ref(false);
const notificationText = ref('');

// Состояния загрузки
const isVerificationLoading = ref(false);
const isPasswordLoading = ref(false);

// Статистические данные
const statistics = reactive({
  totalInvestments: 5,
  activeInvestments: 3,
  totalProfit: 1250,
});

// Данные лояльности
const loyalty = reactive({
  currentLevel: 2,
  progress: 65,
  cashback: 5,
});

// Недавняя активность
const recentActivity = ref([
  {
    id: 1,
    icon: '💰',
    title: 'Пополнение баланса',
    date: new Date(),
    amount: '+500 USD',
    type: 'positive',
  },
  {
    id: 2,
    icon: '📈',
    title: 'Прибыль от инвестиции #3',
    date: new Date(Date.now() - 3600000),
    amount: '+25 USD',
    type: 'positive',
  },
  {
    id: 3,
    icon: '🎯',
    title: 'Создана новая инвестиция',
    date: new Date(Date.now() - 7200000),
    amount: '-100 USD',
    type: 'negative',
  },
]);

// Безопасность
const twoFactorEnabled = ref(false);
const activeSessions = ref([
  {
    id: 1,
    device: 'Chrome на Windows',
    location: 'Москва, Россия',
    lastActive: new Date(),
    current: true,
  },
  {
    id: 2,
    device: 'Safari на iPhone',
    location: 'Москва, Россия',
    lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000),
    current: false,
  },
]);

// Настройки пользователя
const userSettings = ref({
  emailNotifications: true,
  pushNotifications: false,
  tradingNotifications: true,
  animations: true,
  tooltips: true,
});

// Обработчики событий
const handleAvatarUpload = () => {
  console.log('Загрузка аватара');
  showSuccessNotification('Аватар загружен успешно!');
  // Здесь будет логика загрузки аватара
};

const handleVerificationSubmit = async (verificationData) => {
  isVerificationLoading.value = true;

  try {
    // Имитация API запроса
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log('Верификация отправлена:', verificationData);
    showSuccessNotification('Данные отправлены на верификацию!');
  } catch (error) {
    console.error('Ошибка верификации:', error);
  } finally {
    isVerificationLoading.value = false;
  }
};

const handleDocumentUpload = (type) => {
  console.log('Загрузка документа:', type);
  showSuccessNotification('Документ загружен успешно!');
  // Здесь будет логика загрузки документов
};

const handlePasswordChange = async (passwordData) => {
  isPasswordLoading.value = true;

  try {
    // Имитация API запроса
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log('Пароль изменен:', passwordData);
    showSuccessNotification('Пароль успешно изменен!');
  } catch (error) {
    console.error('Ошибка смены пароля:', error);
  } finally {
    isPasswordLoading.value = false;
  }
};

const handleToggle2FA = () => {
  twoFactorEnabled.value = !twoFactorEnabled.value;
  const message = twoFactorEnabled.value
    ? 'Двухфакторная аутентификация включена'
    : 'Двухфакторная аутентификация отключена';

  showSuccessNotification(message);
  console.log('2FA:', twoFactorEnabled.value ? 'включена' : 'отключена');
};

const handleTerminateSession = (sessionId) => {
  activeSessions.value = activeSessions.value.filter((s) => s.id !== sessionId);
  showSuccessNotification('Сессия завершена');
  console.log('Сессия завершена:', sessionId);
};

const handleUpdateSettings = (newSettings) => {
  userSettings.value = { ...userSettings.value, ...newSettings };
  showSuccessNotification('Настройки сохранены');
  console.log('Настройки обновлены:', newSettings);

  // Сохранение в localStorage для персистентности
  if (process.client) {
    localStorage.setItem('userSettings', JSON.stringify(userSettings.value));
  }
};

const handleDeleteAccount = () => {
  console.log('Аккаунт удален');
  logoutUser();
};

const handleLogout = () => {
  logoutUser();
};

// Вспомогательные функции для уведомлений
const showSuccessNotification = (message) => {
  notificationText.value = message;
  showNotification.value = true;

  // Автоматическое скрытие через 3 секунды
  setTimeout(() => {
    showNotification.value = false;
  }, 3000);
};

const hideNotification = () => {
  showNotification.value = false;
};

// Загрузка сохраненных настроек при монтировании
onMounted(() => {
  if (process.client) {
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      try {
        userSettings.value = JSON.parse(savedSettings);
      } catch (error) {
        console.error('Ошибка загрузки настроек:', error);
      }
    }
  }
});

// SEO метаданные
useHead({
  title: 'Профиль пользователя - Winora',
  meta: [
    {
      name: 'description',
      content: 'Управление профилем пользователя в Winora',
    },
    {
      name: 'keywords',
      content: 'профиль, настройки, верификация, безопасность, winora',
    },
  ],
});
</script>

<style scoped>
.profile-page {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
  background: linear-gradient(135deg, #0a2f23 0%, #1a4b3a 100%);
}

/* Хедер профиля - стили перенесены в ProfileHeader.vue */

/* Навигация по вкладкам */
.profile-tabs {
  display: flex;
  gap: 2px;
  margin-bottom: 24px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 4px;
  width: fit-content;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.3s ease;
  font-family: inherit;
  white-space: nowrap;
}

.tab-btn:hover {
  color: rgba(255, 255, 255, 0.8);
}

.tab-btn.active {
  background: #4ade80;
  color: #0a2f23;
}

/* Контент вкладок */
.tab-content {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.tab-panel {
  min-height: 400px;
}

/* Сетка обзора */
.overview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
  align-items: start;
}

/* Уведомления */
.notification {
  position: fixed;
  top: 24px;
  right: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background: rgba(34, 197, 94, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(34, 197, 94, 0.3);
  border-radius: 12px;
  color: white;
  font-size: 14px;
  font-weight: 500;
  z-index: 1001;
  animation: slideInRight 0.3s ease;
  box-shadow: 0 8px 32px rgba(34, 197, 94, 0.3);
}

.notification.success {
  background: rgba(34, 197, 94, 0.9);
  border-color: rgba(34, 197, 94, 0.3);
}

.notification-icon {
  font-size: 16px;
  flex-shrink: 0;
}

.notification-text {
  flex: 1;
}

.notification-close {
  background: transparent;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  padding: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background 0.2s ease;
}

.notification-close:hover {
  background: rgba(255, 255, 255, 0.2);
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Адаптивность */
@media (max-width: 768px) {
  .profile-page {
    padding: 16px;
  }

  .profile-tabs {
    width: 100%;
    overflow-x: auto;
    justify-content: flex-start;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .profile-tabs::-webkit-scrollbar {
    display: none;
  }

  .tab-btn {
    flex-shrink: 0;
  }

  .overview-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .notification {
    top: 16px;
    right: 16px;
    left: 16px;
    width: auto;
  }
}

@media (max-width: 480px) {
  .tab-btn {
    padding: 10px 16px;
    font-size: 13px;
    gap: 6px;
  }

  .notification {
    padding: 12px 16px;
    font-size: 13px;
  }
}

/* Общие стили для карточек (используются в дочерних компонентах) */
:deep(.stats-card),
:deep(.loyalty-card),
:deep(.activity-card),
:deep(.security-card),
:deep(.settings-card) {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 20px;
  transition: all 0.3s ease;
}

:deep(.stats-card):hover,
:deep(.loyalty-card):hover,
:deep(.activity-card):hover,
:deep(.security-card):hover,
:deep(.settings-card):hover {
  background: rgba(255, 255, 255, 0.06);
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

:deep(.card-header) {
  margin-bottom: 20px;
}

:deep(.card-header h3) {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Модальные окна */
:deep(.modal-overlay) {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

:deep(.modal-content) {
  background: var(--background-secondary);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px;
  max-width: 400px;
  width: 100%;
  animation: modalSlideIn 0.3s ease;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

:deep(.modal-content h3) {
  font-size: 20px;
  color: var(--text-primary);
  margin: 0 0 12px 0;
  font-weight: 600;
}

:deep(.modal-content p) {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.5;
  margin: 0 0 24px 0;
}

:deep(.modal-actions) {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .tab-content,
  .notification,
  :deep(.modal-content) {
    animation: none;
  }

  :deep(.stats-card):hover,
  :deep(.loyalty-card):hover,
  :deep(.activity-card):hover,
  :deep(.security-card):hover,
  :deep(.settings-card):hover {
    transform: none;
  }
}

/* Focus states */
.tab-btn:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

.notification-close:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.5);
  outline-offset: 1px;
}
</style>
