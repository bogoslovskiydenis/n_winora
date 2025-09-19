<template>
  <div class="my-investments">
    <!-- Пустое состояние -->
    <div
      class="empty-state"
      v-if="filteredInvestments.length === 0 && !getAllInvestments.length"
    >
      <EmptyInvestments @create-investment="$emit('create-first')" />
    </div>

    <!-- Фильтры (если есть инвестиции) -->
    <div v-if="getAllInvestments.length > 0" class="filters-container">
      <!-- Иконки фильтров -->
      <div class="filter-section">
        <div class="filter-icons">
          <div
            class="filter-icon"
            @click="toggleSearch"
            :class="{ active: showSearch }"
          >
            <img src="~/assets/images/search.svg" alt="Search" />
          </div>
          <div
            class="filter-icon"
            @click="toggleSortDropdown"
            :class="{ active: showSortDropdown }"
          >
            <img src="~/assets/images/menu.svg" alt="Sort" />
          </div>
          <div
            class="filter-icon"
            @click="toggleFilterDropdown"
            :class="{ active: showFilterDropdown }"
          >
            <img src="~/assets/images/page.svg" alt="Menu" />
          </div>
        </div>
      </div>

      <!-- Поисковое поле -->
      <div class="search-section" v-if="showSearch">
        <div class="search-input-container">
          <input
            ref="searchInput"
            v-model="searchQuery"
            type="text"
            placeholder="Поиск инвестиций..."
            class="search-input"
            @input="handleSearch"
          />
          <button v-if="searchQuery" class="search-clear" @click="clearSearch">
            ×
          </button>
        </div>
      </div>
    </div>

    <!-- Список инвестиций -->
    <div class="investments-container" v-if="getAllInvestments.length > 0">
      <!-- Сообщение об отсутствии результатов поиска -->
      <div
        v-if="searchQuery && filteredInvestments.length === 0"
        class="no-results"
      >
        <div class="no-results-icon">🔍</div>
        <div class="no-results-text">
          По запросу "{{ searchQuery }}" ничего не найдено
        </div>
        <button class="no-results-clear" @click="clearSearch">
          Очистить поиск
        </button>
      </div>

      <!-- Сетка инвестиций -->
      <div
        v-else
        class="investments-grid"
        :class="{
          'grid-view': viewMode === 'grid',
          'list-view': viewMode === 'list',
        }"
      >
        <InvestmentCard
          v-for="investment in paginatedInvestments"
          :key="investment.id"
          :investment="investment"
          :view-mode="viewMode"
          @manage="handleManage"
          @withdraw="handleWithdraw"
          @view-details="handleViewDetails"
        />
      </div>

      <!-- Пагинация -->
      <div class="pagination" v-if="totalPages > 1 && !searchQuery">
        <button
          class="pagination-btn"
          :disabled="currentPage === 1"
          @click="currentPage = 1"
        >
          «
        </button>
        <button
          class="pagination-btn"
          :disabled="currentPage === 1"
          @click="currentPage--"
        >
          ‹
        </button>

        <span
          v-for="page in visiblePages"
          :key="page"
          class="pagination-number"
          :class="{ active: page === currentPage }"
          @click="currentPage = page"
        >
          {{ page }}
        </span>

        <button
          class="pagination-btn"
          :disabled="currentPage === totalPages"
          @click="currentPage++"
        >
          ›
        </button>
        <button
          class="pagination-btn"
          :disabled="currentPage === totalPages"
          @click="currentPage = totalPages"
        >
          »
        </button>
      </div>

      <!-- Статистика результатов -->
      <div v-if="filteredInvestments.length > 0" class="results-stats">
        <span class="stats-text">
          {{
            filteredInvestments.length === getAllInvestments.length
              ? `Показано ${filteredInvestments.length} из ${getAllInvestments.length}`
              : `Найдено ${filteredInvestments.length} из ${getAllInvestments.length}`
          }}
          {{
            declensionWord(filteredInvestments.length, [
              'инвестиция',
              'инвестиции',
              'инвестиций',
            ])
          }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { nextTick } from '#imports';
import { navigateTo } from '#app';
import InvestmentCard from './InvestmentCard.vue';
import EmptyInvestments from './EmptyInvestments.vue';

defineEmits(['create-first']);

// Подключаем composable для управления инвестициями
const { getAllInvestments } = useInvestments();

// Реактивные данные
const viewMode = ref('grid');
const sortBy = ref('date');
const filterStatus = ref('all');
const currentPage = ref(1);
const itemsPerPage = 6; // Количество карточек на странице

// Новые реактивные данные для фильтров
const showSearch = ref(false);
const searchQuery = ref('');
const showSortDropdown = ref(false);
const showFilterDropdown = ref(false);

// Реф для поискового поля
const searchInput = ref(null);

// Вычисляемые свойства
const filteredInvestments = computed(() => {
  let filtered = [...getAllInvestments.value];

  // Фильтр по поиску
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase().trim();
    filtered = filtered.filter(
      (inv) =>
        inv.name.toLowerCase().includes(query) ||
        inv.strategy.toLowerCase().includes(query) ||
        inv.type.toLowerCase().includes(query)
    );
  }

  // Фильтр по статусу
  if (filterStatus.value !== 'all') {
    filtered = filtered.filter((inv) => inv.status === filterStatus.value);
  }

  // Сортировка
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'date':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'profit':
        return b.currentProfit - a.currentProfit;
      case 'amount':
        return b.amount - a.amount;
      case 'status':
        return a.status.localeCompare(b.status);
      default:
        return 0;
    }
  });

  return filtered;
});

const totalPages = computed(() => {
  return Math.ceil(filteredInvestments.value.length / itemsPerPage);
});

const paginatedInvestments = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredInvestments.value.slice(start, end);
});

const visiblePages = computed(() => {
  const pages = [];
  const total = totalPages.value;
  const current = currentPage.value;

  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) pages.push(i);
      pages.push('...');
      pages.push(total);
    } else if (current >= total - 3) {
      pages.push(1);
      pages.push('...');
      for (let i = total - 4; i <= total; i++) pages.push(i);
    } else {
      pages.push(1);
      pages.push('...');
      for (let i = current - 1; i <= current + 1; i++) pages.push(i);
      pages.push('...');
      pages.push(total);
    }
  }

  return pages;
});

// Обработчики событий для фильтров
const toggleSearch = () => {
  showSearch.value = !showSearch.value;

  if (showSearch.value) {
    // Закрываем другие выпадающие меню
    showSortDropdown.value = false;
    showFilterDropdown.value = false;

    // Фокусируемся на поле ввода после открытия
    nextTick(() => {
      if (searchInput.value) {
        searchInput.value.focus();
      }
    });
  } else {
    // Очищаем поиск при закрытии
    clearSearch();
  }
};

const handleSearch = () => {
  // Дополнительная логика поиска если нужна
};

const clearSearch = () => {
  searchQuery.value = '';
};

const toggleSortDropdown = () => {
  showSortDropdown.value = !showSortDropdown.value;
  showFilterDropdown.value = false;
  if (showSortDropdown.value) {
    showSearch.value = false;
  }
};

const toggleFilterDropdown = () => {
  showFilterDropdown.value = !showFilterDropdown.value;
  showSortDropdown.value = false;
  if (showFilterDropdown.value) {
    showSearch.value = false;
  }
};

// Обработчики событий
const handleManage = (investmentId) => {
  console.log('Управление инвестицией:', investmentId);
  // Здесь будет логика управления инвестицией
};

const handleWithdraw = (investmentId) => {
  console.log('Вывод средств из инвестиции:', investmentId);
  // Здесь будет логика вывода средств
};

const handleViewDetails = (investmentId) => {
  console.log('Просмотр деталей инвестиции:', investmentId);
  // Здесь будет переход к детальной странице
  navigateTo(`/investments/${investmentId}`);
};

// Функция склонения слов
const declensionWord = (count, words) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return words[
    count % 100 > 4 && count % 100 < 20 ? 2 : cases[Math.min(count % 10, 5)]
  ];
};

// Сброс страницы при изменении фильтров
watch([filterStatus, sortBy, searchQuery], () => {
  currentPage.value = 1;
});

// Закрытие выпадающих меню при клике вне их
onMounted(() => {
  const handleClickOutside = (event) => {
    const filterSection = document.querySelector('.filter-section');
    if (filterSection && !filterSection.contains(event.target)) {
      showSortDropdown.value = false;
      showFilterDropdown.value = false;
    }
  };

  document.addEventListener('click', handleClickOutside);

  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
  });
});
</script>

<style scoped>
.my-investments {
  width: 100%;
}

/* Контейнер фильтров */
.filters-container {
  margin-bottom: 24px;
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
  transition: all 0.3s ease;
  border: 2px solid transparent;
  border-radius: 50%;
  padding: 8px;
}

.filter-icon img {
  width: 24px;
  height: 24px;
}

/* Анимация появления поискового поля */
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Поисковая секция */
.search-section {
  padding: 0 16px 16px;
  display: flex;
  justify-content: center;
  animation: slideDown 0.3s ease;
}

.search-input-container {
  position: relative;
  width: 100%;
  max-width: 400px;
}

.search-input {
  width: 100%;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 0 50px 0 20px;
  font-size: 14px;
  color: white;
  font-family: inherit;
  transition: all 0.3s ease;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.search-input:focus {
  outline: none;
  border-color: #07cb38;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 0 0 3px rgba(7, 203, 56, 0.2);
}

.search-clear {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  font-size: 16px;
  font-weight: bold;
  transition: all 0.3s ease;
}

.search-clear:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-50%) scale(1.1);
}

/* Нет результатов поиска */
.no-results {
  text-align: center;
  padding: 60px 20px;
  color: rgba(255, 255, 255, 0.7);
  animation: fadeInUp 0.6s ease;
}

.no-results-icon {
  font-size: 64px;
  margin-bottom: 20px;
  opacity: 0.5;
}

.no-results-text {
  font-size: 18px;
  margin-bottom: 24px;
  color: rgba(255, 255, 255, 0.8);
}

.no-results-clear {
  background: #07cb38;
  color: #0a2f23;
  border: none;
  border-radius: 25px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
}

.no-results-clear:hover {
  background: #06b832;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(7, 203, 56, 0.3);
}

/* Анимации появления */
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

.investment-card {
  animation: fadeInUp 0.6s ease-out;
}

.investment-card:nth-child(even) {
  animation-delay: 0.1s;
}

.investment-card:nth-child(3n) {
  animation-delay: 0.2s;
}

.investments-container {
  width: 100%;
}

.investments-grid {
  display: grid;
  gap: 20px;
  margin-bottom: 32px;
}

.investments-grid.grid-view {
  grid-template-columns: repeat(auto-fill, minmax(343px, 343px));
  justify-content: start;
}

.investments-grid.list-view {
  grid-template-columns: 1fr;
  gap: 16px;
}

.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
}

/* Статистика результатов */
.results-stats {
  display: flex;
  justify-content: center;
  margin-top: 16px;
  padding: 12px;
}

.stats-text {
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
}

/* Пагинация */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 32px;
}

.pagination-btn {
  padding: 8px 12px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  color: var(--text-secondary, rgba(255, 255, 255, 0.7));
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
  font-size: 14px;
}

.pagination-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.3);
  color: var(--text-primary, white);
}

.pagination-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.pagination-number {
  padding: 8px 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  color: var(--text-secondary, rgba(255, 255, 255, 0.7));
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  min-width: 40px;
  text-align: center;
}

.pagination-number:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.3);
  color: var(--text-primary, white);
}

.pagination-number.active {
  background: var(--primary-color, #07cb38);
  border-color: var(--primary-color, #07cb38);
  color: #0a2f23;
  font-weight: 600;
}

/* Адаптивность */
@media (max-width: 1200px) {
}

@media (max-width: 768px) {
  .filter-section {
    padding: 10px;
  }

  .filter-icons {
    gap: 16px;
    height: 36px;
  }

  .filter-icon {
    padding: 6px;
  }

  .filter-icon img {
    width: 18px;
    height: 18px;
  }

  .search-input-container {
    max-width: none;
  }

  .search-input {
    font-size: 16px; /* Предотвращает zoom на iOS */
  }

  .investments-grid.grid-view {
    grid-template-columns: 1fr;
  }

  .pagination {
    gap: 4px;
  }

  .pagination-btn,
  .pagination-number {
    padding: 6px 10px;
    font-size: 13px;
    min-width: 35px;
  }
}

@media (max-width: 480px) {
  .filter-icons {
    gap: 12px;
    height: 32px;
  }

  .filter-icon {
    padding: 4px;
  }

  .filter-icon img {
    width: 16px;
    height: 16px;
  }

  .results-stats {
    padding: 8px;
  }

  .stats-text {
    font-size: 12px;
  }
}
</style>
