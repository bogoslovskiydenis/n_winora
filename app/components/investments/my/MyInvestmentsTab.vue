<template>
  <div class="my-investments">
    <!-- Пустое состояние -->
    <div
      class="empty-state"
      v-if="filteredInvestments.length === 0 && !getAllInvestments.length"
    >
      <EmptyInvestments @create-investment="$emit('create-first')" />
    </div>

    <!-- Список инвестиций -->
    <div class="investments-container" v-else>
      <div
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
      <div class="pagination" v-if="totalPages > 1">
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
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
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

// Вычисляемые свойства
const filteredInvestments = computed(() => {
  let filtered = [...getAllInvestments.value];

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

// Сброс страницы при изменении фильтров
watch([filterStatus, sortBy], () => {
  currentPage.value = 1;
});
</script>

<style scoped>
.my-investments {
  width: 100%;
}

.filter-select option {
  background: #1a1a1a;
  color: white;
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
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
  font-size: 14px;
}

.pagination-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.3);
  color: var(--text-primary);
}

.pagination-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.pagination-number {
  padding: 8px 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  min-width: 40px;
  text-align: center;
}

.pagination-number:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.3);
  color: var(--text-primary);
}

.pagination-number.active {
  background: var(--primary-color);
  border-color: var(--primary-color);
  color: #0a2f23;
  font-weight: 600;
}

/* Адаптивность */
@media (max-width: 1200px) {
  .investments-grid.grid-view {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}

@media (max-width: 768px) {
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
}
</style>
