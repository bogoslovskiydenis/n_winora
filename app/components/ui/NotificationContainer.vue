<template>
  <div class="notification-container">
    <SuccessNotification
      v-for="notification in notifications"
      :key="notification.id"
      :show="true"
      :type="notification.type"
      :title="notification.title"
      :message="notification.message"
      :duration="0"
      @close="removeNotification(notification.id)"
    />
  </div>
</template>

<script setup>
const { notifications, removeNotification } = useNotification();
</script>

<style scoped>
.notification-container {
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 1001;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 400px;
}

@media (max-width: 768px) {
  .notification-container {
    top: 16px;
    right: 16px;
    left: 16px;
    max-width: none;
  }
}

@media (max-width: 480px) {
  .notification-container {
    top: 12px;
    right: 12px;
    left: 12px;
  }
}

/* Стили для множественных уведомлений */
.notification-container > * {
  pointer-events: auto;
}

.notification-container > *:not(:first-child) {
  margin-top: -4px;
  transform: scale(0.98);
  opacity: 0.9;
}

.notification-container > *:not(:first-child):not(:nth-child(2)) {
  transform: scale(0.96);
  opacity: 0.8;
}

/* Эффект стека уведомлений */
.notification-container > *:nth-child(n + 4) {
  display: none;
}
</style>
