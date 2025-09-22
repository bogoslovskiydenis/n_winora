<template>
  <div class="results-stats">
    <span class="stats-text">
      {{
        filteredCount === totalCount
          ? `Показано ${filteredCount} из ${totalCount}`
          : `Найдено ${filteredCount} из ${totalCount}`
      }}
      {{
        declensionWord(filteredCount, [
          'инвестиция',
          'инвестиции',
          'инвестиций',
        ])
      }}
    </span>
  </div>
</template>

<script setup>
defineProps({
  filteredCount: {
    type: Number,
    required: true,
  },
  totalCount: {
    type: Number,
    required: true,
  },
});

// Функция склонения слов
const declensionWord = (count, words) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return words[
    count % 100 > 4 && count % 100 < 20 ? 2 : cases[Math.min(count % 10, 5)]
  ];
};
</script>

<style scoped>
.results-stats {
  display: flex;
  justify-content: center;
  margin-top: 16px;
  padding: 12px;
}

.stats-text {
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
}

/* Адаптивность */
@media (max-width: 768px) {
  .results-stats {
    padding: 8px;
  }

  .stats-text {
    font-size: 12px;
  }
}
</style>
