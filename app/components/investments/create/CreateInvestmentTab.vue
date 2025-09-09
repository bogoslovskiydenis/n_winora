<template>
  <div class="create-investment">
    <!-- Левая колонка -->
    <div class="left-column">
      <!-- Пресет -->
      <PresetSelector
        :selected-preset="selectedPreset"
        :show-hints="showHints"
        @update-preset="$emit('update-preset', $event)"
      />
      <BettingControls
        :betting-mode="bettingMode"
        :show-hints="showHints"
        @update-betting-mode="handleBettingModeChange"
      />
      <!-- Эквалайзер -->
      <EqualizerSettings
        :settings="currentSettings"
        :selected-platforms="selectedPlatforms"
        :betting-mode="bettingMode"
        :show-hints="showHints"
        @update-settings="handleSettingsUpdate"
        @update-platforms="$emit('update-platforms', $event)"
      />
    </div>

    <!-- Правая колонка -->
    <div class="right-column">
      <!-- Предпросмотр инвестиции -->
      <InvestmentPreview
        :selected-preset="selectedPreset"
        :betting-mode="bettingMode"
        :settings="currentSettings"
        :show-hints="showHints"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, computed } from 'vue';
import PresetSelector from './../create/PresetSelector.vue';
import BettingControls from './../create/BettingControls.vue';
import EqualizerSettings from './../create/EqualizerSettings.vue';
import InvestmentPreview from './../create/InvestmentPreview.vue';

const props = defineProps({
  selectedPreset: {
    type: String,
    required: true,
  },
  bettingMode: {
    type: String,
    required: true,
  },
  settings: {
    type: Object,
    required: true,
  },
  selectedPlatforms: {
    type: Object,
    required: true,
  },
  showHints: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits([
  'update-preset',
  'update-betting-mode',
  'update-settings',
  'update-platforms',
]);

// Локальные настройки для каждого режима
const gamblingSettings = reactive({
  highRtp: false,
  casinoParticipation: false,
  autoSlotChange: false,
  winsCount: 100,
  slotSelection: false,
  minimalStakes: true,
  platformDistribution: false,
});

const bettingSettings = reactive({
  teamStatistics: true,
  favoriteBets: true,
  bankrollManagement: true,
  liveBetting: false,
  multipleOutcomes: false,
  bookmakersDistribution: false,
});

// Инициализируем настройки из пропсов
const initializeSettings = () => {
  if (props.bettingMode === 'gambling') {
    Object.assign(gamblingSettings, props.settings);
  } else {
    Object.assign(bettingSettings, props.settings);
  }
};

// Вычисляемые настройки в зависимости от режима
const currentSettings = computed(() => {
  return props.bettingMode === 'gambling' ? gamblingSettings : bettingSettings;
});

// Обработчик изменения режима беттинга
const handleBettingModeChange = (mode) => {
  emit('update-betting-mode', mode);

  // Очищаем неактуальные настройки платформ при смене режима
  const platformUpdates = {};

  if (mode === 'gambling') {
    // Очищаем настройки букмекеров
    Object.keys(props.selectedPlatforms).forEach((key) => {
      if (key.startsWith('bookmaker')) {
        platformUpdates[key] = false;
      }
    });

    // Применяем настройки гэмблинга
    emit('update-settings', { ...gamblingSettings });
  } else {
    // Очищаем настройки казино
    Object.keys(props.selectedPlatforms).forEach((key) => {
      if (key.startsWith('casino')) {
        platformUpdates[key] = false;
      }
    });

    // Применяем настройки беттинга
    emit('update-settings', { ...bettingSettings });
  }

  if (Object.keys(platformUpdates).length > 0) {
    emit('update-platforms', platformUpdates);
  }

  console.log('Режим изменен на:', mode);
};

// Обработчик обновления настроек
const handleSettingsUpdate = (newSettings) => {
  if (props.bettingMode === 'gambling') {
    Object.assign(gamblingSettings, newSettings);
  } else {
    Object.assign(bettingSettings, newSettings);
  }

  emit('update-settings', newSettings);
  console.log('Настройки обновлены:', newSettings);
};

// Инициализируем настройки при монтировании
onMounted(() => {
  initializeSettings();
});

// Отслеживаем изменения режима для логирования
watch(
  () => props.bettingMode,
  (newMode, oldMode) => {
    if (newMode !== oldMode) {
      console.log(`Режим изменен с ${oldMode} на ${newMode}`);
    }
  }
);
</script>

<style scoped>
.create-investment {
  gap: 32px;
  align-items: start;
}

.left-column,
.right-column {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.right-column {
  position: sticky;
  top: 24px;
}

@media (max-width: 1200px) {
  .create-investment {
    gap: 24px;
  }

  .right-column {
    position: static;
    width: 100%;
  }
}

@media (max-width: 768px) {
  .create-investment {
    gap: 20px;
  }

  .left-column,
  .right-column {
    gap: 20px;
  }
}
</style>
