<template>
  <aside class="sidebar" :class="{ 'sidebar--open': isOpen }">
    <div class="sidebar-content">
      <div class="menu-toggle">
        <button class="menu-toggle-btn" @click="$emit('toggle')">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div class="sidebar-logo">
        <div class="logo-icon"
             @click="$emit('navigate-home')"
             :data-tooltip="!isOpen ? 'Главная' : ''">
          <img v-if="!isOpen"
               src="../../assets/images/Winora_logo.png"
               alt="W"
               class="logo-img-small"
               @error="onLogoError">
          <img v-else
               src="../../assets/images/Winora_logo.png"
               alt="Winora"
               class="logo-img-large"
               @error="onLogoError">
          <span v-if="logoError" class="logo-w">W</span>
        </div>
      </div>

      <div class="user-card" v-if="isOpen">
        <div class="user-avatar">
          <span class="user-level">2</span>
          <div class="user-avatar-inner">
            <span>{{ user?.nickname?.[0]?.toUpperCase() || 'B' }}</span>
          </div>
        </div>
        <div class="user-info">
          <div class="user-name">{{ user?.nickname || 'bogoslovskydenis' }}</div>
          <div class="user-email">{{ user?.email || 'bogoslovskydenis@gmail.com' }}</div>
          <button class="user-exit" @click="$emit('logout')">ВЫХОД</button>
        </div>
      </div>

      <div class="user-level-badge"
           v-if="!isOpen"
           data-tooltip="Уровень пользователя: 2">
        <span class="level-number">2</span>
      </div>

      <div class="sidebar-balance" v-if="isOpen">
        <div class="balance-item">
          <span class="balance-icon">💰</span>
          <span class="balance-value">{{ user?.balance?.toLocaleString() || '150,000' }}</span>
        </div>
        <div class="balance-item">
          <span class="balance-label">USDT</span>
          <span class="balance-count">{{ Math.floor((user?.balance || 150000) / 100) }}</span>
          <span class="balance-wallets">КОШЕЛЕК</span>
        </div>
      </div>

      <nav class="sidebar-menu">
        <NuxtLink
            @click="$emit('navigate-home')"
            :data-tooltip="!isOpen ? 'Главная' : ''">
          <div class="menu-icon-wrapper">
            <span class="menu-icon">🏠</span>
          </div>
          <span class="menu-text" v-if="isOpen">ГЛАВНАЯ</span>
        </NuxtLink>

        <NuxtLink
            to="/investments"
            class="menu-item"
            :data-tooltip="!isOpen ? 'Инвестиции' : ''">
          <div class="menu-icon-wrapper">
            <span class="menu-icon">📈</span>
          </div>
          <span class="menu-text" v-if="isOpen">ИНВЕСТИЦИИ</span>
        </NuxtLink>

        <NuxtLink
            to="/chests"
            class="menu-item"
            :data-tooltip="!isOpen ? 'Сундуки' : ''">
          <div class="menu-icon-wrapper">
            <span class="menu-icon">🎁</span>
            <span class="menu-badge red">999</span>
          </div>
          <span class="menu-text" v-if="isOpen">СУНДУКИ</span>
        </NuxtLink>

        <NuxtLink
            to="/roulette"
            class="menu-item"
            :data-tooltip="!isOpen ? 'Рулетка' : ''">
          <div class="menu-icon-wrapper">
            <span class="menu-icon">🎰</span>
            <span class="menu-badge green">7</span>
          </div>
          <span class="menu-text" v-if="isOpen">РУЛЕТКА</span>
        </NuxtLink>

        <NuxtLink
            to="/shop"
            class="menu-item"
            :data-tooltip="!isOpen ? 'Магазин' : ''">
          <div class="menu-icon-wrapper">
            <span class="menu-icon">🛒</span>
          </div>
          <span class="menu-text" v-if="isOpen">МАГАЗИН</span>
        </NuxtLink>

        <NuxtLink
            to="/rating"
            class="menu-item"
            :data-tooltip="!isOpen ? 'Рейтинг пользователей' : ''">
          <div class="menu-icon-wrapper">
            <span class="menu-icon">⭐</span>
          </div>
          <span class="menu-text" v-if="isOpen">РЕЙТИНГ ПОЛЬЗОВАТЕЛЕЙ</span>
        </NuxtLink>

        <NuxtLink
            to="/profile"
            class="menu-item"
            :data-tooltip="!isOpen ? 'Профиль пользователя' : ''">
          <div class="menu-icon-wrapper">
            <span class="menu-icon">👤</span>
          </div>
          <span class="menu-text" v-if="isOpen">ПРОФИЛЬ ПОЛЬЗОВАТЕЛЯ</span>
        </NuxtLink>

        <NuxtLink
            to="/support"
            class="menu-item"
            :data-tooltip="!isOpen ? 'Служба поддержки' : ''">
          <div class="menu-icon-wrapper">
            <span class="menu-icon">💬</span>
            <span class="menu-badge green">?</span>
          </div>
          <span class="menu-text" v-if="isOpen">СЛУЖБА ПОДДЕРЖКИ</span>
        </NuxtLink>
      </nav>

      <div class="sidebar-bottom">
        <button class="menu-item referral-btn"
                :data-tooltip="!isOpen ? 'Реферальная ссылка' : ''">
          <div class="menu-icon-wrapper">
            <span class="menu-icon">🔗</span>
          </div>
          <span class="menu-text" v-if="isOpen">ВАША РЕФЕРАЛЬНАЯ ССЫЛКА</span>
          <span class="referral-arrow" v-if="isOpen">→</span>
        </button>

        <div class="verification-warning" v-if="isOpen">
          <span class="warning-icon">⚠</span>
          <div class="warning-text">
            <span>Верификация аккаунта</span>
            Подтвердите свою личность, чтобы получить доступ ко всем возможностям
            <a href="#" class="warning-link">Подтвердить</a>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
defineProps({
  isOpen: Boolean,
  user: Object
})

defineEmits(['toggle', 'logout', 'navigate-home'])

const logoError = ref(false)

const onLogoError = () => {
  logoError.value = true
}
</script>

<style scoped>
.sidebar {
  width: 80px;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  transition: all 0.3s ease;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar--open {
  width: 320px;
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
}

.menu-toggle {
  padding: 20px;
  display: flex;
  justify-content: flex-end;
}

.menu-toggle-btn {
  width: 32px;
  height: 32px;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 6px 0;
}

.menu-toggle-btn span {
  width: 100%;
  height: 3px;
  background: var(--text-primary);
  border-radius: 2px;
  transition: all 0.3s ease;
}

.sidebar--open .menu-toggle-btn span:nth-child(1) {
  transform: rotate(45deg) translate(8px, 8px);
}

.sidebar--open .menu-toggle-btn span:nth-child(2) {
  opacity: 0;
}

.sidebar--open .menu-toggle-btn span:nth-child(3) {
  transform: rotate(-45deg) translate(8px, -8px);
}

.sidebar-logo {
  padding: 20px;
  display: flex;
  justify-content: center;
}

.logo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
}

.logo-img-small {
  width: 40px;
  height: 40px;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
}

.logo-img-large {
  width: 60px;
  height: 60px;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
}

.logo-w {
  font-size: 24px;
  font-weight: 700;
  color: var(--primary-color);
}

.user-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  margin-bottom: 24px;
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
}

.sidebar--open .user-card {
  opacity: 1;
  transform: translateX(0);
}

.user-avatar {
  position: relative;
  width: 48px;
  height: 48px;
  flex-shrink: 0;
}

.user-avatar-inner {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4ade80, #22c55e);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 700;
  color: #0a3d2e;
}

.user-level {
  position: absolute;
  top: -4px;
  right: -4px;
  width: 20px;
  height: 20px;
  background: #f97316;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  color: white;
  border: 2px solid rgba(0, 0, 0, 0.3);
}

.user-info {
  flex: 1;
}

.user-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
}

.user-email {
  font-size: 12px;
  color: var(--text-secondary);
  margin: 4px 0;
}

.user-exit {
  background: none;
  border: none;
  color: #ef4444;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  text-align: left;
  transition: color 0.2s ease;
}

.user-exit:hover {
  color: #dc2626;
}

.user-level-badge {
  width: 24px;
  height: 24px;
  margin: 0 auto 24px;
  background: linear-gradient(135deg, #ff6b35, #f7931e);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.user-level-badge:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);
}

.level-number {
  font-size: 18px;
  font-weight: 700;
  color: white;
}

.sidebar-balance {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  padding: 12px 16px;
  margin: 0 20px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
}

.sidebar--open .sidebar-balance {
  opacity: 1;
  transform: translateX(0);
}

.balance-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.balance-value {
  color: #fbbf24;
  font-weight: 700;
  font-size: 16px;
}

.balance-label {
  color: var(--text-secondary);
  font-size: 12px;
}

.balance-count {
  color: var(--text-primary);
  font-weight: 600;
}

.balance-wallets {
  background: var(--primary-color);
  color: #0a3d2e;
  font-size: 9px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 6px;
  margin-left: 4px;
}

.sidebar-menu {
  flex: 1;
  padding: 0 20px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0;
  margin-bottom: 16px;
  text-decoration: none;
  color: var(--text-secondary);
  font-size: 13px;
  font-weight: 600;
  transition: all 0.3s ease;
  position: relative;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
}

.menu-item.nuxt-link-active {
  color: var(--text-primary);
}

.menu-item.nuxt-link-active .menu-icon-wrapper {
  background: #4ade80;
}

.menu-item.nuxt-link-active .menu-icon {
  filter: invert(1);
}

.menu-item:link,
.menu-item:visited {
  text-decoration: none;
}

.menu-icon-wrapper {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.menu-item:hover .menu-icon-wrapper {
  background: rgba(74, 222, 128, 0.1);
}

.menu-item.active .menu-icon-wrapper,
.menu-item.nuxt-link-active .menu-icon-wrapper {
  background: #4ade80;
}

.menu-item.active .menu-icon,
.menu-item.nuxt-link-active .menu-icon {
  filter: invert(1);
}

.menu-icon {
  font-size: 18px;
}

.menu-text {
  color: var(--text-primary);
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
}

.sidebar--open .menu-text {
  opacity: 1;
  transform: translateX(0);
}

.menu-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 8px;
  min-width: 16px;
  text-align: center;
  font-weight: 700;
  z-index: 2;
}

.menu-badge.red {
  background: #ef4444;
  color: white;
}

.menu-badge.green {
  background: #22c55e;
  color: white;
}

[data-tooltip]:not([data-tooltip=""]) {
  position: relative;
}

.sidebar:not(.sidebar--open) [data-tooltip]:not([data-tooltip=""])::after {
  content: attr(data-tooltip);
  position: fixed;
  left: 92px;
  padding: 8px 12px;
  background: rgba(0, 0, 0, 0.95);
  color: white;
  font-size: 12px;
  font-weight: 500;
  border-radius: 6px;
  white-space: nowrap;
  z-index: 100001;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease, visibility 0.2s ease;
  pointer-events: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar:not(.sidebar--open) [data-tooltip]:not([data-tooltip=""]):hover::after {
  opacity: 1;
  visibility: visible;
  transition-delay: 0.5s;
}

.sidebar:not(.sidebar--open) [data-tooltip]:not([data-tooltip=""])::before {
  content: '';
  position: fixed;
  left: 84px;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 6px 8px 6px 0;
  border-color: transparent rgba(0, 0, 0, 0.95) transparent transparent;
  z-index: 100001;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease, visibility 0.2s ease;
}

.sidebar:not(.sidebar--open) [data-tooltip]:not([data-tooltip=""]):hover::before {
  opacity: 1;
  visibility: visible;
  transition-delay: 0.5s;
}

.sidebar-bottom {
  padding: 0 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 20px;
  margin-top: auto;
}

.referral-btn {
  margin-bottom: 16px;
  justify-content: flex-start;
}

.referral-arrow {
  margin-left: auto;
  font-size: 12px;
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
}

.sidebar--open .referral-arrow {
  opacity: 1;
  transform: translateX(0);
}

.verification-warning {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 12px;
  background: rgba(249, 115, 22, 0.1);
  border: 1px solid rgba(249, 115, 22, 0.2);
  border-radius: 12px;
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
}

.sidebar--open .verification-warning {
  opacity: 1;
  transform: translateX(0);
}

.warning-icon {
  font-size: 16px;
  color: #f97316;
}

.warning-text {
  font-size: 11px;
  color: var(--text-secondary);
  line-height: 1.4;
}

.warning-text span {
  display: block;
  margin-bottom: 4px;
}

.warning-link {
  color: var(--primary-color);
  text-decoration: none;
}

.warning-link:hover {
  text-decoration: underline;
}
</style>