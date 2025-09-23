import { ref } from 'vue';

// Импорты изображений
import img from '~/assets/images/shop/Box.svg';
import img2 from '~/assets/images/shop/box2.svg';
import img3 from '~/assets/images/shop/box3.svg';
import img4 from '~/assets/images/shop/box4.svg';
import img5 from '~/assets/images/shop/box5.svg';

import bonus1 from '~/assets/images/shop/bonus1.svg';
import bonus2 from '~/assets/images/shop/bonus2.svg';
import bonus3 from '~/assets/images/shop/bonus3.svg';
import bonus4 from '~/assets/images/shop/bonus4.svg';

import profil1 from '~/assets/images/shop/profil1.svg';
import profi2 from '~/assets/images/shop/profil2.svg';
import profi3 from '~/assets/images/shop/profil3.svg';
import profi4 from '~/assets/images/shop/profil4.svg';
import profi5 from '~/assets/images/shop/profil5.svg';

export const useShopData = () => {
  // Данные для сундуков
  const chests = ref([
    {
      id: 1,
      name: 'Золотой сундук',
      description: {
        firstPart: 'Дает шанс',
        secondPart: ' получить USTD',
      },
      price: '100',
      image: img,
    },
    {
      id: 2,
      name: 'Золотой сундук',
      description: {
        firstPart: 'Дает шанс',
        secondPart: ' получить USTD',
      },
      price: '100',
      image: img,
    },
    {
      id: 3,
      name: 'Огненный сундук',
      description: {
        firstPart: 'Дает бонус к',
        secondPart: ' приросту доходности',
      },
      price: '150',
      image: img2,
    },
    {
      id: 4,
      name: 'Огненный сундук',
      description: {
        firstPart: 'Дает бонус к',
        secondPart: ' приросту доходности',
      },
      price: '150',
      image: img2,
    },
    {
      id: 5,
      name: 'Неоновый сундук',
      description: {
        firstPart: 'Поднять',
        secondPart: 'рейтинг',
      },
      price: '120',
      image: img3,
    },
    {
      id: 6,
      name: 'Неоновый сундук',
      description: {
        firstPart: 'Поднять',
        secondPart: ' рейтинг',
      },
      price: '120',
      image: img3,
    },
    {
      id: 7,
      name: 'Солнечный сундук',
      description: {
        firstPart: 'Дает бонус к',
        secondPart: ' приросту доходности',
      },
      price: '100',
      image: img4,
    },
    {
      id: 8,
      name: 'Солнечный сундук',
      description: {
        firstPart: 'Дает бонус к',
        secondPart: ' приросту доходности',
      },
      price: '100',
      image: img4,
    },
    {
      id: 9,
      name: 'Огненный сундук',
      description: {
        firstPart: 'Дает бонус к',
        secondPart: ' приросту доходности',
      },
      price: '150',
      image: img5,
    },
  ]);

  // Данные для бонусных инвестиций
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

  return {
    chests,
    bonusInvestments,
    planets,
  };
};
