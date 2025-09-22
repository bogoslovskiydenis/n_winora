<template>
  <div class="no-results">
    <div class="no-results-icon">🔍</div>
    <div class="no-results-text">
      По запросу "{{ searchQuery }}" ничего не найдено
    </div>
    <button class="no-results-clear" @click="$emit('clear-search')">
      Очистить поиск
    </button>
  </div>
</template>

<script setup>
defineProps({
  searchQuery: {
    type: String,
    required: true,
  },
});

defineEmits(['clear-search']);
</script>

<style scoped>
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

/* Адаптивность */
@media (max-width: 768px) {
  .no-results {
    padding: 40px 20px;
  }

  .no-results-icon {
    font-size: 48px;
  }

  .no-results-text {
    font-size: 16px;
  }
}
</style>
