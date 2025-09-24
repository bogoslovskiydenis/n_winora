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
              <div class="bonus-toggle-txt">БОНУСЫ</div>
              <svg
                class="bonus-toggle-icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M6 9L12 15L18 9"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
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
/* ===========================================
   ОСНОВНОЙ КОНТЕЙНЕР
   =========================================== */

.loyalty-investment-wrapper {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 16px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

/* ===========================================
   СЕКЦИЯ ЛОЯЛЬНОСТИ
   =========================================== */

.loyalty-section {
  display: flex;
  flex: 1;
  min-width: 644px;
  max-width: 644px;
  height: 160px;
}

.loyalty-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.loyalty-header {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 10px;
  flex-shrink: 0;
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

.loyalty-content {
  display: flex;
  flex: 1;
  padding: 8px;
  gap: 8px;
  align-items: stretch;
}

/* ===========================================
   ЛЕВАЯ ЧАСТЬ - ИНФОРМАЦИЯ ОБ УРОВНЕ
   =========================================== */

.loyalty-level {
  background-color: #00000042;
  display: flex;
  align-items: flex-start;
  flex: 1;
  padding: 16px;
  gap: 16px;
  border-radius: 8px 8px 8px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.level-title {
  font-family: Roboto, sans-serif;
  font-weight: 700;
  font-size: 14px;
  line-height: 100%;
  color: #f97c39;
  margin-bottom: 4px;
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
  color: #f97c39;
}

.remaining {
  font-family: Roboto, sans-serif;
  font-weight: 700;
  font-size: 12px;
  line-height: 100%;
  color: #07cb38;
  white-space: nowrap;
  flex-shrink: 0;
}

.level-link {
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 100%;
  text-decoration: underline;
  color: #07cb38;
}

.level-link:hover {
  color: #22c55e;
}

/* ===========================================
   ПРАВАЯ ЧАСТЬ - БОНУСЫ
   =========================================== */

.loyalty-rewards {
  background-color: #ffffff1a;
  display: flex;
  flex-direction: column;
  flex: 1;
  border-radius: 8px 8px 16px 8px;
  padding: 8px 16px;
}

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
  padding: 2px 0;
  transition: all 0.2s ease;
}

.reward-item:hover {
  background: rgba(255, 255, 255, 0.02);
  border-radius: 4px;
  padding: 2px 4px;
}

.reward-name {
  color: #ffffff;
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 100%;
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
   СЕКЦИЯ ИНВЕСТИЦИЙ
   =========================================== */

.investment-banner-section {
  border-radius: 16px;
  width: 329px;
  height: 160px;
  background-image: url('./../../assets/images/cadrs_investitions_bg.png');
  background-size: cover;
  background-position: center;
  flex-shrink: 0;
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
  color: #ffffff;
  margin-bottom: 4px;
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

.investment-cases {
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 0 auto;
  z-index: 2;
}

.investment-cases img {
  height: 93px;
}

.investment-buy-btn {
  background: #f97c39;
  border: none;
  font-family: Roboto, sans-serif;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #070202;
  cursor: pointer;
  transition: all 0.3s ease;
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  width: 108px;
  height: 42px;
  border-radius: 32px;
  padding: 12px 16px;
}

.investment-buy-btn:hover {
  background: linear-gradient(135deg, #fb923c 0%, #f97316 100%);
  transform: translateX(-50%) translateY(-2px);
  box-shadow: 0 8px 32px rgba(249, 115, 22, 0.6);
}

/* ===========================================
   АДАПТИВНЫЕ СТИЛИ
   =========================================== */

@media (max-width: 768px) {
  .loyalty-investment-wrapper {
    width: 310px;
    gap: 12px;
    flex-direction: column;
    align-items: center;
  }

  .loyalty-section {
    width: 100%;
    max-width: 100%;
    min-width: 0;
    height: auto;
  }

  .loyalty-card {
    width: 100%;
  }

  .loyalty-content {
    flex-direction: column;
    gap: 0;
    height: auto;
    padding: 0;
  }

  .loyalty-level {
    gap: 12px;
    border-radius: 8px;
    border-bottom: 1px solid #ffffff0d;
  }

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
    width: calc(100% - 32px);
    box-shadow: 0px 0px 20px 0px #07cb38bf inset;
    border-radius: 32px;
    padding: 16px 24px;
    background: #00000033;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin: 16px;
    transition: all 0.3s ease;
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
    user-select: none;
    border: 1px solid #07cb38;
  }

  .bonus-toggle-txt {
    font-family: Roboto, sans-serif;
    font-weight: 500;
    font-size: 16px;
    text-align: center;
    vertical-align: middle;
    text-transform: uppercase;
    color: #ffffff;
  }

  .bonus-toggle:hover,
  .bonus-toggle:active,
  .bonus-toggle:focus {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(34, 197, 94, 0.4);
    outline: none;
  }

  .bonus-toggle-icon {
    color: #ffffff;
    position: absolute;
    right: 25px;
    font-size: 14px;
    transition: transform 0.3s ease;
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

  .investment-banner-section {
    width: 100%;
    max-width: 100%;
    height: 160px;
  }

  .banner-main-title {
    font-size: 22px;
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
    gap: 12px;
  }

  .loyalty-header {
    padding: 12px 16px;
  }

  .loyalty-title {
    font-size: 14px;
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
    width: calc(100% - 24px);
  }

  .bonus-content {
    margin: 0 12px 12px 12px;
    padding: 0;
    flex-direction: row;
    gap: 16px;
  }

  .bonus-content.expanded {
    padding: 12px;
    max-height: 300px;
  }

  .reward-title {
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
   ФОКУС ДЛЯ ДОСТУПНОСТИ
   =========================================== */

.level-link:focus-visible,
.investment-buy-btn:focus-visible,
.bonus-toggle:focus-visible {
  outline: 2px solid #4ade80;
  outline-offset: 2px;
  border-radius: 4px;
}

/* ===========================================
   АНИМАЦИИ
   =========================================== */

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.loyalty-card {
  animation: fadeInUp 0.6s ease-out;
}

.investment-banner-section {
  animation: fadeInUp 0.6s ease-out 0.2s;
  animation-fill-mode: both;
}
</style>
