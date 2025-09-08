<template>
  <div class="investment-card preset-card">
    <div class="card-header">
      <img src="./../../../assets/images/Preset.svg" alt="Preset" />
      <h3>ПРЕСЕТ</h3>
    </div>

    <div class="preset-selector">
      <div class="select-wrapper" ref="selectWrapper">
        <div
          class="preset-dropdown"
          @click="toggleDropdown"
          :class="{ active: isOpen }"
        >
          <span class="selected-text">{{ getPresetTitle() }}</span>
          <div class="select-arrow" :class="{ rotated: isOpen }">
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
              <path
                d="M1 1L6 6L11 1"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>

        <div v-if="isOpen" class="dropdown-list">
          <div
            v-for="preset in presetOptions"
            :key="preset.value"
            class="dropdown-item"
            :class="{ selected: selectedPreset === preset.value }"
            @click="selectPreset(preset.value)"
          >
            {{ preset.label }}
          </div>
        </div>
      </div>

      <div class="preset-info">
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
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  selectedPreset: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['update-preset']);

const isOpen = ref(false);
const selectWrapper = ref(null);

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

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectPreset = (value) => {
  emit('update-preset', value);
  isOpen.value = false;
};

const handleClickOutside = (event) => {
  if (selectWrapper.value && !selectWrapper.value.contains(event.target)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
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

.select-wrapper {
  position: relative;
  width: 100%;
  z-index: 100;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
}

.preset-dropdown:hover {
  border-color: rgba(255, 255, 255, 0.2);
}

.preset-dropdown.active {
  border-color: #4ade80;
  box-shadow: 0 0 0 2px rgba(74, 222, 128, 0.2);
}

.selected-text {
  flex: 1;
}

.select-arrow {
  color: rgba(255, 255, 255, 0.6);
  transition: transform 0.3s ease;
  display: flex;
  align-items: center;
}

.select-arrow.rotated {
  transform: rotate(180deg);
}

.dropdown-list {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  margin-top: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  overflow: hidden;
  z-index: 101;
}

.dropdown-item {
  padding: 12px 16px;
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.dropdown-item:last-child {
  border-bottom: none;
}

.dropdown-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.dropdown-item.selected {
  background: rgba(74, 222, 128, 0.2);
  color: #4ade80;
}

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
