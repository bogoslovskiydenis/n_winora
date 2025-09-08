<!-- components/investments/InvestmentsHeader.vue -->
<template>
  <div class="investments-header">
    <div class="header-content">
      <h1 class="page-title">ИНВЕСТИЦИИ</h1>
      <div class="header-toggle">
        <div class="toggle-wrapper" @click="toggleHints">
          <div class="toggle-icon">
            <img src="../../assets/images/info.svg" alt="info" />
          </div>
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
  margin-bottom: 24px;
}

.header-content {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  position: relative;
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
  padding: 1px 6px 1px 5px;
  border: 1px solid #00000040;
  background: #00000040;
}

.header-toggle {
  display: flex;
  align-items: center;
}

.toggle-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.toggle-icon {
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-switch {
  width: 48px;
  height: 24px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  position: relative;
  transition: all 0.3s ease;
  border: 2px solid #07cb3899;
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
  top: 1px;
  left: 2px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.toggle-switch.active .toggle-slider {
  transform: translateX(24px);
}

@media (max-width: 768px) {
  .page-title {
    font-size: 20px;
  }

  .toggle-icon {
    width: 28px;
    height: 28px;
  }

  .toggle-switch {
    width: 44px;
    height: 22px;
  }

  .toggle-slider {
    width: 18px;
    height: 18px;
  }

  .toggle-switch.active .toggle-slider {
    transform: translateX(22px);
  }
}
</style>
