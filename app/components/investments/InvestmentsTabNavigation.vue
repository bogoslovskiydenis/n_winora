<template>
  <div class="tabs">
    <button
      class="tab"
      :class="{ active: activeTab === 'create' }"
      @click="$emit('tab-change', 'create')"
    >
      <div class="tab-icon">
        <img
          src="./../../assets/images/create_invest.svg"
          alt="create_invest"
        />
      </div>
      <span>Создать инвестицию</span>
    </button>
    <button
      class="tab"
      :class="{ active: activeTab === 'my' }"
      @click="$emit('tab-change', 'my')"
    >
      <div class="tab-icon">
        <img src="./../../assets/images/invest.svg" alt="invest" />
      </div>
      <span>Мои инвестиции</span>
    </button>
  </div>
</template>

<script setup>
defineProps({
  activeTab: {
    type: String,
    required: true,
    validator: (value) => ['create', 'my'].includes(value),
  },
});

defineEmits(['tab-change']);
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

.tab-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.tab-icon img {
  width: 16px;
  height: 16px;
}

/* Адаптивность */
@media (max-width: 768px) {
  .tab {
    font-size: 13px;
    padding: 8px 4px;
    gap: 4px;
    min-height: 40px;
  }

  .tab-icon img {
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
