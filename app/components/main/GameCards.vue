<template>
  <section class="game-section">
    <div class="game-cards">
      <!-- Карточка Рейтинг -->
      <div class="game-card rating-card">
        <div class="card-header">
          <div class="card-icon warning">⚠️</div>
          <div class="card-title">РЕЙТИНГ</div>
          <div class="card-icon warning">⚠️</div>
        </div>
        <div class="card-content">
          <div class="rating-stats">
            <div class="rating-item">
              <div class="stat-box">
                <div class="stat-label">ВАША ПОЗИ...</div>
                <div class="stat-value red">
                  <span class="value">126</span>
                  <span class="trend down">📉</span>
                </div>
              </div>
            </div>
            <div class="rating-item">
              <div class="stat-box">
                <div class="stat-label">ВАШ РЕЙТИНГ</div>
                <div class="stat-value red">
                  <span class="value">100</span>
                  <span class="trend down">📉</span>
                </div>
              </div>
            </div>
            <div class="rating-item">
              <div class="stat-box">
                <div class="stat-label">ВАШ ПРИРЫ...</div>
                <div class="stat-value green">
                  <span class="value">+12%</span>
                  <span class="trend up">📈</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Карточка Деньги -->
      <div class="game-card money-card">
        <div class="card-header">
          <div class="card-title">ДЕНЬГИ</div>
        </div>
        <div class="card-content">
          <div class="money-stats">
            <div class="money-item">
              <div class="stat-box">
                <div class="stat-label">ДОХОДНОСТЬ</div>
                <div class="stat-value red">
                  <span class="value">13 USD / Week</span>
                  <span class="trend down">📉</span>
                </div>
              </div>
            </div>
            <div class="money-item">
              <div class="stat-box">
                <div class="stat-label">СУММА ДЕПОЗИТОВ</div>
                <div class="stat-value green">
                  <span class="value">+1.2%</span>
                  <span class="trend up">📈</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Карточка Сейф -->
      <div class="game-card safe-card">
        <div class="card-header">
          <div class="card-title">СЕЙФ</div>
        </div>
        <div class="card-content">
          <div class="safe-stats">
            <div class="safe-item">
              <div class="stat-box">
                <div class="stat-label">СПИНЫ ФОРТУНЫ</div>
                <div class="safe-value">
                  <span class="safe-icon warning">⚠️</span>
                  <span class="value">5</span>
                </div>
              </div>
            </div>
            <div class="safe-item">
              <div class="stat-box">
                <div class="stat-label">СУНДУКИ</div>
                <div class="safe-value">
                  <span class="safe-icon chest">🎁</span>
                  <span class="value">5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Можно добавить реактивные данные для статистик
</script>

<style scoped>

.game-section {
  margin-bottom: 32px;
}

.game-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}


.game-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 20px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.game-card:hover {
  background: rgba(255, 255, 255, 0.06);
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.game-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--primary-color), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.game-card:hover::before {
  opacity: 1;
}

/* Специальная рамка для карточки рейтинга */
.rating-card {
  border: 1px solid rgba(74, 222, 128, 0.2);
  background: rgba(74, 222, 128, 0.02);
}

.rating-card:hover {
  border-color: rgba(74, 222, 128, 0.4);
  box-shadow: 0 8px 32px rgba(74, 222, 128, 0.1);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 20px;
  position: relative;
}

.card-icon {
  font-size: 16px;
  opacity: 0.7;
}

.card-icon.warning {
  color: #f59e0b;
  filter: drop-shadow(0 0 4px rgba(245, 158, 11, 0.3));
}

.card-title {
  font-size: 14px;
  font-weight: 700;
  color: var(--primary-color);
  letter-spacing: 1px;
  text-align: center;
  flex: 1;
}

.card-content {
  position: relative;
}

.rating-stats,
.money-stats,
.safe-stats {
  display: flex;
  gap: 16px;
}

.rating-item,
.money-item,
.safe-item {
  width: 100%;
}

.stat-box {
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 12px 16px;
  transition: all 0.3s ease;
}

.stat-box:hover {
  background: rgba(0, 0, 0, 0.3);
  border-color: rgba(255, 255, 255, 0.15);
}

.stat-label {
  font-size: 10px;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
}

.stat-value,
.safe-value {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 600;
}

.value {
  flex: 1;
}

.trend,
.safe-icon {
  font-size: 14px;
  margin-left: 8px;
}


.stat-value.green .value {
  color: #22c55e;
}

.stat-value.red .value {
  color: #22c55e;
}

.safe-value .value {
  color: var(--text-primary);
}

/* Иконки трендов */
.trend.up {
  color: #22c55e;
}

.trend.down {
  color: #ef4444;
}

/* Иконки сейфа */
.safe-icon.warning {
  color: #f59e0b;
}

.safe-icon.chest {
  color: #8b5cf6;
}

@media (max-width: 1024px) {
  .game-cards {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .game-card {
    padding: 16px;
  }
}

@media (max-width: 768px) {
  .rating-stats,
  .money-stats {
    gap: 12px;
  }

  .stat-box {
    padding: 10px 12px;
  }

  .card-header {
    margin-bottom: 16px;
  }

  .card-title {
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .game-section {
    margin-bottom: 24px;
  }

  .stat-value,
  .safe-value {
    font-size: 13px;
  }

  .stat-label {
    font-size: 9px;
  }

}


@keyframes glow {
  0%, 100% {
    box-shadow: 0 0 10px rgba(74, 222, 128, 0.3);
  }
  50% {
    box-shadow: 0 0 20px rgba(74, 222, 128, 0.5);
  }
}

.rating-card:hover {
  animation: glow 2s infinite;
}



@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}


@media (prefers-reduced-motion: reduce) {
  .game-card {
    animation: none;
    opacity: 1;
  }

  .rating-card:hover {
    animation: none;
  }

  .game-card:hover {
    transform: none;
  }
}

/* Фокус для клавиатурной навигации */
.game-card:focus-within {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}
</style>