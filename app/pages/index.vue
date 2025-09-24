<template>
  <div class="main-page">
    <div class="content-wrapper">
      <!-- Главная страница -->
      <div class="main-section">
        <GameCards />
        <LoyaltySection />
        <!-- <ChestPromo /> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import GameCards from '~/components/main/GameCards.vue';
import LoyaltySection from '~/components/main/LoyaltySection.vue';

// Применяем middleware для проверки авторизации
definePageMeta({
  middleware: 'auth',
});

// SEO для главной страницы
useHead({
  title: 'Главная - Winora',
  meta: [
    {
      name: 'description',
      content:
        'Winora - современная платформа для инвестиций и управления капиталом',
    },
  ],
});
</script>

<style scoped>
.main-page {
  min-height: 100vh;
  width: 100%;
}

.content-wrapper {
  margin: 0 auto;
  padding: 24px 64px 64px 64px;
  max-width: 1272px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.main-section {
  width: 100%;
}

/* Mobile Responsive */
@media (max-width: 1023px) {
  .content-wrapper {
    padding: 24px 16px;
  }
}

@media (max-width: 480px) {
  .content-wrapper {
    padding: 20px 12px;
  }
}
</style>
