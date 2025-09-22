<template>
  <div class="shop-page">
    <div class="content-wrapper">
      <!-- Заголовок страницы -->
      <div class="page-header">
        <h1 class="page-title">МАГАЗИН</h1>
        <div class="page-subtitle">
          Приобретайте товары для улучшения игрового опыта
        </div>
      </div>

      <!-- Компонент секции магазина -->
      <ShopSection />
    </div>
  </div>
</template>

<script setup>
import ShopSection from '~/components/shop/ShopSection.vue';

// Применяем middleware для проверки авторизации
definePageMeta({
  middleware: 'auth',
});

// SEO для страницы магазина
useHead({
  title: 'Магазин - Winora',
  meta: [
    {
      name: 'description',
      content:
        'Магазин игровых товаров - сундуки, инвестиции и кастомизация профиля в Winora',
    },
  ],
});
</script>

<style scoped>
.shop-page {
  background: linear-gradient(0deg, #002920 0%, #00382b 100%);
  min-height: 100vh;
  width: 100%;
}

.content-wrapper {
  padding: 32px 24px 120px; /* Увеличен padding-bottom для прокрутки */
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Заголовок страницы */
.page-header {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.page-title {
  font-family: 'Tomorrow', sans-serif;
  font-weight: 700;
  font-size: 28px;
  color: #00b27d;
  margin: 0;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.page-subtitle {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
}

/* Mobile Responsive */
@media (max-width: 1023px) {
  .content-wrapper {
    padding: 24px 16px 120px; /* Сохраняем большой padding-bottom */
  }
}

@media (max-width: 768px) {
  .content-wrapper {
    padding: 20px 16px 140px; /* Увеличиваем для мобильной навигации */
  }

  .page-title {
    font-size: 24px;
  }

  .page-subtitle {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .content-wrapper {
    padding: 16px 12px 160px; /* Максимальный padding для самых маленьких экранов */
  }

  .page-title {
    font-size: 20px;
  }

  .page-header {
    margin-bottom: 12px;
  }
}
</style>
