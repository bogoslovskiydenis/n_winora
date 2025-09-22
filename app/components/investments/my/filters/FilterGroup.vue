<template>
  <div class="filter-item">
    <button class="filter-option" @click="$emit('toggle')">
      {{ title }}
      <span class="filter-arrow" :class="{ active: isExpanded }">▼</span>
    </button>
    <div class="sub-dropdown" v-if="isExpanded">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  isExpanded: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['toggle']);
</script>

<style scoped>
.filter-item {
  gap: 8px;
  position: relative;
}

.filter-option {
  width: 274px;
  height: 40px;
  display: flex;
  align-items: center;
  color: white;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
  white-space: nowrap;
  justify-content: space-between;
  padding: 12px 16px;
  gap: 10px;
  border-radius: 47px;
  background: #00000040;
  border: 2px solid #035116;
}

.filter-option:hover {
  border-color: rgba(108, 227, 35, 0.2);
}

.filter-arrow {
  font-size: 12px;
  transition: transform 0.3s ease;
  opacity: 0.7;
}

.filter-arrow.active {
  transform: rotate(180deg);
  opacity: 1;
}

.sub-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 8px;
  background: rgba(6, 37, 30, 0.98);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 8px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  z-index: 9999;
  min-width: 180px;
  animation: slideDown 0.3s ease;
}

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

/* Адаптивность */
@media (max-width: 768px) {
  .filter-option {
    width: 100%;
    max-width: 274px;
    padding: 10px 12px;
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .filter-option {
    padding: 10px 12px;
    font-size: 13px;
  }
}
</style>
