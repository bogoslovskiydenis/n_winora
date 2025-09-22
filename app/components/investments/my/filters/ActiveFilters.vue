<template>
  <div class="active-filters">
    <div class="active-filters-list">
      <!-- Кнопка очистки всех фильтров -->
      <button class="clear-all-filters" @click="$emit('clear-all')">
        <img src="~/assets/images/clear-all.svg" alt="Clear All" />
      </button>

      <span
        v-for="filter in filters"
        :key="filter.id"
        class="active-filter-tag"
        @click="$emit('remove-filter', filter.id)"
      >
        <span>{{ filter.label }}</span>
        <img src="~/assets/images/Close.svg" alt="Remove" />
      </span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  filters: {
    type: Array,
    default: () => [],
  },
});

defineEmits(['remove-filter', 'clear-all']);
</script>

<style scoped>
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
  transition: all 0.3s ease;
}

.active-filter-tag:hover {
  background: #05291f;
  transform: scale(1.05);
}

.active-filter-tag span {
  font-family: Roboto;
  font-weight: 400;
  font-style: Condensed Regular;
  font-size: 12px;
  line-height: 100%;
  text-transform: uppercase;
  color: white;
}

.active-filter-tag img {
  width: 12px;
  height: 12px;
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.active-filter-tag:hover img {
  opacity: 1;
}

.clear-all-filters {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  transition: all 0.3s ease;
}

.clear-all-filters:hover {
  transform: scale(1.1);
}

.clear-all-filters img {
  width: 20px;
  height: 20px;
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
}
</style>
