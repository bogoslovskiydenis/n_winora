<!-- components/ui/SuccessNotification.vue -->
<template>
  <Transition name="notification" appear>
    <div v-if="show" class="notification-overlay">
      <div class="notification" :class="type">
        <div class="notification-icon">
          <span v-if="type === 'success'">✅</span>
          <span v-else-if="type === 'error'">❌</span>
          <span v-else-if="type === 'warning'">⚠️</span>
          <span v-else>ℹ️</span>
        </div>

        <div class="notification-content">
          <div class="notification-title" v-if="title">{{ title }}</div>
          <div class="notification-message">{{ message }}</div>
        </div>

        <button
          class="notification-close"
          @click="$emit('close')"
          aria-label="Закрыть уведомление"
        >
          ×
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'info',
    validator: (value) =>
      ['success', 'error', 'warning', 'info'].includes(value),
  },
  duration: {
    type: Number,
    default: 4000,
  },
});

const emit = defineEmits(['close']);

// Автозакрытие уведомления
const { duration } = toRefs(useSlots() || {});
let autoCloseTimer = null;

watch(
  () => props.show,
  (newValue) => {
    if (newValue && props.duration > 0) {
      // Очищаем предыдущий таймер
      if (autoCloseTimer) {
        clearTimeout(autoCloseTimer);
      }

      // Устанавливаем новый таймер
      autoCloseTimer = setTimeout(() => {
        emit('close');
      }, props.duration);
    }
  }
);

onUnmounted(() => {
  if (autoCloseTimer) {
    clearTimeout(autoCloseTimer);
  }
});
</script>

<style scoped>
.notification-overlay {
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 1001;
  pointer-events: none;
}

.notification {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px 20px;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: white;
  font-size: 14px;
  max-width: 400px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  pointer-events: auto;
}

.notification.success {
  background: rgba(34, 197, 94, 0.95);
  border-color: rgba(34, 197, 94, 0.3);
  box-shadow: 0 8px 32px rgba(34, 197, 94, 0.2);
}

.notification.error {
  background: rgba(239, 68, 68, 0.95);
  border-color: rgba(239, 68, 68, 0.3);
  box-shadow: 0 8px 32px rgba(239, 68, 68, 0.2);
}

.notification.warning {
  background: rgba(249, 115, 22, 0.95);
  border-color: rgba(249, 115, 22, 0.3);
  box-shadow: 0 8px 32px rgba(249, 115, 22, 0.2);
}

.notification.info {
  background: rgba(59, 130, 246, 0.95);
  border-color: rgba(59, 130, 246, 0.3);
  box-shadow: 0 8px 32px rgba(59, 130, 246, 0.2);
}

.notification-icon {
  font-size: 20px;
  flex-shrink: 0;
  margin-top: 2px;
}

.notification-content {
  flex: 1;
  min-width: 0;
}

.notification-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
  color: white;
}

.notification-message {
  font-size: 14px;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.95);
}

.notification-close {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.8);
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s ease;
  flex-shrink: 0;
  margin-top: 2px;
}

.notification-close:hover {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  transform: scale(1.1);
}

.notification-close:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.5);
  outline-offset: 1px;
}

/* Анимации */
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(100%) scale(0.95);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.95);
}

/* Мобильная адаптация */
@media (max-width: 768px) {
  .notification-overlay {
    top: 16px;
    right: 16px;
    left: 16px;
  }

  .notification {
    width: 100%;
    max-width: none;
  }
}

@media (max-width: 480px) {
  .notification {
    padding: 12px 16px;
    font-size: 13px;
  }

  .notification-icon {
    font-size: 18px;
  }

  .notification-title {
    font-size: 14px;
  }

  .notification-message {
    font-size: 13px;
  }

  .notification-close {
    font-size: 20px;
    width: 20px;
    height: 20px;
  }
}

/* Анимация прогресс-бара для автозакрытия */
.notification::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 0 0 12px 12px;
  animation: notificationProgress var(--duration, 4s) linear forwards;
}

@keyframes notificationProgress {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}

.notification:hover::after {
  animation-play-state: paused;
}

/* Стили для поддержки уменьшенной анимации */
@media (prefers-reduced-motion: reduce) {
  .notification-enter-active,
  .notification-leave-active {
    transition-duration: 0.1s;
  }

  .notification::after {
    animation: none;
    display: none;
  }

  .notification-close:hover {
    transform: none;
  }
}
</style>
