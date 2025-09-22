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
          to="/shop"
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
          to="/support"
          class="menu-item"
          :data-tooltip="!isOpen ? 'Служба поддержки' : ''"
        >
          <span class="menu-text" v-if="isOpen">Служба Поддержки</span>
          <div class="menu-icon-wrapper">
            <img
              src="../../assets/images/navbar/question_nav.svg"
              alt="Support"
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
          <span class="menu-text-ref" v-if="isOpen"
            >ВАША РЕФЕРАЛЬНАЯ ССЫЛКА</span
          >
          <span class="referral-arrow" v-if="isOpen">→</span>
        </button>

        <div class="verification-warning" v-if="isOpen">
          <span class="warning-icon">⚠</span>
          <div class="warning-text">
            <span>Вы не верифицированы.</span>
            Перейдите в
            <a href="#" class="warning-link">профиль пользователя</a> для
            загрузки документов.
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
  width: 374px;
  background: linear-gradient(180deg, #01614b 0%, #032019 100%);
  box-shadow: 9px 0 19.7px 0 #00000040;
  padding: 16px 24px;
  gap: 16px;
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
  color: #4ade80;
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
  width: 326px;
  height: 84px;
  border-top-width: 1px;
  margin-bottom: 16px;
  justify-content: center;
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

.user-action img {
  display: flex;
  justify-content: right;
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
  width: 326px;
  gap: 8px;
  border-radius: 14px;
  border-top: 1px solid #ffffff0d;
  display: flex;
  align-items: center;
  justify-content: space-between;
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

.menu-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.3s ease;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  background: none;
  width: 100%;
  color: #ffffff;
}

/* Когда меню закрыто - иконка по центру */
.sidebar:not(.sidebar--open) .menu-item {
  justify-content: center;
}

/* Когда меню открыто - текст слева, иконка справа */
.sidebar--open .menu-item {
  justify-content: space-between;
}

.menu-item:hover .menu-icon-wrapper {
  background: rgba(74, 222, 128, 0.1);
}

.menu-item.nuxt-link-active {
  color: #4ade80;
}

.level-item {
  justify-content: center;
}

/* Стили для обертки иконок меню */
.menu-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

/* Когда меню открыто */
.sidebar--open .menu-icon-wrapper {
  justify-content: flex-end;
}

.menu-icon-wrapper img {
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
  min-height: 42px;
  gap: 10px;
  border-radius: 32px;
}

.referral-btn {
  margin-bottom: 16px;
  justify-content: flex-start;
}

.sidebar--open .referral-btn {
  width: 326px;
  gap: 10px;
  padding: 12px 16px;
  border-radius: 32px;
  border: 1px solid #07cb38;
}

.menu-text-ref {
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 100%;
  text-align: center;
  text-transform: uppercase;
  color: #ffffff;
}

.referral-arrow {
  margin-left: auto;
  font-size: 12px;
}

.verification-warning {
  display: flex;
  gap: 16px;
  border-radius: 14px;
  border-top-width: 1px;
  padding: 16px;
  background: #00aa6926;
  border-top: 1px solid #ffffff0d;
  box-shadow: 0px 1px 5px 0px #00000040;
  width: 326px;
}

.warning-icon {
  font-size: 50px;
  color: #f97316;
}

.warning-text {
  font-family: Roboto, sans-serif;
  font-weight: 700;
  font-size: 14px;
  line-height: 100%;
}

.warning-text span {
  display: block;
  margin-bottom: 4px;
}

.warning-link {
  color: #f97c39;
  text-decoration: none;
}

.warning-link:hover {
  text-decoration: underline;
}
</style>
