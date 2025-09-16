<template>
  <div class="rating-container">
    <!-- Rating Section Title -->
    <h1 class="section-title">РЕЙТИНГ</h1>

    <!-- Navigation Tabs -->
    <div class="nav-tabs">
      <div class="tab">ПОЗИЦИЯ</div>
      <div class="tab active">РЕЙТИНГ</div>
      <div class="tab">НИЖНИМ</div>
      <div class="tab">ДОХОДНОСТЬ</div>
    </div>

    <!-- Filter Icons -->
    <div class="filter-icons">
      <div class="filter-icon">🔍</div>
      <div class="filter-icon">⬇️</div>
      <div class="filter-icon">☰</div>
      <div class="filter-icon active">💎</div>
    </div>

    <!-- Rating List -->
    <div class="rating-list">
      <div
        v-for="user in users"
        :key="user.id"
        class="user-card"
        :class="{ highlighted: user.isCurrentUser }"
      >
        <div class="user-rank">{{ user.rank }}</div>
        <div class="user-info">
          <div class="user-change" :class="user.changeClass">
            {{ user.change }}
          </div>
          <div class="user-name">{{ user.name }}</div>
        </div>
        <div class="user-percentage">{{ user.percentage }}%</div>

        <!-- Background image for some cards -->
        <div v-if="user.backgroundImage" class="card-background">
          <img :src="user.backgroundImage" :alt="user.name" />
        </div>
      </div>
    </div>

    <!-- Pagination -->
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserRating',
  data() {
    return {
      users: [
        {
          id: 1,
          rank: 123,
          change: '+123',
          changeClass: 'positive',
          name: 'ArcticPulse',
          percentage: 8.1,
        },
        {
          id: 2,
          rank: 124,
          change: '+123',
          changeClass: 'positive',
          name: 'ArcticPulse',
          percentage: 8.14,
          isCurrentUser: true,
        },
        {
          id: 3,
          rank: 126,
          change: '+123',
          changeClass: 'positive',
          name: 'ArcticPulse',
          percentage: 8.13,
        },
        {
          id: 4,
          rank: 127,
          change: '+123',
          changeClass: 'positive',
          name: 'QuantumBurn',
          percentage: 8.13,
        },
        {
          id: 5,
          rank: 128,
          change: '+123',
          changeClass: 'positive',
          name: 'QuantumBurn',
          percentage: 8.14,
        },
        {
          id: 6,
          rank: 129,
          change: '+123',
          changeClass: 'positive',
          name: 'ArcticPulse',
          percentage: 8.15,
        },
        {
          id: 7,
          rank: 130,
          change: '+123',
          changeClass: 'positive',
          name: 'QuantumBurn',
          percentage: 8.17,
        },
        {
          id: 8,
          rank: 131,
          change: '+123',
          changeClass: 'positive',
          name: 'QuantumBurn',
          percentage: 8.17,
        },
      ],
    };
  },
};
</script>

<style scoped>
.rating-container {
  background: linear-gradient(180deg, #1a4c3a 0%, #0d2818 100%);
  color: white;
  min-height: 100vh;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  position: relative;
  overflow: hidden;
}

.nav-tabs {
  display: flex;
  padding: 0 20px;
  gap: 20px;
  margin: 20px 0;
}

.tab {
  font-size: 12px;
  opacity: 0.6;
  cursor: pointer;
  transition: opacity 0.3s;
}

.tab.active {
  opacity: 1;
  color: #4ade80;
  font-weight: bold;
}

.section-title {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin: 30px 0;
  letter-spacing: 2px;
}

.filter-icons {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin: 30px 0;
}

.filter-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.3s;
  border: 2px solid transparent;
}

.filter-icon.active {
  background: rgba(74, 222, 128, 0.2);
  border-color: #4ade80;
  color: #4ade80;
}

.filter-icon:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

.rating-list {
  padding: 0 20px;
  margin-bottom: 30px;
}

.user-card {
  display: flex;
  align-items: center;
  padding: 15px;
  margin-bottom: 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
  cursor: pointer;
  background-image: url('/images/card_bg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.user-card:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

.user-card.highlighted {
  background: rgba(74, 222, 128, 0.2);
  border-color: #4ade80;
}

.user-card.highlighted::after {
  content: 'Вы';
  position: absolute;
  top: 10px;
  right: 15px;
  background: #4ade80;
  color: black;
  padding: 3px 8px;
  border-radius: 10px;
  font-size: 10px;
  font-weight: bold;
}

.user-rank {
  font-size: 18px;
  font-weight: bold;
  margin-right: 20px;
  min-width: 40px;
}

.user-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.user-change {
  font-size: 12px;
  font-weight: bold;
}

.user-change.positive {
  color: #4ade80;
}

.user-name {
  font-size: 14px;
  font-weight: bold;
}

.user-percentage {
  font-size: 16px;
  font-weight: bold;
  color: #4ade80;
}

.card-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.1;
  z-index: 1;
}

.card-background img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-card > * {
  position: relative;
  z-index: 3;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 30px 0;
  padding: 0 20px;
}

.page-btn {
  padding: 8px 15px;
  border: 2px solid rgba(255, 165, 0, 0.5);
  background: transparent;
  color: orange;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
}

.page-btn.active {
  background: orange;
  color: black;
}

.page-btn:hover:not(.active) {
  background: rgba(255, 165, 0, 0.2);
}

@media (max-width: 768px) {
  .nav-tabs {
    padding: 0 15px;
    gap: 15px;
  }

  .filter-icons {
    gap: 20px;
  }

  .filter-icon {
    width: 40px;
    height: 40px;
    font-size: 16px;
  }

  .rating-list {
    padding: 0 15px;
  }

  .pagination {
    padding: 0 15px;
    flex-wrap: wrap;
  }

  .page-btn {
    padding: 6px 12px;
    font-size: 10px;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-btn:disabled:hover {
  background: transparent;
  transform: none;
}
.user-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
}

.user-card:hover::before {
  background: rgba(0, 0, 0, 0.3);
}
</style>
