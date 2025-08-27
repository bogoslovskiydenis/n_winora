<!-- investments.vue - главный файл страницы -->
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
          :settings="settings"
          :selected-platforms="selectedPlatforms"
          @update-preset="selectedPreset = $event"
          @update-betting-mode="bettingMode = $event"
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
// Добавим middleware для проверки авторизации
import InvestmentsInfoBanner from "./../components/investments/InvestmentsInfoBanner.vue";
import InvestmentsTabNavigation from "./../components/investments/InvestmentsTabNavigation.vue";
import MyInvestmentsTab from "./../components/investments/my/MyInvestmentsTab.vue";
import CreateInvestmentTab from "./../components/investments/create/CreateInvestmentTab.vue";
import InvestmentsHeader from "./../components/investments/InvestmentsHeader.vue";

definePageMeta({
  middleware: 'auth'
})

// Реактивные данные
const activeTab = ref('create')
const showHints = ref(true)
const selectedPreset = ref('user')
const bettingMode = ref('betting')

const settings = ref({
  highRtp: false,
  casinoParticipation: false,
  autoSlotChange: false,
  slotSelection: false,
  platformDistribution: false,
  minimalStakes: false,
  winsCount: 100
})

const selectedPlatforms = ref({
  platform1: false,
  platform2: false,
  platform3: false,
  platform4: false,
  platform5: false
})

// Методы для обновления данных
const updateSettings = (newSettings) => {
  settings.value = { ...settings.value, ...newSettings }
}

const updatePlatforms = (newPlatforms) => {
  selectedPlatforms.value = { ...selectedPlatforms.value, ...newPlatforms }
}

// SEO метаданные
useHead({
  title: 'Инвестиции - Winora',
  meta: [
    { name: 'description', content: 'Создавайте и управляйте своими инвестициями в Winora' }
  ]
})
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