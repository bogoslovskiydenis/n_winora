<template>
  <div id="app">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
// Инициализация пользователя при загрузке приложения
onMounted(() => {
  const { initUser } = useAuth()
  initUser()
})
</script>

<style>

:root {
  --primary-color: #4ade80;
  --primary-dark: #22c55e;
  --primary-light: #86efac;
  --secondary-color: #f97316;
  --secondary-dark: #ea580c;
  --background-primary: #0f2027;
  --background-secondary: #203a43;
  --background-tertiary: #2c5364;
  --text-primary: rgba(255, 255, 255, 0.95);
  --text-secondary: rgba(255, 255, 255, 0.7);
  --text-muted: rgba(255, 255, 255, 0.5);
  --border-color: rgba(255, 255, 255, 0.15);
  --border-color-hover: rgba(255, 255, 255, 0.25);
  --error-color: #ef4444;
  --success-color: #22c55e;
  --warning-color: #f59e0b;
  --glass-bg: rgba(255, 255, 255, 0.05);
  --glass-border: rgba(255, 255, 255, 0.1);
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  --border-radius-sm: 8px;
  --border-radius-md: 12px;
  --border-radius-lg: 16px;
  --border-radius-xl: 24px;
  --border-radius-full: 9999px;
  --transition-fast: 0.15s ease;
  --transition-normal: 0.3s ease;
  --transition-slow: 0.5s ease;
}

#app {
  min-height: 100vh;
}

:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}
</style>