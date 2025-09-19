<template>
  <div class="tab-content" :class="{ 'tab-content--full-width': isCreateTab }">
    <!-- Info Banner внутри tab-content - центрированный -->
    <div class="banner-container">
      <InfoBanner
        v-if="showHints"
        :show="showHints"
        message="Вспомогательная информация, которая появляется на экране и помогает пользователю при работе"
        variant="default"
        icon="info"
        size="medium"
      />
    </div>

    <!-- Контент конкретной вкладки -->
    <div class="tab-inner-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import InfoBanner from './InfoBanner.vue';

const props = defineProps({
  showHints: {
    type: Boolean,
    default: true,
  },
  activeTab: {
    type: String,
    default: 'create',
  },
});

// Проверяем, активна ли вкладка "Создать инвестицию"
const isCreateTab = computed(() => props.activeTab === 'create');
</script>

<style scoped>
.tab-content {
  border-bottom-right-radius: 24px;
  border-bottom-left-radius: 24px;
  padding: 16px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;

  /* Для центрирования контента */
  display: flex;
  flex-direction: column;

  /* Фон как в Wallet */
  background: rgba(0, 170, 105, 0.15);
}

/* Убираем max-width для вкладки "Создать инвестицию" */
.tab-content--full-width {
  max-width: 644px;
}

/* Контейнер для центрирования баннера */
.banner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 16px 0;
}

.tab-inner-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* Стили для InfoBanner внутри tab-content - центрированный */
.banner-container .info-banner {
  background: #00000033;
  border-top: 1px solid #00b27d33;
  box-shadow: 0px 1px 5px 0px #00000040;
  border-radius: 16px;
  max-width: 604px;
  width: 100%;
  margin: 0; /* Убираем margin, так как центрируем через flex */
}

/* Адаптивность */
@media (max-width: 768px) {
  .tab-content {
    max-width: 100%;
    padding: 12px;
    border-bottom-right-radius: 20px;
    border-bottom-left-radius: 20px;
  }

  .banner-container {
    margin: 12px 0;
  }
}

@media (max-width: 480px) {
  .tab-content {
    padding: 8px;
    border-bottom-right-radius: 16px;
    border-bottom-left-radius: 16px;
  }

  .banner-container {
    margin: 8px 0;
  }

  .banner-container .info-banner {
    border-radius: 12px;
  }
}
</style>
