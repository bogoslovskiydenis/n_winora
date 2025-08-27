<!-- components/investments/InvestmentsInfoBanner.vue -->
<template>
  <div class="info-banner">
    <div class="info-icon">⚠️</div>
    <div class="info-text">
      Вспомогательная информация, которая появляется на экране и помогает
      пользователю при работе
    </div>
  </div>
</template>

<script setup>
// Этот компонент не принимает пропсы, но можно добавить в будущем:
// defineProps({
//   message: {
//     type: String,
//     default: 'Вспомогательная информация, которая появляется на экране и помогает пользователю при работе'
//   },
//   type: {
//     type: String,
//     default: 'warning',
//     validator: (value) => ['info', 'warning', 'error', 'success'].includes(value)
//   }
// })
</script>

<style scoped>
.info-banner {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  background: rgba(249, 115, 22, 0.1);
  border: 1px solid rgba(249, 115, 22, 0.3);
  border-radius: 12px;
  margin-bottom: 24px;
  animation: slideIn 0.3s ease;
}

.info-icon {
  font-size: 20px;
  color: #f97316;
  flex-shrink: 0;
}

.info-text {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 480px) {
  .info-banner {
    padding: 12px;
  }

  .info-text {
    font-size: 13px;
  }
}
</style>
