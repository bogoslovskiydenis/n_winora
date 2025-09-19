import { ref, computed } from 'vue';

// Глобальное реактивное состояние
const investments = ref([
  {
    id: '3457',
    name: 'ИНВЕСТИЦИЯ №3457',
    type: 'gambling',
    preset: 'aggressive',
    status: 'active',
    amount: 200,
    currentProfit: 45,
    totalProfit: 60,
    availableProfit: 25,
    profitability: '25 USD / Week',
    riskLevel: 15,
    progress: 65,
    createdAt: new Date().toISOString().split('T')[0],
    description: 'При покрытии депозита данной стратегией в прибыли...',
    strategy: 'Агрессивная',
    profitTimeframe: 'через 3 дня',
    isProfitable: true,
    settings: {
      highRtp: true,
      casinoParticipation: true,
      autoSlotChange: false,
      slotSelection: true,
      platformDistribution: false,
      minimalStakes: true,
    },
  },
]);

export const useInvestments = () => {
  const getAllInvestments = computed(() => investments.value);

  const getInvestmentsByStatus = (status) => {
    return computed(() =>
      investments.value.filter((investment) => investment.status === status)
    );
  };

  const getInvestmentById = (id) => {
    return computed(() =>
      investments.value.find((investment) => investment.id === id)
    );
  };

  const getTotalStats = computed(() => {
    const total = investments.value.length;
    const active = investments.value.filter(
      (i) => i.status === 'active'
    ).length;
    const totalAmount = investments.value.reduce((sum, i) => sum + i.amount, 0);
    const totalProfit = investments.value.reduce(
      (sum, i) => sum + i.currentProfit,
      0
    );

    return {
      total,
      active,
      totalAmount,
      totalProfit,
    };
  });

  // Вспомогательные функции
  const generateInvestmentId = () => {
    const nextNumber = investments.value.length + 1;
    return nextNumber.toString();
  };

  const calculateRiskLevel = (preset) => {
    const riskLevels = {
      conservative: 2,
      balanced: 8,
      aggressive: 15,
      user: 5,
    };
    return riskLevels[preset] || 5;
  };

  const getStrategyName = (preset) => {
    const strategyNames = {
      conservative: 'Консервативная',
      balanced: 'Сбалансированная',
      aggressive: 'Агрессивная',
      user: 'Пользовательская',
    };
    return strategyNames[preset] || 'Пользовательская';
  };

  const generateDescription = (investmentData) => {
    const typeText =
      investmentData.bettingMode === 'gambling' ? 'гэмблинга' : 'беттинга';
    const strategyText = getStrategyName(investmentData.preset).toLowerCase();

    return `Инвестиция в ${typeText} со ${strategyText} стратегией. Ожидаемая доходность: ${investmentData.profitability}`;
  };

  const calculateProfitTimeframe = (preset) => {
    const timeframes = {
      conservative: 'через 7-10 дней',
      balanced: 'через 5-7 дней',
      aggressive: 'через 2-4 дня',
      user: 'через 5-7 дней',
    };
    return timeframes[preset] || 'через 5-7 дней';
  };

  // создаем инвестицию
  const createInvestment = (investmentData) => {
    // Генерируем уникальный ID
    const id = generateInvestmentId();

    // Создаем объект инвестиции
    const newInvestment = {
      id,
      name: `ИНВЕСТИЦИЯ №${id}`, // Теперь корректно добавляем номер
      type: investmentData.bettingMode, // 'gambling' или 'betting'
      preset: investmentData.preset,
      status: 'active', // новая инвестиция сразу активна
      amount: investmentData.amount || 100,
      currentProfit: 0, // начальная прибыль
      totalProfit: 0,
      availableProfit: 0,
      profitability: investmentData.profitability,
      riskLevel: calculateRiskLevel(investmentData.preset),
      progress: 0, // начальный прогресс
      createdAt: new Date().toISOString().split('T')[0],
      description: generateDescription(investmentData),
      strategy: getStrategyName(investmentData.preset),
      profitTimeframe: calculateProfitTimeframe(investmentData.preset),
      isProfitable: true, // предполагаем что новая инвестиция прибыльная
      settings: investmentData.settings || {},
    };

    // Добавляем в конец списка (новые инвестиции справа)
    investments.value.push(newInvestment);

    console.log('Создана новая инвестиция:', {
      id: newInvestment.id,
      name: newInvestment.name,
      type: newInvestment.type,
      strategy: newInvestment.strategy,
    });

    // Возвращаем созданную инвестицию
    return newInvestment;
  };

  const updateInvestment = (id, updateData) => {
    const index = investments.value.findIndex(
      (investment) => investment.id === id
    );
    if (index !== -1) {
      investments.value[index] = { ...investments.value[index], ...updateData };
      return investments.value[index];
    }
    return null;
  };

  const removeInvestment = (id) => {
    const index = investments.value.findIndex(
      (investment) => investment.id === id
    );
    if (index !== -1) {
      investments.value.splice(index, 1);
      return true;
    }
    return false;
  };

  return {
    investments: getAllInvestments,

    getAllInvestments,
    getInvestmentsByStatus,
    getInvestmentById,
    getTotalStats,
    createInvestment,
    updateInvestment,
    removeInvestment,
  };
};
