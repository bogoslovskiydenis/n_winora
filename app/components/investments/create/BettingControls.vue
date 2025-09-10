<template>
  <div class="betting-selector-card">
    <!-- Основной переключатель -->
    <div class="betting-toggle-container">
      <div class="betting-toggle">
        <!-- Анимированный фон -->
        <div
          class="toggle-background"
          :class="{ 'toggle-right': bettingMode === 'betting' }"
        ></div>

        <!-- Кнопка Гэмблинг -->
        <button
          class="toggle-button gambling"
          :class="{ active: bettingMode === 'gambling' }"
          @click="$emit('update-betting-mode', 'gambling')"
        >
          <span class="button-icon">🎲</span>
          <span class="button-text">Гэмблинг</span>
        </button>

        <!-- Кнопка Беттинг -->
        <button
          class="toggle-button betting"
          :class="{ active: bettingMode === 'betting' }"
          @click="$emit('update-betting-mode', 'betting')"
        >
          <span class="button-icon">🎯</span>
          <span class="button-text">Беттинг</span>
          <span class="lock-icon">🔒</span>
        </button>
      </div>
    </div>

    <!-- Информационная секция - управляется общей кнопкой -->
    <InfoBanner
      :show="showHints"
      :title="getBettingTitle()"
      :message="getBettingDescription()"
      variant="info"
      icon="lock"
    />
  </div>
</template>

<script setup>
import InfoBanner from '../InfoBanner.vue';

const props = defineProps({
  bettingMode: {
    type: String,
    required: true,
    default: 'gambling',
    validator: (value) => ['gambling', 'betting'].includes(value),
  },
  // Получаем состояние подсказок извне
  showHints: {
    type: Boolean,
    default: true,
  },
});

defineEmits(['update-betting-mode']);

const getBettingTitle = () => {
  return props.bettingMode === 'gambling' ? 'Гэмблинг' : 'Беттинг';
};

const getBettingDescription = () => {
  const descriptions = {
    gambling:
      'Вспомогательная информация, которая появляется на экране и помогает пользователю при работе',
    betting:
      'Сбалансированный подход к ставкам с умеренными рисками. Рекомендуется для начинающих.',
  };
  return descriptions[props.bettingMode];
};
</script>

<style scoped>
.betting-selector-card {
}
.info-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.4;
  text-align: center;
}

/* Контейнер переключателя */
.betting-toggle-container {
  margin-bottom: 16px;
}

.betting-toggle {
  position: relative;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 50px;
  padding: 0;
  display: flex;
  overflow: hidden;
}

/* Анимированный фон */
.toggle-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  border-radius: 50px 0 0 50px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow:
    0 4px 12px rgba(34, 197, 94, 0.3),
    0 2px 6px rgba(34, 197, 94, 0.2);
  z-index: 1;
}

.toggle-background.toggle-right {
  transform: translateX(100%);
  border-radius: 0 50px 50px 0;
}

/* Кнопки переключателя */
.toggle-button {
  flex: 1;
  background: transparent;
  border: none;
  border-radius: 42px;
  padding: 12px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 44px;
}

.button-icon {
  font-size: 16px;
  transition: all 0.3s ease;
}

.button-text {
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;
  letter-spacing: 0.3px;
}

.lock-icon {
  font-size: 12px;
  opacity: 0.7;
  transition: all 0.3s ease;
}

/* Неактивные кнопки */
.toggle-button:not(.active) .button-text {
  color: rgba(255, 255, 255, 0.6);
}

.toggle-button:not(.active) .button-icon {
  opacity: 0.6;
}

.toggle-button:not(.active) .lock-icon {
  opacity: 0.4;
}

/* Активные кнопки */
.toggle-button.active .button-text {
  color: #0f172a;
  font-weight: 700;
}

.toggle-button.active .button-icon {
  opacity: 1;
}

.toggle-button.active .lock-icon {
  color: #0f172a;
  opacity: 0.8;
}

/* Hover эффекты */
.toggle-button:not(.active):hover {
  background: rgba(255, 255, 255, 0.05);
}

.toggle-button:not(.active):hover .button-text {
  color: rgba(255, 255, 255, 0.8);
}

.toggle-button:not(.active):hover .button-icon {
  opacity: 0.8;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Адаптивность */
@media (max-width: 768px) {
  .toggle-button {
    padding: 10px 16px;
    min-height: 40px;
  }

  .button-text {
    font-size: 13px;
  }

  .button-icon {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .betting-selector-card {
    padding: 12px;
  }

  .betting-toggle {
    padding: 3px;
  }

  .toggle-button {
    padding: 8px 12px;
    min-height: 36px;
    gap: 6px;
  }

  .button-text {
    font-size: 12px;
  }

  .button-icon {
    font-size: 13px;
  }

  .lock-icon {
    font-size: 10px;
  }

  .info-section {
    padding: 12px;
  }
}

/* Дополнительные варианты размеров */
.betting-selector-card.compact {
  padding: 12px;
  margin-bottom: 12px;
}

.betting-selector-card.compact .toggle-button {
  padding: 8px 16px;
  min-height: 36px;
}

.betting-selector-card.compact .button-text {
  font-size: 12px;
}

.betting-selector-card.large {
  padding: 24px;
}

.betting-selector-card.large .toggle-button {
  padding: 16px 24px;
  min-height: 52px;
}

.betting-selector-card.large .button-text {
  font-size: 16px;
}
</style>
