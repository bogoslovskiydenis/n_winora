<template>
  <div class="investment-card preset-card">
    <div class="card-header">
      <img src="./../../../assets/images/Preset.svg" alt="Preset" />
      <h3>ПРЕСЕТ</h3>
    </div>

    <div class="preset-selector">
      <!-- Используем CustomSelect вместо собственного dropdown -->
      <CustomSelect
        v-model="selectedPreset"
        :options="presetOptions"
        placeholder="Выберите пресет"
        variant="large"
        @update:modelValue="handlePresetChange"
      />

      <!-- Секция подсказок - управляется общей кнопкой -->
      <div v-show="showHints" class="preset-info">
        <img src="./../../../assets/images/info.svg" alt="info" />

        <div class="preset_container">
          <div class="preset-description">
            <strong>{{ getPresetTitle() }}</strong
            ><br />
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
  </div>
</template>

<script setup>
import CustomSelect from '../CustomSelect.vue';

const props = defineProps({
  selectedPreset: {
    type: String,
    required: true,
  },
  // Получаем состояние подсказок извне
  showHints: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['update-preset']);

const presetList = ['user', 'conservative', 'balanced', 'aggressive'];

const presetOptions = [
  { value: 'user', label: 'Пользовательский' },
  { value: 'conservative', label: 'Консервативный' },
  { value: 'balanced', label: 'Сбалансированный' },
  { value: 'aggressive', label: 'Агрессивный' },
];

const presetTitles = {
  user: 'Пользовательский',
  conservative: 'Консервативный',
  balanced: 'Сбалансированный',
  aggressive: 'Агрессивный',
};

const presetDescriptions = {
  user: 'Настройте инвестицию под свои предпочтения',
  conservative: 'Минимальные риски, стабильная, но невысокая доходность',
  balanced: 'Сбалансированное соотношение риска и доходности',
  aggressive: 'Высокие риски, максимальная потенциальная доходность',
};

const getPresetTitle = () => {
  return presetTitles[props.selectedPreset] || 'Пользовательский';
};

const getPresetDescription = () => {
  return (
    presetDescriptions[props.selectedPreset] ||
    'Настройте инвестицию под свои предпочтения'
  );
};

const handlePresetChange = (value) => {
  emit('update-preset', value);
};
</script>

<style scoped>
.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
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

/* Секция подсказок */
.preset-info {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 20px;
  box-shadow: 0px 1px 5px 0px #00000040;
  border-top: 1px solid #00b27d33;
  border-radius: 16px;
  background: #00000033;
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;
  animation: fadeInUp 0.4s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.preset-info img {
  width: 32px;
  height: 32px;
}

.preset_container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex: 1;
}

.preset-description {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.5;
  text-align: center;
}

.preset-description strong {
  color: white;
  font-size: 16px;
  font-weight: 700;
}

.preset-dots {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 8px;
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
  .preset-info {
    padding: 16px;
    gap: 10px;
  }

  .preset-description {
    font-size: 13px;
  }

  .preset-description strong {
    font-size: 15px;
  }
}
</style>
