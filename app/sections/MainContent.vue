<template>
  <main class="main-content">
    <div class="content-wrapper">
      <!-- Главная страница -->
      <div class="main-section" v-if="currentSection === 'main'">
        <div class="main-title">
          <h1>Главная</h1>
        </div>

        <div class="level-info-card">
          <div class="level-badge-large">
            <span class="level-number-large">2</span>
          </div>
          <div class="level-text">
            <h2>У вас 2 уровень лояльности</h2>
            <router-link to="/profile" class="level-link">Узнать больше</router-link>
          </div>
        </div>

        <GameCards />
        <LoyaltySection />
        <ChestPromo />
      </div>

      <!-- Страница инвестиций -->
      <div class="investments-section" v-else-if="currentSection === 'investments'">
        <InvestmentSection />
      </div>

      <!-- Другие страницы -->
      <div v-else class="section-placeholder">
        <h1>{{ getSectionTitle() }}</h1>
        <p>Содержимое раздела "{{ getSectionTitle() }}" будет здесь</p>
      </div>
    </div>
  </main>
</template>

<script setup>
import GameCards from './GameCards.vue'
import LoyaltySection from './LoyaltySection.vue'
import InvestmentSection from './InvestmentsSection.vue'
import ChestPromo from './ChestPromo.vue'

const props = defineProps({
  currentSection: {
    type: String,
    required: true
  }
})

const getSectionTitle = () => {
  const titles = {
    main: 'Главная',
    investments: 'Инвестиции',
    chests: 'Сундуки',
    roulette: 'Рулетка',
    shop: 'Магазин',
    rating: 'Рейтинг пользователей',
    profile: 'Профиль пользователя',
    support: 'Служба поддержки'
  }
  return titles[props.currentSection] || 'Главная'
}
</script>

<style scoped>
/* Main Content */
.main-content {
  padding: 32px 24px 0;
  width: 100%;
}

.content-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Main Section */
.main-section {
  width: 100%;
}

.main-title h1 {
  font-size: 48px;
  font-weight: 700;
  color: white;
  margin-bottom: 32px;
  text-align: center;
}

/* Level Info Card */
.level-info-card {
  display: flex;
  align-items: center;
  gap: 24px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 24px;
  margin-bottom: 32px;
}

.level-badge-large {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #ff6b35, #f7931e);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.level-number-large {
  font-size: 32px;
  font-weight: 700;
  color: white;
}

.level-text h2 {
  font-size: 24px;
  font-weight: 600;
  color: white;
  margin-bottom: 8px;
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

/* Investments Section */
.investments-section {
  width: 100%;
}

/* Section Placeholder */
.section-placeholder {
  text-align: center;
  padding: 60px 20px;
}

.section-placeholder h1 {
  font-size: 36px;
  font-weight: 700;
  color: white;
  margin-bottom: 16px;
}

.section-placeholder p {
  font-size: 18px;
  color: var(--text-secondary);
}

/* Mobile Responsive */
@media (max-width: 1023px) {
  .main-content {
    padding: 24px 16px;
  }

  .main-title h1 {
    font-size: 32px;
  }

  .level-info-card {
    flex-direction: column;
    text-align: center;
    gap: 16px;
  }
}

@media (max-width: 480px) {
  .main-content {
    padding: 20px 12px;
  }

  .main-title h1 {
    font-size: 24px;
  }
}
</style>