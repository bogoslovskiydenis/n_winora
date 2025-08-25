<template>
  <section class="loyalty-section">
    <div class="loyalty-card">
      <div class="loyalty-header">
        <div class="loyalty-icon">⚠️</div>
        <div class="loyalty-title">ЛОЯЛЬНОСТЬ</div>
      </div>
      <div class="loyalty-content">
        <div class="loyalty-level">
          <span class="level-badge">2</span>
          <div class="level-info">
            <div class="level-title">Ваш уровень лояльности</div>
            <div class="level-deposit">Сумма ваших депозитов <span class="amount">1370 USD</span></div>
            <div class="level-next">До следующего уровня остается <span class="remaining">130 USD</span></div>
            <router-link to="/profile" class="level-link">Узнать больше</router-link>
          </div>
        </div>

        <div class="loyalty-rewards">
          <div class="reward-column">
            <div class="reward-title">Бонусы за текущий уровень</div>
            <div class="reward-item">Кешбек <span class="reward-value">5%</span></div>
            <div class="reward-item">Спины <span class="reward-value">5</span></div>
            <div class="reward-item">Сундуки <span class="reward-value">3</span></div>
          </div>

          <div class="reward-column">
            <div class="reward-title">Бонусы за следующий уровень</div>
            <div class="reward-item">Кешбек <span class="reward-value green">7%</span></div>
            <div class="reward-item">Спины <span class="reward-value green">7</span></div>
            <div class="reward-item">Сундуки <span class="reward-value green">5</span></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Loyalty Section */
.loyalty-section {
  margin-bottom: 32px;
}

.loyalty-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px;
}

.loyalty-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
}

.loyalty-icon {
  font-size: 18px;
}

.loyalty-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--primary-color);
  letter-spacing: 0.5px;
}

.loyalty-content {
  display: flex;
  gap: 32px;
}

.loyalty-level {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  flex: 1;
}

.level-badge {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff6b35, #f7931e);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: 700;
  color: white;
  border: 3px solid rgba(255, 107, 53, 0.3);
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

.level-deposit {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 6px;
}

.level-next {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 12px;
}

.amount,
.remaining {
  color: var(--primary-color);
  font-weight: 600;
}

.level-link {
  font-size: 14px;
  color: #4ade80;
  text-decoration: none;
  font-weight: 500;
}

.level-link:hover {
  text-decoration: underline;
}

.loyalty-rewards {
  display: flex;
  gap: 32px;
  flex: 1;
}

.reward-column {
  flex: 1;
}

.reward-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 16px;
  text-align: center;
}

.reward-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  color: var(--text-primary);
  margin-bottom: 10px;
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
}

.reward-value {
  font-weight: 600;
}

.reward-value.green {
  color: var(--success-color);
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .loyalty-content {
    flex-direction: column;
    gap: 20px;
  }

  .loyalty-rewards {
    gap: 20px;
  }
}
</style>
<script setup lang="ts">
</script>