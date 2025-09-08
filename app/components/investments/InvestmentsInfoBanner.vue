<template>
  <div class="info-banner">
    <img src="./../../assets/images/info.svg" alt="info" />
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
  align-items: center;
  gap: 16px;
  padding: 10px;
  box-shadow: 0px 1px 5px 0px #00000040;
  background: #00000033;
  border-top: 1px solid #00b27d33;
  border-radius: 12px;
  margin-bottom: 24px;
  animation: slideIn 0.3s ease;
}
.info-banner img {
  width: 32px;
  height: 32px;
}

.info-text {
  font-family: Roboto, serif;
  font-weight: 400;
  font-style: Condensed Regular;
  font-size: 14px;
  line-height: 100%;
  color: #ffffff;
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
