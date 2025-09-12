<template>
  <div class="investments-page">
    <div class="investments-container">
      <!-- Заголовок страницы с переключателем подсказок -->
      <InvestmentsHeader
        :show-hints="showHints"
        @toggle-hints="showHints = !showHints"
      />

      <!-- Навигация по вкладкам -->
      <InvestmentsTabNavigation
        :active-tab="activeTab"
        @tab-change="activeTab = $event"
      />

      <!-- Контент вкладок с InfoBanner внутри -->
      <InvestmentsTabContent :show-hints="showHints" :active-tab="activeTab">
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
      </InvestmentsTabContent>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';

// Импорты компонентов
import InvestmentsTabContent from './../components/investments/InvestmentsTabContent.vue';
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

// Методы для обновления данных
const updateBettingMode = (mode) => {
  bettingMode.value = mode;
};

const updateSettings = (newSettings) => {
  if (bettingMode.value === 'gambling') {
    Object.assign(gamblingSettings, newSettings);
  } else {
    Object.assign(bettingSettings, newSettings);
  }
};

const updatePlatforms = (platformUpdates) => {
  Object.assign(selectedPlatforms, platformUpdates);
};

// SEO
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
.investments-page {
  min-height: 100vh;
  background: linear-gradient(0deg, #002920 0%, #00382b 100%);
  color: #ffffff;
  padding: 0;
  margin: 0;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
}

.investments-container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
