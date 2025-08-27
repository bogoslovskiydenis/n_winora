<template>
  <section class="chest-promo-section">
    <div class="chest-promo">
      <div class="chest-promo-text">
        <div class="chest-title">Купи 2 сундука и получи</div>
        <div class="chest-subtitle">третий в подарок</div>
      </div>
      <div class="chest-images">
        <div class="chest-image green">💰</div>
        <div class="chest-image blue">💎</div>
        <div class="chest-image purple">👑</div>
      </div>
      <button class="chest-btn">КУПИТЬ</button>
    </div>
  </section>
</template>

<style scoped>
/* Chest Promo */
.chest-promo-section {
  margin-bottom: 32px;
}

.chest-promo {
  background: linear-gradient(135deg, #7c3aed, #a855f7);
  border-radius: 20px;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
}

.chest-promo::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    45deg,
    transparent 30%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 70%
  );
  animation: shimmer 3s infinite;
}

.chest-promo-text {
  flex: 1;
}

.chest-title {
  font-size: 18px;
  color: white;
  margin-bottom: 4px;
}

.chest-subtitle {
  font-size: 20px;
  font-weight: 700;
  color: white;
}

.chest-images {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0 24px;
}

.chest-image {
  font-size: 28px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.chest-image.green {
  background: rgba(34, 197, 94, 0.2);
}

.chest-image.blue {
  background: rgba(59, 130, 246, 0.2);
}

.chest-image.purple {
  background: rgba(168, 85, 247, 0.2);
}

.chest-btn {
  background: linear-gradient(135deg, #f97316, #ea580c);
  color: white;
  border: none;
  border-radius: 24px;
  padding: 12px 28px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 0.5px;
}

.chest-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 12px rgba(249, 115, 22, 0.3);
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .chest-promo {
    flex-direction: column;
    text-align: center;
    gap: 20px;
  }

  .chest-images {
    margin: 0;
  }
}
</style>
<script setup lang="ts"></script>
