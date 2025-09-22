<template>
  <div class="pagination">
    <button
      class="pagination-btn"
      :disabled="currentPage === 1"
      @click="$emit('update-page', 1)"
    >
      «
    </button>
    <button
      class="pagination-btn"
      :disabled="currentPage === 1"
      @click="$emit('update-page', currentPage - 1)"
    >
      ‹
    </button>

    <span
      v-for="page in visiblePages"
      :key="page"
      class="pagination-number"
      :class="{ active: page === currentPage }"
      @click="handlePageClick(page)"
    >
      {{ page }}
    </span>

    <button
      class="pagination-btn"
      :disabled="currentPage === totalPages"
      @click="$emit('update-page', currentPage + 1)"
    >
      ›
    </button>
    <button
      class="pagination-btn"
      :disabled="currentPage === totalPages"
      @click="$emit('update-page', totalPages)"
    >
      »
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(['update-page']);

const visiblePages = computed(() => {
  const pages = [];
  const total = props.totalPages;
  const current = props.currentPage;

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

const handlePageClick = (page) => {
  if (page !== '...' && page !== props.currentPage) {
    emit('update-page', page);
  }
};
</script>

<style scoped>
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
</style>
