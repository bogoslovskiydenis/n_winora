<template>
  <aside class="sidebar" :class="{ 'sidebar--open': isOpen }">
    <div class="sidebar-content">
      <!-- Кнопка переключения -->
      <div class="menu-toggle">
        <button class="menu-toggle-btn" @click="$emit('toggle')">
          <img
            v-if="!isOpen"
            src="../../assets/images/navbar/burger_nav.svg"
            alt="burger"
            class="toggle-icon"
          />
          <img
            v-else
            src="../../assets/images/navbar/burger_close.svg"
            alt="close"
            class="toggle-icon"
          />
        </button>
      </div>

      <nav class="sidebar-menu">
        <!-- Логотип -->
        <div class="sidebar-logo">
          <div
            class="logo-icon"
            @click="$emit('navigate-home')"
            :data-tooltip="!isOpen ? 'Главная' : ''"
          >
            <img
              v-if="!isOpen"
              src="../../assets/images/navbar/logo_nav.svg"
              alt="W"
              class="logo-img-small"
              @error="onLogoError"
            />
            <img
              v-else
              src="../../assets/images/Winora_logo.png"
              alt="Winora"
              class="logo-img-large"
              @error="onLogoError"
            />
            <span v-if="logoError" class="logo-w">W</span>
          </div>
        </div>

        <!-- Карточка пользователя (только при открытом сайдбаре) -->
        <div class="user-card" v-if="isOpen">
          <div class="user-avatar">
            <div class="avatar-level">
              <img src="../../assets/images/navbar/lvl_nav.svg" />
            </div>
            <div class="avatar-info">
              <span class="level-label">УРОВЕНЬ</span>
            </div>
          </div>
          <div class="user-info">
            <div class="user-name">
              {{ user?.nickname || 'ArcticPulse' }}
            </div>
            <div class="user-email">
              {{ user?.email || 'email@host.com' }}
            </div>
          </div>
          <div class="user-action">
            <img src="../../assets/images/navbar/user_change_icon.svg" />
            <button class="user-exit" @click="$emit('logout')">
              <span>ВЫХОД</span>
            </button>
          </div>
        </div>

        <!-- Уровень пользователя (только при закрытом сайдбаре) -->
        <div
          class="menu-item level-item"
          :data-tooltip="!isOpen ? 'Уровень пользователя: 2' : ''"
          v-if="!isOpen"
        >
          <img
            src="../../assets/images/navbar/lvl_nav.svg"
            alt="Level"
            class="logo-img-small"
          />
        </div>

        <!-- Баланс (только при открытом сайдбаре) -->
        <div class="sidebar-balance" v-if="isOpen">
          <div class="balance-item">
            <span class="balance-icon">💰</span>
            <span class="balance-value">{{
              user?.balance?.toLocaleString() || '10000'
            }}</span>
          </div>

          <div class="balance-item">
            <span class="balance-label">USDT</span>
            <span class="balance-count">{{
              Math.floor((user?.balance || 150000) / 100) || '100'
            }}</span>
          </div>
          <span class="balance-wallets">КОШЕЛЕК</span>
        </div>

        <!-- Пункты меню -->
        <NuxtLink
          to="/investments"
          class="menu-item"
          :data-tooltip="!isOpen ? 'Инвестиции' : ''"
        >
          <span class="menu-text" v-if="isOpen">ИНВЕСТИЦИИ</span>
          <div class="menu-icon-wrapper">
            <img
              src="../../assets/images/navbar/invest_nav.svg"
              alt="Investments"
              class="logo-img-small"
            />
          </div>
        </NuxtLink>

        <NuxtLink
          to="/chest"
          class="menu-item"
          :data-tooltip="!isOpen ? 'Сундуки' : ''"
        >
          <span class="menu-text" v-if="isOpen">Сундуки</span>
          <div class="menu-icon-wrapper">
            <img
              src="../../assets/images/navbar/chest_nav.svg"
              alt="Chest"
              class="logo-img-small"
            />
          </div>
        </NuxtLink>

        <NuxtLink
          to="/spin"
          class="menu-item"
          :data-tooltip="!isOpen ? 'Рулетка' : ''"
        >
          <span class="menu-text" v-if="isOpen">Рулетка</span>
          <div class="menu-icon-wrapper">
            <img
              src="../../assets/images/navbar/Spin_nav.svg"
              alt="Spin"
              class="logo-img-small"
            />
          </div>
        </NuxtLink>

        <NuxtLink
          to="/profile"
          class="menu-item"
          :data-tooltip="!isOpen ? 'Профиль Пользователя' : ''"
        >
          <span class="menu-text" v-if="isOpen">Профиль Пользователя</span>
          <div class="menu-icon-wrapper">
            <img
              src="../../assets/images/navbar/profile.svg"
              alt="Profile"
              class="logo-img-small"
            />
          </div>
        </NuxtLink>

        <NuxtLink
          to="/wallet"
          class="menu-item"
          :data-tooltip="!isOpen ? 'Кошелек' : ''"
        >
          <span class="menu-text" v-if="isOpen">Кошелек</span>
          <div class="menu-icon-wrapper">
            <img
              src="../../assets/images/navbar/wallet_nav.svg"
              alt="Wallet"
              class="logo-img-small"
            />
          </div>
        </NuxtLink>

        <NuxtLink
          to="/basket"
          class="menu-item"
          :data-tooltip="!isOpen ? 'Корзина' : ''"
        >
          <span class="menu-text" v-if="isOpen">Корзина</span>
          <div class="menu-icon-wrapper">
            <img
              src="../../assets/images/navbar/basket_nav.svg"
              alt="Basket"
              class="logo-img-small"
            />
          </div>
        </NuxtLink>

        <NuxtLink
          to="/rating"
          class="menu-item"
          :data-tooltip="!isOpen ? 'Рейтинг пользователей' : ''"
        >
          <span class="menu-text" v-if="isOpen">РЕЙТИНГ ПОЛЬЗОВАТЕЛЕЙ</span>
          <div class="menu-icon-wrapper">
            <img
              src="../../assets/images/navbar/star_nav.svg"
              alt="Rating"
              class="logo-img-small"
            />
          </div>
        </NuxtLink>

        <NuxtLink
          to="/profile"
          class="menu-item"
          :data-tooltip="!isOpen ? 'Профиль пользователя' : ''"
        >
          <span class="menu-text" v-if="isOpen">Служба Поддержки</span>
          <div class="menu-icon-wrapper">
            <img
              src="../../assets/images/navbar/question_nav.svg"
              alt="Profile"
              class="logo-img-small"
            />
          </div>
        </NuxtLink>
      </nav>

      <!-- Нижняя часть сайдбара -->
      <div class="sidebar-bottom">
        <button
          class="menu-item referral-btn"
          :data-tooltip="!isOpen ? 'Реферальная ссылка' : ''"
        >
          <div class="menu-icon-wrapper">
            <img
              src="../../assets/images/navbar/referal_navbar.svg"
              alt="Referral"
              class="logo-img-small"
            />
          </div>
          <span class="menu-text" v-if="isOpen">ВАША РЕФЕРАЛЬНАЯ ССЫЛКА</span>
          <span class="referral-arrow" v-if="isOpen">→</span>
        </button>

        <div class="verification-warning" v-if="isOpen">
          <span class="warning-icon">⚠</span>
          <div class="warning-text">
            <span>Верификация аккаунта</span>
            Подтвердите свою личность, чтобы получить доступ ко всем
            возможностям
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
  user: Object,
});

defineEmits(['toggle', 'logout', 'navigate-home']);

const logoError = ref(false);

const onLogoError = () => {
  logoError.value = true;
};
</script>

<style scoped>
/* Основной контейнер сайдбара */
.sidebar {
  width: 80px;
  background: #000000;
  backdrop-filter: blur(10px);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  transition: width 0.3s ease;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar--open {
  width: 320px;
  background:
    linear-gradient(180deg, #01614b 0%, #032019 100%),
    linear-gradient(0deg, rgba(0, 0, 0, 0.56), rgba(0, 0, 0, 0.56)),
    radial-gradient(
      91.87% 42.67% at 50.13% -9.91%,
      rgba(255, 255, 255, 0.1) 3.42%,
      rgba(255, 255, 255, 0) 100%
    );
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* Переключатель меню */
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
}

.toggle-icon {
  width: 100%;
  height: 100%;
}

/* Логотип */
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
}

.logo-img-small {
  width: 40px;
  height: 40px;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
}

.logo-img-large {
  height: 44px;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
}

.logo-w {
  font-size: 24px;
  font-weight: 700;
  color: var(--primary-color);
}

/* Карточка пользователя */
.user-card {
  padding: 8px;
  display: flex;
  align-items: center;
  gap: 16px;
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
  border-radius: 16px;
  background: url('~/assets/images/navbar/card_bg.png');
  backdrop-filter: blur(10px);
  margin: 0 8px 16px 8px;
}

.sidebar--open .user-card {
  opacity: 1;
  transform: translateX(0);
}

.user-avatar {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.avatar-level {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.level-number {
  font-size: 20px;
  font-weight: 700;
  color: white;
}

.avatar-info {
  display: flex;
  align-items: center;
  gap: 4px;
}

.level-label {
  font-size: 8px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.user-info {
  flex: 1;
}

.user-action {
  display: flex;
  align-items: end;
  flex-direction: column;
  gap: 16px;
}

.user-action img {
  display: flex;
  justify-content: right;
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
  background: #00000033;
  display: flex;
  color: #ffffff;
  border: 1px solid #07cb38;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  text-align: left;
  transition: color 0.2s ease;
  border-radius: 32px;
  width: 76px;
  height: 26px;
  gap: 10px;
  padding: 8px 16px;
  align-items: center;
  justify-content: center;
}

/* Баланс */
.sidebar-balance {
  padding: 0 8px 0 8px;
  background: #00aa6926;
  height: 42px;
  gap: 8px;
  border-radius: 14px;
  border-top: 1px solid #ffffff0d;
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
  width: 110px;
  background: #00000040;
  height: 26px;
  gap: 4px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  opacity: 1;
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
  display: flex;
  height: 26px;
  width: 100%;
  background: #07cb38;
  color: #070202;
  font-size: 9px;
  font-weight: 700;
  padding: 2px 6px;
  align-items: center;
  border-radius: 32px;
  justify-content: center;
}

/* Меню */
.sidebar-menu {
  flex: 1;
  padding: 0 20px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.3s ease;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  background: none;
  width: 100%;
  justify-content: space-between;
  color: var(--text-primary);
}

.menu-item:hover .menu-icon-wrapper {
  background: rgba(74, 222, 128, 0.1);
}

.menu-item.nuxt-link-active {
  color: var(--primary-color);
}

.level-item {
  justify-content: center;
}

.menu-icon-wrapper {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.menu-text {
  color: inherit;
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

/* Тултипы */
[data-tooltip]:not([data-tooltip='']) {
  position: relative;
}

.sidebar:not(.sidebar--open) [data-tooltip]:not([data-tooltip=''])::after {
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
  transition:
    opacity 0.2s ease,
    visibility 0.2s ease;
  pointer-events: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar:not(.sidebar--open)
  [data-tooltip]:not([data-tooltip='']):hover::after {
  opacity: 1;
  visibility: visible;
  transition-delay: 0.5s;
}

/* Нижняя часть */
.sidebar-bottom {
  padding: 0 20px 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 20px;
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
