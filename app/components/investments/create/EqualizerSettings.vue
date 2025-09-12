<template>
  <div class="investment-card equalizer-card">
    <div class="card-header">
      <img alt="equalizer" src="~/assets/images/equalizer.svg" />
      <h3>ЭКВАЛАЙЗЕР</h3>
    </div>

    <!-- Секция подсказок - управляется общей кнопкой -->
    <InfoBanner
      :show="showHints"
      :title="equalizerTitle()"
      :message="equalizerDescription()"
      variant="equalizer"
      icon="equalizer"
    />

    <div class="equalizer-settings">
      <div class="settings-grid">
        <!-- Левая колонка настроек -->
        <div class="settings-column">
          <!-- Настройки для Гэмблинга -->
          <template v-if="bettingMode === 'gambling'">
            <!-- Высокий RTP слотов -->
            <div class="setting-item">
              <label class="setting-checkbox">
                <input
                  type="checkbox"
                  :checked="localSettings.highRtp"
                  @change="updateSetting('highRtp', $event.target.checked)"
                />
                <span class="checkmark">✓</span>
                <span class="setting-text">Высокий RTP слотов (-96%)</span>
              </label>
              <div class="setting-description">
                Прибыль больше, риски больше
              </div>
            </div>

            <!-- Участие в акциях казино -->
            <div class="setting-item">
              <label class="setting-checkbox">
                <input
                  type="checkbox"
                  :checked="localSettings.casinoParticipation"
                  @change="
                    updateSetting('casinoParticipation', $event.target.checked)
                  "
                />
                <span class="checkmark">✓</span>
                <span class="setting-text">Участие в акциях казино</span>
              </label>
              <div class="setting-description">
                Дополнительные бонусы и акции
              </div>
            </div>

            <!-- Автоматическая смена слота -->
            <div class="setting-item">
              <label class="setting-checkbox">
                <input
                  type="checkbox"
                  :checked="localSettings.autoSlotChange"
                  @change="
                    updateSetting('autoSlotChange', $event.target.checked)
                  "
                />
                <span class="checkmark">✓</span>
                <span class="setting-text"
                  >Автоматическая смена слота после заданного числа
                  выигрышей</span
                >
              </label>
              <div class="setting-description">
                Смена слота для увеличения прибыли
              </div>

              <!-- Поле для ввода количества выигрышей -->
              <div class="wins-input" v-if="localSettings.autoSlotChange">
                <label>Число выигрышей:</label>
                <input
                  type="number"
                  :value="localSettings.winsCount"
                  @input="
                    updateSetting(
                      'winsCount',
                      parseInt($event.target.value) || 100
                    )
                  "
                  min="1"
                  max="999"
                />
              </div>
            </div>
          </template>

          <!-- Настройки для Беттинга -->
          <template v-else>
            <!-- Выбор регионов и континентов -->
            <div class="setting-item">
              <label class="setting-checkbox">
                <input
                  type="checkbox"
                  :checked="localSettings.regionSelection"
                  @change="
                    updateSetting('regionSelection', $event.target.checked)
                  "
                />
                <span class="checkmark">✓</span>
                <span class="setting-text">Выбор регионов и континентов</span>
              </label>
              <div class="setting-description">
                Прибыль больше, риски больше
              </div>

              <!-- Селекторы регионов и континентов -->
              <div
                class="region-selectors"
                v-if="localSettings.regionSelection"
              >
                <div class="selector-group">
                  <CustomSelect
                    v-model="selectedRegion"
                    :options="regionOptions"
                    placeholder="Выбор регионов"
                    @update:modelValue="handleRegionChange"
                  />
                </div>
                <div class="selector-group">
                  <CustomSelect
                    v-model="selectedContinent"
                    :options="continentOptions"
                    placeholder="Выбор континентов"
                    @update:modelValue="handleContinentChange"
                  />
                </div>
              </div>
            </div>

            <!-- Ставки на киберспорт -->
            <div class="setting-item">
              <label class="setting-checkbox">
                <input
                  type="checkbox"
                  :checked="localSettings.esportsBets"
                  @change="updateSetting('esportsBets', $event.target.checked)"
                />
                <span class="checkmark">✓</span>
                <span class="setting-text">Ставки на киберспорт</span>
              </label>
              <div class="setting-description">
                Прибыль больше, риски больше
              </div>
            </div>

            <!-- Инсайды по договорным матчам -->
            <div class="setting-item">
              <label class="setting-checkbox">
                <input
                  type="checkbox"
                  :checked="localSettings.matchFixingInsights"
                  @change="
                    updateSetting('matchFixingInsights', $event.target.checked)
                  "
                />
                <span class="checkmark">✓</span>
                <span class="setting-text">Инсайды по договорным матчам</span>
              </label>
              <div class="setting-description">
                Прибыль больше, риски больше
              </div>
            </div>
          </template>
        </div>

        <!-- Правая колонка настроек -->
        <div class="settings-column">
          <!-- Настройки для Гэмблинга -->
          <template v-if="bettingMode === 'gambling'">
            <!-- Подбор слотов по последнему джекпоту -->
            <div class="setting-item">
              <label class="setting-checkbox">
                <input
                  type="checkbox"
                  :checked="localSettings.slotSelection"
                  @change="
                    updateSetting('slotSelection', $event.target.checked)
                  "
                />
                <span class="checkmark">✓</span>
                <span class="setting-text"
                  >Подбор слотов по последнему джекпоту</span
                >
              </label>
              <div class="setting-description">Поиск "горячих" слотов</div>
            </div>

            <!-- Использование минимальных ставок -->
            <div class="setting-item">
              <label class="setting-checkbox">
                <input
                  type="checkbox"
                  :checked="localSettings.minimalStakes"
                  @change="
                    updateSetting('minimalStakes', $event.target.checked)
                  "
                />
                <span class="checkmark">✓</span>
                <span class="setting-text"
                  >Использование минимальных ставок</span
                >
              </label>
              <div class="setting-description">Контроль рисков при игре</div>
            </div>

            <!-- Распределение средств по игровым платформам -->
            <div class="setting-item">
              <label class="setting-checkbox">
                <input
                  type="checkbox"
                  :checked="localSettings.platformDistribution"
                  @change="
                    updateSetting('platformDistribution', $event.target.checked)
                  "
                />
                <span class="checkmark">✓</span>
                <span class="setting-text"
                  >Распределение средств по игровым платформам</span
                >
              </label>
              <div class="setting-description">Диверсификация рисков</div>

              <!-- Сетка платформ -->
              <div
                class="platforms-grid"
                v-if="localSettings.platformDistribution"
              >
                <label
                  v-for="(platform, index) in gamblingPlatforms"
                  :key="platform.key"
                  class="platform-item"
                >
                  <input
                    type="checkbox"
                    :checked="localSelectedPlatforms[platform.key]"
                    @change="
                      updatePlatform(platform.key, $event.target.checked)
                    "
                  />
                  <span class="platform-checkmark">✓</span>
                  <span>{{ platform.name }}</span>
                </label>
              </div>
            </div>
          </template>

          <!-- Настройки для Беттинга -->
          <template v-else>
            <!-- Экспресс-ставки -->
            <div class="setting-item">
              <label class="setting-checkbox">
                <input
                  type="checkbox"
                  :checked="localSettings.expressBets"
                  @change="updateSetting('expressBets', $event.target.checked)"
                />
                <span class="checkmark">✓</span>
                <span class="setting-text">Экспресс-ставки</span>
              </label>
              <div class="setting-description">
                Прибыль больше, риски больше
              </div>
            </div>

            <!-- Мужские соревнования -->
            <div class="setting-item">
              <label class="setting-checkbox">
                <input
                  type="checkbox"
                  :checked="localSettings.menCompetitions"
                  @change="
                    updateSetting('menCompetitions', $event.target.checked)
                  "
                />
                <span class="checkmark">✓</span>
                <span class="setting-text">Мужские соревнования</span>
              </label>
              <div class="setting-description">
                Прибыль больше, риски больше
              </div>
            </div>

            <!-- Женские соревнования -->
            <div class="setting-item">
              <label class="setting-checkbox">
                <input
                  type="checkbox"
                  :checked="localSettings.womenCompetitions"
                  @change="
                    updateSetting('womenCompetitions', $event.target.checked)
                  "
                />
                <span class="checkmark">✓</span>
                <span class="setting-text">Женские соревнования</span>
              </label>
              <div class="setting-description">
                Прибыль больше, риски больше
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from 'vue';
import CustomSelect from '~/components/investments/CustomSelect.vue';
import InfoBanner from '../InfoBanner.vue';

const props = defineProps({
  settings: {
    type: Object,
    required: true,
  },
  selectedPlatforms: {
    type: Object,
    required: true,
  },
  bettingMode: {
    type: String,
    required: true,
    default: 'gambling',
    validator: (value) => ['gambling', 'betting'].includes(value),
  },
  showHints: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['update-settings', 'update-platforms']);

// Reactive переменные для селектов
const selectedRegion = ref('');
const selectedContinent = ref('');

// Локальные копии настроек для сохранения состояния
const localSettings = reactive({});
const localSelectedPlatforms = reactive({});

// Ключи для localStorage
const getStorageKey = (key) => `equalizer_${props.bettingMode}_${key}`;
const getPlatformStorageKey = () => `equalizer_platforms_${props.bettingMode}`;

// Опции для селектов
const regionOptions = [
  { value: 'europe', label: 'Европа' },
  { value: 'asia', label: 'Азия' },
  { value: 'america', label: 'Америка' },
  { value: 'africa', label: 'Африка' },
];

const continentOptions = [
  { value: 'north-america', label: 'Северная Америка' },
  { value: 'south-america', label: 'Южная Америка' },
  { value: 'europe', label: 'Европа' },
  { value: 'asia', label: 'Азия' },
  { value: 'africa', label: 'Африка' },
  { value: 'oceania', label: 'Океания' },
];

// Обработчики изменений селектов
const handleRegionChange = (value) => {
  selectedRegion.value = value;
  console.log('Выбран регион:', value);

  // Сохраняем в localStorage
  if (process.client) {
    localStorage.setItem(getStorageKey('selectedRegion'), value);
  }

  emit('update-settings', { selectedRegion: value });
};

const handleContinentChange = (value) => {
  selectedContinent.value = value;
  console.log('Выбран континент:', value);

  // Сохраняем в localStorage
  if (process.client) {
    localStorage.setItem(getStorageKey('selectedContinent'), value);
  }

  emit('update-settings', { selectedContinent: value });
};

// Список платформ для гэмблинга
const gamblingPlatforms = [
  { key: 'casino1', name: 'Casino 1' },
  { key: 'casino2', name: 'Casino 2' },
  { key: 'casino3', name: 'Casino 3' },
  { key: 'casino4', name: 'Casino 4' },
  { key: 'casino5', name: 'Casino 5' },
];

// Список платформ для беттинга
const bettingPlatforms = [
  { key: 'bookmaker1', name: 'Букмекер 1' },
  { key: 'bookmaker2', name: 'Букмекер 2' },
  { key: 'bookmaker3', name: 'Букмекер 3' },
  { key: 'bookmaker4', name: 'Букмекер 4' },
  { key: 'bookmaker5', name: 'Букмекер 5' },
];

// Функция загрузки сохраненных настроек
const loadSavedSettings = () => {
  if (!process.client) return;

  try {
    // Загружаем основные настройки
    const savedSettings = localStorage.getItem(getStorageKey('settings'));
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      Object.assign(localSettings, parsed);
    } else {
      // Если нет сохраненных настроек, используем пропсы
      Object.assign(localSettings, props.settings);
    }

    // Загружаем настройки платформ
    const savedPlatforms = localStorage.getItem(getPlatformStorageKey());
    if (savedPlatforms) {
      const parsed = JSON.parse(savedPlatforms);
      Object.assign(localSelectedPlatforms, parsed);
    } else {
      // Если нет сохраненных платформ, используем пропсы
      Object.assign(localSelectedPlatforms, props.selectedPlatforms);
    }

    // Загружаем селекты
    const savedRegion = localStorage.getItem(getStorageKey('selectedRegion'));
    if (savedRegion) {
      selectedRegion.value = savedRegion;
    }

    const savedContinent = localStorage.getItem(
      getStorageKey('selectedContinent')
    );
    if (savedContinent) {
      selectedContinent.value = savedContinent;
    }
  } catch (error) {
    console.error('Ошибка загрузки сохраненных настроек:', error);
    // В случае ошибки используем пропсы
    Object.assign(localSettings, props.settings);
    Object.assign(localSelectedPlatforms, props.selectedPlatforms);
  }
};

// Функция сохранения настроек
const saveSettings = () => {
  if (!process.client) return;

  try {
    localStorage.setItem(
      getStorageKey('settings'),
      JSON.stringify(localSettings)
    );
    localStorage.setItem(
      getPlatformStorageKey(),
      JSON.stringify(localSelectedPlatforms)
    );
  } catch (error) {
    console.error('Ошибка сохранения настроек:', error);
  }
};

// Обновление настроек
const updateSetting = (key, value) => {
  localSettings[key] = value;
  saveSettings();
  emit('update-settings', { [key]: value });
  console.log('Настройка обновлена:', key, '=', value);
};

// Обновление выбранных платформ
const updatePlatform = (key, value) => {
  localSelectedPlatforms[key] = value;
  saveSettings();
  emit('update-platforms', { [key]: value });
  console.log('Платформа обновлена:', key, '=', value);
};

// Функции для заголовков и описаний
const equalizerTitle = () => {
  return props.bettingMode === 'gambling'
    ? 'Настройки Гэмблинга'
    : 'Настройки Беттинга';
};

const equalizerDescription = () => {
  const descriptions = {
    gambling:
      'Агрессивная стратегия для максимальной прибыли с высокими рисками.',
    betting: 'Сбалансированный подход к ставкам с умеренными рисками.',
  };
  return descriptions[props.bettingMode];
};

// Следим за изменением режима беттинга
watch(
  () => props.bettingMode,
  (newMode, oldMode) => {
    if (newMode !== oldMode) {
      console.log(`Режим изменен с ${oldMode} на ${newMode}`);
      loadSavedSettings(); // Перезагружаем настройки для нового режима
    }
  }
);

// Следим за изменениями пропсов
watch(
  () => props.settings,
  (newSettings) => {
    // Обновляем только если нет сохраненных настроек
    if (process.client) {
      const hasSavedSettings = localStorage.getItem(getStorageKey('settings'));
      if (!hasSavedSettings) {
        Object.assign(localSettings, newSettings);
      }
    }
  },
  { deep: true }
);

watch(
  () => props.selectedPlatforms,
  (newPlatforms) => {
    // Обновляем только если нет сохраненных платформ
    if (process.client) {
      const hasSavedPlatforms = localStorage.getItem(getPlatformStorageKey());
      if (!hasSavedPlatforms) {
        Object.assign(localSelectedPlatforms, newPlatforms);
      }
    }
  },
  { deep: true }
);

// Инициализация при монтировании
onMounted(() => {
  // Сначала инициализируем из пропсов
  Object.assign(localSettings, props.settings);
  Object.assign(localSelectedPlatforms, props.selectedPlatforms);

  // Затем загружаем сохраненные настройки
  loadSavedSettings();
});
</script>

<style scoped>
.investment-card {
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.card-header h3 {
  font-size: 16px;
  font-weight: 700;
  color: #f97316;
  margin: 0;
  letter-spacing: 0.5px;
}

/* Секция подсказок */
.equalizer-info {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  box-shadow: 0px 1px 5px 0px #00000040;
  border-top: 1px solid #00b27d33;
  border-radius: 16px;
  background: #00000033;
  margin-bottom: 20px;
  transition: all 0.3s ease;
  animation: fadeInUp 0.4s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.equalizer-description {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.4;
  text-align: center;
}

.equalizer-title {
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 4px;
}

.equalizer-desc {
  font-size: 12px;
  color: #ffffff;
  line-height: 1.5;
}

.equalizer-info img {
  width: 32px;
  height: 32px;
}

.settings-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.settings-column {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.setting-checkbox {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  cursor: pointer;
  margin-bottom: 8px;
}

.setting-checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.checkmark {
  width: 18px;
  height: 18px;
  background: transparent;
  border: 2px solid #07cb3899;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  font-size: 12px;
  color: transparent;
  flex-shrink: 0;
  margin-top: 1px;
}

.setting-checkbox input:checked + .checkmark {
  border-color: #07cb3899;
  color: #07cb3899;
}

.setting-text {
  font-size: 13px;
  color: white;
  line-height: 1.3;
}

.setting-description {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
  margin-left: 30px;
}

.wins-input {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
  margin-left: 30px;
}

.wins-input label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  cursor: default;
}

.wins-input input {
  width: 80px;
  padding: 6px 10px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  color: white;
  font-size: 12px;
  font-family: inherit;
}

.wins-input input:focus {
  outline: none;
  border-color: #4ade80;
}

.region-selectors {
  margin-top: 12px;
  margin-left: 30px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: static;
  overflow: visible;
}

.selector-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  position: relative;
  z-index: auto;
}

.platforms-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-top: 12px;
  margin-left: 30px;
}

.platform-item {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 11px;
}

.platform-item input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.platform-checkmark {
  width: 16px;
  height: 16px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: transparent;
  transition: all 0.3s ease;
}

.platform-item input:checked + .platform-checkmark {
  background: #4ade80;
  border-color: #4ade80;
  color: #0a2f23;
}

.platform-item span:last-child {
  color: rgba(255, 255, 255, 0.7);
}

@media (max-width: 1024px) {
  .settings-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}

@media (max-width: 480px) {
  .settings-grid {
    gap: 12px;
  }

  .setting-item {
    padding: 12px;
  }

  .platforms-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .setting-description,
  .wins-input,
  .region-selectors {
    margin-left: 20px;
  }

  .platforms-grid {
    margin-left: 20px;
  }
}
</style>
