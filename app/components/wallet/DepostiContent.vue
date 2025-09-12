<template>
  <div class="deposit-content">
    <!-- Информационный блок -->
    <InfoBanner v-if="showHints" />

    <!-- Шаги пополнения -->
    <div class="steps-section">
      <!-- Шаг 1: Выберете счет -->
      <AccountSelection
        :selected-account="selectedAccount"
        @update:selected-account="selectedAccount = $event"
      />

      <!-- Шаг 2: Выберете метод пополнения -->
      <PaymentMethodSelection
        :selected-method-type="selectedMethodType"
        :selected-method="selectedMethod"
        @update:method-type="handleMethodTypeChange"
        @update:method="selectedMethod = $event"
      />

      <!-- Шаг 3: Введите сумму пополнения -->
      <AmountInput
        :deposit-amount="depositAmount"
        @update:deposit-amount="depositAmount = $event"
      />

      <!-- Кнопка пополнения -->
      <DepositButton :can-deposit="canDeposit" @deposit="handleDeposit" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

defineProps({
  showHints: {
    type: Boolean,
    required: true,
  },
});

// Реактивные данные
const depositAmount = ref(100);
const selectedAccount = ref('external');
const selectedMethodType = ref('');
const selectedMethod = ref('');

// Вычисляемые свойства
const canDeposit = computed(() => {
  return (
    depositAmount.value >= 100 && selectedMethod.value && selectedAccount.value
  );
});

// Методы
const handleMethodTypeChange = (value) => {
  selectedMethodType.value = value;
  selectedMethod.value = ''; // Сбрасываем выбранный метод
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
.deposit-content {
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.steps-section {
  flex: 1;
  padding: 0 20px;
}

@media (max-width: 480px) {
  .steps-section {
    padding: 0 16px;
  }
}
</style>
