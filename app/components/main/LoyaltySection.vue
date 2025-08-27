<template>
  <section class="loyalty-investment-wrapper">
    <!-- Секция лояльности (ограничена 800px) -->
    <div class="loyalty-section">
      <div class="loyalty-card">
        <div class="loyalty-header">
          <div class="loyalty-icon">⚠️</div>
          <div class="loyalty-title">ЛОЯЛЬНОСТЬ</div>
        </div>

        <div class="loyalty-content">
          <!-- Левая часть - информация об уровне -->
          <div class="loyalty-level">
            <div class="level-badge-wrapper">
              <span class="level-badge">{{ currentLevel }}</span>
            </div>
            <div class="level-info">
              <div class="level-title">Ваш уровень лояльности</div>
              <div class="level-details">
                <div class="level-deposit">
                  Сумма ваших депозитов
                  <span class="amount">{{ depositAmount }} USD</span>
                </div>
                <div class="level-next">
                  До следующего уровня остается
                  <span class="remaining">{{ nextLevelRemaining }} USD</span>
                </div>
              </div>
              <router-link to="/profile" class="level-link"
                >Узнать больше</router-link
              >
            </div>
          </div>

          <!-- Правая часть - бонусы -->
          <div class="loyalty-rewards">
            <!-- Текущий уровень -->
            <div class="reward-column">
              <div class="reward-header">
                <div class="reward-title">Бонусы за текущий уровень</div>
              </div>
              <div class="reward-list">
                <div
                  v-for="bonus in currentBonuses"
                  :key="bonus.name"
                  class="reward-item"
                >
                  <span class="reward-name">{{ bonus.name }}</span>
                  <span class="reward-value">{{ bonus.value }}</span>
                </div>
              </div>
            </div>

            <!-- Следующий уровень -->
            <div class="reward-column next-level">
              <div class="reward-header">
                <div class="reward-title">Бонусы за следующий уровень</div>
              </div>
              <div class="reward-list">
                <div
                  v-for="bonus in nextBonuses"
                  :key="bonus.name"
                  class="reward-item"
                >
                  <span class="reward-name">{{ bonus.name }}</span>
                  <span class="reward-value green">{{ bonus.value }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Баннер инвестиций -->
    <div class="investment-banner-section">
      <div class="investment-banner">
        <div class="banner-content">
          <!-- Заголовок -->
          <div class="banner-header">
            <h2 class="banner-title">Время выбрать</h2>
            <h1 class="banner-main-title">ИНВЕСТИЦИИ</h1>
          </div>

          <!-- Иконки портфелей/сундуков -->
          <div class="investment-cases">
            <div class="investment-case case-1">
              <div class="case-icon">💼</div>
            </div>
            <div class="investment-case case-2 featured">
              <div class="case-icon">💼</div>
            </div>
            <div class="investment-case case-3">
              <div class="case-icon">💼</div>
            </div>
          </div>

          <!-- Кнопка действия -->
          <button class="investment-buy-btn" @click="handleInvestmentClick">
            КУПИТЬ
          </button>
        </div>

        <!-- Декоративные элементы -->
        <div class="banner-decoration">
          <div class="tech-grid"></div>
          <div class="circuit-pattern"></div>
        </div>
      </div>
    </div>
    <div class="investment-banner-section">
      <div class="investment-banner">
        <div class="banner-content">
          <!-- Заголовок -->
          <div class="banner-header">
            <h2 class="banner-title">Время выбрать</h2>
            <h1 class="banner-main-title">ИНВЕСТИЦИИ</h1>
          </div>

          <!-- Иконки портфелей/сундуков -->
          <div class="investment-cases">
            <div class="investment-case case-1">
              <div class="case-icon">💼</div>
            </div>
            <div class="investment-case case-2 featured">
              <div class="case-icon">💼</div>
            </div>
            <div class="investment-case case-3">
              <div class="case-icon">💼</div>
            </div>
          </div>

          <!-- Кнопка действия -->
          <button class="investment-buy-btn" @click="handleInvestmentClick">
            КУПИТЬ
          </button>
        </div>

        <!-- Декоративные элементы -->
        <div class="banner-decoration">
          <div class="tech-grid"></div>
          <div class="circuit-pattern"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Реактивные данные для уровня пользователя
const currentLevel = ref(2);
const depositAmount = ref(1370);
const nextLevelRemaining = ref(130);

// Бонусы для текущего уровня (согласно дизайну)
const currentBonuses = ref([
  { name: 'Кешбек', value: '5%' },
  { name: 'Спины', value: '-' }, // Тире для пустых значений
  { name: 'Сундуки', value: '-' }, // Тире для пустых значений
]);

// Бонусы для следующего уровня (согласно дизайну)
const nextBonuses = ref([
  { name: 'Кешбек', value: '7%' },
  { name: 'Спины', value: '2' }, // Правильное значение из дизайна
  { name: 'Сундуки', value: '3' }, // Правильное значение из дизайна
]);

// Обработчик клика на кнопку инвестиций
const handleInvestmentClick = () => {
  navigateTo('/investments');
};

// Функция для обновления данных (для будущей интеграции с API)
const updateLoyaltyData = (userData: any) => {
  currentLevel.value = userData.level || 2;
  depositAmount.value = userData.totalDeposits || 1370;
  nextLevelRemaining.value = userData.nextLevelRemaining || 130;

  // Обновляем бонусы на основе уровня
  updateBonuses(userData.level || 2);
};

// Функция для обновления бонусов в зависимости от уровня
const updateBonuses = (level: number) => {
  // Логика для разных уровней
  switch (level) {
    case 2:
      currentBonuses.value = [
        { name: 'Кешбек', value: '5%' },
        { name: 'Спины', value: '-' },
        { name: 'Сундуки', value: '-' },
      ];
      nextBonuses.value = [
        { name: 'Кешбек', value: '7%' },
        { name: 'Спины', value: '2' },
        { name: 'Сундуки', value: '3' },
      ];
      break;
    // Добавить другие уровни по необходимости
    default:
      break;
  }
};
</script>

<style scoped>
.loyalty-investment-wrapper {
  display: grid;
  grid-template-columns: 800px 1fr;
  gap: 32px;
  margin-bottom: 32px;
  align-items: start;
}

.loyalty-section {
  width: 100%;
}

.loyalty-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px;
  position: relative;
  overflow: hidden;
}

.loyalty-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--primary-color),
    transparent
  );
  opacity: 0.5;
}

/* ===========================================
   ЗАГОЛОВОК СЕКЦИИ ЛОЯЛЬНОСТИ
   =========================================== */

.loyalty-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

.loyalty-icon {
  font-size: 18px;
  color: #f59e0b;
  filter: drop-shadow(0 0 4px rgba(245, 158, 11, 0.3));
}

.loyalty-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--primary-color);
  letter-spacing: 1px;
}

/* ===========================================
   КОНТЕНТ ЛОЯЛЬНОСТИ
   =========================================== */

.loyalty-content {
  display: flex;
  gap: 32px;
  align-items: flex-start;
}

.loyalty-level {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  flex: 1;
}

.level-badge-wrapper {
  position: relative;
  flex-shrink: 0;
}

.level-badge {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: 700;
  color: white;
  border: 3px solid rgba(255, 107, 53, 0.3);
  box-shadow: 0 8px 24px rgba(255, 107, 53, 0.2);
  position: relative;
  z-index: 1;
}

.level-badge::before {
  content: '';
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  background: linear-gradient(135deg, #ff6b35, #f7931e);
  border-radius: 50%;
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.level-badge:hover::before {
  opacity: 0.3;
  animation: pulse 2s infinite;
}

.level-info {
  flex: 1;
  min-width: 0;
}

.level-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 12px;
}

.level-details {
  margin-bottom: 16px;
}

.level-deposit,
.level-next {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 8px;
  line-height: 1.4;
}

.amount {
  color: #f59e0b;
  font-weight: 600;
}

.remaining {
  color: #22c55e;
  font-weight: 600;
}

.level-link {
  font-size: 14px;
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
  padding: 2px 0;
  border-bottom: 1px solid transparent;
  transition: all 0.3s ease;
}

.level-link:hover {
  border-bottom-color: var(--primary-color);
  color: var(--primary-light);
}

/* ===========================================
   БЛОК БОНУСОВ
   =========================================== */

.loyalty-rewards {
  display: flex;
  gap: 24px;
  flex: 1;
  min-width: 0;
}

.reward-column {
  flex: 1;
  min-width: 0;
}

.reward-header {
  margin-bottom: 16px;
}

.reward-title {
  font-size: 12px;
  font-weight: 600;
  color: #f59e0b;
  text-align: left;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.reward-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.reward-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  transition: all 0.3s ease;
  position: relative;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.reward-item:last-child {
  border-bottom: none;
}

.reward-item:hover {
  background: rgba(255, 255, 255, 0.02);
  transform: translateX(2px);
}

.reward-name {
  font-size: 13px;
  color: var(--text-primary);
  font-weight: 500;
}

.reward-value {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-secondary);
  min-width: 40px;
  text-align: right;
}

.reward-value.green {
  color: #22c55e;
}

/* ===========================================
   INVESTMENT BANNER SECTION
   =========================================== */

.investment-banner-section {
  width: 100%;
  min-width: 300px;
}

.investment-banner {
  background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #2563eb 100%);
  border-radius: 20px;
  padding: 24px 20px;
  position: relative;
  overflow: hidden;
  min-height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Декоративный фон с сеткой */
.banner-decoration {
  position: absolute;
  inset: 0;
  opacity: 0.3;
  pointer-events: none;
}

.tech-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(74, 222, 128, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(74, 222, 128, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
  animation: techGridMove 20s linear infinite;
}

.circuit-pattern {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 80px;
  height: 80px;
  background: radial-gradient(
    circle,
    rgba(74, 222, 128, 0.1) 2px,
    transparent 2px
  );
  background-size: 15px 15px;
  border-radius: 50%;
  animation: circuitPulse 3s ease-in-out infinite;
}

@keyframes techGridMove {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(20px, 20px);
  }
}

@keyframes circuitPulse {
  0%,
  100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.1);
  }
}

/* ===========================================
   КОНТЕНТ БАННЕРА
   =========================================== */

.banner-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  z-index: 1;
  position: relative;
}

.banner-header {
  text-align: center;
}

.banner-title {
  font-size: 16px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 6px 0;
  letter-spacing: 0.5px;
}

.banner-main-title {
  font-size: 28px;
  font-weight: 900;
  color: #4ade80;
  margin: 0;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  text-shadow: 0 0 20px rgba(74, 222, 128, 0.5);
  animation: titleGlow 2s ease-in-out infinite alternate;
}

@keyframes titleGlow {
  0% {
    text-shadow: 0 0 20px rgba(74, 222, 128, 0.5);
    transform: scale(1);
  }
  100% {
    text-shadow: 0 0 30px rgba(74, 222, 128, 0.8);
    transform: scale(1.02);
  }
}

/* ===========================================
   ИНВЕСТИЦИОННЫЕ ПОРТФЕЛИ
   =========================================== */

.investment-cases {
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;
}

.investment-case {
  position: relative;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(74, 222, 128, 0.3);
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  cursor: pointer;
}

.investment-case:hover {
  transform: translateY(-4px);
  border-color: rgba(74, 222, 128, 0.6);
  box-shadow: 0 8px 32px rgba(74, 222, 128, 0.3);
}

.case-icon {
  font-size: 24px;
  filter: hue-rotate(120deg) saturate(1.5);
}

/* Особый стиль для центрального портфеля */
.investment-case.featured {
  width: 80px;
  height: 80px;
  border-color: rgba(74, 222, 128, 0.8);
  background: rgba(74, 222, 128, 0.1);
}

.investment-case.featured .case-icon {
  font-size: 32px;
}

@keyframes glowRotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes highlight {
  0%,
  100% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
}

/* ===========================================
   КНОПКА ПОКУПКИ
   =========================================== */

.investment-buy-btn {
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  border: none;
  border-radius: 50px;
  padding: 12px 36px;
  font-size: 14px;
  font-weight: 700;
  color: white;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(249, 115, 22, 0.4);
  position: relative;
  overflow: hidden;
}

.investment-buy-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  transition: left 0.6s ease;
}

.investment-buy-btn:hover {
  background: linear-gradient(135deg, #fb923c 0%, #f97316 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(249, 115, 22, 0.6);
}

.investment-buy-btn:hover::before {
  left: 100%;
}

/* ===========================================
   АДАПТИВНОСТЬ
   =========================================== */

@media (max-width: 1200px) {
  .loyalty-investment-wrapper {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .loyalty-section {
    max-width: 800px;
    margin: 0 auto;
  }
}

@media (max-width: 768px) {
  .loyalty-card {
    padding: 20px;
  }

  .loyalty-content {
    flex-direction: column;
    gap: 20px;
  }

  .loyalty-level {
    flex-direction: column;
    text-align: center;
    gap: 16px;
  }

  .loyalty-rewards {
    flex-direction: column;
    gap: 16px;
  }

  .investment-banner {
    padding: 20px 16px;
    min-height: 240px;
  }

  .banner-content {
    gap: 20px;
  }

  .banner-main-title {
    font-size: 24px;
  }

  .investment-cases {
    gap: 12px;
  }

  .investment-case {
    width: 50px;
    height: 50px;
  }

  .investment-case .case-icon {
    font-size: 20px;
  }

  .investment-case.featured {
    width: 65px;
    height: 65px;
  }

  .investment-case.featured .case-icon {
    font-size: 26px;
  }
}

/* ===========================================
   АНИМАЦИИ И ДОСТУПНОСТЬ
   =========================================== */

@keyframes levelPulse {
  0%,
  100% {
    box-shadow: 0 8px 24px rgba(255, 107, 53, 0.2);
  }
  50% {
    box-shadow: 0 8px 32px rgba(255, 107, 53, 0.4);
  }
}

.level-badge {
  animation: levelPulse 3s infinite;
}

@media (prefers-reduced-motion: reduce) {
  .loyalty-card,
  .level-badge,
  .reward-item,
  .banner-main-title,
  .investment-case.featured,
  .tech-grid,
  .circuit-pattern {
    animation: none;
  }

  .investment-case:hover,
  .investment-buy-btn:hover,
  .reward-item:hover {
    transform: none;
  }
}

/* Фокус для клавиатурной навигации */
.level-link:focus-visible,
.investment-buy-btn:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
  border-radius: 4px;
}
</style>
