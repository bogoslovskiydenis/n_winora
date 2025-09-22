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
            <img :src="showSearch ? search_close : search" alt="Menu" />
          </div>
          <div class="filter-icon" @click="" :class="{}">
            <img src="~/assets/images/menu.svg" alt="Sort" />
          </div>
          <div
            class="filter-icon"
            @click="toggleFilterDropdown"
            :class="{ active: showFilterDropdown }"
          >
            <img :src="showFilterDropdown ? opn : close" alt="Menu" />
          </div>
        </div>
      </div>
      <!-- Активные фильтры -->
      <div v-if="activeFilters.length > 0" class="active-filters">
        <div class="active-filters-list">
          <!-- Кнопка очистки всех фильтров -->
          <button class="clear-all-filters" @click="clearAllFilters">
            <img src="~/assets/images/clear-all.svg" alt="Clear All" />
          </button>
          <span
            v-for="filter in activeFilters"
            :key="filter.id"
            class="active-filter-tag"
            @click="removeFilter(filter.id)"
          >
            <span>{{ filter.label }}</span>
            <img src="~/assets/images/Close.svg" alt="Clear All" />
          </span>
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

      <!-- Выпадающий фильтр -->
      <div class="filter-section" v-if="showFilterDropdown">
        <div class="filter-dropdown-container">
          <!-- Опции фильтров -->
          <div class="filter-options">
            <!-- Положительная доходность -->
            <div class="filter-item">
              <button class="filter-option" @click="togglePositiveDropdown">
                Положительная доходность
                <span
                  class="filter-arrow"
                  :class="{ active: showPositiveDropdown }"
                  >▼</span
                >
              </button>
              <div class="sub-dropdown" v-if="showPositiveDropdown">
                <button
                  class="sub-option"
                  :class="{
                    selected: isFilterSelected('positive', 'variant1'),
                  }"
                  @click="
                    toggleFilterOption('positive', 'variant1', 'Вариант 1')
                  "
                >
                  Вариант 1
                </button>
                <button
                  class="sub-option"
                  :class="{
                    selected: isFilterSelected('positive', 'variant2'),
                  }"
                  @click="
                    toggleFilterOption('positive', 'variant2', 'Вариант 2')
                  "
                >
                  Вариант 2
                </button>
                <button
                  class="sub-option"
                  :class="{
                    selected: isFilterSelected('positive', 'variant3'),
                  }"
                  @click="
                    toggleFilterOption('positive', 'variant3', 'Вариант 3')
                  "
                >
                  Вариант 3
                </button>
              </div>
            </div>

            <!-- Спортруб -->
            <div class="filter-item">
              <button class="filter-option" @click="toggleSportDropdown">
                Спортруб
                <span
                  class="filter-arrow"
                  :class="{ active: showSportDropdown }"
                  >▼</span
                >
              </button>
              <div class="sub-dropdown" v-if="showSportDropdown">
                <button
                  class="sub-option"
                  :class="{ selected: isFilterSelected('sport', 'optionA') }"
                  @click="toggleFilterOption('sport', 'optionA', 'Опция A')"
                >
                  Опция A
                </button>
                <button
                  class="sub-option"
                  :class="{ selected: isFilterSelected('sport', 'optionB') }"
                  @click="toggleFilterOption('sport', 'optionB', 'Опция B')"
                >
                  Опция B
                </button>
                <button
                  class="sub-option"
                  :class="{ selected: isFilterSelected('sport', 'optionC') }"
                  @click="toggleFilterOption('sport', 'optionC', 'Опция C')"
                >
                  Опция C
                </button>
                <button
                  class="sub-option"
                  :class="{ selected: isFilterSelected('sport', 'optionD') }"
                  @click="toggleFilterOption('sport', 'optionD', 'Опция D')"
                >
                  Опция D
                </button>
              </div>
            </div>

            <!-- Заморожениые -->
            <div class="filter-item">
              <button class="filter-option" @click="toggleFrozenDropdown">
                Заморожениые
                <span
                  class="filter-arrow"
                  :class="{ active: showFrozenDropdown }"
                  >▼</span
                >
              </button>
              <div class="sub-dropdown" v-if="showFrozenDropdown">
                <button
                  class="sub-option"
                  :class="{ selected: isFilterSelected('frozen', 'element1') }"
                  @click="toggleFilterOption('frozen', 'element1', 'Элемент 1')"
                >
                  Элемент 1
                </button>
                <button
                  class="sub-option"
                  :class="{ selected: isFilterSelected('frozen', 'element2') }"
                  @click="toggleFilterOption('frozen', 'element2', 'Элемент 2')"
                >
                  Элемент 2
                </button>
              </div>
            </div>

            <!-- С прибылью -->
            <div class="filter-item">
              <button class="filter-option" @click="toggleProfitDropdown">
                С прибылью
                <span
                  class="filter-arrow"
                  :class="{ active: showProfitDropdown }"
                  >▼</span
                >
              </button>
              <div class="sub-dropdown" v-if="showProfitDropdown">
                <button
                  class="sub-option"
                  :class="{ selected: isFilterSelected('profit', 'typeX') }"
                  @click="toggleFilterOption('profit', 'typeX', 'Тип X')"
                >
                  Тип X
                </button>
                <button
                  class="sub-option"
                  :class="{ selected: isFilterSelected('profit', 'typeY') }"
                  @click="toggleFilterOption('profit', 'typeY', 'Тип Y')"
                >
                  Тип Y
                </button>
                <button
                  class="sub-option"
                  :class="{ selected: isFilterSelected('profit', 'typeZ') }"
                  @click="toggleFilterOption('profit', 'typeZ', 'Тип Z')"
                >
                  Тип Z
                </button>
                <button
                  class="sub-option"
                  :class="{ selected: isFilterSelected('profit', 'typeW') }"
                  @click="toggleFilterOption('profit', 'typeW', 'Тип W')"
                >
                  Тип W
                </button>
                <button
                  class="sub-option"
                  :class="{ selected: isFilterSelected('profit', 'typeV') }"
                  @click="toggleFilterOption('profit', 'typeV', 'Тип V')"
                >
                  Тип V
                </button>
              </div>
            </div>

            <!-- Кнопка применить фильтры -->
            <button class="apply-filters-btn" @click="applyFilters">
              ПРИМЕНИТЬ
            </button>
          </div>
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
      <div v-else class="investments-grid">
        <InvestmentCard
          v-for="investment in paginatedInvestments"
          :key="investment.id"
          :investment="investment"
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
import opn from './../../../assets/images/page.svg';
import close from './../../../assets/images/page_close.svg';
import search from './../../../assets/images/search.svg';
import search_close from './../../../assets/images/search_opn.svg';

defineEmits(['create-first']);

// Подключаем composable для управления инвестициями
const { getAllInvestments } = useInvestments();

// Реактивные данные
const currentPage = ref(1);
const itemsPerPage = 6; // Количество карточек на странице

// Новые реактивные данные для фильтров
const showSearch = ref(false);
const searchQuery = ref('');
const showFilterDropdown = ref(false);

// Состояния для подвыпадающих списков каждого фильтра
const showPositiveDropdown = ref(false);
const showSportDropdown = ref(false);
const showFrozenDropdown = ref(false);
const showProfitDropdown = ref(false);

// Активные фильтры и выбранные фильтры
const activeFilters = ref([]);
const selectedFilters = ref([]);

// Реф для поискового поля
const searchInput = ref(null);

// Функция для проверки выбранного фильтра
const isFilterSelected = (category, value) => {
  return selectedFilters.value.some(
    (filter) => filter.category === category && filter.value === value
  );
};

// Функция для переключения выбора фильтра
const toggleFilterOption = (category, value, label) => {
  const filterId = `${category}_${value}`;
  const existingIndex = selectedFilters.value.findIndex(
    (filter) => filter.id === filterId
  );

  if (existingIndex > -1) {
    // Удаляем фильтр если уже выбран
    selectedFilters.value.splice(existingIndex, 1);
  } else {
    // Добавляем фильтр
    selectedFilters.value.push({
      id: filterId,
      category: category,
      value: value,
      label: label,
    });
  }
};

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

const toggleFilterDropdown = () => {
  showFilterDropdown.value = !showFilterDropdown.value;
  if (showFilterDropdown.value) {
    showSearch.value = false;
  } else {
    // Закрываем все подвыпадающие списки при закрытии основного фильтра
    showPositiveDropdown.value = false;
    showSportDropdown.value = false;
    showFrozenDropdown.value = false;
    showProfitDropdown.value = false;
  }
};

// Функции для работы с фильтрами
const applyFilters = () => {
  activeFilters.value = [...selectedFilters.value];
  showFilterDropdown.value = false;
  showPositiveDropdown.value = false;
  showSportDropdown.value = false;
  showFrozenDropdown.value = false;
  showProfitDropdown.value = false;
};

const removeFilter = (filterId) => {
  // Удаляем из активных фильтров
  const activeIndex = activeFilters.value.findIndex(
    (filter) => filter.id === filterId
  );
  if (activeIndex > -1) {
    activeFilters.value.splice(activeIndex, 1);
  }

  // Удаляем из выбранных фильтров
  const selectedIndex = selectedFilters.value.findIndex(
    (filter) => filter.id === filterId
  );
  if (selectedIndex > -1) {
    selectedFilters.value.splice(selectedIndex, 1);
  }
};

const clearAllFilters = () => {
  activeFilters.value = [];
  selectedFilters.value = [];
};

// Функции для управления подвыпадающими списками
const togglePositiveDropdown = () => {
  showPositiveDropdown.value = !showPositiveDropdown.value;
  showSportDropdown.value = false;
  showFrozenDropdown.value = false;
  showProfitDropdown.value = false;
};

const toggleSportDropdown = () => {
  showSportDropdown.value = !showSportDropdown.value;
  showPositiveDropdown.value = false;
  showFrozenDropdown.value = false;
  showProfitDropdown.value = false;
};

const toggleFrozenDropdown = () => {
  showFrozenDropdown.value = !showFrozenDropdown.value;
  showPositiveDropdown.value = false;
  showSportDropdown.value = false;
  showProfitDropdown.value = false;
};

const toggleProfitDropdown = () => {
  showProfitDropdown.value = !showProfitDropdown.value;
  showPositiveDropdown.value = false;
  showSportDropdown.value = false;
  showFrozenDropdown.value = false;
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
watch(
  [searchQuery, activeFilters],
  () => {
    currentPage.value = 1;
  },
  { deep: true }
);

// Закрытие выпадающих меню при клике вне их
onMounted(() => {
  const handleClickOutside = (event) => {
    const filtersContainer = document.querySelector('.filters-container');
    if (filtersContainer && !filtersContainer.contains(event.target)) {
      showFilterDropdown.value = false;
      showPositiveDropdown.value = false;
      showSportDropdown.value = false;
      showFrozenDropdown.value = false;
      showProfitDropdown.value = false;
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
  position: relative;
}

/* Активные фильтры */
.active-filters {
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.active-filters-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  justify-content: center;
}

.active-filter-tag {
  gap: 4px;
  border-radius: 8px;
  padding: 4px;
  background: #04211ae5;
  cursor: pointer;
  align-items: center;
  display: flex;
}

.active-filter-tag span {
  font-family: Roboto;
  font-weight: 400;
  font-style: Condensed Regular;
  font-size: 12px;
  leading-trim: CAP_HEIGHT;
  line-height: 100%;
  letter-spacing: 0%;
  vertical-align: middle;
  text-transform: uppercase;
}

/* Кнопка очистки всех фильтров */
.clear-all-filters {
  background: transparent;
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

/* Выпадающий фильтр */
.filter-dropdown-container {
  width: 100%;
  opacity: 1;
  gap: 8px;
  padding: 16px;
  border-radius: 16px 16px 32px 32px;
  border-top: 1px solid #f97c39;
  background: #00000033;
}

.filter-options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: space-around;
}

.filter-item {
  gap: 8px;

  position: relative;
}

.filter-option {
  width: 274px;
  height: 40px;
  display: flex;
  align-items: center;
  color: white;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
  white-space: nowrap;
  justify-content: space-between;
  padding: 12px 16px;
  gap: 10px;
  border-radius: 47px;
  background: #00000040;
  border-width: 1px, 2px, 2px, 2px;
  border-style: solid;
  border-color: #035116;
}

.filter-option:hover {
  border-color: rgba(108, 227, 35, 0.2);
}

.filter-arrow {
  font-size: 12px;
  transition: transform 0.3s ease;
  opacity: 0.7;
}

.filter-arrow.active {
  transform: rotate(180deg);
  opacity: 1;
}

.sub-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 8px;
  background: rgba(6, 37, 30, 0.98);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 8px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  z-index: 9999;
  min-width: 180px;
  animation: slideDown 0.3s ease;
}

.sub-option {
  display: block;
  width: 100%;
  padding: 8px 12px;
  background: transparent;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
  text-align: left;
}

.sub-option:hover {
  background: rgba(255, 255, 255, 0.1);
}

.sub-option.selected {
  background: rgba(7, 203, 56, 0.2);
  color: #07cb38;
  font-weight: 600;
}

.apply-filters-btn {
  background: #07cb38;
  color: #0a2f23;
  border: none;
  border-radius: 20px;
  padding: 8px 20px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;
}

.apply-filters-btn:hover {
  background: #06b832;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(7, 203, 56, 0.4);
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

.investments-container {
  width: 100%;
}

.investments-grid {
  display: grid;
  gap: 20px;
  margin-bottom: 32px;
  grid-template-columns: repeat(auto-fill, minmax(343px, 343px));
  justify-content: start;
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
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
  font-size: 14px;
}

.pagination-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.3);
  color: white;
}

.pagination-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.pagination-number {
  padding: 8px 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  min-width: 40px;
  text-align: center;
}

.pagination-number:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.3);
  color: white;
}

.pagination-number.active {
  background: #07cb38;
  border-color: #07cb38;
  color: #0a2f23;
  font-weight: 600;
}

/* Адаптивность */
@media (max-width: 768px) {
  .active-filters {
    padding: 12px;
  }

  .active-filters-list {
    gap: 6px;
  }

  .active-filter-tag {
    padding: 4px 8px;
    font-size: 11px;
  }

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

  .filter-dropdown-container {
    padding: 16px;
  }

  .investments-grid {
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

  .filter-dropdown-container {
    padding: 12px;
  }

  .filter-option {
    padding: 10px 12px;
    font-size: 13px;
  }

  .sub-option {
    font-size: 13px;
  }

  .apply-filters-btn {
    padding: 12px 16px;
    font-size: 13px;
  }

  .results-stats {
    padding: 8px;
  }

  .stats-text {
    font-size: 12px;
  }
}
</style>
