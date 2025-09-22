<template>
  <div class="shop-section">
    <!-- Акции и предложения -->
    <div class="shop-category">
      <div class="category-header">
        <img src="" alt="Promo" class="category-icon" />
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
        <img src="" alt="Chest" class="category-icon" />
        <h2 class="category-title">СУНДУКИ</h2>
      </div>

      <div class="items-grid">
        <div class="shop-item" v-for="chest in chests" :key="chest.id">
          <div class="item-image">
            <img :src="chest.image" :alt="chest.name" />
          </div>
          <div class="item-info">
            <div class="item-name">{{ chest.name }}</div>
            <div class="item-price">
              <img src="" alt="Coin" class="price-icon" />
              <span class="price-value">{{ chest.price }}</span>
            </div>
            <button class="buy-button" @click="buyItem(chest)">КУПИТЬ</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Бонусные инвестиции -->
    <div class="shop-category">
      <div class="category-header">
        <img src="" alt="Bonus" class="category-icon" />
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
              <img src="" alt="Coin" class="price-icon" />
              <span class="price-value">USD {{ bonus.price }}</span>
            </div>
            <button class="buy-button" @click="buyItem(bonus)">КУПИТЬ</button>
          </div>
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
              <img src="" alt="Coin" class="price-icon" />
              <span class="price-value">USD 95</span>
            </div>
            <button class="buy-button disabled" disabled>ЗАБЛОКИРОВАНО</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Кастомизация профиля -->
    <div class="shop-category">
      <div class="category-header">
        <img src="" alt="Planet" class="category-icon" />
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
              <img src="" alt="Coin" class="price-icon" />
              <span class="price-value">{{ planet.price }}</span>
            </div>
            <button class="buy-button" @click="buyItem(planet)">КУПИТЬ</button>
          </div>
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
    price: '15$',
    image: img,
  },
  {
    id: 2,
    name: 'Обычный сундук',
    price: '15$',
    image: img,
  },
  {
    id: 3,
    name: 'Редкий сундук',
    price: '18$',
    image: img,
  },
  {
    id: 4,
    name: 'Редкий сундук',
    price: '19$',
    image: img,
  },
  {
    id: 5,
    name: 'Эпический сундук',
    price: '19$',
    image: img,
  },
  {
    id: 6,
    name: 'Эпический сундук',
    price: '18$',
    image: img,
  },
  {
    id: 7,
    name: 'Золотой сундук',
    price: '39$',
    image: img,
  },
  {
    id: 8,
    name: 'Легендарный сундук',
    price: '19$',
    image: img,
  },
  {
    id: 9,
    name: 'Легендарный сундук',
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
    price: '11$',
    image: img,
  },
  {
    id: 2,
    name: 'Инвестиционная сделка',
    description: 'Гарантированная прибыль',
    price: '11$',
    image: img,
  },
  {
    id: 3,
    name: 'Золотая инвестиция',
    description: 'Премиум доходность',
    price: '11$',
    image: img,
  },
  {
    id: 4,
    name: 'Золотая инвестиция',
    description: 'Премиум доходность',
    price: '11$',
    image: img,
  },
  {
    id: 5,
    name: 'Горячая инвестиция',
    description: 'Высокая прибыльность',
    price: '11$',
    image: img,
  },
  {
    id: 6,
    name: 'Горячая инвестиция',
    description: 'Высокая прибыльность',
    price: '11$',
    image: img,
  },
]);

// Данные для планет
const planets = ref([
  {
    id: 1,
    name: 'Земля',
    price: '8$',
    image: img,
  },
  {
    id: 2,
    name: 'Луна',
    price: '9$',
    image: img,
  },
  {
    id: 3,
    name: 'Марс',
    price: '8$',
    image: img,
  },
  {
    id: 4,
    name: 'Юпитер',
    price: '8$',
    image: img,
  },
  {
    id: 5,
    name: 'Сатурн',
    price: '8$',
    image: img,
  },
  {
    id: 6,
    name: 'Нептун',
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
  width: 24px;
  height: 24px;
  filter: brightness(0) saturate(100%) invert(42%) sepia(93%) saturate(1352%)
    hue-rotate(87deg) brightness(119%) contrast(119%);
}

.category-title {
  font-family: 'Tomorrow', sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: #00b27d;
  margin: 0;
  letter-spacing: 1px;
  text-transform: uppercase;
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
.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.planets-grid {
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
}

/* Товары */
.shop-item {
  background: rgba(0, 170, 105, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px 14px 24px 24px;
  padding: 16px 12px 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: all 0.3s ease;
  position: relative;
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

.item-image {
  width: 100%;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
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

.item-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  text-align: center;
}

.item-name {
  font-family: 'Roboto', sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.item-description {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 4px;
}

.item-price {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
}

.item-price.disabled {
  opacity: 0.5;
}

.price-icon {
  width: 16px;
  height: 16px;
}

.price-value {
  font-weight: 700;
  font-size: 14px;
  color: #f97316;
}

.buy-button {
  background: #00b27d;
  color: #ffffff;
  border: none;
  padding: 8px 20px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  min-height: 32px;
}

.buy-button:hover:not(:disabled) {
  background: #22c55e;
  transform: translateY(-1px);
}

.buy-button:disabled,
.buy-button.disabled {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.5);
  cursor: not-allowed;
  transform: none;
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
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 12px;
  }

  .planets-grid {
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
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
  }

  .planets-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .shop-item {
    padding: 12px 8px 8px;
  }

  .item-image {
    height: 100px;
  }

  .item-image img {
    max-width: 60px;
    max-height: 60px;
  }
}
</style>
