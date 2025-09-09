<!-- pages/investments.vue -->
<template>
  <div class="investments-section">
    <!-- Заголовок страницы -->
    <InvestmentsHeader
      :show-hints="showHints"
      @toggle-hints="showHints = !showHints"
    />

    <!-- Навигация по вкладкам -->
    <InvestmentsTabNavigation
      :active-tab="activeTab"
      @tab-change="activeTab = $event"
    />

    <!-- Информационный баннер -->
    <InvestmentsInfoBanner v-if="showHints" />

    <!-- Контент вкладок -->
    <div class="tab-content">
      <!-- Создать инвестицию -->
      <CreateInvestmentTab
        v-if="activeTab === 'create'"
        :selected-preset="selectedPreset"
        :betting-mode="bettingMode"
        :settings="currentSettings"
        :selected-platforms="selectedPlatforms"
        :show-hints="showHints"
        @update-preset="selectedPreset = $event"
        @update-betting-mode="updateBettingMode"
        @update-settings="updateSettings"
        @update-platforms="updatePlatforms"
      />

      <!-- Мои инвестиции -->
      <MyInvestmentsTab
        v-else-if="activeTab === 'my'"
        @create-first="activeTab = 'create'"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, computed } from 'vue';
// Импорты компонентов
import InvestmentsInfoBanner from './../components/investments/InvestmentsInfoBanner.vue';
import InvestmentsTabNavigation from './../components/investments/InvestmentsTabNavigation.vue';
import MyInvestmentsTab from './../components/investments/my/MyInvestmentsTab.vue';
import CreateInvestmentTab from './../components/investments/create/CreateInvestmentTab.vue';
import InvestmentsHeader from './../components/investments/InvestmentsHeader.vue';

definePageMeta({
  middleware: 'auth',
});

// Реактивные данные
const activeTab = ref('create');
const showHints = ref(true);
const selectedPreset = ref('user');
const bettingMode = ref('gambling');

// Настройки для гэмблинга
const gamblingSettings = reactive({
  highRtp: false,
  casinoParticipation: false,
  autoSlotChange: false,
  winsCount: 100,
  slotSelection: false,
  minimalStakes: true,
  platformDistribution: false,
});

// Настройки для беттинга
const bettingSettings = reactive({
  regionSelection: true,
  esportsBets: true,
  matchFixingInsights: false,
  expressBets: true,
  menCompetitions: true,
  womenCompetitions: true,
});

// Выбранные платформы для каждого режима
const selectedPlatforms = reactive({
  // Платформы для гэмблинга
  casino1: false,
  casino2: false,
  casino3: false,
  casino4: false,
  casino5: false,
  // Платформы для беттинга
  bookmaker1: false,
  bookmaker2: false,
  bookmaker3: false,
  bookmaker4: false,
  bookmaker5: false,
});

// Вычисляемые настройки в зависимости от режима
const currentSettings = computed(() => {
  return bettingMode.value === 'gambling' ? gamblingSettings : bettingSettings;
});

// Обновление режима беттинга
const updateBettingMode = (mode) => {
  const oldMode = bettingMode.value;
  bettingMode.value = mode;

  // Очистка настроек при смене режима
  if (oldMode !== mode) {
    resetPlatformsOnModeChange();
  }

  console.log('Режим изменен на:', mode);
};

// Обновление настроек
const updateSettings = (newSettings) => {
  if (bettingMode.value === 'gambling') {
    Object.assign(gamblingSettings, newSettings);
  } else {
    Object.assign(bettingSettings, newSettings);
  }
  console.log('Настройки обновлены:', newSettings);
};

// Обновление выбранных платформ
const updatePlatforms = (newPlatforms) => {
  Object.assign(selectedPlatforms, newPlatforms);
  console.log('Платформы обновлены:', newPlatforms);
};

// Очистка настроек при смене режима
const resetPlatformsOnModeChange = () => {
  if (bettingMode.value === 'gambling') {
    // Очищаем настройки букмекеров
    Object.keys(selectedPlatforms).forEach((key) => {
      if (key.startsWith('bookmaker')) {
        selectedPlatforms[key] = false;
      }
    });
  } else {
    // Очищаем настройки казино
    Object.keys(selectedPlatforms).forEach((key) => {
      if (key.startsWith('casino')) {
        selectedPlatforms[key] = false;
      }
    });
  }
};

// Отслеживаем изменение режима
watch(bettingMode, (newMode, oldMode) => {
  if (newMode !== oldMode) {
    console.log(`Режим изменен с ${oldMode} на ${newMode}`);
  }
});

// SEO метаданные
useHead({
  title: 'Инвестиции - Winora',
  meta: [
    {
      name: 'description',
      content: 'Создавайте и управляйте своими инвестициями в Winora',
    },
  ],
});
</script>

<style scoped>
.investments-section {
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
  background: linear-gradient(135deg, #0a2f23 0%, #1a4b3a 100%);
  min-height: 100vh;
}

.tab-content {
  margin-top: 24px;
}

@media (max-width: 768px) {
  .investments-section {
    padding: 16px;
  }
}
</style>
