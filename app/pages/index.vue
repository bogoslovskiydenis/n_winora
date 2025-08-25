<template>
  <div>
    <!-- Автоматическое перенаправление -->
  </div>
</template>

<script setup>
// Автоматическое перенаправление на страницу авторизации или главную
const { isAuthenticated } = useAuth()

onMounted(() => {
  if (isAuthenticated.value) {
    navigateTo('/main')
  } else {
    navigateTo('/auth')
  }
})
</script>