<template>
  <div v-if="show" class="modal-overlay" @click="$emit('close')">
    <div class="modal-content" @click.stop>
      <div class="modal-icon">
        <span class="warning-icon">⚠️</span>
      </div>
      <h3>{{ title }}</h3>
      <p>{{ message }}</p>
      <div class="modal-actions">
        <BaseButton variant="secondary" @click="$emit('close')">
          {{ cancelText }}
        </BaseButton>
        <BaseButton variant="primary" @click="handleConfirm">
          {{ confirmText }}
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: 'Подтверждение',
  },
  message: {
    type: String,
    default: 'Вы уверены?',
  },
  confirmText: {
    type: String,
    default: 'Подтвердить',
  },
  cancelText: {
    type: String,
    default: 'Отмена',
  },
});

const emit = defineEmits(['close', 'confirm']);

const handleConfirm = () => {
  emit('confirm');
  emit('close');
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: fadeIn 0.3s ease;
}

.modal-content {
  background: var(--background-secondary);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px;
  max-width: 400px;
  width: 100%;
  animation: modalSlideIn 0.3s ease;
  backdrop-filter: blur(15px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
}

.modal-icon {
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
}

.warning-icon {
  font-size: 48px;
  color: #f97316;
  filter: drop-shadow(0 0 8px rgba(249, 115, 22, 0.3));
}

.modal-content h3 {
  font-size: 20px;
  color: var(--text-primary);
  margin: 0 0 12px 0;
  font-weight: 600;
  text-align: center;
}

.modal-content p {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.5;
  margin: 0 0 24px 0;
  text-align: center;
}

.modal-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (max-width: 768px) {
  .modal-content {
    padding: 20px;
    margin: 16px;
  }

  .modal-actions {
    flex-direction: column;
  }

  .warning-icon {
    font-size: 40px;
  }

  .modal-content h3 {
    font-size: 18px;
  }

  .modal-content p {
    font-size: 13px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .modal-overlay,
  .modal-content {
    animation: none;
  }
}
</style>
