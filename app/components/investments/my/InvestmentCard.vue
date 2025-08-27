<!-- components/investments/my/InvestmentCard.vue -->
<template>
  <div class="investment-card">
    <div class="investment-header">
      <div class="investment-info">
        <h4 class="investment-name">{{ investment.name }}</h4>
        <div class="investment-type">{{ getInvestmentType() }}</div>
      </div>
      <div class="investment-status" :class="getStatusClass()">
        <span class="status-icon">{{ getStatusIcon() }}</span>
        <span class="status-text">{{ investment.status }}</span>
      </div>
    </div>

    <div class="investment-stats">
      <div class="stat-item">
        <div class="stat-label">Вложено</div>
        <div class="stat-value invested">{{ investment.amount }} USD</div>
      </div>
      <div class="stat-item">
        <div class="stat-label">Прибыль</div>
        <div class="stat-value profit" :class="getProfitClass()">
          {{ formatProfit() }}
        </div>
      </div>
      <div class="stat-item">
        <div class="stat-label">Доходность</div>
        <div class="stat-value">{{ investment.profitability }}</div>
      </div>
      <div class="stat-item">
        <div class="stat-label">Риск</div>
        <div class="stat-value risk" :class="getRiskClass()">
          {{ investment.riskLevel }}%
        </div>
      </div>
    </div>

    <div class="investment-progress" v-if="investment.status === 'active'">
      <div class="progress-info">
        <span>Прогресс</span>
        <span>{{ investment.progress }}%</span>
      </div>
      <div class="progress-bar">
        <div
          class="progress-fill"
          :style="{ width: investment.progress + '%' }"
        ></div>
      </div>
    </div>

    <div class="investment-actions">
      <button
        class="action-btn primary"
        v-if="investment.status === 'active'"
        @click="$emit('manage', investment.id)"
      >
        Управлять
      </button>
      <button
        class="action-btn secondary"
        v-if="investment.availableProfit > 0"
        @click="$emit('withdraw', investment.id)"
      >
        Вывести {{ investment.availableProfit }} USD
      </button>
      <button
        class="action-btn outline"
        @click="$emit('view-details', investment.id)"
      >
        Детали
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  investment: {
    type: Object,
    required: true,
    default: () => ({
      id: 1,
      name: 'Инвестиция #1',
      type: 'betting',
      preset: 'balanced',
      status: 'active', // active, paused, completed, frozen
      amount: 100,
      currentProfit: 25,
      totalProfit: 45,
      availableProfit: 20,
      profitability: '15 USD / Week',
      riskLevel: 8,
      progress: 65,
      createdAt: '2024-01-15',
    }),
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

const getProfitClass = () => {
  if (props.investment.currentProfit > 0) return 'profit-positive';
  if (props.investment.currentProfit < 0) return 'profit-negative';
  return 'profit-neutral';
};

const formatProfit = () => {
  const profit = props.investment.currentProfit;
  const sign = profit > 0 ? '+' : profit < 0 ? '-' : '';
  return `${sign}${Math.abs(profit)} USD`;
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
}

.investment-card:hover {
  background: rgba(255, 255, 255, 0.06);
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.investment-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}

.investment-info {
  flex: 1;
}

.investment-name {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 4px 0;
}

.investment-type {
  font-size: 12px;
  color: var(--text-secondary);
  text-transform: uppercase;
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

.investment-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 20px;
}

.stat-item {
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 12px;
  text-align: center;
}

.stat-label {
  font-size: 11px;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
}

.stat-value {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}

.stat-value.invested {
  color: #fbbf24;
}

.stat-value.profit-positive {
  color: #22c55e;
}

.stat-value.profit-negative {
  color: #ef4444;
}

.stat-value.profit-neutral {
  color: var(--text-secondary);
}

.stat-value.risk-low {
  color: #22c55e;
}

.stat-value.risk-medium {
  color: #fbbf24;
}

.stat-value.risk-high {
  color: #ef4444;
}

.investment-progress {
  margin-bottom: 20px;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: 12px;
  color: var(--text-secondary);
}

.progress-bar {
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #4ade80, #22c55e);
  transition: width 0.3s ease;
  border-radius: 3px;
}

.investment-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.action-btn {
  flex: 1;
  min-width: 80px;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  font-family: inherit;
}

.action-btn.primary {
  background: #4ade80;
  color: #0a2f23;
}

.action-btn.primary:hover {
  background: #86efac;
  transform: translateY(-1px);
}

.action-btn.secondary {
  background: #f97316;
  color: white;
}

.action-btn.secondary:hover {
  background: #fb923c;
  transform: translateY(-1px);
}

.action-btn.outline {
  background: transparent;
  color: var(--text-secondary);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.action-btn.outline:hover {
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-primary);
  border-color: rgba(255, 255, 255, 0.3);
}

@media (max-width: 480px) {
  .investment-card {
    padding: 16px;
  }

  .investment-header {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }

  .investment-stats {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .action-btn {
    flex: none;
    width: 100%;
  }
}
</style>
