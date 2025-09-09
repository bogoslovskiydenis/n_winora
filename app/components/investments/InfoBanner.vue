<template>
  <div v-show="show" class="info-banner" :class="[variantClass, sizeClass]">
    <img :src="iconSrc" :alt="iconAlt" class="info-icon" />

    <div class="info-content">
      <!-- Если передан заголовок -->
      <div v-if="title" class="info-title">{{ title }}</div>

      <!-- Основной контент -->
      <div class="info-text" :class="{ 'with-title': title }">
        <slot>{{ message }}</slot>
      </div>

      <!-- Дополнительный слот для кастомного контента -->
      <slot name="extra"></slot>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  // Показывать ли баннер
  show: {
    type: Boolean,
    default: true,
  },

  // Заголовок (опционально)
  title: {
    type: String,
    default: '',
  },

  // Основное сообщение
  message: {
    type: String,
    default:
      'Вспомогательная информация, которая появляется на экране и помогает пользователю при работе',
  },

  // Тип баннера (влияет на стили)
  variant: {
    type: String,
    default: 'default',
    validator: (value) =>
      ['default', 'info', 'warning', 'success', 'preset', 'equalizer'].includes(
        value
      ),
  },

  // Размер баннера
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value),
  },

  // Кастомная иконка
  icon: {
    type: String,
    default: 'info',
  },
});

// Вычисляем путь к иконке
const iconSrc = computed(() => {
  const iconMap = {
    info: '~/assets/images/info.svg',
    warning: '~/assets/images/warning.svg',
    success: '~/assets/images/success.svg',
    lock: '~/assets/images/lock.svg',
    preset: '~/assets/images/Preset.svg',
    equalizer: '~/assets/images/equalizer.svg',
  };

  return iconMap[props.icon] || '~/assets/images/info.svg';
});

const iconAlt = computed(() => props.icon);

// Классы для вариантов стилизации
const variantClass = computed(() => `info-banner--${props.variant}`);
const sizeClass = computed(() => `info-banner--${props.size}`);
</script>

<style scoped>
/* Базовые стили */
.info-banner {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  box-shadow: 0px 1px 5px 0px #00000040;
  border-top: 1px solid #00b27d33;
  border-radius: 16px;
  background: #00000033;
  position: relative;
  transition: all 0.3s ease;
  animation: fadeInUp 0.4s ease-out;
}

.info-icon {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
}

.info-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.info-title {
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 4px;
}

.info-text {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.5;
}

.info-text.with-title {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
}

/* Варианты стилизации */
.info-banner--default {
  /* Стили по умолчанию уже применены */
}

.info-banner--info {
  background: rgba(59, 130, 246, 0.1);
  border-top-color: rgba(59, 130, 246, 0.3);
}

.info-banner--warning {
  background: rgba(245, 158, 11, 0.1);
  border-top-color: rgba(245, 158, 11, 0.3);
}

.info-banner--success {
  background: rgba(34, 197, 94, 0.1);
  border-top-color: rgba(34, 197, 94, 0.3);
}

.info-banner--preset {
  /* Специальные стили для пресета */
  text-align: center;
  justify-content: center;
}

.info-banner--preset .info-content {
  align-items: center;
  text-align: center;
}

.info-banner--equalizer {
  /* Специальные стили для эквалайзера */
  text-align: center;
  justify-content: center;
}

.info-banner--equalizer .info-content {
  align-items: center;
  text-align: center;
}

/* Размеры */
.info-banner--small {
  padding: 12px;
  gap: 8px;
}

.info-banner--small .info-icon {
  width: 24px;
  height: 24px;
}

.info-banner--small .info-title {
  font-size: 12px;
}

.info-banner--small .info-text {
  font-size: 12px;
}

.info-banner--medium {
  /* Стили по умолчанию */
}

.info-banner--large {
  padding: 20px;
  gap: 16px;
}

.info-banner--large .info-icon {
  width: 40px;
  height: 40px;
}

.info-banner--large .info-title {
  font-size: 16px;
}

.info-banner--large .info-text {
  font-size: 16px;
}

/* Анимации */
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
  .info-banner {
    padding: 12px;
    gap: 10px;
  }

  .info-icon {
    width: 28px;
    height: 28px;
  }

  .info-title {
    font-size: 13px;
  }

  .info-text {
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .info-banner {
    padding: 10px;
    gap: 8px;
  }

  .info-icon {
    width: 24px;
    height: 24px;
  }

  .info-title {
    font-size: 12px;
  }

  .info-text {
    font-size: 12px;
  }
}
</style>
