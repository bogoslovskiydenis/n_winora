<template>
  <div class="custom-select" ref="selectWrapper">
    <div
      class="select-trigger"
      @click="toggleDropdown"
      :class="{ active: isOpen, large: variant === 'large' }"
    >
      <span class="selected-text">
        {{ selectedOption ? selectedOption : placeholder }}
      </span>
      <div class="select-arrow" :class="{ rotated: isOpen }">
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
          <path
            d="M1 1L6 6L11 1"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>

    <div
      v-if="isOpen"
      class="dropdown-list"
      :class="{ large: variant === 'large' }"
    >
      <div
        v-for="option in options"
        :key="option.value"
        class="dropdown-item"
        :class="{
          selected: modelValue === option.value,
          large: variant === 'large',
        }"
        @click="selectOption(option)"
      >
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  options: {
    type: Array,
    required: true,
  },
  placeholder: {
    type: String,
    default: 'Выберите опцию',
  },
  variant: {
    type: String,
    default: 'default', // 'default' | 'large'
    validator: (value) => ['default', 'large'].includes(value),
  },
});

const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);
const selectWrapper = ref(null);

const selectedOption = computed(() => {
  const option = props.options.find((opt) => opt.value === props.modelValue);
  return option ? option.label : '';
});

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option) => {
  emit('update:modelValue', option.value);
  isOpen.value = false;
};

const handleClickOutside = (event) => {
  if (selectWrapper.value && !selectWrapper.value.contains(event.target)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.custom-select {
  position: relative;
  width: 294px;
  height: 42px;
  opacity: 1;
  border-radius: 47px;
  border-top-width: 1px;
  border-right-width: 2px;
  border-bottom-width: 2px;
  border-left-width: 2px;
}

.select-trigger {
  padding: 8px 12px;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  color: white;
  font-size: 12px;
  cursor: pointer;
  font-family: inherit;
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
  transition: all 0.3s ease;
}

/* Большой вариант для Preset */
.select-trigger.large {
  padding: 12px 16px;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 14px;
  position: relative;
  z-index: 100;
  border-radius: 47px;
}

.select-trigger:hover {
  border-radius: 47px;
  border-width: 1px, 2px, 2px, 2px;

  border-style: solid;

  border-color: #035116;
}

.select-trigger.active {
  border-color: #4ade80;
  box-shadow: 0 0 0 2px rgba(74, 222, 128, 0.2);
}

.selected-text {
  flex: 1;
  text-align: left;
}

.select-arrow {
  color: rgba(255, 255, 255, 0.6);
  transition: transform 0.3s ease;
  display: flex;
  align-items: center;
  margin-left: 8px;
}

.select-arrow.rotated {
  transform: rotate(180deg);
}

.dropdown-list {
  position: absolute;
  top: calc(100% + 2px);
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  overflow: hidden;
  z-index: 1000;
  max-height: 200px;
  overflow-y: auto;
}

/* Большой вариант dropdown - позиционируется под select-trigger.large */
.dropdown-list.large {
  top: auto;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  z-index: 1001;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(15px);
}

.dropdown-item {
  padding: 8px 12px;
  color: white;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

/* Большой вариант item */
.dropdown-item.large {
  padding: 12px 16px;
  font-size: 14px;
}

.dropdown-item:last-child {
  border-bottom: none;
}

.dropdown-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.dropdown-item.selected {
  background: rgba(74, 222, 128, 0.2);
  color: #4ade80;
}
</style>
