<template>
  <div class="step-container">
    <div class="step-header">
      <div class="step-number">2</div>
      <h3 class="step-title">Выберете метод пополнения</h3>
    </div>
    <div class="step-content">
      <!-- Кастомный селектор -->
      <div class="method-selector">
        <div class="custom-select" @click="toggleMethodSelect">
          <div class="select-display">
            <span class="select-text">
              {{
                selectedMethodType
                  ? getMethodTypeLabel(selectedMethodType)
                  : 'Выберите тип метода'
              }}
            </span>
            <div class="select-arrow" :class="{ rotated: isMethodSelectOpen }">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="currentColor"
              >
                <path d="M6 8l4-4H2l4 4z" />
              </svg>
            </div>
          </div>
          <div v-if="isMethodSelectOpen" class="select-options">
            <div
              v-for="option in methodTypeOptions"
              :key="option.value"
              class="select-option"
              :class="{
                selected: selectedMethodType === option.value,
              }"
              @click="selectMethodType(option.value)"
            >
              {{ option.label }}
            </div>
          </div>
        </div>
      </div>

      <!-- Опции методов пополнения -->
      <div class="method-grid" v-if="selectedMethodType">
        <!-- Криптовалюты -->
        <div class="method-section" v-if="selectedMethodType === 'crypto'">
          <h4 class="method-section-title">Крипта</h4>
          <div class="crypto-options">
            <div
              class="crypto-option"
              v-for="crypto in cryptoOptions"
              :key="crypto.id"
              :class="{ selected: selectedMethod === crypto.id }"
              @click="$emit('update:method', crypto.id)"
            >
              <div class="crypto-info">
                <div class="crypto-name">{{ crypto.name }}</div>
                <div class="crypto-network">{{ crypto.network }}</div>
              </div>
              <div
                class="radio-button"
                :class="{ checked: selectedMethod === crypto.id }"
              ></div>
            </div>
          </div>
        </div>

        <!-- Фиат -->
        <div class="method-section" v-if="selectedMethodType === 'fiat'">
          <h4 class="method-section-title">Фиат</h4>
          <div class="fiat-options">
            <div
              class="fiat-option"
              v-for="fiat in fiatOptions"
              :key="fiat.id"
              :class="{ selected: selectedMethod === fiat.id }"
              @click="$emit('update:method', fiat.id)"
            >
              <div class="fiat-info">
                <div class="fiat-name">{{ fiat.name }}</div>
                <div class="fiat-desc">{{ fiat.desc }}</div>
              </div>
              <div
                class="radio-button"
                :class="{ checked: selectedMethod === fiat.id }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  selectedMethodType: {
    type: String,
    required: true,
  },
  selectedMethod: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['update:method-type', 'update:method']);

const isMethodSelectOpen = ref(false);

// Опции для селектора
const methodTypeOptions = [
  { value: 'crypto', label: 'Криптовалюта' },
  { value: 'fiat', label: 'Фиатные валюты' },
];

// Опции криптовалют
const cryptoOptions = [
  { id: 'erc20', name: 'ERC20', network: 'USDT' },
  { id: 'trc20', name: 'TRC20', network: 'USDT' },
  { id: 'bep20', name: 'BEP20', network: 'USDT' },
  { id: 'ton', name: 'TON', network: 'USDT' },
];

// Опции фиатных валют
const fiatOptions = [
  { id: 'visa', name: 'Visa Electron', desc: 'Греция $' },
  { id: 'mastercard', name: 'Mastercard', desc: 'Доллар США $' },
];

// Методы
const toggleMethodSelect = () => {
  isMethodSelectOpen.value = !isMethodSelectOpen.value;
};

const selectMethodType = (value) => {
  emit('update:method-type', value);
  isMethodSelectOpen.value = false;
};

const getMethodTypeLabel = (value) => {
  const option = methodTypeOptions.find((opt) => opt.value === value);
  return option ? option.label : '';
};

// Закрыть селект при клике вне его
const closeSelectOnOutsideClick = (event) => {
  if (!event.target.closest('.custom-select')) {
    isMethodSelectOpen.value = false;
  }
};

// Добавляем обработчик клика при монтировании
if (process.client) {
  document.addEventListener('click', closeSelectOnOutsideClick);
}
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

/* Кастомный селектор */
.method-selector {
  margin-bottom: 20px;
}

.custom-select {
  position: relative;
}

.select-display {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.select-display:hover {
  background: rgba(255, 255, 255, 0.08);
}

.select-text {
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
}

.select-arrow {
  color: rgba(255, 255, 255, 0.6);
  transition: transform 0.3s ease;
}

.select-arrow.rotated {
  transform: rotate(180deg);
}

.select-options {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(0, 40, 35, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  margin-top: 4px;
  z-index: 100;
  overflow: hidden;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  animation: slideDown 0.2s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.select-option {
  padding: 12px 16px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.select-option:last-child {
  border-bottom: none;
}

.select-option:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
}

.select-option.selected {
  background: rgba(74, 222, 128, 0.1);
  color: #4ade80;
  font-weight: 600;
}

/* Методы пополнения */
.method-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.method-section-title {
  font-size: 15px;
  font-weight: 600;
  color: #4ade80;
  margin: 0 0 12px 0;
}

.crypto-options,
.fiat-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.crypto-option,
.fiat-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.crypto-option::before,
.fiat-option::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  transition: left 0.5s ease;
}

.crypto-option:hover::before,
.fiat-option:hover::before {
  left: 100%;
}

.crypto-option:hover,
.fiat-option:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.crypto-option.selected,
.fiat-option.selected {
  border-color: #4ade80;
  background: rgba(74, 222, 128, 0.1);
  box-shadow: 0 0 20px rgba(74, 222, 128, 0.2);
}

.crypto-info,
.fiat-info {
  flex: 1;
}

.crypto-name,
.fiat-name {
  font-size: 13px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 2px;
}

.crypto-network,
.fiat-desc {
  font-size: 11px;
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
  background: rgba(74, 222, 128, 0.1);
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
  animation: radioPulse 0.3s ease-out;
}

@keyframes radioPulse {
  from {
    transform: translate(-50%, -50%) scale(0);
  }
  to {
    transform: translate(-50%, -50%) scale(1);
  }
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

  .crypto-options,
  .fiat-options {
    grid-template-columns: 1fr;
  }

  .select-display {
    padding: 14px;
  }

  .select-text {
    font-size: 13px;
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

  .select-display {
    padding: 12px;
  }

  .select-text {
    font-size: 12px;
  }

  .crypto-option,
  .fiat-option {
    padding: 10px;
  }

  .crypto-name,
  .fiat-name {
    font-size: 12px;
  }

  .crypto-network,
  .fiat-desc {
    font-size: 10px;
  }
}
</style>
