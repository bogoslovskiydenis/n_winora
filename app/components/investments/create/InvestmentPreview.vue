<!-- components/investments/InvestmentPreview.vue -->
<template>
  <div class="investment-card preview-card">
    <div class="card-header">
      <span class="card-icon">👁️</span>
      <h3>ПРЕДПРОСМОТР ИНВЕСТИЦИИ</h3>
    </div>

    <div class="preview-info">
      <div class="info-icon">ℹ️</div>
      <div class="preview-description">
        <strong>Подсказка</strong><br />
        Предпросмотр инвестиции
      </div>
    </div>

    <div class="investment-preview">
      <div class="preview-row">
        <span class="preview-label">Тип</span>
        <span class="preview-value">
          {{ getBettingTitle() }}
          <span class="preview-icon">🔒</span>
        </span>
      </div>
      <div class="preview-row">
        <span class="preview-label">Стратегия</span>
        <span class="preview-value">
          {{ getPresetTitle() }}
          <span class="preview-icon">📊</span>
        </span>
      </div>
      <div class="preview-row">
        <span class="preview-label">Статус</span>
        <span class="preview-value status-frozen">
          Заморожена
          <span class="preview-icon">❄️</span>
        </span>
      </div>
      <div class="preview-row">
        <span class="preview-label">Прогнозируемая доходность</span>
        <span class="preview-value">{{ getProfitability() }}</span>
      </div>
      <div class="preview-row">
        <span class="preview-label">Период</span>
        <span class="preview-value">∞</span>
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
      <div class="preview-row">
        <span class="preview-label">Доступен к переводу прибыль</span>
        <span class="preview-value profit">20 USD</span>
      </div>
    </div>

    <div class="bonus-section">
      <div class="bonus-header">
        <span class="bonus-icon">🎁</span>
        <span class="bonus-title">Бонус за первую инвестицию</span>
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

    <button class="create-investment-btn" @click="handleCreateInvestment">
      ПЕРЕЙТИ К ОПЛАТЕ
    </button>
  </div>
</template>

<script setup>
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
});

// Словари для названий
const presetTitles = {
  user: 'Пользовательский',
  conservative: 'Консервативный',
  balanced: 'Сбалансированный',
  aggressive: 'Агрессивный',
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

const handleCreateInvestment = () => {
  // Здесь будет логика создания инвестиции
  console.log('Создание инвестиции:', {
    preset: props.selectedPreset,
    bettingMode: props.bettingMode,
    settings: props.settings,
  });

  // Переход к оплате или другая логика
  navigateTo('/payment'); // или показать модальное окно
};
</script>

<style scoped>
.investment-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 24px;
  position: sticky;
  top: 24px;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.card-icon {
  font-size: 20px;
  color: #f97316;
}

.card-header h3 {
  font-size: 16px;
  font-weight: 700;
  color: #f97316;
  margin: 0;
  letter-spacing: 0.5px;
}

.preview-info {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  background: rgba(74, 222, 128, 0.1);
  border-radius: 8px;
  margin-bottom: 20px;
}

.info-icon {
  color: #4ade80;
  font-size: 18px;
  flex-shrink: 0;
}

.preview-description {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.4;
}

.preview-description strong {
  color: white;
}

.investment-preview {
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
}

.preview-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.preview-row:last-child {
  border-bottom: none;
}

.preview-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  flex: 1;
}

.preview-value {
  font-size: 12px;
  color: white;
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;
  text-align: right;
}

.preview-value.status-frozen {
  color: #60a5fa;
}

.preview-value.amount {
  color: #fbbf24;
  font-weight: 600;
}

.preview-value.profit {
  color: #4ade80;
  font-weight: 600;
}

.risk-level.risk-low {
  color: #4ade80;
}

.risk-level.risk-medium {
  color: #fbbf24;
}

.risk-level.risk-high {
  color: #ef4444;
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
  width: 100%;
  padding: 14px 16px;
  background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
  border: none;
  border-radius: 8px;
  color: #0a2f23;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-family: inherit;
}

.create-investment-btn:hover {
  background: linear-gradient(135deg, #86efac 0%, #4ade80 100%);
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(74, 222, 128, 0.4);
}

.create-investment-btn:active {
  transform: translateY(0);
}

@media (max-width: 1200px) {
  .preview-card {
    position: static;
  }
}

@media (max-width: 480px) {
  .investment-card {
    padding: 16px;
  }

  .preview-row {
    flex-direction: column;
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
