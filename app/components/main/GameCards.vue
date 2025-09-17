<template>
  <section class="game-section">
    <div class="game-cards">
      <!-- Карточка Рейтинг -->
      <div class="game-card rating-card">
        <div class="card-header">
          <img src="~/assets/images/info.svg" />
          <div class="card-title">РЕЙТИНГ</div>
          <img src="~/assets/images/brush.svg" />
        </div>
        <div class="card-content">
          <div class="rating-stats">
            <div class="rating-item">
              <div class="stat-box">
                <div class="stat-label">ВАША ПОЗИ...</div>
                <div class="stat-value red">
                  <span class="value">126</span>
                  <img src="~/assets/images/arrow_drop_up.svg" />
                </div>
              </div>
            </div>
            <div class="rating-item">
              <div class="stat-box">
                <div class="stat-label">ВАШ РЕЙТИНГ</div>
                <div class="stat-value red">
                  <span class="value">100</span>
                  <img src="~/assets/images/arrow_drop_up.svg" />
                </div>
              </div>
            </div>
            <div class="rating-item">
              <div class="stat-box">
                <div class="stat-label">ВАШ ПРИРЫ...</div>
                <div class="stat-value green">
                  <span class="value">+12%</span>
                  <img src="~/assets/images/arrow_drop.svg" />
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
              <div class="money-stat-box">
                <div class="stat-label">ДОХОДНОСТЬ</div>
                <div class="stat-value red">
                  <span class="value">13 USD / Week</span>
                  <img src="~/assets/images/arrow_drop_up.svg" />
                </div>
              </div>
            </div>
            <div class="money-item">
              <div class="money-stat-box">
                <div class="stat-label">СУММА ДЕПОЗИТОВ</div>
                <div class="stat-value green">
                  <span class="value">+1.2%</span>
                  <img src="~/assets/images/arrow_drop.svg" />
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
              <div class="safe-stat-box">
                <div class="stat-label">СПИНЫ ФОРТУНЫ</div>
                <div class="safe-value">
                  <img src="~/assets/images/Spin.svg" />
                  <span class="value">5</span>
                </div>
              </div>
            </div>
            <div class="safe-item">
              <div class="safe-stat-box">
                <div class="stat-label">СУНДУКИ</div>
                <div class="safe-value">
                  <img src="~/assets/images/cheast.svg" />
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

<script setup>
// Можно добавить реактивные данные для статистик
</script>

<style scoped>
.game-section {
  margin-bottom: 32px;
}

.game-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.game-card {
  width: 310px;
  height: 100px;
  opacity: 1;
  padding: 16px 8px 8px;
  gap: 16px;
  border-radius: 16px;
  background: #00aa6926;
  border-top: 1px solid #ffffff0d;
  box-shadow: 0px 1px 5px 0px #00000040;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.game-card:hover {
  background: rgba(0, 170, 105, 0.2);
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
  background: linear-gradient(
    90deg,
    transparent,
    var(--primary-color),
    transparent
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.game-card:hover::before {
  opacity: 1;
}

/* Специальная рамка для карточки рейтинга */
.rating-card {
  border: 1px solid rgba(74, 222, 128, 0.2);
  background: #00aa6926;
}

.rating-card:hover {
  border-color: rgba(74, 222, 128, 0.4);
  box-shadow: 0 8px 32px rgba(74, 222, 128, 0.1);
}

.card-header {
  width: 294px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  position: relative;
  margin-bottom: 10px;
}
.card-header img {
  width: 16px;
  height: 16px;
}
.card-title {
  font-family: Tomorrow, sans-serif;
  font-weight: 700;
  font-size: 15px;
  line-height: 100%;
  text-align: center;
  text-transform: uppercase;
  color: #07cb38;
  text-shadow: 0px 2px 0px #00000040;
  flex: 1;
}

.card-content {
  position: relative;
}

.rating-stats {
  display: flex;
  gap: 8px;
  width: 294px;
  height: 49px;
}

.money-stats {
  display: flex;
  gap: 8px;
  width: 294px;
  height: 49px;
}

.safe-stats {
  display: flex;
  gap: 8px;
  width: 294px;
  height: 49px;
}

.rating-item {
  width: 100%;
}

.money-item {
  width: 143px;
  height: 49px;
  opacity: 1;
  gap: 8px;
  border-radius: 8px;
}

.safe-item {
  width: 143px;
  height: 49px;
  opacity: 1;
  gap: 8px;
  border-radius: 8px;
}

.stat-box {
  background: #00000040;
  border: 1px solid rgba(255, 255, 255, 0.08);
  width: 92.66666412353516px;
  height: 49px;
  gap: 8px;
  border-radius: 8px;
  padding: 8px;
}

.money-stat-box {
  width: 143px;
  height: 49px;
  opacity: 1;
  gap: 8px;
  border-radius: 8px;
  padding: 8px;
  background: #00000040;
  border-bottom: 1px solid #ffffff2e;
}

.safe-stat-box {
  width: 143px;
  height: 49px;
  opacity: 1;
  gap: 8px;
  border-radius: 8px;
  padding: 8px;
  background: #00000040;
  border-bottom: 1px solid #ffffff2e;
}

.stat-box:hover {
  background: rgba(0, 0, 0, 0.3);
  border-color: rgba(255, 255, 255, 0.15);
}

.money-stat-box:hover {
  background: rgba(0, 0, 0, 0.3);
  border-color: rgba(255, 255, 255, 0.15);
}

.safe-stat-box:hover {
  background: rgba(0, 0, 0, 0.3);
  border-color: rgba(255, 255, 255, 0.15);
}

.stat-label {
  color: #ffffff;
  text-transform: uppercase;
  margin-bottom: 6px;
  display: flex;
  justify-content: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 100%;
  letter-spacing: 0%;
  text-align: center;
  vertical-align: middle;
}

.stat-value,
.safe-value {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  font-family: Roboto, sans-serif;
  font-weight: 900;
  line-height: 100%;
  text-align: center;
  vertical-align: middle;
}
.safe-value {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 14px;
  font-family: Roboto, sans-serif;
  font-weight: 900;
  line-height: 100%;
  text-align: center;
}

.safe-value img {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.safe-value .value {
  color: #ffffff;
  flex: none; /* Убираем flex: 1 чтобы текст не растягивался */
}

.value {
  flex: 1;
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

@media (max-width: 1024px) {
  .game-cards {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}

@media (max-width: 768px) {
  .stat-box {
    padding: 10px 12px;
  }

  .card-header {
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
  0%,
  100% {
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
