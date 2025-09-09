<!-- components/investments/create/CreateInvestmentTab.vue -->
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
        @update-betting-mode="$emit('update-betting-mode', $event)"
      />
      <!-- Эквалайзер -->
      <EqualizerSettings
        :settings="settings"
        :selected-platforms="selectedPlatforms"
        :show-hints="showHints"
        @update-settings="$emit('update-settings', $event)"
        @update-platforms="$emit('update-platforms', $event)"
      />
    </div>

    <!-- Правая колонка -->
    <div class="right-column">
      <!-- Предпросмотр инвестиции -->
      <InvestmentPreview
        :selected-preset="selectedPreset"
        :betting-mode="bettingMode"
        :settings="settings"
        :show-hints="showHints"
      />
    </div>
  </div>
</template>

<script setup>
import PresetSelector from './../create/PresetSelector.vue';
import BettingControls from './../create//BettingControls.vue';
import EqualizerSettings from './../create/EqualizerSettings.vue';
import InvestmentPreview from './../create/InvestmentPreview.vue';

defineProps({
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
  // Добавляем пропс для управления подсказками
  showHints: {
    type: Boolean,
    default: true,
  },
});

defineEmits([
  'update-preset',
  'update-betting-mode',
  'update-settings',
  'update-platforms',
]);
</script>

<style scoped>
.create-investment {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 32px;
  align-items: start;
}

.left-column,
.right-column {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

@media (max-width: 1200px) {
  .create-investment {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .right-column {
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
