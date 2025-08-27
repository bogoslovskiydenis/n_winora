<!-- components/investments/MyInvestmentsTab.vue -->
<template>
  <div class="my-investments">
    <!-- Пустое состояние -->
    <div class="empty-state" v-if="investments.length === 0">
      <div class="empty-icon">📈</div>
      <h3>У вас пока нет активных инвестиций</h3>
      <p>Создайте свою первую инвестицию, чтобы начать получать доход</p>
      <button class="create-first-btn" @click="$emit('create-first')">
        Создать инвестицию
      </button>
    </div>

    <!-- Список инвестиций (для будущего использования) -->
    <div class="investments-list" v-else>
      <div
        v-for="investment in investments"
        :key="investment.id"
        class="investment-item"
      >
        <!-- Здесь будет компонент InvestmentCard -->
        <div class="investment-card">
          <h4>{{ investment.name }}</h4>
          <p>Доходность: {{ investment.profitability }}</p>
          <p>Статус: {{ investment.status }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  investments: {
    type: Array,
    default: () => [],
  },
});

defineEmits(['create-first']);
</script>

<style scoped>
.my-investments {
  padding: 40px 20px;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Empty State */
.empty-state {
  text-align: center;
  max-width: 400px;
  margin: 0 auto;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 24px;
  opacity: 0.3;
  animation: bounce 2s infinite;
}

.empty-state h3 {
  font-size: 24px;
  color: white;
  margin-bottom: 16px;
  font-weight: 600;
}

.empty-state p {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 32px;
  line-height: 1.5;
}

.create-first-btn {
  padding: 12px 24px;
  background: #4ade80;
  color: #0a2f23;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
}

.create-first-btn:hover {
  background: #86efac;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(74, 222, 128, 0.3);
}

/* Investments List (для будущего) */
.investments-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  width: 100%;
}

.investment-item {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s ease;
}

.investment-item:hover {
  background: rgba(255, 255, 255, 0.06);
  transform: translateY(-2px);
}

.investment-card h4 {
  color: white;
  margin-bottom: 12px;
}

.investment-card p {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 8px;
  font-size: 14px;
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

@media (max-width: 480px) {
  .my-investments {
    padding: 20px 16px;
  }

  .empty-state h3 {
    font-size: 20px;
  }

  .empty-state p {
    font-size: 14px;
  }

  .empty-icon {
    font-size: 48px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .empty-icon {
    animation: none;
  }

  .create-first-btn:hover {
    transform: none;
  }
}
</style>
