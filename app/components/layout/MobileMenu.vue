<template>
  <!-- Выдвижное меню -->
  <Transition name="menu-slide">
    <div v-if="showMenu" class="mobile-menu-overlay" @click="closeMenu">
      <div class="mobile-menu" @click.stop>
        <div class="mobile-menu__header">
          <div class="logo-section">
            <div class="logo-icon" @click="$emit('navigate-home')">
              <img
                src="../../assets/images/Winora_logo.png"
                alt="Winora"
                class="logo-img"
                @error="onLogoError"
              />
              <span v-if="logoError" class="logo-w">W</span>
            </div>
          </div>
          <button class="mobile-menu__close" @click="closeMenu">
            <img
              src="../../assets/images/navbar/burger_close.svg"
              alt="close"
              class="close-icon"
            />
          </button>
        </div>

        <div class="mobile-menu__content">
          <!-- Карточка пользователя -->
          <div class="user-card">
            <div class="user-avatar">
              <div class="avatar-level">
                <img src="../../assets/images/navbar/lvl_nav.svg" />
              </div>
              <div class="avatar-info">
                <img src="../../assets/images/info.svg" />
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
              <button class="user-exit" @click="handleLogout">
                <span>ВЫХОД</span>
              </button>
            </div>
          </div>

          <!-- Баланс -->
          <div class="sidebar-balance">
            <div class="balance-item">
              <img src="./../../assets/images/balance-icon.svg" />
              <span class="balance-value">{{
                user?.balance?.toLocaleString() || '10000'
              }}</span>
            </div>

            <div class="balance-item-usdt">
              <span class="balance-label">USDT</span>
              <span class="balance-count">{{
                Math.floor((user?.balance || 150000) / 100) || '100'
              }}</span>
            </div>

            <div class="balance-item-btn">
              <span class="balance-wallets">КОШЕЛЕК</span>
            </div>
          </div>

          <!-- Основные разделы -->
          <div class="menu-section">
            <NuxtLink to="/" class="menu-item" @click="closeMenu">
              <div class="menu-icon-wrapper">
                <img
                  src="../../assets/images/navbar/logo_nav.svg"
                  alt="Home"
                  class="menu-icon"
                />
              </div>
              <span class="menu-text">ГЛАВНАЯ</span>
            </NuxtLink>

            <NuxtLink to="/investments" class="menu-item" @click="closeMenu">
              <div class="menu-icon-wrapper">
                <img
                  src="../../assets/images/navbar/invest_nav.svg"
                  alt="Investments"
                  class="menu-icon"
                />
              </div>
              <span class="menu-text">ИНВЕСТИЦИИ</span>
            </NuxtLink>

            <NuxtLink to="/chest" class="menu-item" @click="closeMenu">
              <div class="menu-icon-wrapper">
                <img
                  src="../../assets/images/navbar/chest_nav.svg"
                  alt="Chest"
                  class="menu-icon"
                />
              </div>
              <span class="menu-text">СУНДУКИ</span>
            </NuxtLink>

            <NuxtLink to="/spin" class="menu-item" @click="closeMenu">
              <div class="menu-icon-wrapper">
                <img
                  src="../../assets/images/navbar/Spin_nav.svg"
                  alt="Spin"
                  class="menu-icon"
                />
              </div>
              <span class="menu-text">РУЛЕТКА</span>
            </NuxtLink>

            <NuxtLink to="/profile" class="menu-item" @click="closeMenu">
              <div class="menu-icon-wrapper">
                <img
                  src="../../assets/images/navbar/profile.svg"
                  alt="Profile"
                  class="menu-icon"
                />
              </div>
              <span class="menu-text">ПРОФИЛЬ ПОЛЬЗОВАТЕЛЯ</span>
            </NuxtLink>

            <NuxtLink to="/wallet" class="menu-item" @click="closeMenu">
              <div class="menu-icon-wrapper">
                <img
                  src="../../assets/images/navbar/wallet_nav.svg"
                  alt="Wallet"
                  class="menu-icon"
                />
              </div>
              <span class="menu-text">КОШЕЛЕК</span>
            </NuxtLink>

            <NuxtLink to="/basket" class="menu-item" @click="closeMenu">
              <div class="menu-icon-wrapper">
                <img
                  src="../../assets/images/navbar/basket_nav.svg"
                  alt="Basket"
                  class="menu-icon"
                />
              </div>
              <span class="menu-text">КОРЗИНА</span>
            </NuxtLink>

            <NuxtLink to="/rating" class="menu-item" @click="closeMenu">
              <div class="menu-icon-wrapper">
                <img
                  src="../../assets/images/navbar/star_nav.svg"
                  alt="Rating"
                  class="menu-icon"
                />
              </div>
              <span class="menu-text">РЕЙТИНГ ПОЛЬЗОВАТЕЛЕЙ</span>
            </NuxtLink>

            <NuxtLink to="/support" class="menu-item" @click="closeMenu">
              <div class="menu-icon-wrapper">
                <img
                  src="../../assets/images/navbar/question_nav.svg"
                  alt="Support"
                  class="menu-icon"
                />
              </div>
              <span class="menu-text">СЛУЖБА ПОДДЕРЖКИ</span>
            </NuxtLink>
          </div>

          <div class="menu-divider"></div>

          <!-- Дополнительные функции -->
          <div class="menu-section">
            <button class="menu-item referral-btn" @click="handleReferral">
              <div class="menu-icon-wrapper">
                <img
                  src="../../assets/images/navbar/referal_navbar.svg"
                  alt="Referral"
                  class="menu-icon"
                />
              </div>
              <span class="menu-text">ВАША РЕФЕРАЛЬНАЯ ССЫЛКА</span>
              <span class="referral-arrow">→</span>
            </button>
          </div>

          <!-- Предупреждение о верификации -->
          <div v-if="!isVerified" class="verification-warning">
            <span class="warning-icon">⚠</span>
            <div class="warning-text">
              <span>Вы не верифицированы.</span>
              Перейдите в
              <button class="warning-link" @click="handleVerification">
                профиль пользователя
              </button>
              для загрузки документов.
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  showMenu: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(['close', 'logout', 'navigate-home']);

const logoError = ref(false);

// Вычисляемые свойства
const isVerified = computed(() => props.user?.isVerified || false);

// Методы
const closeMenu = () => {
  emit('close');
  document.body.style.overflow = '';
};

const onLogoError = () => {
  logoError.value = true;
};

const handleLogout = () => {
  closeMenu();
  emit('logout');
};

const handleReferral = () => {
  // Логика копирования реферальной ссылки
  console.log('Копируем реферальную ссылку');
  closeMenu();
};

const handleVerification = () => {
  // Переход к странице верификации
  navigateTo('/profile?tab=verification');
  closeMenu();
};

// Блокировка скролла при открытом меню
watch(
  () => props.showMenu,
  (newValue) => {
    if (newValue) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
);
</script>

<style scoped>
/* Выдвижное меню */
.mobile-menu-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 1001;
  display: flex;
  align-items: flex-end;
}

.mobile-menu {
  background: linear-gradient(180deg, #01614b 0%, #032019 100%);
  width: 100%;
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px 20px 0 0;
  padding: 20px;
  padding-bottom: calc(20px + env(safe-area-inset-bottom));
  max-height: 85vh;
  overflow-y: auto;
}

.mobile-menu__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo-section {
  display: flex;
  align-items: center;
}

.logo-icon {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.logo-img {
  height: 32px;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
}

.logo-w {
  font-size: 24px;
  font-weight: 700;
  color: #4ade80;
}

.mobile-menu__close {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.close-icon {
  width: 24px;
  height: 24px;
}

/* Карточка пользователя */
.user-card {
  padding: 8px;
  display: flex;
  align-items: center;
  gap: 16px;
  border-radius: 16px;
  background: url('~/assets/images/navbar/card_bg.png');
  backdrop-filter: blur(10px);
  height: 84px;
  border-top-width: 1px;
  margin-bottom: 16px;
  justify-content: space-evenly;
}

.user-avatar {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70px;
  height: 68px;
  gap: 8px;
  padding: 8px 8px 4px 4px;
  border-radius: 8px;
  border-bottom-width: 1px;
  background: #00000080;
}

.avatar-level {
  width: 32px;
  height: 32px;
}

.avatar-info {
  display: flex;
  align-items: center;
  gap: 2px;
}

.avatar-info img {
  width: 16px;
  height: 16px;
}

.level-label {
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 10px;
  line-height: 118%;
  text-align: right;
  text-transform: uppercase;
  color: #ffffff;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.user-action {
  display: flex;
  align-items: end;
  flex-direction: column;
  gap: 16px;
}

.user-name {
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 100%;
  color: #00eaff;
}

.user-email {
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 100%;
  color: #ffffff;
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
  margin-bottom: 16px;
}

.balance-item {
  padding-right: 8px;
  width: 110px;
  background: #00000040;
  height: 26px;
  gap: 4px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  padding-left: 1px;
}

.balance-item-usdt {
  justify-content: space-between;
  padding-right: 8px;
  width: 110px;
  background: #00000040;
  height: 26px;
  gap: 4px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  padding-left: 8px;
}

.balance-value {
  font-family: Roboto, sans-serif;
  font-weight: 700;
  font-size: 16px;
  line-height: 100%;
  text-align: left;
  color: #c8c503;
}

.balance-label {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 12px;
  text-align: center;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
}

.balance-count {
  font-family: Roboto, sans-serif;
  font-weight: 700;
  font-size: 16px;
  text-align: right;
  color: #07cb38;
}

.balance-item-btn {
  display: flex;
  background: #07cb38;
  color: #070202;
  width: 74px;
  height: 26px;
  gap: 10px;
  border-radius: 32px;
  justify-content: center;
  align-items: center;
}

.balance-wallets {
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;
  text-align: center;
  text-transform: uppercase;
  color: #070202;
  padding: 8px;
}

/* Элементы меню */
.menu-section {
  margin-bottom: 16px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 16px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  border-radius: 12px;
  margin-bottom: 8px;
  transition: all 0.3s ease;
  background: none;
  border: none;
  font-family: inherit;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  text-align: left;
  justify-content: space-between;
}

.menu-item:hover {
  background: rgba(255, 255, 255, 0.05);
  color: white;
}

.menu-item.nuxt-link-active {
  color: #4ade80;
  background: rgba(74, 222, 128, 0.1);
}

.menu-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-icon {
  width: 24px;
  height: 24px;
}

.menu-text {
  font-family: Tomorrow, sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 100%;
  text-transform: uppercase;
  color: #ffffff;
  flex: 1;
  text-align: left;
}

.menu-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 16px 0;
}

/* Реферальная кнопка */
.referral-btn {
  gap: 10px;
  padding: 12px 16px;
  border-radius: 32px;
  border: 1px solid #07cb38;
  justify-content: flex-start;
}

.referral-arrow {
  margin-left: auto;
  font-size: 12px;
}

/* Предупреждение о верификации */
.verification-warning {
  display: flex;
  gap: 16px;
  border-radius: 14px;
  border-top-width: 1px;
  padding: 16px;
  background: #00aa6926;
  border-top: 1px solid #ffffff0d;
  box-shadow: 0px 1px 5px 0px #00000040;
}

.warning-icon {
  font-size: 20px;
  color: #f97316;
}

.warning-text {
  font-family: Roboto, sans-serif;
  font-weight: 700;
  font-size: 14px;
  line-height: 100%;
  color: rgba(255, 255, 255, 0.8);
}

.warning-text span {
  display: block;
  margin-bottom: 4px;
  color: white;
}

.warning-link {
  background: none;
  border: none;
  color: #f97c39;
  text-decoration: underline;
  cursor: pointer;
  font-family: inherit;
  font-size: 14px;
}

.warning-link:hover {
  text-decoration: none;
}

/* Анимации */
.menu-slide-enter-active,
.menu-slide-leave-active {
  transition: all 0.3s ease;
}

.menu-slide-enter-from,
.menu-slide-leave-to {
  opacity: 0;
}

.menu-slide-enter-from .mobile-menu,
.menu-slide-leave-to .mobile-menu {
  transform: translateY(100%);
}
</style>
