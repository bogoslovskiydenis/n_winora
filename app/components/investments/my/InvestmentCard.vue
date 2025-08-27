<template>
  <div class="investment-card" :class="{ 'list-view': viewMode === 'list' }">
    <!-- Хедер карточки -->
    <div class="investment-header">
      <div class="investment-number">{{ investment.name }}</div>
      <div class="investment-status" :class="getStatusClass()">
        <span class="status-icon">{{ getStatusIcon() }}</span>
        <span class="status-text">{{ getStatusText() }}</span>
      </div>
    </div>

    <!-- Основная информация -->
    <div class="investment-main">
      <div class="investment-details">
        <!-- Левая колонка -->
        <div class="details-column">
          <div class="detail-item">
            <span class="detail-label">Тип</span>
            <span class="detail-value">{{ getInvestmentType() }}</span>
            <span class="detail-icon">🔒</span>
          </div>

          <div class="detail-item">
            <span class="detail-label">Стратегия</span>
            <span class="detail-value">{{ investment.strategy }}</span>
            <span class="detail-icon">📊</span>
          </div>

          <div class="detail-item">
            <span class="detail-label">Статус</span>
            <span class="detail-value" :class="getStatusClass()">{{
              getStatusText()
            }}</span>
            <span class="detail-icon">{{ getStatusIcon() }}</span>
          </div>

          <div class="detail-item">
            <span class="detail-label">Риски</span>
            <span class="detail-value risk" :class="getRiskClass()"
              >{{ investment.riskLevel }}%</span
            >
          </div>
        </div>

        <!-- Правая колонка -->
        <div class="details-column">
          <div class="detail-item">
            <span class="detail-label">Сумма инвестиции</span>
            <span class="detail-value amount">{{ investment.amount }} USD</span>
          </div>

          <div class="detail-item">
            <span class="detail-label">Доступен к переводу прибыль</span>
            <span class="detail-value profit"
              >{{ investment.availableProfit }} USD</span
            >
          </div>
        </div>
      </div>

      <!-- Прогресс (только для активных) -->
      <div class="investment-progress" v-if="investment.status === 'active'">
        <div class="progress-info">
          <span class="progress-label"
            >Прогнозируемая прибыль {{ investment.profitTimeframe }}</span
          >
          <span class="progress-percentage">{{ investment.progress }}%</span>
        </div>
        <div class="progress-bar">
          <div
            class="progress-fill"
            :style="{ width: investment.progress + '%' }"
          ></div>
        </div>
      </div>
    </div>

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
  return classes[props.investment.status] || 'status-active';
};

const getStatusIcon = () => {
  const icons = {
    active: '🟢',
    paused: '⏸️',
    completed: '✅',
    frozen: '❄️',
  };
  return icons[props.investment.status] || '🟢';
};

const getStatusText = () => {
  const texts = {
    active: 'Активна',
    paused: 'Приостановлена',
    completed: 'Завершена',
    frozen: 'Заморожена',
  };
  return texts[props.investment.status] || 'Активна';
};

const getRiskClass = () => {
  const risk = props.investment.riskLevel;
  if (risk <= 5) return 'risk-low';
  if (risk <= 12) return 'risk-medium';
  return 'risk-high';
};
</script>

<style scoped>
.investment-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 20px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.investment-card:hover {
  background: rgba(255, 255, 255, 0.06);
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.investment-card.list-view {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Хедер карточки */
.investment-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.investment-number {
  font-size: 14px;
  font-weight: 700;
  color: var(--primary-color);
  letter-spacing: 0.5px;
}

.investment-status {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-active {
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.status-paused {
  background: rgba(249, 115, 22, 0.2);
  color: #f97316;
  border: 1px solid rgba(249, 115, 22, 0.3);
}

.status-completed {
  background: rgba(59, 130, 246, 0.2);
  color: #3b82f6;
  border: 1px solid rgba(59, 130, 246, 0.3);
}

.status-frozen {
  background: rgba(156, 163, 175, 0.2);
  color: #9ca3af;
  border: 1px solid rgba(156, 163, 175, 0.3);
}

.status-icon {
  font-size: 10px;
}

/* Основная информация */
.investment-main {
  margin-bottom: 20px;
}

.investment-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
}

.details-column {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  transition: all 0.3s ease;
}

.detail-item:hover {
  background: rgba(0, 0, 0, 0.3);
  border-color: rgba(255, 255, 255, 0.1);
}

.detail-label {
  font-size: 10px;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  flex: 1;
}

.detail-value {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-primary);
  margin-right: 8px;
}

.detail-value.amount {
  color: #fbbf24;
}

.detail-value.profit {
  color: #22c55e;
}

.detail-value.risk-low {
  color: #22c55e;
}

.detail-value.risk-medium {
  color: #fbbf24;
}

.detail-value.risk-high {
  color: #ef4444;
}

.detail-icon {
  font-size: 12px;
  opacity: 0.7;
}

/* Прогресс */
.investment-progress {
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 12px;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.progress-label {
  font-size: 11px;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.progress-percentage {
  font-size: 12px;
  color: var(--primary-color);
  font-weight: 600;
}

.progress-bar {
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-color), #22c55e);
  transition: width 0.3s ease;
  border-radius: 2px;
}

/* Кнопки управления */
.investment-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  flex: 1;
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
}

.action-btn.settings {
  background: transparent;
  color: var(--text-secondary);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.action-btn.settings:hover {
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-primary);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-1px);
}

.action-btn.withdraw {
  background: var(--primary-color);
  color: #0a2f23;
  border: 1px solid var(--primary-color);
}

.action-btn.withdraw:hover {
  background: #86efac;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(74, 222, 128, 0.3);
}

/* Адаптивность */
@media (max-width: 768px) {
  .investment-card {
    padding: 16px;
  }

  .investment-details {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .details-column {
    gap: 6px;
  }

  .detail-item {
    padding: 6px 10px;
  }

  .detail-label {
    font-size: 9px;
  }

  .detail-value {
    font-size: 11px;
  }

  .action-btn {
    padding: 8px 12px;
    font-size: 10px;
  }
}

@media (max-width: 480px) {
  .investment-card {
    padding: 12px;
  }

  .investment-header {
    flex-direction: column;
    gap: 8px;
    align-items: flex-start;
  }

  .investment-number {
    font-size: 13px;
  }

  .action-btn {
    font-size: 9px;
    padding: 6px 10px;
  }
}

/* Focus states для доступности */
.action-btn:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

/* Анимации */
@keyframes cardPulse {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.4);
  }
  50% {
    box-shadow: 0 0 0 4px rgba(74, 222, 128, 0.1);
  }
}

.investment-card.status-active:hover {
  animation: cardPulse 2s infinite;
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
