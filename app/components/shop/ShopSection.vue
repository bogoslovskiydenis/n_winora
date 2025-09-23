<template>
  <div class="shop-section">
    <!-- Акции и предложения -->
    <div class="shop-category">
      <div class="category-header">
        <img
          src="./../../assets/images/shop/spin.svg"
          alt="Promo"
          class="category-icon"
        />
        <h2 class="category-title">АКЦИИ И ПРЕДЛОЖЕНИЯ</h2>
      </div>

      <div class="promo-cards">
        <div class="promo-card special-offer">
          <div class="promo-content">
            <div class="promo-badge">СКИДКА 50%</div>
            <div class="promo-title">ИНВЕСТИЦИИ</div>
            <div class="promo-subtitle">Мега скидка на инвестиции</div>
            <button class="promo-button">КУПИТЬ</button>
            <div class="promo-price">USD 75</div>
          </div>
          <div class="promo-image">
            <img src="" alt="Investment Promo" />
          </div>
        </div>

        <div class="promo-card special-offer">
          <div class="promo-content">
            <div class="promo-badge">СКИДКА 30%</div>
            <div class="promo-title">ИНВЕСТИЦИИ</div>
            <div class="promo-subtitle">Выгодное предложение</div>
            <button class="promo-button">КУПИТЬ</button>
            <div class="promo-price">USD 85</div>
          </div>
          <div class="promo-image">
            <img src="" alt="Investment Promo" />
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
            <div class="item-description">{{ chest.description }}</div>
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
          class="shop-item bonus-item"
          v-for="bonus in bonusInvestments"
          :key="bonus.id"
        >
          <div class="item-image">
            <img :src="bonus.image" :alt="bonus.name" />
          </div>
          <div class="item-info">
            <div class="item-name">{{ bonus.name }}</div>
            <div class="item-description">{{ bonus.description }}</div>
            <div class="item-price">
              <img
                src="./../../assets/images/shop/balance-icon.svg"
                alt="Coin"
                class="price-icon"
              />
              <span class="price-value">USD {{ bonus.price }}</span>
            </div>
          </div>
          <button class="buy-button" @click="buyItem(bonus)">
            <span> КУПИТЬ </span>
          </button>
        </div>

        <!-- Специальный блокированный сундук -->
        <div class="shop-item bonus-item locked">
          <div class="item-image">
            <img src="" alt="Locked Chest" />
            <div class="locked-overlay">
              <img src="" alt="Lock" class="lock-icon" />
            </div>
          </div>
          <div class="item-info">
            <div class="item-name">Заблокировано</div>
            <div class="item-description">Достигните уровень 5</div>
            <div class="item-price disabled">
              <img
                src="./../../assets/images/shop/balance-icon.svg"
                alt="Coin"
                class="price-icon"
              />
              <span class="price-value">USD 95</span>
            </div>
          </div>
          <button class="buy-button disabled" disabled>ЗАБЛОКИРОВАНО</button>
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

      <div class="items-grid planets-grid">
        <div
          class="shop-item planet-item"
          v-for="planet in planets"
          :key="planet.id"
        >
          <div class="item-image">
            <img :src="planet.image" :alt="planet.name" />
          </div>
          <div class="item-info">
            <div class="item-name">{{ planet.name }}</div>
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

// Данные для сундуков
const chests = ref([
  {
    id: 1,
    name: 'Обычный сундук',
    description: `Дает шанс получить USTD`,
    price: '15$',
    image: img,
  },
  {
    id: 2,
    name: 'Обычный сундук',
    description: `Дает шанс получить USTD`,
    price: '15$',
    image: img,
  },
  {
    id: 3,
    name: 'Редкий сундук',
    description: `Дает шанс получить USTD`,
    price: '18$',
    image: img,
  },
  {
    id: 4,
    name: 'Редкий сундук',
    description: `Дает шанс получить USTD`,
    price: '19$',
    image: img,
  },
  {
    id: 5,
    name: 'Эпический сундук',
    description: `Дает шанс получить USTD`,
    price: '19$',
    image: img,
  },
  {
    id: 6,
    name: 'Эпический сундук',
    description: `Дает шанс получить USTD`,
    price: '18$',
    image: img,
  },
  {
    id: 7,
    name: 'Золотой сундук',
    description: `Дает шанс получить USTD`,
    price: '39$',
    image: img,
  },
  {
    id: 8,
    name: 'Легендарный сундук',
    description: `Дает шанс получить USTD`,
    price: '19$',
    image: img,
  },
  {
    id: 9,
    name: 'Легендарный сундук',
    description: `Дает шанс получить USTD`,
    price: '39$',
    image: img,
  },
]);

// Данные для бонусных инвестиций
const bonusInvestments = ref([
  {
    id: 1,
    name: 'Инвестиционная сделка',
    description: 'Гарантированная прибыль',
    price: '11',
    image: img,
  },
  {
    id: 2,
    name: 'Инвестиционная сделка',
    description: 'Гарантированная прибыль',
    price: '11',
    image: img,
  },
  {
    id: 3,
    name: 'Золотая инвестиция',
    description: 'Премиум доходность',
    price: '11',
    image: img,
  },
  {
    id: 4,
    name: 'Золотая инвестиция',
    description: 'Премиум доходность',
    price: '11',
    image: img,
  },
  {
    id: 5,
    name: 'Горячая инвестиция',
    description: 'Высокая прибыльность',
    price: '11',
    image: img,
  },
  {
    id: 6,
    name: 'Горячая инвестиция',
    description: 'Высокая прибыльность',
    price: '11',
    image: img,
  },
]);

// Данные для планет
const planets = ref([
  {
    id: 1,
    name: 'Земля',
    description: `Дает шанс получить USTD`,
    price: '8$',
    image: img,
  },
  {
    id: 2,
    name: 'Луна',
    description: `Дает шанс получить USTD`,
    price: '9$',
    image: img,
  },
  {
    id: 3,
    name: 'Марс',
    description: `Дает шанс получить USTD`,
    price: '8$',
    image: img,
  },
  {
    id: 4,
    name: 'Юпитер',
    description: `Дает шанс получить USTD`,
    price: '8$',
    image: img,
  },
  {
    id: 5,
    name: 'Сатурн',
    description: `Дает шанс получить USTD`,
    price: '8$',
    image: img,
  },
  {
    id: 6,
    name: 'Нептун',
    description: `Дает шанс получить USTD`,
    price: '8$',
    image: img,
  },
]);

// Функция покупки товара
const buyItem = (item) => {
  console.log('Покупка товара:', item);
  // Здесь будет логика покупки
};
</script>

<style scoped>
.shop-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 0;
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

/* Промо карточки */
.promo-cards {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}

.promo-card {
  flex: 1;
  background: linear-gradient(
    135deg,
    rgba(185, 43, 255, 0.15) 0%,
    rgba(255, 43, 133, 0.15) 100%
  );
  border: 1px solid rgba(185, 43, 255, 0.3);
  border-radius: 16px;
  padding: 20px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 20px;
  min-height: 120px;
}

.promo-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.promo-badge {
  background: #f97316;
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 8px;
  width: fit-content;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.promo-title {
  font-family: 'Tomorrow', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
  text-transform: uppercase;
}

.promo-subtitle {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 8px;
}

.promo-button {
  background: #00b27d;
  color: #ffffff;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  width: fit-content;
}

.promo-button:hover {
  background: #22c55e;
  transform: translateY(-1px);
}

.promo-price {
  font-size: 14px;
  font-weight: 700;
  color: #00b27d;
  margin-top: 4px;
}

.promo-image {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.promo-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

/* Сетка товаров */

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
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.2;
  max-width: 100%;
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
  .promo-cards {
    flex-direction: column;
  }

  .promo-card {
    flex-direction: column;
    text-align: center;
    min-height: auto;
    gap: 16px;
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
