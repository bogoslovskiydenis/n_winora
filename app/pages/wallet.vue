<template>
  <div class="wallet-page">
    <div class="wallet-container">
      <!-- Заголовок страницы с переключателем подсказок -->
      <WalletHeader :show-hints="showHints" @toggle-hints="toggleHints" />

      <!-- Навигация по вкладкам -->
      <WalletTabs :active-tab="activeTab" @change-tab="activeTab = $event" />

      <!-- Контент вкладок -->
      <div class="tab-content">
        <!-- Вкладка пополнения -->
        <DepositContent
          v-if="activeTab === 'deposit'"
          :show-hints="showHints"
        />

        <!-- Вкладка вывода средств -->
        <WithdrawContent v-else-if="activeTab === 'withdraw'" />

        <!-- Вкладка истории -->
        <HistoryContent v-else-if="activeTab === 'history'" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import DepositContent from './../components/wallet/DepostiContent.vue';

// Реактивные данные
const activeTab = ref('deposit');
const showHints = ref(true);

// Методы
const toggleHints = () => {
  showHints.value = !showHints.value;
};
</script>

<style scoped>
.wallet-page {
  min-height: 100vh;
  background: linear-gradient(0deg, #002920 0%, #00382b 100%);
  color: #ffffff;
  padding: 0;
  margin: 0;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
}

.wallet-container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.tab-content {
  width: 100%;
  max-width: 644px;
  max-height: 752px;
  margin: 0 auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #00aa6926;
  border-bottom-right-radius: 24px;
  border-bottom-left-radius: 24px;
}
</style>
