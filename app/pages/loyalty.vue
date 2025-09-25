<template>
  <div class="loyalty-page">
    <!-- Хэдер с кнопкой назад -->
    <div class="loyalty-header">
      <div class="card-header">
        <div class="back-arrow" @click="goBack">
          <img src="./../assets/images/back.svg" alt="Назад" />
        </div>
        <h3 class="header-title">ЛОЯЛЬНОСТЬ</h3>
      </div>
    </div>

    <div class="loyalty-content">
      <!-- Информация о текущем уровне пользователя -->
      <div class="current-level-section">
        <div class="user-level-card">
          <div class="level-badge">
            <div class="level-circle">
              {{ currentUserLevel }}
            </div>
          </div>
          <div class="level-info">
            <h2 class="level-info-title">Ваш уровень лояльности</h2>
            <div class="level-details">
              <div class="detail-row">
                <span class="detail-label">Сумма ваших депозитов</span>
                <span class="detail-value highlight"
                  >{{ userDeposits }} USD</span
                >
              </div>
              <div class="detail-row">
                <span class="detail-label">До следующего уровня остается</span>
                <span class="detail-value success"
                  >{{ nextLevelRemaining }} USD</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Таблица уровней лояльности -->
      <div class="levels-section">
        <div class="levels-header">
          <div class="header-item">УРОВЕНЬ</div>
          <div class="header-item">ПОРОГ</div>
          <div class="header-item">КЕШБЕК</div>
          <div class="header-item">БОНУСЫ</div>
        </div>

        <div class="levels-list">
          <div
            v-for="level in loyaltyLevels"
            :key="level.id"
            class="level-row"
            :class="{
              'current-level': level.id === currentUserLevel,
              completed: level.id < currentUserLevel,
            }"
          >
            <!-- Номер уровня -->
            <div class="level-cell level-number-cell">
              <div class="level-circle">
                {{ level.id }}
              </div>
              <span v-if="level.id === currentUserLevel" class="current-label"
                >Вы тут</span
              >
            </div>

            <!-- Порог для уровня -->
            <div class="level-cell threshold-cell">
              {{ level.threshold }}
            </div>

            <!-- Процент кешбека -->
            <div class="level-cell cashback-cell">{{ level.cashback }}%</div>

            <!-- Бонусы -->
            <div class="level-cell bonuses-cell">
              <div class="bonuses-grid">
                <div
                  v-for="bonus in level.bonuses"
                  :key="bonus.type"
                  class="bonus-item"
                  :class="bonus.type"
                >
                  <span class="bonus-icon">{{ getBonusIcon(bonus.type) }}</span>
                  <span class="bonus-text"
                    >{{ bonus.amount }} {{ bonus.name }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Текущие данные пользователя
const currentUserLevel = ref(3);
const userDeposits = ref(1370);
const nextLevelRemaining = ref(130);

// Данные об уровнях лояльности
const loyaltyLevels = ref([
  {
    id: 1,
    threshold: '1 депозит',
    cashback: 3,
    bonuses: [],
  },
  {
    id: 2,
    threshold: '500 USD',
    cashback: 5,
    bonuses: [],
  },
  {
    id: 3,
    threshold: '1500 USD',
    cashback: 7,
    bonuses: [
      { type: 'spins', amount: 1, name: 'СПИН' },
      { type: 'chests', amount: 1, name: 'СУНДУК' },
    ],
  },
  {
    id: 4,
    threshold: '5000 USD',
    cashback: 15,
    bonuses: [
      { type: 'spins', amount: 2, name: 'СПИНА' },
      { type: 'chests', amount: 2, name: 'СУНДУКА' },
    ],
  },
  {
    id: 5,
    threshold: '15000 USD',
    cashback: 20,
    bonuses: [
      { type: 'spins', amount: 5, name: 'СПИНОВ' },
      { type: 'chests', amount: 5, name: 'СУНДУКОВ' },
    ],
  },
]);

// Функция получения иконки для типа бонуса
const getBonusIcon = (type) => {
  switch (type) {
    case 'spins':
      return '🎰';
    case 'chests':
      return '📦';
    default:
      return '🎁';
  }
};

// Функция возврата назад
const goBack = () => {
  navigateTo(`/`);
};
</script>

<style scoped>
.loyalty-header {
  display: flex;
  align-items: center;
  position: relative;
  background: linear-gradient(0deg, #002920 0%, #00382b 100%);
  height: 66px;
  padding: 24px 50px;
}

.card-header {
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
}

.back-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 6px;
  border-radius: 13.09px;
  border: 0.55px solid #07cb3826;
  cursor: pointer;
  transition: all 0.3s ease;
  position: absolute;
  left: 0;
}

.back-arrow:hover {
  background: rgba(7, 203, 56, 0.2);
  border-color: rgba(7, 203, 56, 0.5);
}

.back-arrow img {
  width: 16px;
  height: 16px;
}

.header-title {
  font-family: Tomorrow, sans-serif;
  font-weight: 700;
  font-size: 20px;
  text-align: center;
  text-transform: uppercase;
  color: #07cb38;
  margin: 0;
  letter-spacing: 2px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

/* ===========================================
   КОНТЕНТ ЛОЯЛЬНОСТИ
   =========================================== */

.loyalty-content {
  opacity: 1;
  border-bottom-right-radius: 24px;
  border-bottom-left-radius: 24px;
  max-width: 644px;
  margin: 0 auto;
  background: #00aa6926;

  padding: 32px 24px;
}

/* ===========================================
   СЕКЦИЯ ТЕКУЩЕГО УРОВНЯ
   =========================================== */

.current-level-section {
  margin-bottom: 40px;
}

.user-level-card {
  background: linear-gradient(
    135deg,
    rgba(7, 203, 56, 0.1) 0%,
    rgba(0, 0, 0, 0.3) 100%
  );
  backdrop-filter: blur(20px);
  border: 1px solid rgba(7, 203, 56, 0.3);
  border-radius: 24px;
  padding: 32px;
  display: flex;
  gap: 32px;
  align-items: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  position: relative;
  overflow: hidden;
}

.user-level-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(7, 203, 56, 0.1), transparent);
  pointer-events: none;
}

.level-badge {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.level-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #f97c39 0%, #ff6b35 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Tomorrow, sans-serif;
  font-weight: 700;
  font-size: 32px;
  color: #ffffff;
  box-shadow: 0 8px 32px rgba(249, 124, 57, 0.4);
  border: 3px solid rgba(255, 255, 255, 0.2);
}

.current-level .level-circle {
  background: linear-gradient(135deg, #07cb38 0%, #22c55e 100%);
  box-shadow: 0 8px 32px rgba(7, 203, 56, 0.6);
  animation: pulse 2s infinite;
}

.level-info {
  flex: 1;
  position: relative;
}

.level-info-title {
  font-family: Tomorrow, sans-serif;
  font-weight: 700;
  font-size: 22px;
  color: #f97c39;
  margin: 0 0 20px 0;
}

.level-details {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.detail-label {
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: #ffffff;
}

.detail-value {
  font-family: Roboto, sans-serif;
  font-weight: 700;
  font-size: 16px;
}

.detail-value.highlight {
  color: #f97c39;
}

.detail-value.success {
  color: #07cb38;
}

/* ===========================================
   ТАБЛИЦА УРОВНЕЙ
   =========================================== */

.levels-section {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
}

.levels-header {
  display: grid;
  grid-template-columns: 120px 140px 120px 1fr;
  gap: 16px;
  padding: 20px 24px;
  background: rgba(7, 203, 56, 0.1);
  border-bottom: 1px solid rgba(7, 203, 56, 0.2);
}

.header-item {
  font-family: Tomorrow, sans-serif;
  font-weight: 700;
  font-size: 14px;
  text-transform: uppercase;
  color: #07cb38;
  text-align: center;
  letter-spacing: 1px;
}

.levels-list {
  display: flex;
  flex-direction: column;
}

.level-row {
  display: grid;
  grid-template-columns: 120px 140px 120px 1fr;
  gap: 16px;
  padding: 20px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  position: relative;
}

.level-row:last-child {
  border-bottom: none;
}

.level-row:hover {
  background: rgba(255, 255, 255, 0.05);
}

.level-row.current-level {
  background: linear-gradient(
    135deg,
    rgba(7, 203, 56, 0.2) 0%,
    rgba(7, 203, 56, 0.1) 100%
  );
  border: 2px solid rgba(7, 203, 56, 0.5);
  border-radius: 16px;
  margin: 8px;
  padding: 20px 24px;
  box-shadow: 0 4px 20px rgba(7, 203, 56, 0.3);
  animation: glow 3s infinite alternate;
}

.level-row.completed {
  background: rgba(255, 255, 255, 0.02);
  opacity: 0.8;
}

.level-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: #ffffff;
}

.level-number-cell {
  flex-direction: column;
  gap: 8px;
}

.level-row .level-circle {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #f97c39;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 20px;
  box-shadow: 0 4px 16px rgba(249, 124, 57, 0.3);
}

.level-row.current-level .level-circle {
  background: linear-gradient(135deg, #07cb38 0%, #22c55e 100%);
  box-shadow: 0 4px 20px rgba(7, 203, 56, 0.5);
}

.level-row.completed .level-circle {
  background: #4ade80;
}

.current-label {
  font-size: 12px;
  color: #07cb38;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.threshold-cell {
  font-weight: 600;
  color: #ffffff;
}

.cashback-cell {
  font-weight: 700;
  color: #07cb38;
  font-size: 20px;
}

.bonuses-cell {
  justify-content: flex-start;
  padding-left: 16px;
}

.bonuses-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.bonus-item {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.1);
  padding: 8px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.bonus-item:hover {
  transform: scale(1.05);
}

.bonus-item.spins {
  background: rgba(34, 197, 94, 0.2);
  border: 1px solid rgba(34, 197, 94, 0.4);
  color: #22c55e;
}

.bonus-item.chests {
  background: rgba(168, 85, 247, 0.2);
  border: 1px solid rgba(168, 85, 247, 0.4);
  color: #a855f7;
}

.bonus-icon {
  font-size: 16px;
}

/* ===========================================
   АДАПТИВНЫЕ СТИЛИ
   =========================================== */

@media (max-width: 768px) {
  .loyalty-content {
    padding: 24px 16px;
  }

  .header-title {
    font-size: 24px;
  }

  .user-level-card {
    flex-direction: column;
    text-align: center;
    gap: 24px;
    padding: 24px;
  }

  .level-info-title {
    font-size: 18px;
  }

  .detail-row {
    flex-direction: column;
    gap: 8px;
    text-align: center;
    padding: 16px;
  }

  .levels-header,
  .level-row {
    grid-template-columns: 80px 100px 80px 1fr;
    gap: 8px;
    padding: 16px 12px;
  }

  .level-row.current-level {
    margin: 4px;
    padding: 16px 12px;
  }

  .header-item {
    font-size: 12px;
  }

  .level-circle {
    width: 40px !important;
    height: 40px !important;
    font-size: 16px !important;
  }

  .bonuses-cell {
    justify-content: center;
    padding-left: 0;
  }

  .bonuses-grid {
    flex-direction: column;
    align-items: center;
  }

  .bonus-item {
    font-size: 10px;
    padding: 6px 10px;
  }
}

@media (max-width: 480px) {
  .loyalty-content {
    padding: 16px 12px;
  }

  .levels-header,
  .level-row {
    grid-template-columns: 60px 80px 60px 1fr;
    gap: 4px;
    padding: 12px 8px;
  }

  .header-item {
    font-size: 10px;
  }

  .level-cell {
    font-size: 12px;
  }

  .level-circle {
    width: 35px !important;
    height: 35px !important;
    font-size: 14px !important;
  }

  .current-label {
    font-size: 8px;
  }

  .bonus-item {
    font-size: 9px;
    padding: 4px 8px;
  }
}

/* ===========================================
   АНИМАЦИИ
   =========================================== */

@keyframes pulse {
  0% {
    box-shadow: 0 8px 32px rgba(7, 203, 56, 0.6);
  }
  50% {
    box-shadow: 0 12px 40px rgba(7, 203, 56, 0.8);
    transform: scale(1.02);
  }
  100% {
    box-shadow: 0 8px 32px rgba(7, 203, 56, 0.6);
  }
}

@keyframes glow {
  0% {
    box-shadow: 0 4px 20px rgba(7, 203, 56, 0.3);
  }
  100% {
    box-shadow: 0 6px 30px rgba(7, 203, 56, 0.5);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.loyalty-page {
  animation: fadeInUp 0.8s ease-out;
}

.level-row {
  animation: fadeInUp 0.6s ease-out;
}

.level-row:nth-child(1) {
  animation-delay: 0.1s;
}
.level-row:nth-child(2) {
  animation-delay: 0.2s;
}
.level-row:nth-child(3) {
  animation-delay: 0.3s;
}
.level-row:nth-child(4) {
  animation-delay: 0.4s;
}
.level-row:nth-child(5) {
  animation-delay: 0.5s;
}

.level-row {
  animation-fill-mode: both;
}

.user-level-card {
  animation: fadeInUp 0.8s ease-out 0.2s;
  animation-fill-mode: both;
}
</style>
