<template>
  <div class="step-container">
    <div class="step-header">
      <div class="step-number">1</div>
      <h3 class="step-title">Выберете счет</h3>
    </div>
    <div class="step-content">
      <div class="account-options">
        <div
          class="account-option"
          :class="{ selected: selectedAccount === 'external' }"
          @click="$emit('update:selected-account', 'external')"
        >
          <div class="account-option-content">
            <div class="account-main-info">
              <div
                class="radio-button"
                :class="{ checked: selectedAccount === 'external' }"
              ></div>
              <div class="account-details">
                <div class="account-type">Внешний кошелек</div>
                <div class="account-desc">Описание / Подсказка.</div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="account-option"
          :class="{ selected: selectedAccount === 'internal' }"
          @click="$emit('update:selected-account', 'internal')"
        >
          <div class="account-option-content">
            <div class="account-main-info">
              <div
                class="radio-button"
                :class="{ checked: selectedAccount === 'internal' }"
              ></div>
              <div class="account-details">
                <div class="account-type">Внутренний счет</div>
                <div class="account-desc">Внутренний счет (0 USD)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  selectedAccount: {
    type: String,
    required: true,
  },
});

defineEmits(['update:selected-account']);
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

.account-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.account-option {
  cursor: pointer;
}

.account-option-content {
  padding: 16px;
}

.account-main-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.account-details {
  flex: 1;
}

.account-type {
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 4px;
}

.account-desc {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
}

.radio-button {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  background: transparent;
  position: relative;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.radio-button.checked {
  border-color: #4ade80;
}

.radio-button.checked::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #4ade80;
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

  .account-main-info {
    gap: 12px;
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
