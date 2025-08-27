<!-- components/investments/BettingControls.vue -->
<template>
  <div class="investment-card betting-card">
    <div class="card-header">
      <span class="card-icon">🎯</span>
      <h3>ТИП СТАВОК</h3>
    </div>

    <div class="betting-controls">
      <div class="control-group">
        <button
          class="betting-btn"
          :class="{ active: bettingMode === 'gambling' }"
          @click="$emit('update-betting-mode', 'gambling')"
        >
          <span class="btn-icon">🎲</span>
          Гэмблинг
        </button>
        <button
          class="betting-btn"
          :class="{ active: bettingMode === 'betting' }"
          @click="$emit('update-betting-mode', 'betting')"
        >
          <span class="btn-icon">🎯</span>
          Беттинг
        </button>
      </div>

      <div class="betting-info">
        <div class="info-icon">🔒</div>
        <div class="betting-info-content">
          <span class="betting-info-title">{{ getBettingTitle() }}</span>
          <p>{{ getBettingDescription() }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  bettingMode: {
    type: String,
    required: true,
    validator: (value) => ['gambling', 'betting'].includes(value),
  },
});

defineEmits(['update-betting-mode']);

const getBettingTitle = () => {
  return props.bettingMode === 'gambling' ? 'Гэмблинг' : 'Беттинг';
};

const getBettingDescription = () => {
  const descriptions = {
    gambling:
      'Высокорискованные ставки с большим потенциалом прибыли. Подходит для опытных игроков.',
    betting:
      'Сбалансированный подход к ставкам с умеренными рисками. Рекомендуется для начинающих.',
  };
  return descriptions[props.bettingMode];
};
</script>

<style scoped>
.investment-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 24px;
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

.betting-controls {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.control-group {
  display: flex;
  gap: 12px;
}

.betting-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
  flex: 1;
  justify-content: center;
}

.betting-btn:hover:not(.active) {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.3);
  color: rgba(255, 255, 255, 0.9);
}

.betting-btn.active {
  background: #4ade80;
  color: #0a2f23;
  border-color: #4ade80;
  font-weight: 600;
}

.btn-icon {
  font-size: 14px;
}

.betting-info {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
}

.info-icon {
  color: #4ade80;
  font-size: 16px;
  flex-shrink: 0;
}

.betting-info-content {
  flex: 1;
}

.betting-info-title {
  font-weight: 600;
  color: white;
  font-size: 14px;
  display: block;
  margin-bottom: 4px;
}

.betting-info-content p {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
  line-height: 1.4;
}

@media (max-width: 480px) {
  .investment-card {
    padding: 16px;
  }

  .control-group {
    gap: 8px;
  }

  .betting-btn {
    padding: 8px 16px;
    font-size: 12px;
  }

  .betting-info {
    padding: 12px;
  }
}
</style>
