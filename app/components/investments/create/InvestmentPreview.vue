<template>
  <div class="investment-card preview-card">
    <div class="card-header" @click="togglePreview">
      <img src="~/assets/images/pass.svg" alt="pass" />
      <h3>ПРЕДПРОСМОТР ИНВЕСТИЦИИ</h3>
      <div class="collapse-arrow" :class="{ rotated: !showPreview }">
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
          <path
            d="M1 1L6 6L11 1"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>

    <!-- Секция подсказок - управляется общей кнопкой -->
    <InfoBanner
      :show="showHints"
      title="Подсказка"
      message="Предпросмотр инвестиции"
      variant="default"
      size="medium"
    />

    <!-- Основной контент - управляется кликом по заголовку -->
    <div v-show="showPreview" class="collapsible-content">
      <div class="investment-preview">
        <div class="preview-row">
          <span class="preview-label">Тип</span>
          <span class="preview-value">
            {{ getBettingTitle() }}
            <img :src="getBettingIcon()" :alt="bettingMode" />
          </span>
        </div>
        <div class="preview-row">
          <span class="preview-label">Стратегия</span>
          <span class="preview-value">
            {{ getPresetTitle() }}
            <img
              src="./../../../assets/images/invest/Preset.svg"
              alt="Preset"
            />
          </span>
        </div>
        <div class="preview-row">
          <span class="preview-label">Статус</span>
          <span class="preview-value status-frozen">
            Заморожена
            <img
              src="~/assets/images/invest/status-frozen.svg"
              alt="State_invest"
            />
          </span>
        </div>
        <div class="preview-row">
          <span class="preview-label">Прогнозируемая доходность</span>
          <span class="preview-value profit">{{ getProfitability() }}</span>
        </div>

        <div class="preview-row">
          <span class="preview-label">Риски</span>
          <span class="preview-value risk-level" :class="getRiskClass()">
            {{ getRiskPercentage() }}
          </span>
        </div>
        <div class="preview-row">
          <span class="preview-label">Сумма инвестиции</span>
          <span class="preview-value amount">100 USD</span>
        </div>
      </div>

      <div class="bonus-section">
        <div class="bonus-header">
          <span class="bonus-icon">🎁</span>
          <span class="bonus-title">БОНУСЫ ЗА СОЗДАНИЕ ИНВЕСТИЦИИ</span>
        </div>
        <div class="bonus-items">
          <div class="bonus-item">
            <span class="bonus-name">Спины Фортуны</span>
            <span class="bonus-count">2</span>
          </div>
          <div class="bonus-item">
            <span class="bonus-name">Сундуки</span>
            <span class="bonus-count">2</span>
          </div>
        </div>
      </div>

      <button
        class="create-investment-btn"
        @click="handleCreateInvestment"
        :disabled="isCreating"
      >
        <span v-if="!isCreating">ПЕРЕЙТИ К ОПЛАТЕ</span>
        <span v-else>СОЗДАНИЕ...</span>
      </button>
    </div>

    <!-- Модальное окно оплаты -->
    <PaymentModal
      :is-visible="showPaymentModal"
      :investment-data="investmentModalData"
      @close="closePaymentModal"
      @payment-success="handlePaymentSuccess"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import InfoBanner from '../InfoBanner.vue';
import PaymentModal from '../../modal/PaymentModal.vue';
import gambling from './../../../assets/images/invest/gembling.svg';
import betting from './../../../assets/images/invest/betting.svg';

const props = defineProps({
  selectedPreset: {
    type: String,
    required: true,
  },
  bettingMode: {
    type: String,
    required: true,
  },
  settings: {
    type: Object,
    required: true,
  },
  // Получаем состояние подсказок извне
  showHints: {
    type: Boolean,
    default: true,
  },
});

// События для родительского компонента
const emit = defineEmits(['investment-created', 'switch-to-my-investments']);

// Подключаем composable для управления инвестициями
const { createInvestment } = useInvestments();

// Состояние для сворачивания/разворачивания превью
const showPreview = ref(true);

// Состояние модального окна
const showPaymentModal = ref(false);

// Состояние создания инвестиции
const isCreating = ref(false);

// Функция переключения видимости превью
const togglePreview = () => {
  showPreview.value = !showPreview.value;
};

// Словари для названий
const presetTitles = {
  user: 'Пользовательский',
  conservative: 'Консервативный',
  balanced: 'Сбалансированный',
  aggressive: 'Агрессивный',
};

// Получение картинки в зависимости от типа ставок
const getBettingIcon = () => {
  return props.bettingMode === 'gambling' ? gambling : betting;
};

// Вычисляемые значения
const getPresetTitle = () => {
  return presetTitles[props.selectedPreset] || 'Пользовательский';
};

const getBettingTitle = () => {
  return props.bettingMode === 'gambling' ? 'Гэмблинг' : 'Беттинг';
};

const getProfitability = () => {
  const base = props.bettingMode === 'gambling' ? 15 : 10;
  const presetMultiplier = {
    user: 1,
    conservative: 0.8,
    balanced: 1.2,
    aggressive: 1.8,
  };
  const profit = Math.round(base * presetMultiplier[props.selectedPreset]);
  return `${profit} USD / Week`;
};

const getRiskPercentage = () => {
  const riskLevels = {
    user: '5%',
    conservative: '2%',
    balanced: '8%',
    aggressive: '15%',
  };
  return riskLevels[props.selectedPreset] || '5%';
};

const getRiskClass = () => {
  const riskClasses = {
    user: 'risk-medium',
    conservative: 'risk-low',
    balanced: 'risk-medium',
    aggressive: 'risk-high',
  };
  return riskClasses[props.selectedPreset] || 'risk-medium';
};

// Данные для модального окна
const investmentModalData = computed(() => ({
  type: getBettingTitle(),
  strategy: getPresetTitle(),
  amount: 100,
  profitability: getProfitability(),
  risks: getRiskPercentage(),
  preset: props.selectedPreset,
  bettingMode: props.bettingMode,
  settings: props.settings,
}));

// Обработчик создания инвестиции - теперь открывает модальное окно
const handleCreateInvestment = () => {
  console.log('Открытие модального окна оплаты:', {
    preset: props.selectedPreset,
    bettingMode: props.bettingMode,
    settings: props.settings,
  });

  showPaymentModal.value = true;
};

// Закрытие модального окна
const closePaymentModal = () => {
  showPaymentModal.value = false;
};

// Обработчик успешной оплаты
const handlePaymentSuccess = async (paymentData) => {
  try {
    isCreating.value = true;

    console.log('Инвестиция успешно оплачена:', paymentData);

    // Подготавливаем данные для создания инвестиции
    const investmentData = {
      preset: props.selectedPreset,
      bettingMode: props.bettingMode,
      settings: props.settings,
      amount: investmentModalData.value.amount,
      profitability: investmentModalData.value.profitability,
      paymentMethod: paymentData.method,
      paymentId: paymentData.id,
    };

    // Создаем инвестицию через composable
    const newInvestment = createInvestment(investmentData);

    console.log('Новая инвестиция создана:', newInvestment);

    // Закрываем модальное окно
    showPaymentModal.value = false;

    // Уведомляем родительский компонент о создании инвестиции
    emit('investment-created', newInvestment);

    // Переключаем на вкладку "Мои инвестиции"
    emit('switch-to-my-investments');

    // Показываем уведомление пользователю (временно через alert)
    alert(`✅ Инвестиция ${newInvestment.name} успешно создана!
Тип: ${getBettingTitle()}
Стратегия: ${getPresetTitle()}
Сумма: ${newInvestment.amount} USD
Ожидаемая доходность: ${newInvestment.profitability}`);
  } catch (error) {
    console.error('Ошибка при создании инвестиции:', error);
    alert('Произошла ошибка при создании инвестиции. Попробуйте еще раз.');
  } finally {
    isCreating.value = false;
  }
};

const previewTitle = () => 'Подсказка';
const previewDescription = () => 'Предпросмотр инвестиции';
</script>

<style scoped>
.investment-card {
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  cursor: pointer;
  user-select: none;
  transition: all 0.2s ease;
  padding: 8px;
  border-radius: 6px;
}

.card-header:hover {
  background: rgba(255, 255, 255, 0.05);
}

.card-header h3 {
  font-size: 16px;
  font-weight: 700;
  color: #f97316;
  margin: 0;
  letter-spacing: 0.5px;
  flex: 1;
}

.collapse-arrow {
  color: rgba(255, 255, 255, 0.6);
  transition: transform 0.3s ease;
  display: flex;
  align-items: center;
  margin-left: auto;
}

.collapse-arrow.rotated {
  transform: rotate(180deg);
}

.preview-info img {
  width: 32px;
  height: 32px;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.preview-description strong {
  color: white;
}

/* Сворачиваемый контент */
.collapsible-content {
  animation: slideDown 0.3s ease-out;
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

.investment-preview {
  gap: 16px;
  border-radius: 16px;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px;
  background: #00000040;
  border-bottom: 1px solid #ffffff2e;
}

.preview-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px;
}

.preview-row img {
  width: 16px;
  height: 16px;
}

.preview-row:last-child {
  border-bottom: none;
}

.preview-label {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  color: #ffffff;
}

.preview-value {
  gap: 10px;
  display: flex;
  align-items: center;
  font-family: Roboto, sans-serif;
  font-weight: 700;
  font-size: 14px;
  line-height: 100%;
  color: #ffffff;
  text-align: right;
}

/* Обновленные стили для значений с цветом #07CB38 */
.preview-value.amount {
  color: #07cb38;
  font-family: Roboto, sans-serif;
  font-weight: 700;
  font-style: normal;
  font-size: 14px;
  line-height: 100%;
  text-align: right;
}

.preview-value.profit {
  color: #07cb38;
  font-family: Roboto, sans-serif;
  font-weight: 700;
  font-style: normal;
  font-size: 14px;
  line-height: 100%;
  text-align: right;
}

.preview-value.risk-level {
  color: #07cb38;
  font-family: Roboto, sans-serif;
  font-weight: 700;
  font-style: normal;
  font-size: 14px;
  line-height: 100%;
  text-align: right;
}

.preview-icon {
  font-size: 14px;
}

.bonus-section {
  background: rgba(34, 197, 94, 0.15);
  border: 1px solid rgba(34, 197, 94, 0.3);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
}

.bonus-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-size: 14px;
  font-weight: 600;
  color: #4ade80;
}

.bonus-icon {
  font-size: 16px;
}

.bonus-title {
  font-size: 13px;
}

.bonus-items {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.bonus-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
}

.bonus-name {
  color: rgba(255, 255, 255, 0.8);
}

.bonus-count {
  background: #4ade80;
  color: #0a2f23;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 700;
  min-width: 20px;
  text-align: center;
}

.create-investment-btn {
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-family: inherit;

  /* Центрирование кнопки */
  display: block;
  margin: 0 auto;
  width: 100%;
  max-width: 360px;

  height: 42px;
  min-height: 42px;
  padding: 12px 16px;
  gap: 10px;
  background: #00000033;
  border: 1px solid #07cb38;
  border-radius: 32px;
  transition: all 0.3s ease;
}

.create-investment-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.create-investment-btn span {
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 100%;
  text-align: center;
  vertical-align: middle;
  text-transform: uppercase;
  color: #ffffff;
}

.create-investment-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #86efac 0%, #4ade80 100%);
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(74, 222, 128, 0.4);
}

.create-investment-btn:active:not(:disabled) {
  transform: translateY(0);
}

@media (max-width: 1200px) {
  .preview-card {
    position: static;
  }
}

@media (max-width: 480px) {
  .card-header {
    padding: 6px;
  }

  .card-header h3 {
    font-size: 15px;
  }

  .preview-row {
    align-items: flex-start;
    gap: 4px;
    padding: 6px 0;
  }

  .preview-value {
    justify-content: flex-start;
  }

  .create-investment-btn {
    padding: 12px 14px;
    font-size: 13px;
  }
}
</style>
