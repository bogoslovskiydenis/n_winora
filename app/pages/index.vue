<template>
  <div class="index-page">
    <!-- Автоматическое перенаправление -->
    <div v-if="!redirected" class="loading-container">
      <div class="spinner"></div>
      <p>Загрузка...</p>
    </div>
  </div>
</template>

<script setup>
// Отключаем layout для этой страницы
definePageMeta({
  layout: false,
});

const { isAuthenticated } = useAuth();
const redirected = ref(false);

onMounted(() => {
  // Небольшая задержка для правильной инициализации
  nextTick(() => {
    if (isAuthenticated.value) {
      navigateTo('/main');
    } else {
      navigateTo('/login');
    }
    redirected.value = true;
  });
});

// SEO для главной страницы
useHead({
  title: 'Winora - Инвестиционная платформа',
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
.index-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #01614b, #032019 70%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-container {
  text-align: center;
  color: white;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.2);
  border-top: 3px solid #4ade80;
  border-radius: 50%;
  margin: 0 auto 16px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading-container p {
  font-size: 16px;
  opacity: 0.8;
}
</style>
