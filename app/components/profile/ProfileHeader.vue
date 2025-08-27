<template>
  <div class="profile-header">
    <div class="profile-info">
      <div class="profile-avatar">
        <div class="avatar-circle">
          <span class="avatar-text">{{ getAvatarText() }}</span>
        </div>
        <button class="avatar-upload-btn" @click="$emit('upload-avatar')">
          📷
        </button>
      </div>
      <div class="profile-details">
        <h1 class="profile-name">{{ user?.nickname || 'Пользователь' }}</h1>
        <div class="profile-email">{{ user?.email || 'email@example.com' }}</div>
        <div class="profile-id">ID: {{ user?.id || '000000' }}</div>
        <div class="profile-registration">
          Дата регистрации: {{ getRegistrationDate() }}
        </div>
      </div>
    </div>

    <div class="profile-actions">
      <button class="action-btn primary" @click="$emit('open-settings')">
        ⚙️ Настройки
      </button>
      <button class="action-btn secondary" @click="$emit('logout')">
        🚪 Выйти
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})

defineEmits(['upload-avatar', 'open-settings', 'logout'])

const getAvatarText = () => {
  const nickname = props.user?.nickname || 'User'
  return nickname.charAt(0).toUpperCase()
}

const getRegistrationDate = () => {
  return new Date().toLocaleDateString('ru-RU')
}
</script>

<style scoped>
.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
  padding: 24px;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
}

.profile-info {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.profile-avatar {
  position: relative;
}

.avatar-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4ade80, #22c55e);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: 700;
  color: #0a2f23;
  border: 3px solid rgba(74, 222, 128, 0.3);
}

.avatar-text {
  font-size: 32px;
  font-weight: 700;
}

.avatar-upload-btn {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #f97316;
  border: 2px solid #0a2f23;
  color: white;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.avatar-upload-btn:hover {
  background: #fb923c;
  transform: scale(1.1);
}

.profile-details {
  flex: 1;
}

.profile-name {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 8px 0;
}

.profile-email {
  font-size: 16px;
  color: #4ade80;
  margin-bottom: 4px;
}

.profile-id {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 4px;
}

.profile-registration {
  font-size: 12px;
  color: var(--text-muted);
}

.profile-actions {
  display: flex;
  gap: 12px;
}

.action-btn {
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  font-family: inherit;
  display: flex;
  align-items: center;
  gap: 6px;
}

.action-btn.primary {
  background: #4ade80;
  color: #0a2f23;
}

.action-btn.primary:hover {
  background: #86efac;
  transform: translateY(-1px);
}

.action-btn.secondary {
  background: transparent;
  color: var(--text-secondary);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.action-btn.secondary:hover {
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-primary);
}

@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    gap: 20px;
    align-items: flex-start;
    padding: 16px;
  }

  .profile-info {
    width: 100%;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .profile-actions {
    width: 100%;
    justify-content: flex-end;
  }

  .avatar-circle {
    width: 60px;
    height: 60px;
    font-size: 24px;
  }

  .profile-name {
    font-size: 24px;
  }

  .action-btn {
    padding: 8px 16px;
    font-size: 13px;
  }
}
</style>