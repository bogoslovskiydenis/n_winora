<template>
  <div class="rating-container">
    <!-- Заголовок секции -->
    <div class="rating-header">
      <span>РЕЙТИНГ</span>
    </div>

    <!-- Иконки фильтров -->
    <div class="filter-section">
      <div class="filter-icons">
        <div class="filter-icon">
          <img src="~/assets/images/search.svg" alt="Search" />
        </div>
        <div class="filter-icon">
          <img src="~/assets/images/arrow_down.svg" alt="Sort" />
        </div>
        <div class="filter-icon">
          <img src="~/assets/images/menu.svg" alt="Menu" />
        </div>
        <div class="filter-icon active">
          <img src="~/assets/images/gps_fixed.svg" alt="Diamond" />
        </div>
      </div>
    </div>

    <!-- Навигационные вкладки -->
    <div class="nav-tabs">
      <div
        class="tab"
        :class="{ active: activeTab === 'position' }"
        @click="setActiveTab('position')"
      >
        <span>ПОЗИЦИЯ</span>
      </div>
      <div
        class="tab"
        :class="{ active: activeTab === 'rating' }"
        @click="setActiveTab('rating')"
      >
        РЕЙТИНГ
      </div>
      <div
        class="tab"
        :class="{ active: activeTab === 'nickname' }"
        @click="setActiveTab('nickname')"
      >
        Никнейм
      </div>
      <div
        class="tab"
        :class="{ active: activeTab === 'income' }"
        @click="setActiveTab('income')"
      >
        ДОХОДНОСТЬ
      </div>
    </div>

    <!-- Список рейтинга -->
    <div class="rating-grid">
      <div
        v-for="user in sortedUsers"
        :key="user.id"
        class="user-card"
        :class="{ highlighted: user.isCurrentUser }"
      >
        <!-- Фоновое изображение карточки -->
        <div class="card-background">
          <img :src="user.backgroundImage" :alt="user.name" />
        </div>

        <!-- Контент карточки -->
        <div class="card-content">
          <!-- Позиция в рейтинге -->
          <div class="user-rank">{{ user.rank }}</div>

          <!-- Изменение позиции -->
          <div class="user-change" :class="user.changeClass">
            {{ user.change }}
          </div>

          <!-- Имя пользователя -->
          <div class="user-name">{{ user.name }}</div>

          <!-- Процент доходности -->
          <div class="user-percentage">{{ user.percentage }}%</div>

          <!-- Индикатор текущего пользователя -->
          <div v-if="user.isCurrentUser" class="current-user-badge">Вы</div>
        </div>
      </div>
    </div>

    <!-- Пагинация -->
    <div class="pagination">
      <button
        class="page-btn"
        :class="{ active: currentPage === 1 }"
        @click="changePage(1)"
        :disabled="isLoading"
      >
        ТОП 100
      </button>
      <button
        class="page-btn"
        :class="{ active: currentPage === 2 }"
        @click="changePage(2)"
        :disabled="isLoading"
      >
        101-199
      </button>
      <button
        class="page-btn"
        :class="{ active: currentPage === 3 }"
        @click="changePage(3)"
        :disabled="isLoading"
      >
        201-299
      </button>
      <button
        class="page-btn"
        :class="{ active: currentPage === 4 }"
        @click="changePage(4)"
        :disabled="isLoading"
      >
        301-399
      </button>
      <button
        class="page-btn"
        :class="{ active: currentPage === 5 }"
        @click="changePage(5)"
        :disabled="isLoading"
      >
        401-499
      </button>
    </div>

    <!-- Индикатор загрузки -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-spinner"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RatingPage',
  data() {
    return {
      currentPage: 1,
      isLoading: false,
      activeTab: 'rating',
    };
  },
  computed: {
    currentPageUsers() {
      const usersPerPage = 8;
      const startIndex = (this.currentPage - 1) * usersPerPage;
      const endIndex = startIndex + usersPerPage;

      // Генерируем пользователей для каждой страницы
      return this.generateUsersForPage(this.currentPage, usersPerPage);
    },

    sortedUsers() {
      let users = [...this.currentPageUsers];

      switch (this.activeTab) {
        case 'position':
          return users.sort((a, b) => a.rank - b.rank);
        case 'rating':
          return users.sort((a, b) => {
            // Сортировка по изменению рейтинга (положительные изменения выше)
            const changeA = parseInt(a.change.replace('+', ''));
            const changeB = parseInt(b.change.replace('+', ''));
            return changeB - changeA;
          });
        case 'nickname':
          return users.sort((a, b) => a.name.localeCompare(b.name, 'ru'));
        case 'income':
          return users.sort((a, b) => b.percentage - a.percentage);
        default:
          return users;
      }
    },
  },
  methods: {
    setActiveTab(tab) {
      if (this.isLoading) return;
      this.activeTab = tab;
    },

    changePage(page) {
      if (this.isLoading) return;

      this.isLoading = true;
      this.currentPage = page;

      // Имитация загрузки данных
      setTimeout(() => {
        this.isLoading = false;
      }, 300);
    },

    generateUsersForPage(page, usersPerPage) {
      const baseRank = (page - 1) * 100 + 1;
      const userNames = [
        'ArcticPulse',
        'QuantumBurn',
        'NeonStorm',
        'CyberWave',
        'DigitalFox',
        'TechnoRider',
        'VortexMaster',
        'SilverBolt',
        'ElectraGlow',
        'FlashBurn',
        'NightHawk',
        'StarStrike',
        'ThunderBeast',
        'CosmicRage',
        'PlasmaFury',
        'ShadowBlade',
        'IronPhoenix',
        'VoidWalker',
        'CrimsonStorm',
        'GalacticHero',
      ];

      const users = [];

      for (let i = 0; i < usersPerPage; i++) {
        const rank = baseRank + i;
        const randomChange = Math.floor(Math.random() * 200) - 50;
        const changeClass = randomChange >= 0 ? 'positive' : 'negative';
        const changeText =
          randomChange >= 0 ? `+${randomChange}` : `${randomChange}`;
        const percentage = (7.5 + Math.random() * 1.5).toFixed(2);

        users.push({
          id: rank,
          rank: rank,
          change: changeText,
          changeClass: changeClass,
          name: userNames[Math.floor(Math.random() * userNames.length)],
          percentage: parseFloat(percentage),
          backgroundImage: `/images/rating_bg_${(i % 8) + 1}.png`, ///card_bg.png
          isCurrentUser: page === 1 && i === 1, // Текущий пользователь только на первой странице
        });
      }

      return users;
    },
  },
};
</script>

<style scoped>
.rating-container {
  background: linear-gradient(0deg, #002920 0%, #00382b 100%);
  min-height: 100vh;
  padding-bottom: 120px; /* Добавляем отступ снизу для пагинации */
}

.rating-header {
  height: 66px;
  padding-top: 24px;
  padding-bottom: 16px;
  gap: 16px;
  text-align: center;
  background: linear-gradient(0deg, #002920 0%, #00382b 100%);
}

/* Заголовок */
.rating-header span {
  font-family: Tomorrow, sans-serif;
  font-weight: 700;
  font-size: 20px;
  line-height: 100%;
  text-align: center;
  text-transform: uppercase;
  color: #07cb38;
}

/* Навигационные вкладки */
.nav-tabs {
  margin: 0 auto;
  align-items: center;
  max-width: 462px;
  height: 25px;
  display: flex;
  justify-content: center;
  padding: 8px 16px 16px;
  gap: 16px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background: #ffffff1a;
  margin-bottom: 10px;
}

.tab {
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 100%;
  text-align: center;
  color: #f97c39;
}

.tab span {
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 100%;
  text-transform: uppercase;
  color: #f97c39;
}

.tab.active {
  color: #07cb38;
}

.tab.active span {
  color: #07cb38;
}

/* Специальные цвета для разных вкладок */
.tab:nth-child(1) {
  /* ПОЗИЦИЯ */
  color: #f97c39;
}

.tab:nth-child(1).active {
  color: #f97c39;
}

.tab:nth-child(2) {
  /* РЕЙТИНГ */
  color: #f97c39;
}

.tab:nth-child(2).active {
  color: #07cb38;
}

.tab:nth-child(3) {
  /* Никнейм */
  color: #f97c39;
}

.tab:nth-child(3).active {
  color: #07cb38;
}

.tab:nth-child(4) {
  /* ДОХОДНОСТЬ */
  color: #f97c39;
}

.tab:nth-child(4).active {
  color: #07cb38;
}

.tab:hover:not(.active) {
  opacity: 0.8;
}

/* Секция фильтров */
.filter-section {
  padding: 16px;
  display: flex;
  justify-content: center;
}

.filter-icons {
  height: 40px;
  background: #06251e;
  border: 2px solid #0000001a;
  display: flex;
  gap: 24px;
  border-radius: 32px;
  padding: 4px;
}

.filter-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  border: 2px solid transparent;
}

.filter-icon img {
  width: 24px;
  height: 24px;
}

/* Сетка рейтинга */
.rating-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Карточка пользователя */
.user-card {
  position: relative;
  height: 120px;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
}

.user-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  border-color: rgba(74, 222, 128, 0.3);
}

.user-card.highlighted {
  border-color: #4ade80;
  background: rgba(74, 222, 128, 0.1);
  box-shadow: 0 4px 20px rgba(74, 222, 128, 0.2);
}

/* Фоновое изображение */
.card-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.card-background img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.3;
}

.card-background::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.3) 100%
  );
}

/* Контент карточки */
.card-content {
  position: relative;
  z-index: 2;
  height: 100%;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.user-rank {
  position: absolute;
  top: 16px;
  left: 20px;
  font-size: 24px;
  font-weight: bold;
  color: #4ade80;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.user-change {
  position: absolute;
  top: 16px;
  left: 70px;
  font-size: 12px;
  font-weight: bold;
  padding: 2px 8px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.3);
}

.user-change.positive {
  color: #4ade80;
}

.user-change.negative {
  color: #ef4444;
}

.user-name {
  position: absolute;
  bottom: 40px;
  left: 20px;
  font-size: 16px;
  font-weight: bold;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.user-percentage {
  position: absolute;
  bottom: 16px;
  left: 20px;
  font-size: 14px;
  color: #4ade80;
  font-weight: bold;
}

.current-user-badge {
  position: absolute;
  top: 16px;
  right: 20px;
  background: #4ade80;
  color: black;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: bold;
  text-transform: uppercase;
}

/* Пагинация */
.pagination {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 12px;
  padding: 20px;

  backdrop-filter: blur(10px);
  z-index: 100;
}

.page-btn {
  padding: 12px 20px;
  border: 2px solid rgba(255, 165, 0, 0.5);
  background: transparent;
  color: #ff9500;
  border-radius: 25px;
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  min-width: 100px;
  backdrop-filter: blur(10px);
}

.page-btn.active {
  background: linear-gradient(135deg, #ff9500, #ff7b00);
  color: white;
  border-color: #ff9500;
  box-shadow: 0 4px 15px rgba(255, 149, 0, 0.3);
}

.page-btn:hover:not(.active):not(:disabled) {
  background: rgba(255, 165, 0, 0.1);
  border-color: #ff9500;
  transform: translateY(-2px);
}

.page-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  transform: none;
}

/* Индикатор загрузки */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 41, 32, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(74, 222, 128, 0.3);
  border-top: 4px solid #4ade80;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Адаптивность */
@media (max-width: 1024px) {
  .rating-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 16px;
    padding: 10px;
  }
}

@media (max-width: 768px) {
  .nav-tabs {
    gap: 15px;
    margin-bottom: 0;
    padding: 0;
    flex-wrap: wrap;
    justify-content: center;
  }

  .tab {
    font-size: 12px;
  }

  .filter-icons {
    gap: 15px;
  }

  .rating-grid {
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 10px;
  }

  .pagination {
    gap: 8px;
    padding: 15px;
  }

  .page-btn {
    padding: 10px 16px;
    font-size: 11px;
    min-width: 80px;
  }

  .rating-container {
    padding-bottom: 100px;
  }
}

@media (max-width: 480px) {
  .nav-tabs {
    gap: 15px;
    margin-bottom: 0;
    padding: 0;
  }

  .user-card {
    height: 100px;
  }

  .card-content {
    padding: 12px 16px;
  }

  .user-rank {
    font-size: 20px;
    top: 12px;
    left: 16px;
  }

  .user-change {
    top: 12px;
    left: 55px;
    font-size: 11px;
  }

  .user-name {
    bottom: 32px;
    left: 16px;
    font-size: 14px;
  }

  .user-percentage {
    bottom: 12px;
    left: 16px;
    font-size: 12px;
  }

  .current-user-badge {
    top: 12px;
    right: 16px;
    padding: 3px 8px;
    font-size: 10px;
  }

  .pagination {
    padding: 12px;
    gap: 6px;
  }

  .page-btn {
    padding: 8px 12px;
    font-size: 10px;
    min-width: 70px;
  }

  .rating-container {
    padding-bottom: 90px;
  }
}

/* Анимации */
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

.user-card {
  animation: fadeInUp 0.6s ease-out;
}

.user-card:nth-child(even) {
  animation-delay: 0.1s;
}

.user-card:nth-child(3n) {
  animation-delay: 0.2s;
}
</style>
