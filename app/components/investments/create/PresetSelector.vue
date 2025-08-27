<!-- components/investments/PresetSelector.vue -->
<template>
  <div class="investment-card preset-card">
    <div class="card-header">
      <span class="card-icon">⚙️</span>
      <h3>ПРЕСЕТ</h3>
    </div>

    <div class="preset-selector">
      <select
          :value="selectedPreset"
          @change="$emit('update-preset', $event.target.value)"
          class="preset-dropdown"
      >
        <option value="user">Пользовательский</option>
        <option value="conservative">Консервативный</option>
        <option value="balanced">Сбалансированный</option>
        <option value="aggressive">Агрессивный</option>
      </select>

      <div class="preset-info">
        <div class="info-icon">ℹ️</div>
        <div class="preset-description">
          <strong>{{ getPresetTitle() }}</strong><br>
          {{ getPresetDescription() }}
        </div>
        <div class="preset-dots">
          <span
              v-for="preset in presetList"
              :key="preset"
              class="dot"
              :class="{ active: selectedPreset === preset }"
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  selectedPreset: {
    type: String,
    required: true
  }
})

defineEmits(['update-preset'])

const presetList = ['user', 'conservative', 'balanced', 'aggressive']

const presetTitles = {
  user: 'Пользовательский',
  conservative: 'Консервативный',
  balanced: 'Сбалансированный',
  aggressive: 'Агрессивный'
}

const presetDescriptions = {
  user: 'Настройте инвестицию под свои предпочтения',
  conservative: 'Минимальные риски, стабильная, но невысокая доходность',
  balanced: 'Сбалансированное соотношение риска и доходности',
  aggressive: 'Высокие риски, максимальная потенциальная доходность'
}

const getPresetTitle = () => {
  return presetTitles[props.selectedPreset] || 'Пользовательский'
}

const getPresetDescription = () => {
  return presetDescriptions[props.selectedPreset] || 'Настройте инвестицию под свои предпочтения'
}
</script>

<style scoped>
.investment-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 24px;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.card-icon {
  font-size: 20px;
  color: #f97316;
}

.card-header h3 {
  font-size: 16px;
  font-weight: 700;
  color: #f97316;
  margin: 0;
  letter-spacing: 0.5px;
}

.preset-selector {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.preset-dropdown {
  width: 100%;
  padding: 12px 16px;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: white;
  font-size: 14px;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.3s ease;
}

.preset-dropdown:hover {
  border-color: rgba(255, 255, 255, 0.2);
}

.preset-dropdown:focus {
  outline: none;
  border-color: #4ade80;
  box-shadow: 0 0 0 2px rgba(74, 222, 128, 0.2);
}

.preset-dropdown option {
  background: #1a1a1a;
  color: white;
  padding: 8px;
}

.preset-info {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  background: rgba(74, 222, 128, 0.1);
  border-radius: 8px;
}

.info-icon {
  color: #4ade80;
  font-size: 18px;
  flex-shrink: 0;
}

.preset-description {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.4;
  flex: 1;
}

.preset-description strong {
  color: white;
}

.preset-dots {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-left: 8px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.dot.active {
  background: #f97316;
  box-shadow: 0 0 8px rgba(249, 115, 22, 0.4);
}

@media (max-width: 480px) {
  .investment-card {
    padding: 16px;
  }

  .preset-info {
    flex-direction: column;
    gap: 8px;
  }

  .preset-dots {
    flex-direction: row;
    margin-left: 0;
  }
}
</style>