<template>
  <div class="loyalty-card">
    <div class="card-header">
      <h3>⭐ Уровень лояльности</h3>
    </div>
    <div class="loyalty-content">
      <div class="loyalty-level">
        <div class="level-badge">{{ currentLevel }}</div>
        <div class="level-info">
          <div class="level-title">Уровень {{ currentLevel }}</div>
          <div class="level-progress">
            <div class="progress-bar">
              <div
                class="progress-fill"
                :style="{ width: loyaltyProgress + '%' }"
              ></div>
            </div>
            <div class="progress-text">
              {{ loyaltyProgress }}% до следующего уровня
            </div>
          </div>
        </div>
      </div>
      <div class="loyalty-benefits">
        <div class="benefit-item">
          <span class="benefit-icon">💰</span>
          <span class="benefit-text">Кешбек {{ currentCashback }}%</span>
        </div>
        <div class="benefit-item">
          <span class="benefit-icon">🎁</span>
          <span class="benefit-text">Бонусы за депозиты</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  currentLevel: {
    type: Number,
    default: 1,
  },
  loyaltyProgress: {
    type: Number,
    default: 0,
  },
  currentCashback: {
    type: Number,
    default: 3,
  },
});
</script>

<style scoped>
.loyalty-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 20px;
  transition: all 0.3s ease;
}

.loyalty-card:hover {
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

.loyalty-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.loyalty-level {
  display: flex;
  align-items: center;
  gap: 16px;
}

.level-badge {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff6b35, #f7931e);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
  color: white;
  flex-shrink: 0;
  border: 3px solid rgba(255, 107, 53, 0.3);
  box-shadow: 0 8px 24px rgba(255, 107, 53, 0.2);
  animation: levelPulse 3s infinite;
}

@keyframes levelPulse {
  0%,
  100% {
    box-shadow: 0 8px 24px rgba(255, 107, 53, 0.2);
  }
  50% {
    box-shadow: 0 8px 32px rgba(255, 107, 53, 0.4);
  }
}

.level-info {
  flex: 1;
}

.level-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.level-progress {
  display: flex;
  flex-direction: column;
  gap: 4px;
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

.progress-text {
  font-size: 12px;
  color: var(--text-secondary);
}

.loyalty-benefits {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.benefit-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: rgba(74, 222, 128, 0.1);
  border: 1px solid rgba(74, 222, 128, 0.2);
  border-radius: 6px;
  font-size: 12px;
  color: var(--text-primary);
  transition: all 0.3s ease;
}

.benefit-item:hover {
  background: rgba(74, 222, 128, 0.15);
  border-color: rgba(74, 222, 128, 0.3);
}

.benefit-icon {
  font-size: 14px;
}

@media (max-width: 768px) {
  .loyalty-benefits {
    flex-direction: column;
    gap: 8px;
  }
}

@media (max-width: 480px) {
  .loyalty-card {
    padding: 16px;
  }

  .loyalty-level {
    flex-direction: column;
    text-align: center;
    gap: 12px;
  }

  .level-badge {
    width: 40px;
    height: 40px;
    font-size: 16px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .level-badge {
    animation: none;
  }
}
</style>
