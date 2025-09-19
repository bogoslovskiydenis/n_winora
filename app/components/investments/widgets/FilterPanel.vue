<!-- components/investment/FilterPanel.vue -->
<template>
  <div class="filter-panel">
    <!-- Блок тегов выбранных фильтров -->
    <div class="filter-tags" v-if="hasActiveFilters">
      <span class="filter-tag" v-for="tag in activeFilterTags" :key="tag.key">
        <span class="tag-icon">{{ tag.icon }}</span>
        {{ tag.label }}
        <button
          class="tag-remove"
          @click="removeFilter(tag.type, tag.key)"
          aria-label="Удалить фильтр"
        >
          ×
        </button>
      </span>
      <button class="clear-all-btn" @click="clearAllFilters">
        Очистить все
      </button>
    </div>

    <!-- Блок кнопок фильтров -->
    <div class="filter-controls">
      <!-- Доходность -->
      <div class="filter-group">
        <button
          class="filter-btn"
          :class="{ active: activeFilters.profitability.length }"
          @click="toggleDropdown('profitability')"
        >
          <span class="filter-icon">💰</span>
          Положительная доходность
          <span class="filter-count" v-if="activeFilters.profitability.length">
            {{ activeFilters.profitability.length }}
          </span>
          <span
            class="dropdown-arrow"
            :class="{ rotated: dropdowns.profitability }"
            >▼</span
          >
        </button>

        <div
          class="dropdown-content"
          v-show="dropdowns.profitability"
          @click.stop
        >
          <label
            class="checkbox-item"
            v-for="option in profitabilityOptions"
            :key="option.value"
          >
            <input
              type="checkbox"
              :value="option.value"
              v-model="activeFilters.profitability"
            />
            <span class="checkmark"></span>
            {{ option.label }}
          </label>
        </div>
      </div>

      <!-- Спорт -->
      <div class="filter-group">
        <button
          class="filter-btn"
          :class="{ active: activeFilters.sport.length }"
          @click="toggleDropdown('sport')"
        >
          <span class="filter-icon">⚽</span>
          Спортбук
          <span class="filter-count" v-if="activeFilters.sport.length">
            {{ activeFilters.sport.length }}
          </span>
          <span class="dropdown-arrow" :class="{ rotated: dropdowns.sport }"
            >▼</span
          >
        </button>

        <div class="dropdown-content" v-show="dropdowns.sport" @click.stop>
          <label
            class="checkbox-item"
            v-for="option in sportOptions"
            :key="option.value"
          >
            <input
              type="checkbox"
              :value="option.value"
              v-model="activeFilters.sport"
            />
            <span class="checkmark"></span>
            {{ option.label }}
          </label>
        </div>
      </div>

      <!-- Замороженные -->
      <div class="filter-group">
        <button
          class="filter-btn"
          :class="{ active: activeFilters.frozen.length }"
          @click="toggleDropdown('frozen')"
        >
          <span class="filter-icon">❄️</span>
          Замороженные
          <span class="filter-count" v-if="activeFilters.frozen.length">
            {{ activeFilters.frozen.length }}
          </span>
          <span class="dropdown-arrow" :class="{ rotated: dropdowns.frozen }"
            >▼</span
          >
        </button>

        <div class="dropdown-content" v-show="dropdowns.frozen" @click.stop>
          <label
            class="checkbox-item"
            v-for="option in frozenOptions"
            :key="option.value"
          >
            <input
              type="checkbox"
              :value="option.value"
              v-model="activeFilters.frozen"
            />
            <span class="checkmark"></span>
            {{ option.label }}
          </label>
        </div>
      </div>

      <!-- С прибылью -->
      <div class="filter-group">
        <button
          class="filter-btn"
          :class="{ active: activeFilters.profit.length }"
          @click="toggleDropdown('profit')"
        >
          <span class="filter-icon">📊</span>
          С прибылью
          <span class="filter-count" v-if="activeFilters.profit.length">
            {{ activeFilters.profit.length }}
          </span>
          <span class="dropdown-arrow" :class="{ rotated: dropdowns.profit }"
            >▼</span
          >
        </button>

        <div class="dropdown-content" v-show="dropdowns.profit" @click.stop>
          <label
            class="checkbox-item"
            v-for="option in profitOptions"
            :key="option.value"
          >
            <input
              type="checkbox"
              :value="option.value"
              v-model="activeFilters.profit"
            />
            <span class="checkmark"></span>
            {{ option.label }}
          </label>
        </div>
      </div>

      <!-- Кнопка "Применить" -->
      <button
        class="apply-btn"
        @click="applyFilters"
        :class="{ active: hasChanges }"
      >
        ПРИМЕНИТЬ
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';

// Пропсы
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
});

// Эмиты
const emit = defineEmits(['update:modelValue', 'filter-change']);

// Состояние дропдаунов
const dropdowns = ref({
  profitability: false,
  sport: false,
  frozen: false,
  profit: false,
});

// Активные фильтры
const activeFilters = ref({
  profitability: [],
  sport: [],
  frozen: [],
  profit: [],
});

// Опции для фильтров
const profitabilityOptions = [
  { value: 'positive', label: 'Положительная доходность' },
  { value: 'high', label: 'Высокая доходность (>15%)' },
  { value: 'medium', label: 'Средняя доходность (5-15%)' },
  { value: 'low', label: 'Низкая доходность (<5%)' },
];

const sportOptions = [
  { value: 'football', label: 'Футбол' },
  { value: 'basketball', label: 'Баскетбол' },
  { value: 'tennis', label: 'Теннис' },
  { value: 'hockey', label: 'Хоккей' },
  { value: 'esports', label: 'Киберспорт' },
];

const frozenOptions = [
  { value: 'frozen', label: 'Замороженные' },
  { value: 'active', label: 'Активные' },
  { value: 'paused', label: 'Приостановленные' },
];

const profitOptions = [
  { value: 'has-profit', label: 'Есть прибыль для вывода' },
  { value: 'no-profit', label: 'Нет прибыли' },
  { value: 'reinvesting', label: 'Реинвестирование' },
];

// Вычисляемые свойства
const hasActiveFilters = computed(() => {
  return Object.values(activeFilters.value).some((arr) => arr.length > 0);
});

const hasChanges = computed(() => {
  return hasActiveFilters.value;
});

const activeFilterTags = computed(() => {
  const tags = [];

  // Доходность
  activeFilters.value.profitability.forEach((value) => {
    const option = profitabilityOptions.find((opt) => opt.value === value);
    if (option) {
      tags.push({
        key: value,
        type: 'profitability',
        label: option.label,
        icon: '💰',
      });
    }
  });

  // Спорт
  activeFilters.value.sport.forEach((value) => {
    const option = sportOptions.find((opt) => opt.value === value);
    if (option) {
      tags.push({
        key: value,
        type: 'sport',
        label: option.label,
        icon: '⚽',
      });
    }
  });

  // Замороженные
  activeFilters.value.frozen.forEach((value) => {
    const option = frozenOptions.find((opt) => opt.value === value);
    if (option) {
      tags.push({
        key: value,
        type: 'frozen',
        label: option.label,
        icon: '❄️',
      });
    }
  });

  // Прибыль
  activeFilters.value.profit.forEach((value) => {
    const option = profitOptions.find((opt) => opt.value === value);
    if (option) {
      tags.push({
        key: value,
        type: 'profit',
        label: option.label,
        icon: '📊',
      });
    }
  });

  return tags;
});

// Методы
const toggleDropdown = (type) => {
  // Закрываем все остальные дропдауны
  Object.keys(dropdowns.value).forEach((key) => {
    if (key !== type) {
      dropdowns.value[key] = false;
    }
  });

  dropdowns.value[type] = !dropdowns.value[type];
};

const closeAllDropdowns = () => {
  Object.keys(dropdowns.value).forEach((key) => {
    dropdowns.value[key] = false;
  });
};

const removeFilter = (type, key) => {
  const index = activeFilters.value[type].indexOf(key);
  if (index > -1) {
    activeFilters.value[type].splice(index, 1);
  }
  applyFilters();
};

const clearAllFilters = () => {
  activeFilters.value = {
    profitability: [],
    sport: [],
    frozen: [],
    profit: [],
  };
  applyFilters();
};

const applyFilters = () => {
  emit('update:modelValue', { ...activeFilters.value });
  emit('filter-change', { ...activeFilters.value });
};

// Обработчик клика вне компонента
const handleClickOutside = (event) => {
  if (!event.target.closest('.filter-panel')) {
    closeAllDropdowns();
  }
};

// Жизненный цикл
onMounted(() => {
  document.addEventListener('click', handleClickOutside);

  // Инициализируем фильтры из пропсов
  if (props.modelValue) {
    activeFilters.value = { ...activeFilters.value, ...props.modelValue };
  }
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

// Следим за изменениями пропсов
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue) {
      activeFilters.value = { ...activeFilters.value, ...newValue };
    }
  },
  { deep: true }
);
</script>

<style scoped>
.filter-panel {
  background: transparent;
  padding: 0;
  margin-bottom: 24px;
}

.filter-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
  padding: 0;
}

.filter-tag {
  background: rgba(255, 153, 51, 0.15);
  border: 1px solid rgba(255, 153, 51, 0.4);
  border-radius: 20px;
  padding: 6px 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #ff9933;
  font-weight: 500;
}

.tag-icon {
  font-size: 14px;
}

.tag-remove {
  background: none;
  border: none;
  color: #ff9933;
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
  margin-left: 4px;
  padding: 0;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s ease;
}

.tag-remove:hover {
  background: rgba(255, 153, 51, 0.3);
}

.clear-all-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 6px 12px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.clear-all-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  color: white;
}

.filter-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

.filter-group {
  position: relative;
}

.filter-btn {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 12px 16px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  white-space: nowrap;
  min-height: 44px;
}

.filter-btn:hover {
  background: rgba(0, 0, 0, 0.5);
  border-color: rgba(34, 197, 94, 0.4);
  transform: translateY(-1px);
}

.filter-btn.active {
  background: rgba(34, 197, 94, 0.15);
  border-color: rgba(34, 197, 94, 0.6);
  color: #22c55e;
  box-shadow: 0 0 20px rgba(34, 197, 94, 0.2);
}

.filter-icon {
  font-size: 16px;
}

.filter-count {
  background: #22c55e;
  border-radius: 12px;
  padding: 2px 8px;
  font-size: 11px;
  font-weight: 700;
  color: #002d20;
  min-width: 20px;
  text-align: center;
}

.dropdown-arrow {
  font-size: 10px;
  transition: transform 0.3s ease;
  color: rgba(255, 255, 255, 0.6);
  margin-left: auto;
}

.dropdown-arrow.rotated {
  transform: rotate(180deg);
}

.dropdown-content {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  background: rgba(0, 20, 15, 0.95);
  border: 1px solid rgba(34, 197, 94, 0.3);
  border-radius: 12px;
  padding: 8px 0;
  min-width: 240px;
  z-index: 1000;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(34, 197, 94, 0.1);
  backdrop-filter: blur(20px);
}

.checkbox-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  transition: all 0.2s ease;
}

.checkbox-item:hover {
  background: rgba(34, 197, 94, 0.1);
  color: white;
}

.checkbox-item input[type='checkbox'] {
  display: none;
}

.checkmark {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(34, 197, 94, 0.5);
  border-radius: 4px;
  position: relative;
  transition: all 0.2s ease;
}

.checkbox-item input[type='checkbox']:checked + .checkmark {
  background: #22c55e;
  border-color: #22c55e;
}

.checkbox-item input[type='checkbox']:checked + .checkmark::after {
  content: '✓';
  position: absolute;
  top: -1px;
  left: 3px;
  color: #002d20;
  font-size: 14px;
  font-weight: bold;
}

.apply-btn {
  background: linear-gradient(135deg, #d4853b, #a86b2b);
  border: none;
  border-radius: 12px;
  padding: 12px 24px;
  color: white;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-left: auto;
  min-height: 44px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.apply-btn:hover {
  background: linear-gradient(135deg, #e4954b, #b87b3b);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(212, 133, 59, 0.3);
}

.apply-btn.active {
  background: linear-gradient(135deg, #22c55e, #16a34a);
  box-shadow: 0 0 20px rgba(34, 197, 94, 0.3);
}

/* Адаптивность */
@media (max-width: 768px) {
  .filter-controls {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }

  .filter-btn {
    justify-content: space-between;
    padding: 10px 16px;
    min-height: 40px;
  }

  .apply-btn {
    margin-left: 0;
    min-height: 40px;
  }

  .dropdown-content {
    position: fixed;
    left: 16px;
    right: 16px;
    width: auto;
    min-width: auto;
  }
}

@media (max-width: 480px) {
  .filter-tags {
    gap: 6px;
  }

  .filter-tag {
    font-size: 11px;
    padding: 4px 8px;
  }

  .filter-btn {
    font-size: 13px;
    padding: 8px 12px;
  }

  .apply-btn {
    font-size: 13px;
    padding: 10px 20px;
  }
}
</style>
