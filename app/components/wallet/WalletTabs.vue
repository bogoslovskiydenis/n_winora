<template>
  <div class="tabs">
    <button
      class="tab"
      :class="{ active: activeTab === 'deposit' }"
      @click="$emit('change-tab', 'deposit')"
    >
      <div class="tab-icon">
        <img src="./../../assets/images/add_balance.svg" alt="add_balance" />
      </div>
      <span>Пополнить счет</span>
    </button>
    <button
      class="tab"
      :class="{ active: activeTab === 'withdraw' }"
      @click="$emit('change-tab', 'withdraw')"
    >
      Вывод средств
    </button>
    <button
      class="tab"
      :class="{ active: activeTab === 'history' }"
      @click="$emit('change-tab', 'history')"
    >
      История транзакций
    </button>
  </div>
</template>

<script setup>
defineProps({
  activeTab: {
    type: String,
    required: true,
  },
});

defineEmits(['change-tab']);
</script>

<style scoped>
.tabs {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  max-width: 644px;
  padding: 0 0 2px 0;
}

.tab {
  flex: 1;
  text-align: center;
  cursor: pointer;
  border: none;
  background: transparent;
  transition: all 0.3s ease;
  font-family: inherit;
  border-radius: 0;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 48px;
  padding: 12px 8px;

  /* Стили для неактивного состояния */
  font-weight: 400;
  font-size: 14px;
  line-height: 1.2;
  color: rgba(255, 255, 255, 0.6);
  border-bottom: 2px solid transparent;
  box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.25);
}

.tab.active {
  /* Стили для активного состояния */
  border-bottom-color: #4ade80;
  color: white;
  font-weight: 500;
  box-shadow: none;
}

.tab:hover:not(.active) {
  color: rgba(255, 255, 255, 0.8);
}

.tab-icon img {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Адаптивность */
@media (max-width: 768px) {
  .tab {
    font-size: 13px;
    padding: 8px 4px;
    gap: 4px;
    min-height: 40px;
  }

  .tab-icon {
    width: 16px;
    height: 16px;
  }
}

@media (max-width: 480px) {
  .tab {
    font-size: 12px;
    gap: 3px;
    padding: 6px 2px;
  }

  .tab-icon img {
    width: 14px;
    height: 14px;
  }
}
</style>
