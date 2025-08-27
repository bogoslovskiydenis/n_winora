<template>
  <div class="stats-card">
    <div class="card-header">
      <h3>📈 Статистика аккаунта</h3>
    </div>
    <div class="stats-list">
      <div class="stat-item">
        <span class="stat-label">Баланс</span>
        <span class="stat-value balance"
          >{{ formatCurrency(user?.balance || 0) }} USD</span
        >
      </div>
      <div class="stat-item">
        <span class="stat-label">Всего инвестиций</span>
        <span class="stat-value">{{ totalInvestments }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">Активных инвестиций</span>
        <span class="stat-value active">{{ activeInvestments }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">Общая прибыль</span>
        <span class="stat-value profit"
          >+{{ formatCurrency(totalProfit) }} USD</span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
  totalInvestments: {
    type: Number,
    default: 0,
  },
  activeInvestments: {
    type: Number,
    default: 0,
  },
  totalProfit: {
    type: Number,
    default: 0,
  },
});

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('ru-RU').format(amount);
};
</script>

<style scoped>
.stats-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 20px;
  transition: all 0.3s ease;
}

.stats-card:hover {
  background: rgba(255, 255, 255, 0.06);
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.card-header {
  margin-bottom: 20px;
}

.card-header h3 {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.stats-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
}

.stat-item:hover {
  background: rgba(0, 0, 0, 0.3);
  border-color: rgba(255, 255, 255, 0.1);
}

.stat-label {
  font-size: 14px;
  color: var(--text-secondary);
  font-weight: 500;
}

.stat-value {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
}

.stat-value.balance {
  color: #fbbf24;
  font-weight: 700;
}

.stat-value.active {
  color: #4ade80;
  font-weight: 700;
}

.stat-value.profit {
  color: #22c55e;
  font-weight: 700;
}

@media (max-width: 480px) {
  .stats-card {
    padding: 16px;
  }

  .stat-item {
    padding: 10px;
  }

  .stat-label,
  .stat-value {
    font-size: 13px;
  }
}
</style>
