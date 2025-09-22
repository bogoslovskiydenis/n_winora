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
    <InvestmentsFilters
      v-if="getAllInvestments.length > 0"
      :active-filters="activeFilters"
      :selected-filters="selectedFilters"
      @update-search="handleSearchUpdate"
      @update-filters="handleFiltersUpdate"
    />

    <!-- Список инвестиций -->
    <div class="investments-container" v-if="getAllInvestments.length > 0">
      <!-- Сообщение об отсутствии результатов поиска -->
      <NoSearchResults
        v-if="searchQuery && filteredInvestments.length === 0"
        :search-query="searchQuery"
        @clear-search="clearSearch"
      />

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
      <InvestmentsPagination
        v-if="totalPages > 1 && !searchQuery"
        :current-page="currentPage"
        :total-pages="totalPages"
        @update-page="currentPage = $event"
      />

      <!-- Статистика результатов -->
      <ResultsStats
        v-if="filteredInvestments.length > 0"
        :filtered-count="filteredInvestments.length"
        :total-count="getAllInvestments.length"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { navigateTo } from '#app';
import InvestmentCard from './InvestmentCard.vue';
import EmptyInvestments from './EmptyInvestments.vue';
import InvestmentsFilters from './filters/InvestmentsFilters.vue';
import NoSearchResults from './search/NoSearchResults.vue';
import InvestmentsPagination from './pagination/InvestmentsPagination.vue';
import ResultsStats from './stats/ResultsStats.vue';

defineEmits(['create-first']);

// Подключаем composable для управления инвестициями
const { getAllInvestments } = useInvestments();

// Реактивные данные
const currentPage = ref(1);
const itemsPerPage = 10; // Увеличили с 6 до 10
const searchQuery = ref('');
const activeFilters = ref([]);
const selectedFilters = ref([]);

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

  // Применяем активные фильтры
  if (activeFilters.value.length > 0) {
    activeFilters.value.forEach((filter) => {
      // Здесь будет логика применения конкретных фильтров
      // В зависимости от типа фильтра
      console.log('Применяем фильтр:', filter);
    });
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

// Обработчики событий
const handleSearchUpdate = (query) => {
  searchQuery.value = query;
};

const handleFiltersUpdate = ({ active, selected }) => {
  activeFilters.value = active;
  selectedFilters.value = selected;
};

const clearSearch = () => {
  searchQuery.value = '';
};

const handleManage = (investmentId) => {
  console.log('Управление инвестицией:', investmentId);
};

const handleWithdraw = (investmentId) => {
  console.log('Вывод средств из инвестиции:', investmentId);
};

const handleViewDetails = (investmentId) => {
  console.log('Просмотр деталей инвестиции:', investmentId);
  navigateTo(`/investments/${investmentId}`);
};

// Сброс страницы при изменении фильтров
watch(
  [searchQuery, activeFilters],
  () => {
    currentPage.value = 1;
  },
  { deep: true }
);
</script>

<style scoped>
.my-investments {
  width: 100%;
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

/* Адаптивность */
@media (max-width: 768px) {
  .investments-grid {
    grid-template-columns: 1fr;
  }
}
</style>
