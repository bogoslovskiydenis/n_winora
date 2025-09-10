<template>
  <div class="wallet-page">
    <div class="wallet-container">
      <!-- Заголовок страницы с переключателем подсказок -->
      <div class="wallet-header">
        <div class="header-content">
          <h1 class="page-title">КОШЕЛЕК</h1>
          <div class="header-toggle">
            <div class="toggle-wrapper" @click="toggleHints">
              <div class="toggle-icon">
                <span>ℹ️</span>
              </div>
              <div class="toggle-switch" :class="{ active: showHints }">
                <div class="toggle-slider"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Навигация по вкладкам -->
      <div class="tabs">
        <button
          class="tab"
          :class="{ active: activeTab === 'deposit' }"
          @click="activeTab = 'deposit'"
        >
          <span class="tab-icon">➕</span>
          Пополнить счет
        </button>
        <button
          class="tab"
          :class="{ active: activeTab === 'withdraw' }"
          @click="activeTab = 'withdraw'"
        >
          <span class="tab-icon">💰</span>
          Вывод средств
        </button>
        <button
          class="tab"
          :class="{ active: activeTab === 'history' }"
          @click="activeTab = 'history'"
        >
          <span class="tab-icon">📜</span>
          История транзакций
        </button>
      </div>

      <!-- Контент вкладок -->
      <div class="tab-content">
        <!-- Вкладка пополнения -->
        <div v-if="activeTab === 'deposit'" class="deposit-content">
          <!-- Информационный блок -->
          <div class="info-block" v-if="showHints">
            <div class="info-icon">⚠️</div>
            <div class="info-content">
              <p class="info-text">
                Вспомогательная информация, которая появляется на экране и
                помогает пользователю при работе
              </p>
            </div>
          </div>

          <!-- Шаги пополнения -->
          <div class="steps-section">
            <!-- Шаг 1: Выберете счет -->
            <div class="step-item">
              <div class="step-number">1</div>
              <div class="step-content">
                <h3 class="step-title">Выберете счет</h3>
                <div class="account-options">
                  <div
                    class="account-option"
                    :class="{ selected: selectedAccount === 'external' }"
                    @click="selectedAccount = 'external'"
                  >
                    <div class="account-info">
                      <div class="account-type">Внешний кошелек</div>
                      <div class="account-desc">Описание / Подсказка</div>
                    </div>
                    <div
                      class="radio-button"
                      :class="{ checked: selectedAccount === 'external' }"
                    ></div>
                  </div>
                  <div
                    class="account-option"
                    :class="{ selected: selectedAccount === 'internal' }"
                    @click="selectedAccount = 'internal'"
                  >
                    <div class="account-info">
                      <div class="account-type">Внутренний счет</div>
                      <div class="account-desc">Описание / Подсказка</div>
                    </div>
                    <div
                      class="radio-button"
                      :class="{ checked: selectedAccount === 'internal' }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Шаг 2: Выберете метод пополнения -->
            <div class="step-item">
              <div class="step-number">2</div>
              <div class="step-content">
                <h3 class="step-title">Выберете метод пополнения</h3>

                <!-- Выбор через CustomSelect -->
                <div class="method-selector">
                  <CustomSelect
                    v-model="selectedMethodType"
                    :options="methodTypeOptions"
                    placeholder="Выберите тип метода"
                    variant="large"
                  />
                </div>

                <div class="method-grid" v-if="selectedMethodType">
                  <!-- Криптовалюты -->
                  <div
                    class="method-section"
                    v-if="selectedMethodType === 'crypto'"
                  >
                    <h4 class="method-section-title">Криптa</h4>
                    <div class="crypto-options">
                      <div
                        class="crypto-option"
                        v-for="crypto in cryptoOptions"
                        :key="crypto.id"
                        :class="{ selected: selectedMethod === crypto.id }"
                        @click="selectedMethod = crypto.id"
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
                  <div
                    class="method-section"
                    v-if="selectedMethodType === 'fiat'"
                  >
                    <h4 class="method-section-title">Фиат</h4>
                    <div class="fiat-options">
                      <div
                        class="fiat-option"
                        v-for="fiat in fiatOptions"
                        :key="fiat.id"
                        :class="{ selected: selectedMethod === fiat.id }"
                        @click="selectedMethod = fiat.id"
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

            <!-- Шаг 3: Введите сумму пополнения -->
            <div class="step-item">
              <div class="step-number">3</div>
              <div class="step-content">
                <h3 class="step-title">Введите сумму пополнения</h3>
                <div class="amount-input-section">
                  <div class="amount-input-wrapper">
                    <input
                      type="number"
                      class="amount-input"
                      v-model.number="depositAmount"
                      placeholder="100"
                      min="10"
                    />
                    <span class="amount-currency">$</span>
                  </div>
                  <div class="amount-note">
                    Минимальная сумма пополнения:
                    <span class="min-amount">10$</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- Кнопка пополнения -->
            <div class="deposit-button-section">
              <button
                class="deposit-button"
                :disabled="!canDeposit"
                @click="handleDeposit"
              >
                ПОПОЛНИТЬ БАЛАНС
              </button>
            </div>
          </div>
        </div>

        <!-- Вкладка вывода средств -->
        <div v-else-if="activeTab === 'withdraw'" class="withdraw-content">
          <div class="placeholder-content">
            <h3>Вывод средств</h3>
            <p>Здесь будет форма для вывода средств</p>
          </div>
        </div>

        <!-- Вкладка истории -->
        <div v-else-if="activeTab === 'history'" class="history-content">
          <div class="placeholder-content">
            <h3>История транзакций</h3>
            <p>Здесь будет список транзакций</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Импорт компонента CustomSelect (нужно создать отдельно)
// import CustomSelect from '~/components/CustomSelect.vue';

// Реактивные данные
const activeTab = ref('deposit');
const showHints = ref(true);
const depositAmount = ref(100);
const selectedAccount = ref('external');
const selectedMethodType = ref('');
const selectedMethod = ref('');

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

// Вычисляемые свойства
const canDeposit = computed(() => {
  return (
    depositAmount.value >= 10 && selectedMethod.value && selectedAccount.value
  );
});

// Методы
const toggleHints = () => {
  showHints.value = !showHints.value;
};

const handleDeposit = () => {
  if (canDeposit.value) {
    console.log('Пополнение баланса на сумму:', depositAmount.value);
    console.log('Выбранный счет:', selectedAccount.value);
    console.log('Выбранный метод:', selectedMethod.value);
    // Логика пополнения
  }
};
</script>

<style scoped>
.wallet-page {
  min-height: 100vh;
  background: linear-gradient(0deg, #002920 0%, #00382b 100%);
  color: #ffffff;
  padding: 0;
  margin: 0;
}

.wallet-container {
  margin: 0 auto;
  background: linear-gradient(135deg, #1a4d3a 0%, #0d2818 100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* ===========================================
   ЗАГОЛОВОК С ПЕРЕКЛЮЧАТЕЛЕМ ПОДСКАЗОК
   =========================================== */

.wallet-header {
  margin-bottom: 24px;
  padding: 16px 20px 0;
}

.header-content {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.page-title {
  font-size: 24px;
  font-weight: 700;
  color: #4ade80;
  margin: 0;
  letter-spacing: 1px;
}

.header-toggle {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 16px;
  padding: 1px 6px 1px 5px;
  border: 1px solid #00000040;
  background: #00000040;
}

.toggle-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.toggle-icon {
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-switch {
  width: 48px;
  height: 24px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  position: relative;
  transition: all 0.3s ease;
  border: 2px solid #07cb3899;
}

.toggle-switch.active {
  background: #4ade80;
}

.toggle-slider {
  width: 16px;
  height: 16px;
  background: white;
  border-radius: 50%;
  position: absolute;
  top: 1px;
  left: 2px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.toggle-switch.active .toggle-slider {
  transform: translateX(24px);
}

/* ===========================================
   ТАБЫ
   =========================================== */

.tabs {
  width: 100%;
  height: 80px;
  padding: 48px 0 2px 0;
  display: flex;
  background: transparent;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  box-sizing: border-box;
  margin-bottom: 24px;
}

.tab {
  flex: 1;
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  border: none;
  background: transparent;
  transition: all 0.3s ease;
  font-size: 14px;
  font-weight: 500;
  font-family: inherit;
  border-bottom: 2px solid transparent;
  border-radius: 0;
  text-decoration: none;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 0 8px;
}

.tab.active {
  color: white;
  border-bottom-color: #4ade80;
}

.tab:hover:not(.active) {
  color: rgba(255, 255, 255, 0.8);
}

.tab-icon {
  font-size: 16px;
  flex-shrink: 0;
}

/* ===========================================
   КОНТЕНТ ВКЛАДОК
   =========================================== */

.tab-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.deposit-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.placeholder-content {
  padding: 40px 20px;
  text-align: center;
}

.placeholder-content h3 {
  font-size: 18px;
  color: #4ade80;
  margin-bottom: 12px;
}

.placeholder-content p {
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
}

/* ===========================================
   ИНФОРМАЦИОННЫЙ БЛОК
   =========================================== */

.info-block {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px 20px;
  background: rgba(255, 193, 7, 0.1);
  margin: 0 20px 16px;
  border-radius: 12px;
  border: 1px solid rgba(255, 193, 7, 0.2);
}

.info-icon {
  font-size: 20px;
  color: #ffc107;
}

.info-content {
  flex: 1;
}

.info-text {
  margin: 0;
  font-size: 13px;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.9);
}

/* ===========================================
   ШАГИ ПОПОЛНЕНИЯ
   =========================================== */

.steps-section {
  flex: 1;
  padding: 0 20px;
}

.step-item {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
}

.step-number {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #4ade80;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 16px;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-title {
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 16px 0;
}

/* Опции счетов */
.account-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.account-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.account-option:hover {
  background: rgba(255, 255, 255, 0.08);
}

.account-option.selected {
  border-color: #4ade80;
  background: rgba(74, 222, 128, 0.1);
}

.account-info {
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

/* Методы пополнения */
.method-selector {
  margin-bottom: 20px;
}

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
}

.crypto-option:hover,
.fiat-option:hover {
  background: rgba(255, 255, 255, 0.08);
}

.crypto-option.selected,
.fiat-option.selected {
  border-color: #4ade80;
  background: rgba(74, 222, 128, 0.1);
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
  padding: 16px 40px 16px 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
  outline: none;
  transition: all 0.3s ease;
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

/* ===========================================
   КНОПКА ПОПОЛНЕНИЯ
   =========================================== */

.deposit-button-section {
  padding: 20px;
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

/* ===========================================
   АДАПТИВНОСТЬ
   =========================================== */

@media (max-width: 768px) {
  .page-title {
    font-size: 20px;
  }

  .toggle-icon {
    width: 28px;
    height: 28px;
  }

  .toggle-switch {
    width: 44px;
    height: 22px;
  }

  .toggle-slider {
    width: 18px;
    height: 18px;
  }

  .toggle-switch.active .toggle-slider {
    transform: translateX(22px);
  }

  .tabs {
    height: 60px;
    padding-top: 24px;
  }

  .tab {
    font-size: 13px;
    padding: 0 4px;
    gap: 4px;
  }

  .tab-icon {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .crypto-options,
  .fiat-options {
    grid-template-columns: 1fr;
  }

  .tab {
    font-size: 12px;
    gap: 3px;
  }

  .tab-icon {
    font-size: 12px;
  }
}
</style>
