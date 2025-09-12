<template>
  <div class="deposit-button-section">
    <button
      class="deposit-button"
      :disabled="!canDeposit"
      @click="$emit('deposit')"
    >
      ПОПОЛНИТЬ БАЛАНС
    </button>
  </div>
</template>

<script setup>
defineProps({
  canDeposit: {
    type: Boolean,
    required: true,
  },
});

defineEmits(['deposit']);
</script>

<style scoped>
.deposit-button-section {
  padding: 20px;
  margin-top: 24px;
}

.deposit-button {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
  border: none;
  border-radius: 16px;
  color: #000;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
}

.deposit-button:hover:not(:disabled) {
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(34, 197, 94, 0.3);
}

.deposit-button:disabled {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.4);
  cursor: not-allowed;
}

@media (max-width: 480px) {
  .deposit-button-section {
    padding: 16px;
  }
}
</style>
