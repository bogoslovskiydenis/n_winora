<template>
  <div class="empty-investments">
    <div class="empty-content">
      <h3 class="empty-title">У вас пока нет активных инвестиций</h3>
      <p class="empty-description">
        Создайте свою первую инвестицию, чтобы начать получать доход
      </p>

      <div class="empty-features">
        <div class="feature-item">
          <span class="feature-icon">⚡</span>
          <span class="feature-text">Быстрый старт</span>
        </div>
        <div class="feature-item">
          <span class="feature-icon">🛡️</span>
          <span class="feature-text">Безопасные инвестиции</span>
        </div>
        <div class="feature-item">
          <span class="feature-icon">📊</span>
          <span class="feature-text">Детальная аналитика</span>
        </div>
      </div>

      <div class="empty-actions">
        <button class="create-btn primary" @click="$emit('create-investment')">
          <span class="btn-icon">➕</span>
          Создать инвестицию
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineEmits(['create-investment']);
</script>

<style scoped>
.empty-investments {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  min-height: 400px;
}

.empty-content {
  max-width: 500px;
}

.empty-title {
  font-size: 24px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 16px;
  line-height: 1.3;
}

.empty-description {
  font-size: 16px;
  color: var(--text-secondary);
  margin-bottom: 32px;
  line-height: 1.5;
}

.empty-features {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-bottom: 32px;
  flex-wrap: wrap;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  min-width: 120px;
  transition: all 0.3s ease;
}

.feature-item:hover {
  background: rgba(255, 255, 255, 0.06);
  transform: translateY(-2px);
}

.feature-icon {
  font-size: 20px;
  opacity: 0.8;
}

.feature-text {
  font-size: 12px;
  color: var(--text-secondary);
  font-weight: 500;
  text-align: center;
}

.empty-actions {
  display: flex;
  justify-content: center;
}

.create-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 32px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  font-family: inherit;
  min-width: 180px;
  justify-content: center;
}

.create-btn.primary {
  background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
  color: #0a2f23;
  box-shadow: 0 4px 15px rgba(74, 222, 128, 0.3);
}

.create-btn.primary:hover {
  background: linear-gradient(135deg, #86efac 0%, #4ade80 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(74, 222, 128, 0.4);
}

.btn-icon {
  font-size: 16px;
}

/* Анимации */
@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes orbit {
  from {
    transform: rotate(0deg) translateX(60px) rotate(0deg);
  }
  to {
    transform: rotate(360deg) translateX(60px) rotate(-360deg);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.empty-investments {
  animation: fadeInUp 0.6s ease;
}

/* Responsive */
@media (max-width: 768px) {
  .empty-investments {
    padding: 40px 16px;
  }

  .empty-title {
    font-size: 20px;
  }

  .empty-description {
    font-size: 14px;
  }

  .empty-features {
    gap: 12px;
  }

  .feature-item {
    min-width: 100px;
    padding: 12px;
  }

  .feature-text {
    font-size: 11px;
  }

  .create-btn {
    width: 100%;
    max-width: 280px;
  }
}

@media (max-width: 480px) {
  .empty-investments {
    padding: 32px 12px;
    min-height: 300px;
  }

  .empty-features {
    flex-direction: column;
    gap: 8px;
  }

  .feature-item {
    flex-direction: row;
    min-width: auto;
    text-align: left;
  }

  .create-btn {
    padding: 10px 20px;
    font-size: 13px;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .empty-investments {
    animation: none;
  }

  .feature-item:hover,
  .create-btn:hover {
    transform: none;
  }
}

/* Focus states */
.create-btn:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}
</style>
