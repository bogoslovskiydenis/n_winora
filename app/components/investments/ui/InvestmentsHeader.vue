<template>
  <div class="investments-header">
    <div class="header-content">
      <h1 class="page-title">ИНВЕСТИЦИИ</h1>
      <div class="header-toggle">
        <div class="toggle-wrapper" @click="toggleHints">
          <img src="../../../assets/images/info.svg" alt="info" />
          <span class="toggle-text">Режим подсказок</span>
          <div class="toggle-switch" :class="{ active: showHints }">
            <div class="toggle-slider"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  showHints: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['toggle-hints']);

const toggleHints = () => {
  emit('toggle-hints');
};
</script>

<style scoped>
.investments-header {
  background: linear-gradient(0deg, #002920 0%, #00382b 100%);
  padding-top: 24px;
  margin-bottom: 0;
}

.header-content {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: 24px;
}

.page-title {
  font-size: 24px;
  font-weight: 700;
  color: #4ade80;
  margin: 0;
  letter-spacing: 1px;
}

.header-toggle {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 16px;
  padding: 4px 8px;
  border: 1px solid rgba(0, 0, 0, 0.25);
  background: rgba(0, 0, 0, 0.25);
}

.toggle-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.header-toggle img {
  width: 16px;
  height: 16px;
}

.toggle-text {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  white-space: nowrap;
}

.toggle-switch {
  width: 48px;
  height: 24px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  position: relative;
  transition: all 0.3s ease;
  border: 2px solid rgba(7, 203, 56, 0.6);
}

.toggle-switch.active {
  background: #4ade80;
}

.toggle-slider {
  width: 16px;
  height: 16px;
  background: white;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: 3px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.toggle-switch.active .toggle-slider {
  transform: translateX(24px);
}

/* Адаптивность */
@media (max-width: 768px) {
  .page-title {
    font-size: 20px;
  }

  .header-toggle {
    padding: 3px 6px;
  }

  .toggle-switch {
    width: 44px;
    height: 22px;
  }

  .toggle-slider {
    width: 14px;
    height: 14px;
    top: 2px;
    left: 2px;
  }

  .toggle-switch.active .toggle-slider {
    transform: translateX(22px);
  }

  .toggle-text {
    display: none;
    font-size: 11px;
  }
}

@media (max-width: 480px) {
  .header-content {
    margin-bottom: 0;
  }

  .page-title {
    font-size: 18px;
  }
}
</style>
