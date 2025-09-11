<template>
  <div v-if="isVisible" class="modal-overlay" @click="closeModal">
    <div class="modal-container" @click.stop>
      <!-- Заголовок модального окна -->
      <div class="modal-header">
        <h2 class="modal-title">ОПЛАТА</h2>
        <button class="close-button" @click="closeModal">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M15 5L5 15M5 5l10 10"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>

      <!-- Информационный баннер -->
      <div class="info-banner">
        <div class="info-icon">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle
              cx="10"
              cy="10"
              r="8"
              stroke="currentColor"
              stroke-width="2"
            />
            <path
              d="M10 6v4"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
            <circle cx="10" cy="14" r="1" fill="currentColor" />
          </svg>
        </div>
        <div class="info-text">
          Вспомогательная информация, которая появляется на экране и помогает
          пользователю при работе
        </div>
      </div>

      <!-- Контент модального окна -->
      <div class="modal-content">
        <!-- Шаг 1: Выберете счет -->
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
                @click="selectedAccount = 'external'"
              >
                <div class="radio-container">
                  <div
                    class="radio-button"
                    :class="{ checked: selectedAccount === 'external' }"
                  ></div>
                </div>
                <div class="account-info">
                  <div class="account-type">Внешний кошелек</div>
                  <div class="account-desc">Описание / Подсказка</div>
                </div>
              </div>
              <div
                class="account-option"
                :class="{ selected: selectedAccount === 'internal' }"
                @click="selectedAccount = 'internal'"
              >
                <div class="radio-container">
                  <div
                    class="radio-button"
                    :class="{ checked: selectedAccount === 'internal' }"
                  ></div>
                </div>
                <div class="account-info">
                  <div class="account-type">Внутренний счет</div>
                  <div class="account-desc">Описание / Подсказка</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Шаг 2: Выберете метод пополнения -->
        <div class="step-container">
          <div class="step-header">
            <div class="step-number">2</div>
            <h3 class="step-title">Выберете метод пополнения</h3>
          </div>
          <div class="step-content">
            <div class="method-grid">
              <!-- Криптовалюты -->
              <div class="method-section">
                <h4 class="method-section-title">Крипта</h4>
                <div class="crypto-options">
                  <div
                    class="crypto-option"
                    v-for="crypto in cryptoOptions"
                    :key="crypto.id"
                    :class="{ selected: selectedMethod === crypto.id }"
                    @click="selectedMethod = crypto.id"
                  >
                    <div class="radio-container">
                      <div
                        class="radio-button"
                        :class="{ checked: selectedMethod === crypto.id }"
                      ></div>
                    </div>
                    <div class="crypto-info">
                      <div class="crypto-name">{{ crypto.name }}</div>
                      <div class="crypto-network">{{ crypto.network }}</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Фиат -->
              <div class="method-section">
                <h4 class="method-section-title">Фиат</h4>
                <div class="fiat-options">
                  <div
                    class="fiat-option"
                    v-for="fiat in fiatOptions"
                    :key="fiat.id"
                    :class="{ selected: selectedMethod === fiat.id }"
                    @click="selectedMethod = fiat.id"
                  >
                    <div class="radio-container">
                      <div
                        class="radio-button"
                        :class="{ checked: selectedMethod === fiat.id }"
                      ></div>
                    </div>
                    <div class="fiat-info">
                      <div class="fiat-name">{{ fiat.name }}</div>
                      <div class="fiat-desc">{{ fiat.desc }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Шаг 3: Введите сумму пополнения -->
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
                  v-model.number="paymentAmount"
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

        <!-- Кнопка оплаты -->
        <div class="payment-button-section">
          <button
            class="payment-button"
            :disabled="!canProceed"
            @click="handlePayment"
          >
            ИНВЕСТИРОВАТЬ
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
  investmentData: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['close', 'payment-success']);

// Реактивные данные
const selectedAccount = ref('external');
const selectedMethod = ref('erc20'); // По умолчанию выбрана ERC20
const paymentAmount = ref(100);

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

// Вычисляемые свойства
const canProceed = computed(() => {
  return (
    paymentAmount.value >= 100 && selectedAccount.value && selectedMethod.value
  );
});

// Методы
const closeModal = () => {
  emit('close');
};

const handlePayment = () => {
  if (!canProceed.value) return;

  console.log('Обработка платежа:', {
    account: selectedAccount.value,
    method: selectedMethod.value,
    amount: paymentAmount.value,
  });

  // Здесь будет логика обработки платежа
  emit('payment-success', {
    account: selectedAccount.value,
    method: selectedMethod.value,
    amount: paymentAmount.value,
  });

  closeModal();
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: modalFadeIn 0.3s ease;
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal-container {
  background: linear-gradient(0deg, #002920 0%, #00382b 100%);
  border-radius: 24px;
  max-width: 644px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  animation: modalSlideIn 0.3s ease;
  position: relative;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ===========================================
   ЗАГОЛОВОК МОДАЛЬНОГО ОКНА
   =========================================== */

.modal-header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px 32px;
  position: relative;
}

.modal-title {
  font-size: 24px;
  font-weight: 700;
  color: #07cb38;
  margin: 0;
  letter-spacing: 1px;
  text-align: center;
}

.close-button {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.close-button:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

/* ===========================================
   ИНФОРМАЦИОННЫЙ БАННЕР
   =========================================== */

.info-banner {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px 32px;
  margin-bottom: 24px;
}

.info-icon {
  width: 20px;
  height: 20px;
  color: #f59e0b;
  flex-shrink: 0;
  margin-top: 2px;
}

.info-text {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.5;
}

/* ===========================================
   КОНТЕНТ МОДАЛЬНОГО ОКНА
   =========================================== */

.modal-content {
  padding: 0 32px 32px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

/* Шаги */
.step-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.step-header {
  display: flex;
  align-items: center;
  gap: 16px;
}

.step-number {
  width: 32px;
  height: 32px;
  background: #f59e0b;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-weight: 700;
  font-size: 16px;
  flex-shrink: 0;
}

.step-title {
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
  flex: 1;
}

/* Опции счетов */
.account-options {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.account-option {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.account-option:hover {
  background: rgba(255, 255, 255, 0.05);
}

.account-option.selected {
  border-color: #07cb38;
  background: rgba(7, 203, 56, 0.1);
}

.radio-container {
  flex-shrink: 0;
}

.account-info {
  flex: 1;
}

.account-type {
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 4px;
}

.account-desc {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
}

.radio-button {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  background: transparent;
  position: relative;
  transition: all 0.3s ease;
}

.radio-button.checked {
  border-color: #07cb38;
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
  background: #07cb38;
}

/* Методы оплаты */
.method-grid {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.method-section-title {
  font-size: 16px;
  font-weight: 600;
  color: #07cb38;
  margin: 0 0 16px 0;
}

.crypto-options,
.fiat-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.crypto-option,
.fiat-option {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.crypto-option:hover,
.fiat-option:hover {
  background: rgba(255, 255, 255, 0.05);
}

.crypto-option.selected,
.fiat-option.selected {
  border-color: #07cb38;
  background: rgba(7, 203, 56, 0.1);
}

.crypto-info,
.fiat-info {
  flex: 1;
}

.crypto-name,
.fiat-name {
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 2px;
}

.crypto-network,
.fiat-desc {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
}

/* Ввод суммы */
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
  padding: 20px 50px 20px 20px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
  outline: none;
  transition: all 0.3s ease;
}

.amount-input:focus {
  border-color: #07cb38;
  background: rgba(7, 203, 56, 0.05);
}

.amount-input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.amount-currency {
  position: absolute;
  right: 20px;
  font-size: 18px;
  font-weight: 600;
  color: #07cb38;
}

.amount-note {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
}

.min-amount {
  color: #07cb38;
  font-weight: 600;
}

/* ===========================================
   КНОПКА ОПЛАТЫ
   =========================================== */

.payment-button-section {
  padding-top: 8px;
}

.payment-button {
  width: 100%;
  padding: 20px;
  background: linear-gradient(135deg, #07cb38 0%, #22c55e 100%);
  border: none;
  border-radius: 16px;
  color: #000;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
}

.payment-button:hover:not(:disabled) {
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(7, 203, 56, 0.4);
}

.payment-button:disabled {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.4);
  cursor: not-allowed;
}

/* ===========================================
   АДАПТИВНОСТЬ
   =========================================== */

@media (max-width: 768px) {
  .modal-container {
    margin: 16px;
    max-height: 95vh;
    border-radius: 20px;
  }

  .modal-header {
    padding: 20px 24px;
  }

  .modal-title {
    font-size: 20px;
  }

  .info-banner {
    padding: 16px 24px;
  }

  .modal-content {
    padding: 0 24px 24px;
    gap: 24px;
  }

  .crypto-options,
  .fiat-options {
    grid-template-columns: 1fr;
  }

  .step-title {
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .modal-overlay {
    padding: 12px;
  }

  .modal-container {
    border-radius: 16px;
  }

  .modal-header {
    padding: 16px 20px;
  }

  .modal-title {
    font-size: 18px;
  }

  .info-banner {
    padding: 12px 20px;
  }

  .modal-content {
    padding: 0 20px 20px;
    gap: 20px;
  }

  .step-header {
    gap: 12px;
  }

  .step-number {
    width: 28px;
    height: 28px;
    font-size: 14px;
  }

  .step-title {
    font-size: 15px;
  }

  .account-option,
  .crypto-option,
  .fiat-option {
    padding: 16px;
  }

  .amount-input {
    padding: 16px 40px 16px 16px;
    font-size: 16px;
  }

  .payment-button {
    padding: 16px;
    font-size: 14px;
  }
}
</style>
