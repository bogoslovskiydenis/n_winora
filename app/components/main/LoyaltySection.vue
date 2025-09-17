<template>
  <section class="loyalty-investment-wrapper">
    <!-- Секция лояльности (ограничена 800px) -->
    <div class="loyalty-section">
      <div class="loyalty-card">
        <div class="loyalty-header">
          <img src="./../../assets/images/info.svg" class="loyalty-icon" />
          <div class="loyalty-title">ЛОЯЛЬНОСТЬ</div>
        </div>

        <div class="loyalty-content">
          <!-- Левая часть - информация об уровне -->
          <div class="loyalty-level">
            <div class="level-badge-wrapper">
              <img src="../../assets/images/navbar/lvl_nav.svg" alt="" />
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
              <NuxtLink to="/profile" class="level-link">
                Узнать больше
              </NuxtLink>
            </div>
          </div>

          <!-- Правая часть - бонусы -->
          <div class="loyalty-rewards">
            <!-- Кнопка-аккордеон для мобильной версии -->
            <button
              class="bonus-toggle"
              :class="{ expanded: isBonusExpanded }"
              @click="toggleBonus"
              type="button"
            >
              БОНУСЫ
              <span class="bonus-toggle-icon">▼</span>
            </button>

            <!-- Контент бонусов -->
            <div class="bonus-content" :class="{ expanded: isBonusExpanded }">
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
    </div>

    <!-- Баннер инвестиций -->
    <div class="investment-banner-section">
      <div class="investment-banner">
        <!-- Заголовок -->
        <div class="banner-header">
          <h2 class="banner-title">Время выбрать</h2>
          <h1 class="banner-main-title">ИНВЕСТИЦИИ</h1>
        </div>

        <!-- Иконки портфелей/сундуков -->
        <div class="investment-cases">
          <img src="./../../assets/images/cheast_1.png" />
        </div>

        <!-- Кнопка действия -->
        <button class="investment-buy-btn" @click="handleInvestmentClick">
          КУПИТЬ
        </button>
      </div>
    </div>

    <div class="investment-banner-section">
      <div class="investment-banner">
        <!-- Заголовок -->
        <div class="banner-header">
          <h2 class="banner-title">Время выбрать</h2>
          <h1 class="banner-main-title">ИНВЕСТИЦИИ</h1>
        </div>

        <!-- Иконки портфелей/сундуков -->
        <div class="investment-cases">
          <img src="./../../assets/images/cheast_1.png" />
        </div>

        <!-- Кнопка действия -->
        <button class="investment-buy-btn" @click="handleInvestmentClick">
          КУПИТЬ
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
// Реактивные данные для уровня пользователя
const depositAmount = ref(1370);
const nextLevelRemaining = ref(130);

// Состояние аккордеона для мобильной версии
const isBonusExpanded = ref(false);

// Бонусы для текущего уровня (согласно дизайну)
const currentBonuses = ref([
  { name: 'Кешбек', value: '5%' },
  { name: 'Спины', value: '-' },
  { name: 'Сундуки', value: '-' },
]);

// Бонусы для следующего уровня (согласно дизайну)
const nextBonuses = ref([
  { name: 'Кешбек', value: '7%' },
  { name: 'Спины', value: '2' },
  { name: 'Сундуки', value: '3' },
]);

// Функция переключения аккордеона бонусов
const toggleBonus = () => {
  isBonusExpanded.value = !isBonusExpanded.value;
};

// Обработчик клика на кнопку инвестиций
const handleInvestmentClick = () => {
  navigateTo('/investments');
};

// Функция для обновления данных (для будущей интеграции с API)
const updateLoyaltyData = (userData) => {
  depositAmount.value = userData.totalDeposits || 1370;
  nextLevelRemaining.value = userData.nextLevelRemaining || 130;
  updateBonuses(userData.level || 2);
};

// Функция для обновления бонусов в зависимости от уровня
const updateBonuses = (level) => {
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
    default:
      break;
  }
};
</script>

<style scoped>
.loyalty-investment-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.loyalty-section {
  width: 644px;
  height: 160px;
  max-width: 644px;
  gap: 16px;
  border-top-width: 1px;
  border-radius: 16px 16px 24px 24px;
  display: flex;
}

.loyalty-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  position: relative;
  width: 100%;
}

.loyalty-header {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 10px;
}

.loyalty-icon {
  position: absolute;
  left: 24px;
  font-size: 18px;
  color: #f59e0b;
  filter: drop-shadow(0 0 4px rgba(245, 158, 11, 0.3));
}

.loyalty-title {
  font-family: Tomorrow, serif;
  font-weight: 700;
  font-size: 15px;
  line-height: 100%;
  text-align: center;
  text-transform: uppercase;
  color: #07cb38;
}

/* ===========================================
   КОНТЕНТ ЛОЯЛЬНОСТИ
   =========================================== */

.loyalty-content {
  display: flex;
  height: 109px;
  padding: 8px;
  gap: 8px;
  align-items: flex-start;
}

.loyalty-level {
  background-color: #00000042;
  display: flex;
  align-items: flex-start;
  flex: 1;

  padding: 8px 16px;
  gap: 16px;
  border-radius: 8px 8px 8px 16px;
  border-bottom-width: 1px;
}

.level-badge-wrapper {
  position: relative;
  flex-shrink: 0;
}

.level-badge-wrapper img {
  width: 44px;
  height: 44px;
}

.level-info {
  flex: 1;
  min-width: 0;
}

.level-title {
  font-family: Roboto, sans-serif;
  font-weight: 700;
  font-size: 14px;
  line-height: 100%;
  vertical-align: middle;
  color: #f97c39;
}

.level-details {
  margin-bottom: 8px;
}

.level-deposit,
.level-next {
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 100%;
  vertical-align: middle;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
}

.amount {
  font-family: Roboto, sans-serif;
  font-weight: 700;
  font-size: 12px;
  line-height: 100%;
  text-align: right;
  color: #f97c39;
}

.remaining {
  font-family: Roboto, sans-serif;
  font-weight: 700;
  font-size: 12px;
  line-height: 100%;
  text-align: right;
  color: #07cb38;
  white-space: nowrap;
  flex-shrink: 0;
}

.level-link {
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 100%;
  vertical-align: middle;
  text-decoration: underline;
  text-decoration-style: solid;
  text-decoration-skip-ink: auto;
  color: #07cb38;
}

.level-link:hover {
  border-bottom-color: #4ade80;
  color: #22c55e;
}

/* ===========================================
   БЛОК БОНУСОВ
   =========================================== */

.loyalty-rewards {
  background-color: #ffffff1a;
  display: flex;
  gap: 16px;
  flex: 1;
  border-radius: 8px 8px 16px 8px;
  padding: 8px 16px;
}

/* Скрываем аккордеон на десктопе */
.bonus-toggle {
  display: none;
}

.bonus-content {
  display: flex;
  gap: 16px;
  flex: 1;
  width: 100%;
}

.reward-column {
  flex: 1;
  min-width: 0;
}

.reward-header {
  margin-bottom: 8px;
}

.reward-title {
  font-family: Roboto, sans-serif;
  font-weight: 700;
  font-size: 12px;
  line-height: 100%;
  vertical-align: middle;
  color: #f97c39;
}

.reward-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.reward-item {
  display: flex;
  justify-content: space-between;
}

.reward-item:last-child {
  border-bottom: none;
}

.reward-item:hover {
  background: rgba(255, 255, 255, 0.02);
  transform: translateX(2px);
}

.reward-name {
  color: #ffffff;
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 100%;
  vertical-align: middle;
}

.reward-value {
  font-family: Roboto, sans-serif;
  font-weight: 700;
  font-size: 12px;
  line-height: 118%;
  color: #07cb38;
}

.reward-value.green {
  color: #22c55e;
}

/* ===========================================
   INVESTMENT BANNER SECTION
   =========================================== */

.investment-banner-section {
  border-radius: 16px;
  width: 329px;
  height: 160px;
  background-image: url('./../../assets/images/cadrs_investitions_bg.png');
  background-size: cover;
  background-position: center;
}

.investment-banner {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 16px;
}

/* ===========================================
   КОНТЕНТ БАННЕРА
   =========================================== */

.banner-header {
  text-align: center;
  z-index: 2;
}

.banner-title {
  font-family: Roboto, sans-serif;
  font-weight: 900;
  font-size: 16px;
  line-height: 12px;
  text-align: center;
  vertical-align: middle;
  color: #ffffff;
}

.banner-main-title {
  font-family: Tomorrow, sans-serif;
  font-weight: 900;
  font-size: 32px;
  line-height: 100%;
  text-align: center;
  text-transform: uppercase;
  color: #07cb38;
}

/* ===========================================
   ИНВЕСТИЦИОННЫЕ ПОРТФЕЛИ
   =========================================== */

.investment-cases {
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 0 auto;
  z-index: 2;
}

.investment-cases img {
  width: 284px;
  height: 93px;
}

/* ===========================================
   КНОПКА ПОКУПКИ
   =========================================== */

.investment-buy-btn {
  background: #f97c39;
  border: none;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  overflow: hidden;
  z-index: 2;
  width: 108px;
  height: 42px;
  min-height: 42px;
  opacity: 1;
  gap: 10px;
  border-radius: 32px;
  padding: 12px 16px;
}

.investment-buy-btn span {
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 100%;
  text-align: center;
  vertical-align: middle;
  text-transform: uppercase;
  color: #070202;
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
  .loyalty-section {
    width: 100%;
    max-width: 644px;
  }

  .investment-banner-section {
    max-width: 644px;
  }
}

@media (max-width: 768px) {
  .loyalty-investment-wrapper {
    gap: 12px;
    padding: 0 16px;
  }

  .loyalty-section {
    width: 100%;
    height: auto;
    max-width: none;
  }

  .loyalty-card {
    padding: 0;
  }

  .loyalty-header {
    padding: 16px;
  }

  .loyalty-content {
    flex-direction: column;
    gap: 0;
    height: auto;
    padding: 0;
  }

  .loyalty-level {
    padding: 16px;
    width: 100%;
    gap: 12px;
  }

  .level-badge-wrapper img {
    width: 44px;
    height: 44px;
  }

  .level-info {
    flex: 1;
  }

  .level-title {
    font-size: 16px;
    margin-bottom: 8px;
  }

  .level-deposit,
  .level-next {
    font-size: 13px;
    margin-bottom: 4px;
  }

  .level-link {
    margin-top: 8px;
    display: inline-block;
  }

  /* Секция БОНУСЫ - кнопка-аккордеон */
  .loyalty-rewards {
    display: flex;
    align-items: center;
    padding: 0;
    gap: 0;
    width: 100%;
    background: transparent;
    border-radius: 0;
    flex-direction: column;
  }

  .bonus-toggle {
    display: flex;
    width: 100%;
    background: linear-gradient(90deg, #22c55e 0%, #16a34a 100%);
    border: none;
    border-radius: 32px;
    padding: 16px 24px;
    color: white;
    font-size: 16px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin: 16px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 20px rgba(34, 197, 94, 0.3);
    /* Добавляем стили для iOS */
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
    user-select: none;
  }

  .bonus-toggle:hover,
  .bonus-toggle:active,
  .bonus-toggle:focus {
    background: linear-gradient(90deg, #16a34a 0%, #15803d 100%);
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(34, 197, 94, 0.4);
    outline: none;
  }

  .bonus-toggle-icon {
    font-size: 14px;
    transition: transform 0.3s ease;
    will-change: transform;
  }

  .bonus-toggle.expanded .bonus-toggle-icon {
    transform: rotate(180deg);
  }

  .bonus-content {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 16px;
    margin: 0 16px 16px 16px;
    padding: 0;
    display: flex;
    gap: 20px;
    overflow: hidden;
    max-height: 0;
    transition:
      max-height 0.4s ease,
      padding 0.4s ease;
    will-change: max-height;
  }

  .bonus-content.expanded {
    max-height: 400px;
    padding: 16px;
  }

  .reward-column {
    flex: 1;
    min-width: 120px;
  }

  .reward-title {
    font-size: 11px;
    text-align: center;
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(249, 158, 11, 0.2);
  }

  .reward-list {
    gap: 8px;
  }

  .reward-item {
    display: flex;
    justify-content: space-between;
  }

  .reward-item:last-child {
    border-bottom: none;
  }

  .reward-name {
    font-size: 12px;
  }

  .reward-value {
    font-size: 13px;
    min-width: auto;
  }

  .investment-banner-section {
    width: 100%;
    max-width: none;
    height: 160px;
  }

  .investment-banner {
    padding: 16px;
    height: 100%;
  }

  .banner-main-title {
    font-size: 22px;
  }

  .investment-cases {
    gap: 12px;
  }

  .investment-buy-btn {
    padding: 10px 24px;
    font-size: 12px;
    width: auto;
    min-width: 100px;
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }
}

@media (max-width: 480px) {
  .loyalty-investment-wrapper {
    padding: 0 12px;
    gap: 12px;
  }

  .loyalty-header {
    padding: 12px 16px;
  }

  .loyalty-title {
    font-size: 14px;
  }

  .loyalty-level {
    padding: 12px 16px;
    align-items: center;
  }

  .level-badge-wrapper {
    margin-bottom: 12px;
  }

  .level-badge-wrapper img {
    width: 45px;
    height: 45px;
  }

  .level-title {
    font-size: 14px;
    margin-bottom: 8px;
  }

  .level-deposit,
  .level-next {
    font-size: 12px;
  }

  .bonus-toggle {
    margin: 12px;
    padding: 14px 20px;
    font-size: 14px;
  }

  .bonus-content {
    margin: 0 12px 12px 12px;
    padding: 0;
    flex-direction: column;
    gap: 16px;
  }

  .bonus-content.expanded {
    padding: 12px;
    display: flex;
    flex-direction: row;
    max-height: 300px;
  }

  .reward-column {
    min-width: auto;
  }

  .reward-title {
    font-size: 10px;
    margin-bottom: 8px;
  }

  .reward-item {
    padding: 6px 0;
  }

  .reward-name {
    font-size: 11px;
  }

  .reward-value {
    font-size: 12px;
  }

  .investment-banner-section {
    height: 140px;
  }

  .investment-banner {
    padding: 12px;
  }

  .banner-main-title {
    font-size: 18px;
  }

  .investment-buy-btn {
    padding: 8px 20px;
    font-size: 11px;
    min-width: 90px;
    height: 36px;
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

@media (prefers-reduced-motion: reduce) {
  .loyalty-card,
  .reward-item,
  .banner-main-title {
    animation: none;
  }

  .investment-buy-btn:hover,
  .reward-item:hover {
    transform: none;
  }
}

/* Фокус для клавиатурной навигации */
.level-link:focus-visible,
.investment-buy-btn:focus-visible,
.bonus-toggle:focus-visible {
  outline: 2px solid #4ade80;
  outline-offset: 2px;
  border-radius: 4px;
}

/* Дополнительные стили для iOS Safari */
@supports (-webkit-overflow-scrolling: touch) {
  .bonus-toggle {
    -webkit-user-select: none;
    -webkit-touch-callout: none;
  }

  .bonus-content {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
  }
}
</style>
