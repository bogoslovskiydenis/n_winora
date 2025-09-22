<template>
  <button
    class="sub-option"
    :class="{ selected: isSelected }"
    @click="$emit('toggle')"
  >
    {{ label }}
  </button>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
  isSelected: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['toggle']);
</script>

<style scoped>
.sub-option {
  display: block;
  width: 100%;
  padding: 8px 12px;
  background: transparent;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
  text-align: left;
}

.sub-option:hover {
  background: rgba(255, 255, 255, 0.1);
}

.sub-option.selected {
  background: rgba(7, 203, 56, 0.2);
  color: #07cb38;
  font-weight: 600;
}

/* Адаптивность */
@media (max-width: 480px) {
  .sub-option {
    font-size: 13px;
  }
}
</style>
