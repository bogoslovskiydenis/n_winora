<template>
  <div class="tabs">
    <button
      class="tab"
      :class="{ active: activeTab === 'create' }"
      @click="$emit('tab-change', 'create')"
    >
      <img src="./../../assets/images/create_invest.svg" alt="create_invest" />
      Создать инвестицию
    </button>
    <button
      class="tab"
      :class="{ active: activeTab === 'my' }"
      @click="$emit('tab-change', 'my')"
    >
      <img src="./../../assets/images/invest.svg" alt="invest" />
      Мои инвестиции
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
/* Табы */
.tabs {
  width: 100%;
  height: 80px;
  padding: 48px 0 2px 0;
  display: flex;
  background: transparent;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  box-sizing: border-box;
  margin-bottom: 24px;
}

.tab {
  flex: 1;
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  border: none;
  background: transparent;
  transition: all 0.3s ease;
  font-size: 16px;
  font-weight: 500;
  font-family: inherit;
  border-bottom: 2px solid transparent;
  border-radius: 0;
  text-decoration: none;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 8px;
}

.tab.active {
  color: white;
  border-bottom-color: #4ade80;
}

.tab:hover:not(.active) {
  color: rgba(255, 255, 255, 0.8);
}

.tab-icon {
  font-size: 16px;
  flex-shrink: 0;
}

/* АДАПТИВНОСТЬ */

/* Планшеты (768px - 1023px) */
@media (min-width: 768px) and (max-width: 1023px) {
  .tabs {
    height: 75px;
    padding-top: 40px;
  }
}

/* Десктоп (1024px+) */
@media (min-width: 1024px) {
  .tabs {
    height: 80px;
    padding-top: 48px;
  }
}

/* Маленькие планшеты (481px - 767px) */
@media (min-width: 481px) and (max-width: 767px) {
  .tabs {
    height: 65px;
    padding-top: 30px;
  }

  .tab {
    font-size: 15px;
    padding: 0 6px;
  }
}

/* Мобильные устройства (до 480px) */
@media (max-width: 480px) {
  .tabs {
    height: 60px;
    padding-top: 24px;
  }

  .tab {
    font-size: 14px;
    padding: 0 4px;
    gap: 6px;
  }

  .tab-icon {
    font-size: 14px;
  }
}

/* Очень маленькие экраны (до 360px) */
@media (max-width: 360px) {
  .tabs {
    height: 55px;
    padding-top: 20px;
  }

  .tab {
    font-size: 13px;
    padding: 0 2px;
    gap: 4px;
  }

  .tab-icon {
    font-size: 12px;
  }
}

/* Landscape ориентация для мобильных */
@media (max-width: 767px) and (orientation: landscape) {
  .tabs {
    height: 50px;
    padding-top: 16px;
  }
}
</style>
