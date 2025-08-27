<template>
  <div class="security-section">
    <div class="security-card">
      <div class="card-header">
        <h3>🔐 Изменение пароля</h3>
      </div>
      <div class="password-form">
        <BaseInput
            v-model="passwordData.currentPassword"
            type="password"
            placeholder="Текущий пароль"
            :error="errors.currentPassword"
        />
        <BaseInput
            v-model="passwordData.newPassword"
            type="password"
            placeholder="Новый пароль"
            :error="errors.newPassword"
        />
        <BaseInput
            v-model="passwordData.confirmPassword"
            type="password"
            placeholder="Подтвердите новый пароль"
            :error="errors.confirmPassword"
        />
        <BaseButton
            variant="primary"
            :loading="loading"
            @click="handlePasswordChange"
        >
          Изменить пароль
        </BaseButton>
      </div>
    </div>

    <div class="security-card">
      <div class="card-header">
        <h3>📱 Двухфакторная аутентификация</h3>
      </div>
      <div class="two-factor-content">
        <div class="two-factor-status">
          <span class="status-indicator" :class="{ enabled: twoFactorEnabled }"></span>
          <span class="status-text">
            {{ twoFactorEnabled ? 'Включена' : 'Отключена' }}
          </span>
        </div>
        <BaseButton
            :variant="twoFactorEnabled ? 'secondary' : 'primary'"
            @click="$emit('toggle-2fa')"
        >
          {{ twoFactorEnabled ? 'Отключить' : 'Включить' }}
        </BaseButton>
      </div>
    </div>

    <div class="security-card">
      <div class="card-header">
        <h3>🔒 Активные сессии</h3>
      </div>
      <div class="sessions-list">
        <div v-for="session in sessions" :key="session.id" class="session-item">
          <div class="session-info">
            <div class="session-device">{{ session.device }}</div>
            <div class="session-details">
              {{ session.location }} • {{ formatDate(session.lastActive) }}
            </div>
          </div>
          <button
              class="session-terminate"
              @click="$emit('terminate-session', session.id)"
              :disabled="session.current"
          >
            {{ session.current ? 'Текущая' : 'Завершить' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  twoFactorEnabled: {
    type: Boolean,
    default: false
  },
  sessions: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['change-password', 'toggle-2fa', 'terminate-session'])

const passwordData = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const errors = ref({})

const validatePassword = () => {
  errors.value = {}

  if (!passwordData.value.currentPassword) {
    errors.value.currentPassword = 'Введите текущий пароль'
    return false
  }

  if (passwordData.value.newPassword.length < 8) {
    errors.value.newPassword = 'Пароль должен содержать минимум 8 символов'
    return false
  }

  if (passwordData.value.newPassword !== passwordData.value.confirmPassword) {
    errors.value.confirmPassword = 'Пароли не совпадают'
    return false
  }

  return true
}

const handlePasswordChange = () => {
  if (validatePassword()) {
    emit('change-password', {...passwordData.value})
    passwordData.value = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  }
}

const formatDate = (date) => {
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date))
}
</script>

<style scoped>
.security-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 600px;
  margin: 0 auto;
}

.security-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px;
  backdrop-filter: blur(15px);
  transition: all 0.3s ease;
}

.security-card:hover {
  background: rgba(255, 255, 255, 0.06);
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.card-header {
  margin-bottom: 20px;
}

.card-header h3 {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.password-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.two-factor-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.two-factor-status {
  display: flex;
  align-items: center;
  gap: 12px;
}

.status-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #ef4444;
  transition: background 0.3s ease;
  box-shadow: 0 0 8px rgba(239, 68, 68, 0.3);
}

.status-indicator.enabled {
  background: #22c55e;
  box-shadow: 0 0 8px rgba(34, 197, 94, 0.3);
}

.status-text {
  font-size: 16px;
  color: var(--text-primary);
  font-weight: 500;
}

.sessions-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.session-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.session-item:hover {
  background: rgba(0, 0, 0, 0.3);
  border-color: rgba(255, 255, 255, 0.1);
}

.session-info {
  flex: 1;
}

.session-device {
  font-size: 14px;
  color: var(--text-primary);
  font-weight: 500;
  margin-bottom: 4px;
}

.session-details {
  font-size: 12px;
  color: var(--text-secondary);
}

.session-terminate {
  padding: 6px 12px;
  background: transparent;
  border: 1px solid rgba(239, 68, 68, 0.5);
  border-radius: 6px;
  color: #ef4444;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
  font-weight: 500;
}

.session-terminate:hover:not(:disabled) {
  background: rgba(239, 68, 68, 0.1);
  border-color: #ef4444;
  transform: translateY(-1px);
}

.session-terminate:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  color: var(--text-secondary);
  border-color: rgba(255, 255, 255, 0.2);
}

@media (max-width: 768px) {
  .security-section {
    max-width: 100%;
  }

  .security-card {
    padding: 20px;
  }

  .two-factor-content {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }

  .session-item {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }

  .session-terminate {
    align-self: flex-end;
  }
}

@media (max-width: 480px) {
  .security-card {
    padding: 16px;
  }

  .card-header h3 {
    font-size: 16px;
  }

  .session-item {
    padding: 12px;
  }
}
</style>