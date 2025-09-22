<template>
  <div class="search-section">
    <div class="search-input-container">
      <input
        ref="searchInput"
        :value="searchQuery"
        type="text"
        placeholder="Поиск инвестиций..."
        class="search-input"
        @input="handleInput"
      />
      <button v-if="searchQuery" class="search-clear" @click="handleClear">
        ×
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue';

const props = defineProps({
  searchQuery: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update-query', 'clear']);

const searchInput = ref(null);

const handleInput = (event) => {
  emit('update-query', event.target.value);
};

const handleClear = () => {
  emit('clear');
};

// Фокус на поле при монтировании
onMounted(() => {
  nextTick(() => {
    if (searchInput.value) {
      searchInput.value.focus();
    }
  });
});
</script>

<style scoped>
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

/* Адаптивность */
@media (max-width: 768px) {
  .search-input-container {
    max-width: none;
  }

  .search-input {
    font-size: 16px; /* Предотвращает zoom на iOS */
  }
}
</style>
