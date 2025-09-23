<template>
  <div class="shop-section">
    <!-- Инвестиционные предложения -->
    <div class="shop-category">
      <div class="category-header">
        <img
          src="./../../assets/images/shop/spin.svg"
          alt="Promo"
          class="category-icon"
        />
        <h2 class="category-title">ИНВЕСТИЦИОННЫЕ ПРЕДЛОЖЕНИЯ</h2>
      </div>

      <!-- Ряд баннеров инвестиций -->
      <div class="investment-banners-row">
        <div class="investment-banner-section">
          <div class="investment-banner">
            <!-- Заголовок -->
            <div class="banner-header">
              <h2 class="banner-title">Время выбрать</h2>
              <h1 class="banner-main-title">ИНВЕСТИЦИИ</h1>
            </div>

            <!-- Иконки портфелей/сундуков -->
            <div class="investment-cases">
              <img src="./../../assets/images/cheast_1.png" />
            </div>

            <!-- Кнопка действия -->
            <button class="investment-buy-btn" @click="handleInvestmentClick">
              КУПИТЬ
            </button>
          </div>
        </div>

        <div class="investment-banner-section">
          <div class="investment-banner">
            <!-- Заголовок -->
            <div class="banner-header">
              <h2 class="banner-title">Время выбрать</h2>
              <h1 class="banner-main-title">ИНВЕСТИЦИИ</h1>
            </div>

            <!-- Иконки портфелей/сундуков -->
            <div class="investment-cases">
              <img src="./../../assets/images/cheast_1.png" />
            </div>

            <!-- Кнопка действия -->
            <button class="investment-buy-btn" @click="handleInvestmentClick">
              КУПИТЬ
            </button>
          </div>
        </div>
        <div class="investment-banner-section">
          <div class="investment-banner">
            <!-- Заголовок -->
            <div class="banner-header">
              <h2 class="banner-title">Время выбрать</h2>
              <h1 class="banner-main-title">ИНВЕСТИЦИИ</h1>
            </div>

            <!-- Иконки портфелей/сундуков -->
            <div class="investment-cases">
              <img src="./../../assets/images/cheast_1.png" />
            </div>

            <!-- Кнопка действия -->
            <button class="investment-buy-btn" @click="handleInvestmentClick">
              КУПИТЬ
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Сундуки -->
    <div class="shop-category">
      <div class="category-header">
        <img
          src="./../../assets/images/shop/account_balance_wallet.svg"
          alt="Chest"
          class="category-icon"
        />
        <h2 class="category-title">СУНДУКИ</h2>
      </div>

      <div class="items-grid">
        <div class="shop-item" v-for="chest in chests" :key="chest.id">
          <div class="item-image">
            <img :src="chest.image" :alt="chest.name" />
          </div>
          <div class="item-info">
            <div class="item-name">{{ chest.name }}</div>
            <div class="item-description">
              <span class="description-first">{{
                chest.description.firstPart
              }}</span>
              <span class="description-second">{{
                chest.description.secondPart
              }}</span>
            </div>
            <div class="item-price">
              <img
                src="./../../assets/images/shop/balance-icon.svg"
                alt="Coin"
                class="price-icon"
              />
              <span class="price-value">{{ chest.price }}</span>
            </div>
          </div>
          <button class="buy-button" @click="buyItem(chest)">
            <span> КУПИТЬ </span>
          </button>
        </div>
      </div>
    </div>

    <!-- Бонусные инвестиции -->
    <div class="shop-category">
      <div class="category-header">
        <img
          src="./../../assets/images/shop/invest.svg"
          alt="Bonus"
          class="category-icon"
        />
        <h2 class="category-title">БОНУСНЫЕ ИНВЕСТИЦИИ</h2>
      </div>

      <div class="items-grid">
        <div
          class="shop-item"
          v-for="bonus in bonusInvestments"
          :key="bonus.id"
        >
          <div class="item-image">
            <img :src="bonus.image" :alt="bonus.name" />
          </div>
          <div class="item-info">
            <div class="item-name">{{ bonus.name }}</div>
            <div class="item-description">
              <span class="description-first">{{
                bonus.description.firstPart
              }}</span>
              <span class="description-second">{{
                bonus.description.secondPart
              }}</span>
            </div>
            <div class="item-price">
              <img
                src="./../../assets/images/shop/balance-icon.svg"
                alt="Coin"
                class="price-icon"
              />
              <span class="price-value">{{ bonus.price }}</span>
            </div>
          </div>
          <button class="buy-button" @click="buyItem(bonus)">
            <span> КУПИТЬ </span>
          </button>
        </div>
      </div>
    </div>

    <!-- Кастомизация профиля -->
    <div class="shop-category">
      <div class="category-header">
        <img
          src="./../../assets/images/shop/brush.svg"
          alt="Planet"
          class="category-icon"
        />
        <h2 class="category-title">КАСТОМИЗАЦИЯ ПРОФИЛЯ</h2>
      </div>

      <div class="items-grid">
        <div class="shop-item" v-for="planet in planets" :key="planet.id">
          <div class="item-image">
            <img :src="planet.image" :alt="planet.name" />
          </div>
          <div class="item-info">
            <div class="item-name">{{ planet.name }}</div>
            <div class="item-description">
              <span class="description-first">{{
                planet.description.firstPart
              }}</span>
              <span class="description-second">{{
                planet.description.secondPart
              }}</span>
            </div>
            <div class="item-price">
              <img
                src="./../../assets/images/shop/balance-icon.svg"
                alt="Coin"
                class="price-icon"
              />
              <span class="price-value">{{ planet.price }}</span>
            </div>
          </div>
          <button class="buy-button" @click="buyItem(planet)">
            <span>КУПИТЬ</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import img from '../../assets/images/shop/Box.svg';
import img2 from '../../assets/images/shop/box2.svg';
import img3 from '../../assets/images/shop/box3.svg';
import img4 from '../../assets/images/shop/box4.svg';
import img5 from '../../assets/images/shop/box5.svg';

import bonus1 from '../../assets/images/shop/bonus1.svg';
import bonus2 from '../../assets/images/shop/bonus2.svg';
import bonus3 from '../../assets/images/shop/bonus3.svg';
import bonus4 from '../../assets/images/shop/bonus4.svg';
import profil1 from '../../assets/images/shop/profil1.svg';
import profi2 from '../../assets/images/shop/profil2.svg';
import profi3 from '../../assets/images/shop/profil3.svg';
import profi4 from '../../assets/images/shop/profil4.svg';
import profi5 from '../../assets/images/shop/profil5.svg';

// Данные для сундуков
const chests = ref([
  {
    id: 1,
    name: 'Золотой  сундук',
    description: {
      firstPart: 'Дает шанс',
      secondPart: ' получить USTD',
    },
    price: '100',
    image: img,
  },
  {
    id: 2,
    name: 'Золотой  сундук',
    description: {
      firstPart: 'Дает шанс',
      secondPart: ' получить USTD',
    },
    price: '100',
    image: img,
  },
  {
    id: 3,
    name: 'Огненный  сундук',
    description: {
      firstPart: 'Дает бонус к',
      secondPart: ' приросту доходности',
    },
    price: '150',
    image: img2,
  },
  {
    id: 4,
    name: 'Огненный  сундук',
    description: {
      firstPart: 'Дает бонус к',
      secondPart: ' приросту доходности',
    },
    price: '150',
    image: img2,
  },
  {
    id: 5,
    name: 'Неоновый  сундук',
    description: {
      firstPart: 'Поднять',
      secondPart: 'рейтинг',
    },
    price: '120',
    image: img3,
  },
  {
    id: 6,
    name: 'Неоновый  сундук',
    description: {
      firstPart: 'Поднять',
      secondPart: ' рейтинг',
    },
    price: '120',
    image: img3,
  },
  {
    id: 7,
    name: 'Солнечный  сундук',
    description: {
      firstPart: 'Дает бонус к',
      secondPart: ' приросту доходности',
    },
    price: '100',
    image: img4,
  },
  {
    id: 8,
    name: 'Солнечный  сундук',
    description: {
      firstPart: 'Дает бонус к',
      secondPart: ' приросту доходности',
    },
    price: '100',
    image: img4,
  },
  {
    id: 9,
    name: 'Огненный  сундук',
    description: {
      firstPart: 'Дает бонус к',
      secondPart: ' приросту доходности',
    },
    price: '150',
    image: img5,
  },
]);

// Данные для бонусных инвестиций (ОБНОВЛЕНО)
const bonusInvestments = ref([
  {
    id: 1,
    name: 'Замороженная инвестиция',
    description: {
      firstPart: 'Дает бонус',
      secondPart: ' с 5% скидкой',
    },
    price: '11',
    image: bonus1,
  },
  {
    id: 2,
    name: 'Замороженная инвестиция',
    description: {
      firstPart: 'Дает бонус',
      secondPart: ' с 5% скидкой',
    },
    price: '11',
    image: bonus1,
  },
  {
    id: 3,
    name: 'Золотая инвестиция',
    description: {
      firstPart: 'Стабильный бонус',
      secondPart: ' в 5 USTD / день',
    },
    price: '11',
    image: bonus2,
  },
  {
    id: 4,
    name: 'Золотая инвестиция',
    description: {
      firstPart: 'Стабильный бонус',
      secondPart: ' в 5 USTD / день',
    },
    price: '11',
    image: bonus2,
  },
  {
    id: 5,
    name: 'Горячая инвестиция',
    description: {
      firstPart: 'Дает бонус к',
      secondPart: ' приросту доходности',
    },
    price: '11',
    image: bonus3,
  },
  {
    id: 6,
    name: 'Горячая инвестиция',
    description: {
      firstPart: 'Дает бонус к',
      secondPart: ' приросту доходности',
    },
    price: '11',
    image: bonus3,
  },
  {
    id: 7,
    name: 'Инвестиция',
    description: {
      firstPart: 'Дает бонус',
      secondPart: ' доходности',
    },
    price: '11',
    image: bonus4,
  },
]);

// Данные для планет
const planets = ref([
  {
    id: 1,
    name: 'Заставка профиля "Луна"',
    description: {
      firstPart: 'Отображается в',
      secondPart: ' рейтингах и профиле',
    },
    price: '55',
    image: profil1,
  },
  {
    id: 2,
    name: 'Заставка профиля "Озеро"',
    description: {
      firstPart: 'Отображается в',
      secondPart: ' рейтингах и профиле',
    },
    price: '25',
    image: profi2,
  },
  {
    id: 3,
    name: 'Заставка профиля "Подсолнухи"',
    description: {
      firstPart: 'Отображается в',
      secondPart: ' рейтингах и профиле',
    },
    price: '35',
    image: profi3,
  },
  {
    id: 4,
    name: 'Заставка профиля "Охотник"',
    description: {
      firstPart: 'Отображается в',
      secondPart: ' рейтингах и профиле',
    },
    price: '45',
    image: profi4,
  },
  {
    id: 5,
    name: 'Заставка профиля "Туземун"',
    description: {
      firstPart: 'Отображается в',
      secondPart: ' рейтингах и профиле',
    },
    price: '45',
    image: profi5,
  },
  {
    id: 6,
    name: 'Заставка профиля "Луна"',
    description: {
      firstPart: 'Отображается в',
      secondPart: ' рейтингах и профиле',
    },
    price: '55',
    image: profil1,
  },
]);

// Функция покупки товара
const buyItem = (item) => {
  console.log('Покупка товара:', item);
  // Здесь будет логика покупки
};

// Обработчик клика на кнопку инвестиций
const handleInvestmentClick = () => {
  navigateTo('/investments');
};
</script>

<style scoped>
.shop-section {
  padding-top: 20px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

/* Категории */
.shop-category {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.category-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.category-icon {
  width: 20px;
  height: 20px;
}

.category-title {
  font-family: Tomorrow, sans-serif;
  font-weight: 600;
  font-size: 16px;
  vertical-align: middle;
  text-transform: uppercase;
  color: #ffffff;
}

/* ===========================================
   INVESTMENT BANNERS ROW
   =========================================== */

.investment-banners-row {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.investment-banner-section {
  border-radius: 16px;
  width: 310px;
  height: 219px;
  background-image: url('./../../assets/images/cadrs_investitions_bg.png');
  background-size: cover;
  background-position: center;
  min-width: 310px;
  max-width: 360px;
  padding-bottom: 20px;
  gap: 14px;
  border-top-width: 1px;
  border-right-width: 2px;
  border-bottom-width: 2px;
  border-left-width: 2px;
}

.investment-banner {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 16px;
}

/* ===========================================
   КОНТЕНТ БАННЕРА
   =========================================== */

.banner-header {
  text-align: center;
  z-index: 2;
}

.banner-title {
  font-family: Roboto, sans-serif;
  font-weight: 900;
  font-size: 16px;
  line-height: 12px;
  text-align: center;
  vertical-align: middle;
  color: #ffffff;
}

.banner-main-title {
  font-family: Tomorrow, sans-serif;
  font-weight: 900;
  font-size: 32px;
  line-height: 100%;
  text-align: center;
  text-transform: uppercase;
  color: #07cb38;
}

/* ===========================================
   ИНВЕСТИЦИОННЫЕ ПОРТФЕЛИ
   =========================================== */

.investment-cases {
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 0 auto;
  z-index: 2;
}

.investment-cases img {
  width: 284px;
  height: 93px;
}

/* ===========================================
   КНОПКА ПОКУПКИ
   =========================================== */

.investment-buy-btn {
  background: #f97c39;
  border: none;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  overflow: hidden;
  z-index: 2;
  width: 108px;
  height: 42px;
  min-height: 42px;
  opacity: 1;
  gap: 10px;
  border-radius: 32px;
  padding: 12px 16px;
  color: #070202;
}

.investment-buy-btn:hover {
  background: linear-gradient(135deg, #fb923c 0%, #f97316 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(249, 115, 22, 0.6);
}

/* Сетка товаров */
.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 8px;
  margin-bottom: 40px;
  justify-items: center;
  align-items: end;
  row-gap: 60px;
}

.planets-grid {
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  justify-items: center;
  align-items: end;
}

.shop-item {
  background: url('./../../assets/images/shop/Frame.svg') no-repeat center top;
  background-size: 100% auto;
  border: 2px solid #035116;
  border-radius: 14px 14px 24px 24px;
  width: 140px;
  height: 182px;
  position: relative;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  opacity: 1;
  margin: 0;
  flex-shrink: 0;
}

.shop-item:hover {
  border-color: rgba(0, 178, 125, 0.5);
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(0, 178, 125, 0.2);
}

.shop-item.locked {
  opacity: 0.6;
  pointer-events: none;
}

/* Изображение товара */
.item-image {
  position: absolute;
  top: -16px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.item-image img {
  max-width: 80px;
  max-height: 80px;
  object-fit: contain;
}

.locked-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.8);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lock-icon {
  width: 20px;
  height: 20px;
  filter: brightness(0) saturate(100%) invert(100%);
}

/* Контент товара */
.item-info {
  position: absolute;
  top: 70px; /* Двигаем вниз от изображения */
  left: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: center;
  text-align: center;
  z-index: 2;
}

.item-name {
  font-family: Roboto, sans-serif;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: #07cb38;
  margin-bottom: 4px;
  /* Запрещаем перенос текста */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.locked-text {
  color: rgba(255, 255, 255, 0.5);
}

.item-description {
  font-size: 10px;
  line-height: 12px;
  text-align: center;
  vertical-align: middle;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.description-first {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 10px;
  line-height: 12px;
  letter-spacing: 0%;
  text-align: center;
  vertical-align: middle;
  color: #82ba94;
}

.description-second {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 10px;
  line-height: 12px;
  letter-spacing: 0%;
  text-align: center;
  vertical-align: middle;
  color: #07cb38;
}

.item-price {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  margin: 2px 0;
  width: 64px;
  height: 26px;
  opacity: 1;
  padding-right: 8px;
  padding-left: 1px;
  border-radius: 16px;
  border: 1px solid #00000040;
  background: #00000040;
}

.item-price.disabled {
  opacity: 0.5;
}

.price-icon {
  width: 25px;
  height: 25px;
}

.price-value {
  font-weight: 700;
  font-size: 12px;
  color: #f97316;
}

.buy-button {
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  max-width: 100px;
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  width: 108px;
  height: 42px;
  min-height: 42px;
  padding: 12px 16px;
  gap: 10px;
  border-radius: 32px;
  background: #07cb38;
}

.buy-button span {
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 100%;
  text-align: center;
  vertical-align: middle;
  text-transform: uppercase;
  color: #070202;
}

/* Адаптивность */
@media (max-width: 768px) {
  .investment-banners-row {
    flex-direction: column;
  }

  .investment-banner-section {
    width: 100%;
    max-width: none;
    height: 160px;
  }

  .investment-banner {
    padding: 16px;
    height: 100%;
  }

  .banner-main-title {
    font-size: 22px;
  }

  .investment-cases {
    gap: 12px;
  }

  .investment-buy-btn {
    padding: 10px 24px;
    font-size: 12px;
    width: auto;
    min-width: 100px;
  }

  .items-grid {
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 8px;
    row-gap: 50px;
  }

  .planets-grid {
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  }

  .shop-item {
    max-width: 160px;
  }
}

@media (max-width: 480px) {
  .shop-section {
    gap: 24px;
  }

  .category-title {
    font-size: 14px;
  }

  .investment-banner-section {
    height: 140px;
  }

  .investment-banner {
    padding: 12px;
  }

  .banner-main-title {
    font-size: 18px;
  }

  .investment-buy-btn {
    padding: 8px 20px;
    font-size: 11px;
    min-width: 90px;
    height: 36px;
  }

  .items-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    row-gap: 40px;
  }

  .planets-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .shop-item {
    max-width: 140px;
  }

  .item-image {
    min-height: 100px;
    padding: 12px;
  }

  .item-image img {
    max-width: 60px;
    max-height: 60px;
  }

  .item-name {
    font-size: 12px;
  }

  .item-description {
    font-size: 10px;
  }

  .price-value {
    font-size: 11px;
  }

  .item-buy-button {
    font-size: 9px;
    padding: 6px 16px;
  }
}
</style>
