<template>
  <section class="game-section">
    <div class="game-cards">
      <div class="game-card rating-card">
        <div class="card-header">
          <div class="card-icon">⚠️</div>
          <div class="card-title">РЕЙТИНГ</div>
        </div>
        <div class="card-content">
          <div class="rating-stats">
            <div class="rating-item">
              <span class="rating-label">ВАШ ПОЗИ...</span>
              <span class="rating-value red">126 📉</span>
            </div>
            <div class="rating-item">
              <span class="rating-label">ВАШ РЕЙТИНГ</span>
              <span class="rating-value red">100 📉</span>
            </div>
            <div class="rating-item">
              <span class="rating-label">ВАШ ПРИРЫ...</span>
              <span class="rating-value green">+12% 📈</span>
            </div>
          </div>
          <div class="card-badge">+10 Fill = 100 Hag</div>
        </div>
      </div>

      <div class="game-card money-card">
        <div class="card-header">
          <div class="card-title">ДЕНЬГИ</div>
        </div>
        <div class="card-content">
          <div class="money-stats">
            <div class="money-item">
              <span class="money-label">ДОХОДНОСТЬ</span>
              <span class="money-value red">13 USD / Week 📉</span>
            </div>
            <div class="money-item">
              <span class="money-label">СУММА ДЕПОЗИТОВ</span>
              <span class="money-value green">+1.2% 📈</span>
            </div>
          </div>
        </div>
      </div>

      <div class="game-card safe-card">
        <div class="card-header">
          <div class="card-title">СЕЙФ</div>
        </div>
        <div class="card-content">
          <div class="safe-stats">
            <div class="safe-item">
              <span class="safe-label">СПИНЫ ФОРТУНЫ</span>
              <div class="safe-value">
                <span class="warning-icon">⚠️</span>
                <span>5</span>
              </div>
            </div>
            <div class="safe-item">
              <span class="safe-label">СУНДУКИ</span>
              <div class="safe-value">
                <span class="chest-icon">🎁</span>
                <span>5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Game Cards Section */
.game-section {
  margin-bottom: 32px;
}

.game-cards {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
}

.game-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 20px;
  transition: all 0.3s ease;
}

.game-card:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.rating-card {
  border: 2px solid rgba(74, 222, 128, 0.3);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.card-icon {
  font-size: 18px;
}

.card-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--primary-color);
  letter-spacing: 0.5px;
}

.card-content {
  position: relative;
}

.rating-stats,
.money-stats,
.safe-stats {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.rating-item,
.money-item,
.safe-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.rating-label,
.money-label,
.safe-label {
  font-size: 11px;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.rating-value,
.money-value {
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
}

.rating-value.red,
.money-value.red {
  color: #ef4444;
}

.rating-value.green,
.money-value.green {
  color: var(--success-color);
}

.safe-value {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}

.chest-icon {
  font-size: 16px;
}

.card-badge {
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #8b5cf6, #a855f7);
  color: white;
  font-size: 9px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 8px;
  white-space: nowrap;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .game-cards {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
</style>
<script setup lang="ts">
</script>