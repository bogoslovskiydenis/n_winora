<template>
  <div class="filters-container">
    <!-- Иконки фильтров -->
    <FilterIcons
      :show-search="showSearch"
      :show-filter-dropdown="showFilterDropdown"
      @toggle-search="toggleSearch"
      @toggle-filter-dropdown="toggleFilterDropdown"
    />

    <!-- Активные фильтры -->
    <ActiveFilters
      v-if="activeFilters.length > 0"
      :filters="activeFilters"
      @remove-filter="removeFilter"
      @clear-all="clearAllFilters"
    />

    <!-- Поисковое поле -->
    <SearchInput
      v-if="showSearch"
      :search-query="searchQuery"
      @update-query="updateSearchQuery"
      @clear="clearSearch"
    />

    <!-- Выпадающий фильтр -->
    <FilterDropdown
      v-if="showFilterDropdown"
      :selected-filters="selectedFilters"
      @toggle-option="toggleFilterOption"
      @apply="applyFilters"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import FilterIcons from './FilterIcons.vue';
import ActiveFilters from './ActiveFilters.vue';
import SearchInput from './SearchInput.vue';
import FilterDropdown from './FilterDropdown.vue';

const props = defineProps({
  activeFilters: {
    type: Array,
    default: () => [],
  },
  selectedFilters: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['update-search', 'update-filters']);

// Реактивные данные
const showSearch = ref(false);
const showFilterDropdown = ref(false);
const searchQuery = ref('');
const internalSelectedFilters = ref([...props.selectedFilters]);
const internalActiveFilters = ref([...props.activeFilters]);

// Методы для поиска
const toggleSearch = () => {
  showSearch.value = !showSearch.value;
  if (showSearch.value) {
    showFilterDropdown.value = false;
  } else {
    clearSearch();
  }
};

const updateSearchQuery = (query) => {
  searchQuery.value = query;
  emit('update-search', query);
};

const clearSearch = () => {
  searchQuery.value = '';
  emit('update-search', '');
};

// Методы для фильтров
const toggleFilterDropdown = () => {
  showFilterDropdown.value = !showFilterDropdown.value;
  if (showFilterDropdown.value) {
    showSearch.value = false;
  }
};

const toggleFilterOption = (category, value, label) => {
  const filterId = `${category}_${value}`;
  const existingIndex = internalSelectedFilters.value.findIndex(
    (filter) => filter.id === filterId
  );

  if (existingIndex > -1) {
    internalSelectedFilters.value.splice(existingIndex, 1);
  } else {
    internalSelectedFilters.value.push({
      id: filterId,
      category: category,
      value: value,
      label: label,
    });
  }
};

const applyFilters = () => {
  internalActiveFilters.value = [...internalSelectedFilters.value];
  showFilterDropdown.value = false;

  emit('update-filters', {
    active: internalActiveFilters.value,
    selected: internalSelectedFilters.value,
  });
};

const removeFilter = (filterId) => {
  // Удаляем из активных фильтров
  const activeIndex = internalActiveFilters.value.findIndex(
    (filter) => filter.id === filterId
  );
  if (activeIndex > -1) {
    internalActiveFilters.value.splice(activeIndex, 1);
  }

  // Удаляем из выбранных фильтров
  const selectedIndex = internalSelectedFilters.value.findIndex(
    (filter) => filter.id === filterId
  );
  if (selectedIndex > -1) {
    internalSelectedFilters.value.splice(selectedIndex, 1);
  }

  emit('update-filters', {
    active: internalActiveFilters.value,
    selected: internalSelectedFilters.value,
  });
};

const clearAllFilters = () => {
  internalActiveFilters.value = [];
  internalSelectedFilters.value = [];

  emit('update-filters', {
    active: [],
    selected: [],
  });
};

// Закрытие выпадающих меню при клике вне их
onMounted(() => {
  const handleClickOutside = (event) => {
    const filtersContainer = document.querySelector('.filters-container');
    if (filtersContainer && !filtersContainer.contains(event.target)) {
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
.filters-container {
  margin-bottom: 24px;
  position: relative;
}
</style>
