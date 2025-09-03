<template>
  <button
    :class="buttonClasses"
    :disabled="disabled || loading"
    @click="$emit('click')"
    :type="type"
  >
    <span v-if="loading" class="loading-spinner"></span>
    <span :class="{ 'loading-text': loading }">
      <slot>{{ text }}</slot>
    </span>
  </button>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'outline'].includes(value),
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  text: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'button',
  },
  fullWidth: {
    type: Boolean,
    default: true,
  },
});

defineEmits(['click']);

const buttonClasses = computed(() => [
  'base-button',
  `base-button--${props.variant}`,
  `base-button--${props.size}`,
  {
    'base-button--disabled': props.disabled,
    'base-button--loading': props.loading,
    'base-button--full-width': props.fullWidth,
  },
]);
</script>

<style scoped>
.base-button {
  position: relative;
  border: none;
  border-radius: 32px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  font-family: inherit;
  outline: none;
  font-size: 14px;
}

.base-button--full-width {
  width: 100%;
}

/* Размеры */
.base-button--small {
  padding: 12px 24px;
  font-size: 13px;
  min-height: 44px;
  border-radius: 28px;
}

.base-button--medium {
  padding: 16px 32px;
  font-size: 14px;
  min-height: 52px;
  border-radius: 32px;
}

.base-button--large {
  padding: 18px 36px;
  font-size: 16px;
  min-height: 56px;
  border-radius: 36px;
}

/* Варианты */
.base-button--primary {
  background: #07cb38;
  color: #0a3d2e;
  box-shadow: 0 4px 15px rgba(0, 255, 135, 0.3);
  border: 2px solid transparent;
}

.base-button--primary:hover:not(:disabled):not(.base-button--loading) {
  background: linear-gradient(135deg, #00ff87 0%, #00c965 100%);
  box-shadow: 0 6px 20px rgba(0, 255, 135, 0.4);
  transform: translateY(-1px);
}

.base-button--primary:active:not(:disabled):not(.base-button--loading) {
  transform: translateY(0);
  box-shadow: 0 2px 10px rgba(0, 255, 135, 0.3);
}

.base-button--secondary {
  background: transparent;
  color: rgba(255, 255, 255, 0.8);
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.base-button--secondary:hover:not(:disabled):not(.base-button--loading) {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.5);
  color: white;
  transform: translateY(-1px);
}

.base-button--outline {
  background: transparent;
  color: #00ff87;
  border: 2px solid #00ff87;
}

.base-button--outline:hover:not(:disabled):not(.base-button--loading) {
  background: rgba(0, 255, 135, 0.1);
  border-color: #00d96f;
  transform: translateY(-1px);
}

.base-button--disabled {
  background: rgba(255, 255, 255, 0.1) !important;
  color: rgba(255, 255, 255, 0.4) !important;
  cursor: not-allowed !important;
  transform: none !important;
  box-shadow: none !important;
  border-color: rgba(255, 255, 255, 0.1) !important;
}

.base-button--loading {
  cursor: default;
  pointer-events: none;
}

.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 8px;
}

.loading-text {
  opacity: 0.8;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.base-button:focus-visible {
  outline: 2px solid #00ff87;
  outline-offset: 2px;
}

@media (max-width: 480px) {
  .base-button--medium {
    padding: 14px 28px;
    font-size: 13px;
    min-height: 48px;
  }

  .base-button--large {
    padding: 16px 32px;
    font-size: 14px;
    min-height: 52px;
  }
}
</style>
