<template>
  <div class="investment-card">
    <!-- Заголовок инвестиции -->
    <div class="investment-header">
      <div class="investment-number">
        <span class="investment-label">ИНВЕСТИЦИЯ</span>
        <span class="investment-id">№{{ investment.id }}</span>
      </div>
    </div>

    <!-- Верхняя секция с прогнозами -->
    <div class="investment-forecasts">
      <div class="forecast-item">
        <div class="forecast-label">ПРОГНОЗИРУЕМАЯ ДОХОДН...</div>
        <div class="forecast-value profit">
          <span class="profit-icon">📈</span>
          {{ investment.weeklyProfit || '13' }} USD / Week
          <div class="forecast-period">
            {{ investment.profitPeriod || '🔒' }}
          </div>
        </div>
      </div>

      <div class="forecast-item">
        <div class="forecast-label">ДОСТУПНАЯ К ПЕРЕВОДУ П...</div>
        <div class="forecast-value available">
          <span class="available-icon">💰</span>
          <span class="available-text"
            >{{ investment.availableProfit || '20' }} USD</span
          >
        </div>
      </div>
    </div>

    <!-- Основная информация в 2 колонки -->
    <div class="investment-details">
      <!-- Левая колонка -->
      <div class="details-column">
        <div class="detail-row">
          <span class="detail-label">Тип</span>
          <span class="detail-value">{{ getInvestmentType() }}</span>
          <span class="detail-icon">🔒</span>
        </div>

        <div class="detail-row">
          <span class="detail-label">Стратегия</span>
          <span class="detail-value">{{
            investment.strategy || 'Консервативный'
          }}</span>
          <span class="detail-icon">📊</span>
        </div>

        <div class="detail-row">
          <span class="detail-label">Статус</span>
          <span class="detail-value" :class="getStatusClass()">{{
            getStatusText()
          }}</span>
          <span class="detail-icon">{{ getStatusIcon() }}</span>
        </div>
      </div>
      <div class="reinvestment-section">
        <div class="reinvestment-info">
          <img src="./../../../assets/images/schedule.svg" />
          <span class="reinvest-text"
            >Реинвестирование прибыли через
            {{ investment.reinvestDays || '5' }} дней</span
          >
        </div>
      </div>
    </div>

    <!-- Секция реинвестирования -->

    <!-- Кнопки управления -->
    <div class="investment-actions">
      <button
        class="action-btn settings"
        @click="$emit('manage', investment.id)"
      >
        НАСТРОЙКИ
      </button>
      <button
        class="action-btn withdraw"
        @click="$emit('withdraw', investment.id)"
        v-if="investment.availableProfit > 0"
      >
        ВЫВЕСТИ НА БАЛАНС
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  investment: {
    type: Object,
    required: true,
  },
  viewMode: {
    type: String,
    default: 'grid',
  },
});

defineEmits(['manage', 'withdraw', 'view-details']);

// Методы для получения данных
const getInvestmentType = () => {
  const types = {
    betting: 'Беттинг',
    gambling: 'Гэмблинг',
  };
  return types[props.investment.type] || 'Беттинг';
};

const getStatusClass = () => {
  const classes = {
    active: 'status-active',
    paused: 'status-paused',
    completed: 'status-completed',
    frozen: 'status-frozen',
  };
  return classes[props.investment.status] || 'status-frozen';
};

const getStatusIcon = () => {
  const icons = {
    active: '🟢',
    paused: '⏸️',
    completed: '✅',
    frozen: '❄️',
  };
  return icons[props.investment.status] || '❄️';
};

const getStatusText = () => {
  const texts = {
    active: 'Активна',
    paused: 'Приостановлена',
    completed: 'Завершена',
    frozen: 'Заморожена',
  };
  return texts[props.investment.status] || 'Заморожена';
};

const getRiskClass = () => {
  const risk = props.investment.riskLevel || 7;
  if (risk <= 5) return 'risk-low';
  if (risk <= 12) return 'risk-medium';
  return 'risk-high';
};
</script>

<style scoped>
.investment-card {
  max-width: 343px;
  box-shadow: 0px 1px 5px 0px #00000040;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  background: #00aa6926;
  border-top: 1px solid #ffffff0d;
  gap: 16px;
  border-radius: 14px 14px 24px 24px;
  padding: 16px 8px 8px;
}

.investment-card:hover {
  border-color: rgba(0, 178, 125, 0.5);
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(0, 178, 125, 0.2);
}

/* Заголовок */
.investment-header {
  display: flex;
  justify-content: center;
  text-align: center;
  gap: 16px;
  margin-bottom: 16px;
}

.investment-number {
  display: flex;
  gap: 16px;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.investment-label {
  color: #ffffff;
}

.investment-id {
  color: #f97c39;
}

/* Верхняя секция прогнозов */
.investment-forecasts {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

.forecast-item {
  flex: 1;
  border-bottom: 1px solid #ffffff2e;
  text-align: center;
  border-radius: 8px;
  padding: 8px;
  background: rgba(0, 0, 0, 0.3);
  min-width: 0; /* Важно для корректного сжатия */
}

.forecast-label {
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 9px;
  line-height: 1.1;
  letter-spacing: 0.3px;
  text-align: left;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 8px;
  /* Обрезка текста с тремя точками */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}

.forecast-value {
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 4px;
  font-size: 11px;
  font-weight: 700;
  text-align: center;
}

.forecast-value.profit {
  color: #00ff88;
}

.forecast-value.available {
  display: flex;
  color: #ffd700;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.available-text {
  flex: 1;
  text-align: center;
}

.available-icon {
  font-size: 12px;
  margin-left: auto;
}

.forecast-period {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 2px;
}

.profit-icon {
  font-size: 12px;
  margin-bottom: 2px;
}

/* Основная информация */
.investment-details {
  margin-bottom: 16px;
  gap: 16px;
  border-radius: 16px;
  padding: 16px;
  border-bottom: 1px solid #ffffff2e;
  background: #00000040;
}

.details-column {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.detail-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 24px;
}

.detail-label {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.7);
  flex: 1;
  text-align: left;
}

.detail-value {
  font-size: 11px;
  font-weight: 600;
  color: #ffffff;
  margin-right: 8px;
}

.detail-value.amount {
  color: #ffd700;
}

.detail-value.risk-low {
  color: #00ff88;
}

.detail-value.risk-medium {
  color: #ffa500;
}

.detail-value.risk-high {
  color: #ff4444;
}

.detail-value.status-frozen {
  color: #87ceeb;
}

.detail-icon {
  font-size: 12px;
  opacity: 0.8;
}

/* Секция реинвестирования */
.reinvestment-section {
  background: rgba(0, 178, 125, 0.1);
  border: 1px solid #ffffff40;
  border-radius: 8px;
  margin-top: 20px;
  padding: 16px;
  gap: 16px;
}

.reinvestment-info {
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
}

.reinvest-icon {
  font-size: 14px;
}

.reinvest-text {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
}

/* Кнопки управления */
.investment-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.action-btn {
  flex: 1;
  padding: 12px 16px;
  border: none;
  border-radius: 32px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
}

.action-btn.settings {
  background: #00000033;
  color: rgba(255, 255, 255, 0.8);
  border: 1px solid #07cb38;
}

.action-btn.settings:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #ffffff;
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-1px);
}

.action-btn.withdraw {
  background: #07cb38;
  color: #000000;
  font-weight: 800;
}

.action-btn.withdraw:hover {
  background: #06b532;
  transform: translateY(-1px);
}

/* Адаптивность */
@media (max-width: 768px) {
  .investment-card {
    padding: 16px;
  }

  .investment-forecasts {
    flex-direction: column;
    gap: 8px;
  }

  .forecast-item {
    padding: 12px;
  }

  .forecast-label {
    font-size: 10px;
  }

  .forecast-value {
    font-size: 12px;
  }

  .investment-details {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .action-btn {
    padding: 10px 12px;
    font-size: 10px;
  }
}

@media (max-width: 480px) {
  .investment-card {
    padding: 12px;
  }

  .forecast-label {
    font-size: 8px;
  }

  .forecast-value {
    font-size: 11px;
  }

  .detail-label,
  .detail-value {
    font-size: 9px;
  }

  .reinvest-text {
    font-size: 10px;
  }
}

/* Focus states для доступности */
.action-btn:focus-visible {
  outline: 2px solid #00ff88;
  outline-offset: 2px;
}

/* Анимации */
@keyframes pulse {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(0, 178, 125, 0.4);
  }
  50% {
    box-shadow: 0 0 0 4px rgba(0, 178, 125, 0.1);
  }
}

.investment-card:hover {
  animation: pulse 2s infinite;
}

@media (prefers-reduced-motion: reduce) {
  .investment-card {
    animation: none;
  }

  .investment-card:hover {
    transform: none;
    animation: none;
  }

  .action-btn:hover {
    transform: none;
  }
}
</style>
