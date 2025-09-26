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
      <!-- Панель управления для тестирования (можно удалить в продакшене) -->
      <div class="test-controls">
        <h4>Тестовая панель</h4>
        <div class="controls-row">
          <button @click="addDeposit(100)" class="test-btn">+100 USD</button>
          <button @click="addDeposit(500)" class="test-btn">+500 USD</button>
          <button @click="addDeposit(1000)" class="test-btn">+1000 USD</button>
          <button @click="resetToLevel(1)" class="test-btn reset">
            Сброс на 1 уровень
          </button>
        </div>
      </div>

      <!-- Информация о текущем уровне пользователя -->
      <div class="current-level-section">
        <div
          class="user-level-card"
          :class="{ 'level-up-animation': showLevelUpAnimation }"
        >
          <div class="level-badge">
            <div class="level-circle">
              <img src="./../assets/images/3.svg" alt="" />
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

      <!-- Уведомление о повышении уровня -->
      <div v-if="showLevelUpNotification" class="level-up-notification">
        <div class="notification-content">
          <h3>🎉 Поздравляем!</h3>
          <p>Вы достигли {{ currentUserLevel }} уровня лояльности!</p>
          <p>Ваш кешбек теперь: {{ getCurrentCashback() }}%</p>
        </div>
      </div>

      <!-- Таблица уровней лояльности на флексах -->
      <div class="levels-section">
        <div class="levels-flex-table">
          <!-- Заголовок -->
          <div class="levels-header">
            <div class="header-item">УРОВЕНЬ</div>
            <div class="header-item">ПОРОГ</div>
            <div class="header-item">КЕШБЕК</div>
            <div class="header-item">БОНУСЫ</div>
          </div>

          <!-- Строки уровней -->
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
                    <img
                      v-if="bonus.type === 'spins'"
                      :src="spin"
                      alt="Спин"
                      class="bonus-icon-img"
                    />
                    <img
                      v-else-if="bonus.type === 'chests'"
                      :src="box"
                      alt="Сундук"
                      class="bonus-icon-img"
                    />
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
  </div>
</template>

<script setup>
import spin from './../assets/images/Spin.svg';
import box from './../assets/images/box_small.svg';

// Реактивные данные пользователя
const currentUserLevel = ref(3);
const userDeposits = ref(1370);
const nextLevelRemaining = ref(130);
const showLevelUpAnimation = ref(false);
const showLevelUpNotification = ref(false);

// Данные об уровнях лояльности с пороговыми значениями в USD
const loyaltyLevels = ref([
  {
    id: 1,
    threshold: '1 депозит',
    thresholdValue: 1,
    cashback: 3,
    bonuses: [],
  },
  {
    id: 2,
    threshold: '500 USD',
    thresholdValue: 500,
    cashback: 5,
    bonuses: [],
  },
  {
    id: 3,
    threshold: '1500 USD',
    thresholdValue: 1500,
    cashback: 7,
    bonuses: [
      { type: 'spins', amount: 1, name: 'СПИН' },
      { type: 'chests', amount: 1, name: 'СУНДУК' },
    ],
  },
  {
    id: 4,
    threshold: '5000 USD',
    thresholdValue: 5000,
    cashback: 15,
    bonuses: [
      { type: 'spins', amount: 2, name: 'СПИНА' },
      { type: 'chests', amount: 2, name: 'СУНДУКА' },
    ],
  },
  {
    id: 5,
    threshold: '15000 USD',
    thresholdValue: 15000,
    cashback: 20,
    bonuses: [
      { type: 'spins', amount: 5, name: 'СПИНОВ' },
      { type: 'chests', amount: 5, name: 'СУНДУКОВ' },
    ],
  },
]);

// Вычисляемые свойства
const getCurrentCashback = () => {
  const currentLevel = loyaltyLevels.value.find(
    (level) => level.id === currentUserLevel.value
  );
  return currentLevel ? currentLevel.cashback : 0;
};

// Функция для определения текущего уровня на основе депозитов
const calculateCurrentLevel = () => {
  let newLevel = 1;

  for (let i = loyaltyLevels.value.length - 1; i >= 0; i--) {
    const level = loyaltyLevels.value[i];
    if (userDeposits.value >= level.thresholdValue) {
      newLevel = level.id;
      break;
    }
  }

  return newLevel;
};

// Функция для вычисления оставшейся суммы до следующего уровня
const calculateNextLevelRemaining = () => {
  const nextLevel = loyaltyLevels.value.find(
    (level) => level.id === currentUserLevel.value + 1
  );

  if (nextLevel) {
    return nextLevel.thresholdValue - userDeposits.value;
  }

  return 0; // Максимальный уровень достигнут
};

// Функция для проверки повышения уровня
const checkLevelUp = (previousLevel) => {
  const newLevel = calculateCurrentLevel();

  if (newLevel > previousLevel) {
    currentUserLevel.value = newLevel;
    showLevelUpAnimation.value = true;
    showLevelUpNotification.value = true;

    // Скрыть уведомление через 4 секунды
    setTimeout(() => {
      showLevelUpNotification.value = false;
    }, 4000);

    // Убрать анимацию через 2 секунды
    setTimeout(() => {
      showLevelUpAnimation.value = false;
    }, 2000);

    // Мокируем получение бонусов
    const currentLevelData = loyaltyLevels.value.find(
      (level) => level.id === newLevel
    );
    if (currentLevelData && currentLevelData.bonuses.length > 0) {
      console.log('Получены бонусы:', currentLevelData.bonuses);
    }
  } else {
    currentUserLevel.value = newLevel;
  }

  nextLevelRemaining.value = calculateNextLevelRemaining();
};

// Функция для добавления депозита (мокирование)
const addDeposit = (amount) => {
  const previousLevel = currentUserLevel.value;
  userDeposits.value += amount;

  checkLevelUp(previousLevel);
};

// Функция для сброса на определенный уровень (для тестирования)
const resetToLevel = (level) => {
  if (level === 1) {
    userDeposits.value = 100;
  } else {
    const targetLevel = loyaltyLevels.value.find((l) => l.id === level);
    if (targetLevel) {
      userDeposits.value = targetLevel.thresholdValue + 100;
    }
  }

  currentUserLevel.value = calculateCurrentLevel();
  nextLevelRemaining.value = calculateNextLevelRemaining();
  showLevelUpAnimation.value = false;
  showLevelUpNotification.value = false;
};

// Инициализация при монтировании компонента
onMounted(() => {
  currentUserLevel.value = calculateCurrentLevel();
  nextLevelRemaining.value = calculateNextLevelRemaining();
});

// Функция возврата назад
const goBack = () => {
  navigateTo(`/`);
};
</script>

<style scoped>
/* ===========================================
   БАЗОВЫЕ СТИЛИ
   =========================================== */

.loyalty-page {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(180deg, #001a14 0%, #002b20 100%);
  animation: fadeInUp 0.8s ease-out;
}

/* ===========================================
   ТЕСТОВЫЕ КОНТРОЛЫ (удалить в продакшене)
   =========================================== */

.test-controls {
  background: rgba(0, 0, 0, 0.3);
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
  text-align: center;
}

.test-controls h4 {
  color: #07cb38;
  margin: 0 0 12px 0;
  font-family: Tomorrow, sans-serif;
  font-size: 14px;
}

.controls-row {
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
}

.test-btn {
  padding: 8px 12px;
  background: #07cb38;
  color: #000;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-family: Roboto, sans-serif;
  font-weight: 600;
  font-size: 12px;
  transition: all 0.3s ease;
}

.test-btn:hover {
  background: #22c55e;
  transform: translateY(-2px);
}

.test-btn.reset {
  background: #f97c39;
}

.test-btn.reset:hover {
  background: #fb923c;
}

/* ===========================================
   УВЕДОМЛЕНИЕ О ПОВЫШЕНИИ УРОВНЯ
   =========================================== */

.level-up-notification {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(135deg, #07cb38 0%, #22c55e 100%);
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(7, 203, 56, 0.6);
  z-index: 1000;
  animation: levelUpPulse 2s ease-in-out;
  text-align: center;
  min-width: 300px;
}

.notification-content h3 {
  color: #000;
  margin: 0 0 8px 0;
  font-family: Tomorrow, sans-serif;
  font-size: 18px;
  font-weight: 700;
}

.notification-content p {
  color: #000;
  margin: 4px 0;
  font-family: Roboto, sans-serif;
  font-weight: 600;
  font-size: 14px;
}

@keyframes levelUpPulse {
  0%,
  100% {
    transform: translate(-50%, -50%) scale(1);
    box-shadow: 0 20px 40px rgba(7, 203, 56, 0.6);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.05);
    box-shadow: 0 25px 50px rgba(7, 203, 56, 0.8);
  }
}

/* ===========================================
   АНИМАЦИЯ ДЛЯ КАРТОЧКИ УРОВНЯ
   =========================================== */

.level-up-animation {
  animation: cardLevelUp 2s ease-in-out;
}

@keyframes cardLevelUp {
  0%,
  100% {
    transform: scale(1);
    box-shadow: none;
  }
  50% {
    transform: scale(1.02);
    box-shadow: 0 0 30px rgba(7, 203, 56, 0.8);
  }
}

/* ===========================================
   ХЭДЕР
   =========================================== */

.loyalty-header {
  display: flex;
  align-items: center;
  position: relative;
  background: linear-gradient(0deg, #002920 0%, #00382b 100%);
  height: 66px;
  padding: 24px 50px;
  width: 100%;
}

.card-header {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
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
  width: 100%;
  max-width: 644px;
  margin: 0 auto;
  background: #00aa6926;
  border-bottom-right-radius: 24px;
  border-bottom-left-radius: 24px;
  padding: 16px 24px;
  box-sizing: border-box;
}

/* ===========================================
   СЕКЦИЯ ТЕКУЩЕГО УРОВНЯ
   =========================================== */

.current-level-section {
  padding: 16px 0;
  display: flex;
  justify-content: center;
}

.user-level-card {
  width: 100%;
  max-width: 380px;
  padding: 16px;
  border-radius: 8px;
  background: #00000042;
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.level-badge {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.user-level-card .level-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-level-card .level-circle img {
  width: 24px;
  height: 24px;
}

.level-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.level-info-title {
  font-family: Tomorrow, sans-serif;
  font-weight: 500;
  font-size: 15px;
  color: #f97c39;
}

.level-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 20px;
}

.detail-label {
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 12px;
  color: #ffffff;
}

.detail-value {
  font-family: Roboto, sans-serif;
  font-weight: 900;
  font-size: 12px;
}

.detail-value.highlight {
  color: #f97c39;
}

.detail-value.success {
  color: #07cb38;
}

/* ===========================================
   ТАБЛИЦА НА ФЛЕКСАХ
   =========================================== */

.levels-section {
  padding: 16px 0;
}

.levels-flex-table {
  width: 100%;
  display: flex;
  flex-direction: column;
  background: transparent;
}

.levels-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 43px;
  background: #04211a66;
  border-radius: 14px 14px 0 0;
  padding: 0 8px;
}

.header-item {
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 12px;
  text-align: center;
  text-transform: uppercase;
  color: #ffffff;
  flex: 1;
}

.levels-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* Общие стили для всех строк */
.level-row {
  display: flex;
  transition: all 0.3s ease;
  position: relative;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  width: 100%;
  min-height: 60px;
  gap: 8px;
  border-radius: 16px;
  padding: 4px;
  box-sizing: border-box;
  background: #ffffff1a;
}

.level-row:last-child {
  border-bottom: none;
}

.level-row:hover {
  background: rgba(255, 255, 255, 0.05);
}

.level-row.current-level {
  margin-top: 20px;
  border-radius: 32px 16px 16px 32px;
  border: 2px solid #07cb38;
  box-shadow: 0px 0px 7.3px 0px #00ff40;
  position: relative;
}

.level-row.current-level::before {
  content: 'Вы тут';
  position: absolute;
  top: -18px;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0px 0px 7.3px 0px #00ff40;
  padding: 4px 12px;
  border-radius: 18px;
  color: #ffff;
  z-index: 10;
  background: #07cb38;
  font-family: Roboto, sans-serif;
  font-weight: 900;
  font-size: 20px;
  text-align: center;
  vertical-align: middle;
}

.level-row.completed {
  background: #ffffff1a;
  border-radius: 32px 16px 16px 32px;
}

.level-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: #ffffff;
  flex: 1;
  min-height: 44px;
  text-align: center;
}

.level-number-cell {
  position: relative;
}

.level-row .level-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #10101080;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 20px;
}

/* Уровни 1 и 2 */
.level-row:nth-child(1) .level-circle,
.level-row:nth-child(2) .level-circle {
  background: #f97c39;
  color: #1e1e1e;
}

/* Текущий уровень */
.level-row.current-level .level-circle {
  background: linear-gradient(135deg, #07cb38 0%, #22c55e 100%);
  box-shadow: 0 4px 20px rgba(7, 203, 56, 0.5);
  color: #1e1e1e;
}

/* Завершенные уровни */
.level-row.completed .level-circle {
  background: #f97c39;
  color: #1e1e1e;
}

.current-label {
  display: none;
}

.threshold-cell {
  font-family: Roboto, sans-serif;
  font-weight: 700;
  font-size: 12px;
  text-align: center;
  color: #ffffff;
}

.cashback-cell {
  font-family: Roboto, sans-serif;
  font-weight: 700;
  font-size: 16px;
  text-align: center;
  color: #07cb38;
}

.bonuses-cell {
  max-width: 113px;
  padding: 8px;
  border-radius: 4px 12px 12px 4px;
  background: #00000042;
  border-bottom: 1px solid #ffffff2e;
}

.bonuses-grid {
  display: flex;
  flex-direction: column;
  gap: 4px;
  justify-content: center;
  width: 100%;
  height: 100%;
  align-items: flex-start;
}

.bonus-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 600;
  flex-shrink: 0;
  width: 100%;
}

.bonus-item:hover {
  transform: scale(1.05);
}

.bonus-icon-img {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.bonus-text {
  font-family: Roboto, sans-serif;
  font-weight: 700;
  font-size: 9px;
  text-transform: uppercase;
  color: #07cb38;
  white-space: nowrap;
}

/* ===========================================
   АДАПТИВНЫЕ СТИЛИ
   =========================================== */

/* Планшеты */
@media (max-width: 768px) {
  .loyalty-header {
    padding: 20px 24px;
  }

  .loyalty-content {
    padding: 16px 16px;
  }

  .current-level-section {
    padding: 16px 0;
  }

  .levels-section {
    padding: 16px 0;
  }

  .level-info-title {
    font-size: 14px;
  }

  .header-item {
    font-size: 11px;
  }

  .level-row {
    min-height: 55px;
  }

  .level-cell {
    min-height: 39px;
    font-size: 14px;
  }

  .level-row .level-circle {
    width: 36px;
    height: 36px;
    font-size: 18px;
  }

  .threshold-cell {
    font-size: 11px;
  }

  .cashback-cell {
    font-size: 14px;
  }

  .current-label {
    font-size: 9px;
  }

  .test-controls {
    padding: 12px;
  }

  .controls-row {
    gap: 6px;
  }

  .test-btn {
    padding: 6px 10px;
    font-size: 11px;
  }
}

/* Мобильные устройства */
@media (max-width: 480px) {
  .loyalty-header {
    padding: 16px 16px;
    height: 56px;
  }

  .header-title {
    font-size: 18px;
    letter-spacing: 1px;
  }

  .back-arrow {
    width: 20px;
    height: 20px;
    padding: 4px;
  }

  .back-arrow img {
    width: 14px;
    height: 14px;
  }

  .loyalty-content {
    padding: 12px 12px;
    border-radius: 16px;
  }

  .level-info {
    width: 100%;
  }

  .level-info-title {
    font-size: 13px;
  }

  .detail-row {
    gap: 2px;
  }

  .detail-label {
    font-size: 11px;
  }

  .detail-value {
    font-size: 11px;
  }

  .levels-header {
    height: 38px;
    padding: 0 4px;
  }

  .header-item {
    font-size: 10px;
  }

  .level-row {
    min-height: 50px;
    gap: 4px;
    padding: 6px;
  }

  .level-cell {
    min-height: 36px;
    font-size: 12px;
    padding: 2px;
  }

  .level-row .level-circle {
    width: 32px;
    height: 32px;
    font-size: 16px;
  }

  .threshold-cell {
    font-size: 10px;
  }

  .cashback-cell {
    font-size: 13px;
  }

  .current-label {
    font-size: 8px;
    margin-top: 1px;
  }

  .bonuses-cell {
    max-width: 90px;
    padding: 4px;
  }

  .bonus-item {
    gap: 2px;
  }

  .bonus-icon-img {
    width: 14px;
    height: 14px;
  }

  .bonus-text {
    font-size: 8px;
  }

  .level-up-notification {
    min-width: 250px;
    padding: 20px;
  }

  .notification-content h3 {
    font-size: 16px;
  }

  .notification-content p {
    font-size: 12px;
  }

  .test-controls {
    padding: 8px;
  }

  .test-btn {
    padding: 6px 8px;
    font-size: 10px;
  }
}

/* Очень маленькие экраны */
@media (max-width: 360px) {
  .loyalty-header {
    padding: 12px 12px;
    height: 50px;
  }

  .header-title {
    font-size: 16px;
  }

  .loyalty-content {
    padding: 8px;
    border-radius: 12px;
  }

  .user-level-card {
    padding: 12px 8px;
  }

  .level-info-title {
    font-size: 12px;
  }

  .detail-label,
  .detail-value {
    font-size: 10px;
  }

  .header-item {
    font-size: 9px;
  }

  .level-row {
    min-height: 45px;
  }

  .level-cell {
    min-height: 32px;
    font-size: 11px;
  }

  .level-row .level-circle {
    width: 28px;
    height: 28px;
    font-size: 14px;
  }

  .threshold-cell {
    font-size: 9px;
  }

  .cashback-cell {
    font-size: 12px;
  }

  .bonuses-cell {
    max-width: 80px;
    padding: 2px;
  }

  .bonus-text {
    font-size: 7px;
  }

  .bonus-icon-img {
    width: 12px;
    height: 12px;
  }

  .level-up-notification {
    min-width: 200px;
    padding: 16px;
  }

  .notification-content h3 {
    font-size: 14px;
  }

  .notification-content p {
    font-size: 11px;
  }
}

/* Ландшафтная ориентация на мобильных */
@media (max-width: 767px) and (orientation: landscape) {
  .user-level-card {
    flex-direction: row;
    text-align: left;
  }

  .level-info-title {
    text-align: left;
  }

  .detail-row {
    flex-direction: row;
    justify-content: space-between;
  }

  .level-up-notification {
    min-width: 280px;
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

.level-row {
  animation: fadeInUp 0.6s ease-out;
  animation-fill-mode: both;
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

/* Стили для будущих уровней */
.level-row:nth-child(4),
.level-row:nth-child(5) {
  background: #ffffff1a;
  border-radius: 32px 16px 16px 32px;
}

/* Стили для будущих уровней */
.level-row:nth-child(4),
.level-row:nth-child(5) {
  background: #ffffff1a;
  border-radius: 32px 16px 16px 32px;
}
</style>
