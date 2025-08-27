<!-- components/investments/InvestmentsHeader.vue -->
<template>
  <div class="section-header">
    <h1 class="section-title">
      <span class="section-icon">📈</span>
      ИНВЕСТИЦИИ
    </h1>
    <div class="section-controls">
      <label class="toggle-switch">
        <input
          type="checkbox"
          :checked="showHints"
          @change="$emit('toggle-hints')"
        />
        <span class="slider"></span>
        <span class="toggle-text">Режим подсказок</span>
      </label>
    </div>
  </div>
</template>

<script setup>
defineProps({
  showHints: {
    type: Boolean,
    default: true,
  },
});

defineEmits(['toggle-hints']);
</script>

<style scoped>
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 28px;
  font-weight: 700;
  color: #4ade80;
  margin: 0;
}

.section-icon {
  font-size: 32px;
}

.section-controls {
  display: flex;
  align-items: center;
  gap: 16px;
}

.toggle-switch {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}

.toggle-switch input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.slider {
  position: relative;
  width: 50px;
  height: 24px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 24px;
  transition: background 0.3s ease;
}

.slider:before {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: white;
  top: 2px;
  left: 2px;
  transition: transform 0.3s ease;
}

.toggle-switch input:checked + .slider {
  background: #4ade80;
}

.toggle-switch input:checked + .slider:before {
  transform: translateX(26px);
}

.toggle-text {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
}

@media (max-width: 768px) {
  .section-header {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }
}
</style>
