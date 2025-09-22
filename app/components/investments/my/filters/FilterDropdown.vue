<template>
  <div class="filter-section">
    <div class="filter-dropdown-container">
      <div class="filter-options">
        <!-- Положительная доходность -->
        <FilterGroup
          title="Положительная доходность"
          :is-expanded="showPositiveDropdown"
          @toggle="togglePositiveDropdown"
        >
          <FilterOption
            v-for="option in positiveOptions"
            :key="option.value"
            :label="option.label"
            :is-selected="isFilterSelected('positive', option.value)"
            @toggle="toggleFilterOption('positive', option.value, option.label)"
          />
        </FilterGroup>

        <!-- Спортруб -->
        <FilterGroup
          title="Спортруб"
          :is-expanded="showSportDropdown"
          @toggle="toggleSportDropdown"
        >
          <FilterOption
            v-for="option in sportOptions"
            :key="option.value"
            :label="option.label"
            :is-selected="isFilterSelected('sport', option.value)"
            @toggle="toggleFilterOption('sport', option.value, option.label)"
          />
        </FilterGroup>

        <!-- Заморожениые -->
        <FilterGroup
          title="Заморожениые"
          :is-expanded="showFrozenDropdown"
          @toggle="toggleFrozenDropdown"
        >
          <FilterOption
            v-for="option in frozenOptions"
            :key="option.value"
            :label="option.label"
            :is-selected="isFilterSelected('frozen', option.value)"
            @toggle="toggleFilterOption('frozen', option.value, option.label)"
          />
        </FilterGroup>

        <!-- С прибылью -->
        <FilterGroup
          title="С прибылью"
          :is-expanded="showProfitDropdown"
          @toggle="toggleProfitDropdown"
        >
          <FilterOption
            v-for="option in profitOptions"
            :key="option.value"
            :label="option.label"
            :is-selected="isFilterSelected('profit', option.value)"
            @toggle="toggleFilterOption('profit', option.value, option.label)"
          />
        </FilterGroup>

        <!-- Кнопка применить фильтры -->
        <button class="apply-filters-btn" @click="$emit('apply')">
          ПРИМЕНИТЬ
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import FilterGroup from './FilterGroup.vue';
import FilterOption from './FilterOption.vue';

const props = defineProps({
  selectedFilters: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['toggle-option', 'apply']);

// Состояния выпадающих списков
const showPositiveDropdown = ref(false);
const showSportDropdown = ref(false);
const showFrozenDropdown = ref(false);
const showProfitDropdown = ref(false);

// Опции для каждого фильтра
const positiveOptions = [
  { value: 'variant1', label: 'Вариант 1' },
  { value: 'variant2', label: 'Вариант 2' },
  { value: 'variant3', label: 'Вариант 3' },
];

const sportOptions = [
  { value: 'optionA', label: 'Опция A' },
  { value: 'optionB', label: 'Опция B' },
  { value: 'optionC', label: 'Опция C' },
  { value: 'optionD', label: 'Опция D' },
];

const frozenOptions = [
  { value: 'element1', label: 'Элемент 1' },
  { value: 'element2', label: 'Элемент 2' },
];

const profitOptions = [
  { value: 'typeX', label: 'Тип X' },
  { value: 'typeY', label: 'Тип Y' },
  { value: 'typeZ', label: 'Тип Z' },
  { value: 'typeW', label: 'Тип W' },
  { value: 'typeV', label: 'Тип V' },
];

// Методы
const isFilterSelected = (category, value) => {
  return props.selectedFilters.some(
    (filter) => filter.category === category && filter.value === value
  );
};

const toggleFilterOption = (category, value, label) => {
  emit('toggle-option', category, value, label);
};

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
</script>

<style scoped>
.filter-section {
  width: 100%;
}

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

/* Адаптивность */
@media (max-width: 768px) {
  .filter-dropdown-container {
    padding: 16px;
  }
}

@media (max-width: 480px) {
  .filter-dropdown-container {
    padding: 12px;
  }

  .apply-filters-btn {
    padding: 12px 16px;
    font-size: 13px;
  }
}
</style>
