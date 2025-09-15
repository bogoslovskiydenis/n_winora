<template>
  <nav
    class="mobile-bottom-nav"
    :class="{ 'mobile-bottom-nav--hidden': !isVisible }"
  >
    <NuxtLink
      to="/shop"
      class="nav-item"
      :class="{ 'nav-item--active': activeRoute === 'shop' }"
    >
      <div class="nav-item__icon-wrapper">
        <img
          :alt="''"
          src="./../../assets/images/mobile_sidebar/mobile_nav_bucket.svg"
        />
        <span v-if="shopBadge" class="nav-item__badge red">{{
          shopBadge
        }}</span>
      </div>
      <span class="nav-item__label">Магазин</span>
    </NuxtLink>

    <NuxtLink
      to="/investments/create"
      class="nav-item"
      :class="{ 'nav-item--active': activeRoute === 'investments-create' }"
    >
      <div class="nav-item__icon-wrapper">
        <img
          :alt="''"
          src="./../../assets/images/mobile_sidebar/create_invest.svg"
        />
      </div>
      <span class="nav-item__label">Создать<br />инвестицию</span>
    </NuxtLink>

    <NuxtLink
      to="/investments"
      class="nav-item"
      :class="{ 'nav-item--active': activeRoute === 'investments' }"
    >
      <div class="nav-item__icon-wrapper">
        <img :alt="''" src="./../../assets/images/mobile_sidebar/invest.svg" />
        <span v-if="investmentsBadge" class="nav-item__badge green">{{
          investmentsBadge
        }}</span>
      </div>
      <span class="nav-item__label">Мои<br />инвестиции</span>
    </NuxtLink>

    <button
      class="nav-item nav-item--menu"
      :class="{ 'nav-item--active': showMenu }"
      @click="toggleMenu"
    >
      <div class="nav-item__icon-wrapper">
        <img :alt="''" src="./../../assets/images/navbar/burger_nav.svg" />
      </div>
      <span class="nav-item__label">Меню</span>
    </button>
  </nav>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  user: {
    type: Object,
    default: () => ({}),
  },
  activeRoute: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['logout', 'navigate', 'toggle-menu']);

// Состояние компонента
const showMenu = ref(false);
const isVisible = ref(true);

// Вычисляемые свойства
// Бейджи для уведомлений (можно получать из store или API)
const shopBadge = ref(null);
const investmentsBadge = ref(null);

// Методы
const toggleMenu = () => {
  showMenu.value = !showMenu.value;
  emit('toggle-menu', showMenu.value);
};

// Закрытие меню при смене роута
watch(
  () => props.activeRoute,
  () => {
    showMenu.value = false;
    emit('toggle-menu', false);
  }
);
</script>

<style scoped>
/* Основная навигация */
.mobile-bottom-nav {
  background: radial-gradient(
    66.23% 145.07% at 50.13% -56.34%,
    #353535 51.68%,
    #202020 100%
  );
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 8px 0 calc(8px + env(safe-area-inset-bottom));
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.mobile-bottom-nav--hidden {
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

/* Элементы навигации */
.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 12px;
  transition: all 0.3s ease;
  min-width: 60px;
  background: none;
  border: none;
  font-family: inherit;
  cursor: pointer;
}

.nav-item:hover,
.nav-item--active {
  color: #4ade80;
  background: rgba(74, 222, 128, 0.1);
}

.nav-item__icon-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-item__icon-wrapper img {
  width: 24px;
  height: 24px;
}

.nav-item__label {
  font-size: 10px;
  font-weight: 600;
  text-align: center;
  line-height: 1.2;
  letter-spacing: 0.3px;
}

.nav-item__badge {
  position: absolute;
  top: -4px;
  right: -4px;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 8px;
  min-width: 16px;
  text-align: center;
  font-weight: 700;
  line-height: 1;
}

.nav-item__badge.red {
  background: #ef4444;
  color: white;
}

.nav-item__badge.green {
  background: #22c55e;
  color: white;
}

/* Адаптивность */
@media (max-width: 480px) {
  .nav-item {
    padding: 6px 8px;
    min-width: 50px;
  }

  .nav-item__label {
    font-size: 9px;
  }

  .nav-item__icon-wrapper img {
    width: 20px;
    height: 20px;
  }
}

/* Скрытие на больших экранах */
@media (min-width: 1024px) {
  .mobile-bottom-nav {
    display: none;
  }
}
</style>
