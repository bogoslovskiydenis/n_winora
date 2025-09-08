<!-- components/investments/EqualizerSettings.vue -->
<template>
  <div class="investment-card equalizer-card">
    <div class="card-header">
      <img alt="equalizer" src="~/assets/images/equalizer.svg" />
      <h3>ЭКВАЛАЙЗЕР</h3>
    </div>

    <div class="equalizer-info">
      <img src="~/assets/images/info.svg" alt="info" />
      <div class="equalizer-description">
        <strong>Эквалайзер</strong><br />
        Настройте параметры инвестирования для оптимизации доходности
      </div>
    </div>

    <div class="equalizer-settings">
      <div class="settings-grid">
        <!-- Левая колонка настроек -->
        <div class="settings-column">
          <!-- Высокий RTP слотов -->
          <div class="setting-item">
            <label class="setting-checkbox">
              <input
                type="checkbox"
                :checked="settings.highRtp"
                @change="updateSetting('highRtp', $event.target.checked)"
              />
              <span class="checkmark">✓</span>
              <span class="setting-text">Высокий RTP слотов (-96%)</span>
            </label>
            <div class="setting-description">Прибыль больше, риски больше</div>
          </div>

          <!-- Участие в акциях казино -->
          <div class="setting-item">
            <label class="setting-checkbox">
              <input
                type="checkbox"
                :checked="settings.casinoParticipation"
                @change="
                  updateSetting('casinoParticipation', $event.target.checked)
                "
              />
              <span class="checkmark">✓</span>
              <span class="setting-text">Участие в акциях казино</span>
            </label>
            <div class="setting-description">Прибыль больше, риски больше</div>
          </div>

          <!-- Автоматическая смена слота -->
          <div class="setting-item">
            <label class="setting-checkbox">
              <input
                type="checkbox"
                :checked="settings.autoSlotChange"
                @change="updateSetting('autoSlotChange', $event.target.checked)"
              />
              <span class="checkmark">✓</span>
              <span class="setting-text"
                >Автоматическая смена слота после заданного числа
                выигрышей</span
              >
            </label>
            <div class="setting-description">Прибыль больше, риски больше</div>

            <!-- Поле для ввода количества выигрышей -->
            <div class="wins-input" v-if="settings.autoSlotChange">
              <label>Число выигрышей:</label>
              <input
                type="number"
                :value="settings.winsCount"
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
        </div>

        <!-- Правая колонка настроек -->
        <div class="settings-column">
          <!-- Подбор слотов по последнему джекпоту -->
          <div class="setting-item">
            <label class="setting-checkbox">
              <input
                type="checkbox"
                :checked="settings.slotSelection"
                @change="updateSetting('slotSelection', $event.target.checked)"
              />
              <span class="checkmark">✓</span>
              <span class="setting-text"
                >Подбор слотов по последнему джекпоту</span
              >
            </label>
            <div class="setting-description">Прибыль больше, риски больше</div>
          </div>

          <!-- Использование минимальных ставок -->
          <div class="setting-item">
            <label class="setting-checkbox">
              <input
                type="checkbox"
                :checked="settings.minimalStakes"
                @change="updateSetting('minimalStakes', $event.target.checked)"
              />
              <span class="checkmark">✓</span>
              <span class="setting-text">Использование минимальных ставок</span>
            </label>
            <div class="setting-description">Прибыль больше, риски больше</div>
          </div>

          <!-- Распределение средств по игровым платформам -->
          <div class="setting-item">
            <label class="setting-checkbox">
              <input
                type="checkbox"
                :checked="settings.platformDistribution"
                @change="
                  updateSetting('platformDistribution', $event.target.checked)
                "
              />
              <span class="checkmark">✓</span>
              <span class="setting-text"
                >Распределение средств по игровым платформам</span
              >
            </label>
            <div class="setting-description">Прибыль больше, риски больше</div>

            <!-- Сетка платформ -->
            <div class="platforms-grid" v-if="settings.platformDistribution">
              <label
                v-for="(platform, index) in platformList"
                :key="platform.key"
                class="platform-item"
              >
                <input
                  type="checkbox"
                  :checked="selectedPlatforms[platform.key]"
                  @change="updatePlatform(platform.key, $event.target.checked)"
                />
                <span class="platform-checkmark">✓</span>
                <span>{{ platform.name }}</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  settings: {
    type: Object,
    required: true,
  },
  selectedPlatforms: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['update-settings', 'update-platforms']);

// Список платформ для выбора
const platformList = [
  { key: 'platform1', name: 'Платформа 1' },
  { key: 'platform2', name: 'Платформа 2' },
  { key: 'platform3', name: 'Платформа 3' },
  { key: 'platform4', name: 'Платформа 4' },
  { key: 'platform5', name: 'Платформа 5' },
];

// Обновление настроек
const updateSetting = (key, value) => {
  emit('update-settings', { [key]: value });
};

// Обновление выбранных платформ
const updatePlatform = (key, value) => {
  emit('update-platforms', { [key]: value });
};
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

.equalizer-description strong {
  color: white;
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
}

.setting-item {
  padding: 16px;
}

.setting-item:hover {
  box-shadow: 0px 1px 5px 0px #00000040;
  border-top: 1px solid #00b27d33;
  border-radius: 16px;
  background: #00000033;
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
  .investment-card {
    padding: 16px;
  }

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
  .wins-input {
    margin-left: 20px;
  }

  .platforms-grid {
    margin-left: 20px;
  }
}
</style>
