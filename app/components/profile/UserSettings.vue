<template>
  <div class="settings-section">
    <div class="settings-card">
      <div class="card-header">
        <h3>🔔 Уведомления</h3>
      </div>
      <div class="settings-list">
        <div class="setting-item">
          <div class="setting-info">
            <div class="setting-title">Email уведомления</div>
            <div class="setting-description">Получать уведомления на email</div>
          </div>
          <label class="toggle-switch">
            <input
                type="checkbox"
                v-model="localSettings.emailNotifications"
                @change="handleSettingChange"
            />
            <span class="toggle-slider"></span>
          </label>
        </div>
        <div class="setting-item">
          <div class="setting-info">
            <div class="setting-title">Push уведомления</div>
            <div class="setting-description">Получать push уведомления в браузере</div>
          </div>
          <label class="toggle-switch">
            <input
                type="checkbox"
                v-model="localSettings.pushNotifications"
                @change="handleSettingChange"
            />
            <span class="toggle-slider"></span>
          </label>
        </div>
        <div class="setting-item">
          <div class="setting-info">
            <div class="setting-title">Уведомления о сделках</div>
            <div class="setting-description">Уведомления об инвестициях и прибыли</div>
          </div>
          <label class="toggle-switch">
            <input
                type="checkbox"
                v-model="localSettings.tradingNotifications"
                @change="handleSettingChange"
            />
            <span class="toggle-slider"></span>
          </label>
        </div>
      </div>
    </div>

    <div class="settings-card">
      <div class="card-header">
        <h3>🎨 Интерфейс</h3>
      </div>
      <div class="settings-list">
        <div class="setting-item">
          <div class="setting-info">
            <div class="setting-title">Анимации</div>
            <div class="setting-description">Включить анимации интерфейса</div>
          </div>
          <label class="toggle-switch">
            <input
                type="checkbox"
                v-model="localSettings.animations"
                @change="handleSettingChange"
            />
            <span class="toggle-slider"></span>
          </label>
        </div>
        <div class="setting-item">
          <div class="setting-info">
            <div class="setting-title">Подсказки</div>
            <div class="setting-description">Показывать подсказки для новичков</div>
          </div>
          <label class="toggle-switch">
            <input
                type="checkbox"
                v-model="localSettings.tooltips"
                @change="handleSettingChange"
            />
            <span class="toggle-slider"></span>
          </label>
        </div>
      </div>
    </div>

    <div class="settings-card danger">
      <div class="card-header">
        <h3>⚠️ Опасная зона</h3>
      </div>
      <div class="danger-actions">
        <div class="danger-item">
          <div class="danger-info">
            <div class="danger-title">Удаление аккаунта</div>
            <div class="danger-description">Это действие нельзя отменить</div>
          </div>
          <BaseButton variant="outline" @click="$emit('show-delete-confirm')">
            Удалить аккаунт
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  settings: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update-settings', 'show-delete-confirm'])

const localSettings = ref({ ...props.settings })

watch(() => props.settings, (newSettings) => {
  localSettings.value = { ...newSettings }
}, { deep: true })

const handleSettingChange = () => {
  emit('update-settings', { ...localSettings.value })
}
</script>

<style scoped>
.settings-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 600px;
  margin: 0 auto;
}

.settings-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px;
  backdrop-filter: blur(15px);
  transition: all 0.3s ease;
}

.settings-card:hover {
  background: rgba(255, 255, 255, 0.06);
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.settings-card.danger {
  border-color: rgba(239, 68, 68, 0.3);
  background: rgba(239, 68, 68, 0.05);
}

.settings-card.danger:hover {
  border-color: rgba(239, 68, 68, 0.4);
  background: rgba(239, 68, 68, 0.08);
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

.settings-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  padding: 16px;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.setting-item:hover {
  background: rgba(0, 0, 0, 0.3);
  border-color: rgba(255, 255, 255, 0.1);
}

.setting-info {
  flex: 1;
}

.setting-title {
  font-size: 16px;
  color: var(--text-primary);
  font-weight: 500;
  margin-bottom: 4px;
}

.setting-description {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.4;
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
  flex-shrink: 0;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.2);
  transition: 0.3s;
  border-radius: 24px;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  transition: 0.3s;
  border-radius: 50%;
}

input:checked + .toggle-slider {
  background-color: #4ade80;
}

input:checked + .toggle-slider:before {
  transform: translateX(26px);
}

.danger-actions {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.danger-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  padding: 16px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.danger-item:hover {
  background: rgba(239, 68, 68, 0.15);
  border-color: rgba(239, 68, 68, 0.4);
}

.danger-info {
  flex: 1;
}

.danger-title {
  font-size: 16px;
  color: #ef4444;
  font-weight: 600;
  margin-bottom: 4px;
}

.danger-description {
  font-size: 14px;
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .settings-section {
    max-width: 100%;
  }

  .settings-card {
    padding: 20px;
  }

  .setting-item {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }

  .toggle-switch {
    align-self: flex-start;
  }

  .danger-item {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
}

@media (max-width: 480px) {
  .settings-card {
    padding: 16px;
  }

  .card-header h3 {
    font-size: 16px;
  }

  .setting-item {
    padding: 12px;
  }

  .setting-title {
    font-size: 15px;
  }

  .setting-description {
    font-size: 13px;
  }
}
</style>