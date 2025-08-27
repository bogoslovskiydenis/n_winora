<!-- components/investments/InvestmentsTabNavigation.vue -->
<template>
  <div class="tabs-navigation">
    <button
        class="tab-button"
        :class="{ active: activeTab === 'create' }"
        @click="$emit('tab-change', 'create')"
    >
      <span class="tab-icon">⊕</span>
      Создать инвестицию
    </button>
    <button
        class="tab-button"
        :class="{ active: activeTab === 'my' }"
        @click="$emit('tab-change', 'my')"
    >
      <span class="tab-icon">📊</span>
      Мои инвестиции
    </button>
  </div>
</template>

<script setup>
defineProps({
  activeTab: {
    type: String,
    required: true,
    validator: (value) => ['create', 'my'].includes(value)
  }
})

defineEmits(['tab-change'])
</script>

<style scoped>
.tabs-navigation {
  display: flex;
  gap: 2px;
  margin-bottom: 24px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 4px;
  width: fit-content;
}

.tab-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.3s ease;
  font-family: inherit;
}

.tab-button:hover {
  color: rgba(255, 255, 255, 0.8);
}

.tab-button.active {
  background: #4ade80;
  color: #0a2f23;
}

.tab-icon {
  font-size: 16px;
}

@media (max-width: 768px) {
  .tabs-navigation {
    width: 100%;
    justify-content: center;
  }

  .tab-button {
    flex: 1;
    justify-content: center;
  }
}
</style>