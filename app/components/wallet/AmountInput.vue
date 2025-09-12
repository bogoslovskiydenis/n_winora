<template>
  <div class="step-container">
    <div class="step-header">
      <div class="step-number">3</div>
      <h3 class="step-title">Введите сумму пополнения</h3>
    </div>
    <div class="step-content">
      <div class="amount-input-section">
        <div class="amount-input-wrapper">
          <input
            type="number"
            class="amount-input"
            :value="depositAmount"
            @input="$emit('update:deposit-amount', Number($event.target.value))"
            placeholder="100"
            min="10"
          />
          <span class="amount-currency">$</span>
        </div>
        <div class="amount-note">
          Минимальная сумма пополнения:
          <span class="min-amount">100$</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  depositAmount: {
    type: Number,
    required: true,
  },
});

defineEmits(['update:deposit-amount']);
</script>

<style scoped>
.step-container {
  margin-top: 20px;
  margin-bottom: 20px;
}

.step-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.step-number {
  font-family: Tomorrow, sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 100%;
  vertical-align: middle;
  text-transform: uppercase;
  color: #f97c39;
}

.step-title {
  font-family: Tomorrow, sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 100%;
  color: #ffffff;
}

.amount-input-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.amount-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.amount-input {
  width: 100%;
  padding: 16px 40px 16px 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
  outline: none;
  transition: all 0.3s ease;
  font-family: inherit;
}

.amount-input:focus {
  border-color: #4ade80;
  background: rgba(74, 222, 128, 0.05);
}

.amount-input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.amount-currency {
  position: absolute;
  right: 16px;
  font-size: 18px;
  font-weight: 600;
  color: #4ade80;
}

.amount-note {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
}

.min-amount {
  color: #4ade80;
  font-weight: 600;
}

/* Адаптивность */
@media (max-width: 768px) {
  .step-header {
    gap: 12px;
  }

  .step-number {
    font-size: 14px;
  }

  .step-title {
    font-size: 15px;
  }
}

@media (max-width: 480px) {
  .step-header {
    gap: 10px;
  }

  .step-number {
    font-size: 12px;
  }

  .step-title {
    font-size: 14px;
  }
}
</style>
