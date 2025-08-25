<template>
  <div class="investments-section">
    <div class="section-header">
      <h1 class="section-title">
        <span class="section-icon">📈</span>
        ИНВЕСТИЦИИ
      </h1>
      <div class="section-controls">
        <label class="toggle-switch">
          <input type="checkbox" v-model="showHints">
          <span class="slider"></span>
          <span class="toggle-text">Режим подсказок</span>
        </label>
      </div>
    </div>

    <!-- Навигация по вкладкам -->
    <div class="tabs-navigation">
      <button
          class="tab-button"
          :class="{ active: activeTab === 'create' }"
          @click="activeTab = 'create'">
        <span class="tab-icon">⊕</span>
        Создать инвестицию
      </button>
      <button
          class="tab-button"
          :class="{ active: activeTab === 'my' }"
          @click="activeTab = 'my'">
        <span class="tab-icon">📊</span>
        Мои инвестиции
      </button>
    </div>

    <!-- Информационное сообщение -->
    <div class="info-banner" v-if="showHints">
      <div class="info-icon">⚠️</div>
      <div class="info-text">
        Вспомогательная информация, которая появляется на экране и помогает пользователю при работе
      </div>
    </div>

    <!-- Контент вкладок -->
    <div class="tab-content">
      <!-- Создать инвестицию -->
      <div v-if="activeTab === 'create'" class="create-investment">
        <!-- Левая колонка -->
        <div class="left-column">
          <!-- Пресет -->
          <div class="investment-card preset-card">
            <div class="card-header">
              <span class="card-icon">⚙️</span>
              <h3>ПРЕСЕТ</h3>
            </div>

            <div class="preset-selector">
              <select v-model="selectedPreset" class="preset-dropdown">
                <option value="user">Пользовательский</option>
                <option value="conservative">Консервативный</option>
                <option value="balanced">Сбалансированный</option>
                <option value="aggressive">Агрессивный</option>
              </select>
              <div class="preset-info">
                <div class="info-icon">ℹ️</div>
                <div class="preset-description">
                  <strong>{{ getPresetTitle() }}</strong><br>
                  {{ getPresetDescription() }}
                </div>
                <div class="preset-dots">
                  <span class="dot" :class="{ active: selectedPreset === 'user' }"></span>
                  <span class="dot" :class="{ active: selectedPreset === 'conservative' }"></span>
                  <span class="dot" :class="{ active: selectedPreset === 'balanced' }"></span>
                  <span class="dot" :class="{ active: selectedPreset === 'aggressive' }"></span>
                </div>
              </div>
            </div>

            <!-- Настройки ставок -->
            <div class="betting-controls">
              <div class="control-group">
                <button
                    class="betting-btn"
                    :class="{ active: bettingMode === 'gambling' }"
                    @click="bettingMode = 'gambling'">
                  <span class="btn-icon">🎲</span>
                  Гэмблинг
                </button>
                <button
                    class="betting-btn"
                    :class="{ active: bettingMode === 'betting' }"
                    @click="bettingMode = 'betting'">
                  <span class="btn-icon">🎯</span>
                  Беттинг
                </button>
              </div>

              <div class="betting-info">
                <div class="info-icon">🔒</div>
                <div class="betting-info-content">
                  <span class="betting-info-title">{{ getBettingTitle() }}</span>
                  <p>Вспомогательная информация, которая появляется на экране и помогает пользователю при работе</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Эквалайзер -->
          <div class="investment-card equalizer-card">
            <div class="card-header">
              <span class="card-icon">🎛️</span>
              <h3>ЭКВАЛАЙЗЕР</h3>
            </div>

            <div class="equalizer-info">
              <div class="info-icon">ℹ️</div>
              <div class="equalizer-description">
                <strong>Эквалайзер</strong><br>
                Вспомогательная информация, которая появляется на экране и помогает пользователю при работе
              </div>
            </div>

            <div class="equalizer-settings">
              <div class="settings-grid">
                <!-- Левая колонка настроек -->
                <div class="settings-column">
                  <div class="setting-item">
                    <label class="setting-checkbox">
                      <input type="checkbox" v-model="settings.highRtp" />
                      <span class="checkmark">✓</span>
                      <span class="setting-text">Высокий RTP слотов (-96%)</span>
                    </label>
                    <div class="setting-description">
                      Прибыль больше, риски больше
                    </div>
                  </div>

                  <div class="setting-item">
                    <label class="setting-checkbox">
                      <input type="checkbox" v-model="settings.casinoParticipation" />
                      <span class="checkmark">✓</span>
                      <span class="setting-text">Участие в акциях казино</span>
                    </label>
                    <div class="setting-description">
                      Прибыль больше, риски больше
                    </div>
                  </div>

                  <div class="setting-item">
                    <label class="setting-checkbox">
                      <input type="checkbox" v-model="settings.autoSlotChange" />
                      <span class="checkmark">✓</span>
                      <span class="setting-text">Автоматическая смена слота после заданного числа выигрышей</span>
                    </label>
                    <div class="setting-description">
                      Прибыль больше, риски больше
                    </div>
                    <div class="wins-input" v-if="settings.autoSlotChange">
                      <label>Число выигрышей:</label>
                      <input type="number" v-model="settings.winsCount" min="1" max="999" />
                    </div>
                  </div>
                </div>

                <!-- Правая колонка настроек -->
                <div class="settings-column">
                  <div class="setting-item">
                    <label class="setting-checkbox">
                      <input type="checkbox" v-model="settings.slotSelection" />
                      <span class="checkmark">✓</span>
                      <span class="setting-text">Подбор слотов по последнему джекпоту</span>
                    </label>
                    <div class="setting-description">
                      Прибыль больше, риски больше
                    </div>
                  </div>

                  <div class="setting-item">
                    <label class="setting-checkbox">
                      <input type="checkbox" v-model="settings.minimalStakes" />
                      <span class="checkmark">✓</span>
                      <span class="setting-text">Использование минимальных ставок</span>
                    </label>
                    <div class="setting-description">
                      Прибыль больше, риски больше
                    </div>
                  </div>

                  <div class="setting-item">
                    <label class="setting-checkbox">
                      <input type="checkbox" v-model="settings.platformDistribution" />
                      <span class="checkmark">✓</span>
                      <span class="setting-text">Распределение средств по игровым платформам</span>
                    </label>
                    <div class="setting-description">
                      Прибыль больше, риски больше
                    </div>

                    <div class="platforms-grid" v-if="settings.platformDistribution">
                      <label class="platform-item">
                        <input type="checkbox" v-model="selectedPlatforms.platform1" />
                        <span class="platform-checkmark">✓</span>
                        <span>Платформа</span>
                      </label>
                      <label class="platform-item">
                        <input type="checkbox" v-model="selectedPlatforms.platform2" />
                        <span class="platform-checkmark">✓</span>
                        <span>Платформа</span>
                      </label>
                      <label class="platform-item">
                        <input type="checkbox" v-model="selectedPlatforms.platform3" />
                        <span class="platform-checkmark">✓</span>
                        <span>Платформа</span>
                      </label>
                      <label class="platform-item">
                        <input type="checkbox" v-model="selectedPlatforms.platform4" />
                        <span class="platform-checkmark">✓</span>
                        <span>Платформа</span>
                      </label>
                      <label class="platform-item">
                        <input type="checkbox" v-model="selectedPlatforms.platform5" />
                        <span class="platform-checkmark">✓</span>
                        <span>Платформа</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Правая колонка -->
        <div class="right-column">
          <!-- Предпросмотр инвестиции -->
          <div class="investment-card preview-card">
            <div class="card-header">
              <span class="card-icon">👁️</span>
              <h3>ПРЕДПРОСМОТР ИНВЕСТИЦИИ</h3>
            </div>

            <div class="preview-info">
              <div class="info-icon">ℹ️</div>
              <div class="preview-description">
                <strong>Подсказка</strong><br>
                Предпросмотр инвестиции
              </div>
            </div>

            <div class="investment-preview">
              <div class="preview-row">
                <span class="preview-label">Тип</span>
                <span class="preview-value">
                  {{ getBettingTitle() }}
                  <span class="preview-icon">🔒</span>
                </span>
              </div>
              <div class="preview-row">
                <span class="preview-label">Стратегия</span>
                <span class="preview-value">
                  {{ getPresetTitle() }}
                  <span class="preview-icon">📊</span>
                </span>
              </div>
              <div class="preview-row">
                <span class="preview-label">Статус</span>
                <span class="preview-value status-frozen">
                  Заморожена
                  <span class="preview-icon">❄️</span>
                </span>
              </div>
              <div class="preview-row">
                <span class="preview-label">Прогнозируемая доходность</span>
                <span class="preview-value">{{ getProfitability() }}</span>
              </div>
              <div class="preview-row">
                <span class="preview-label">Период</span>
                <span class="preview-value">∞</span>
              </div>
              <div class="preview-row">
                <span class="preview-label">Риски</span>
                <span class="preview-value risk-level" :class="getRiskClass()">
                  {{ getRiskPercentage() }}
                </span>
              </div>
              <div class="preview-row">
                <span class="preview-label">Сумма инвестиции</span>
                <span class="preview-value amount">100 USD</span>
              </div>
              <div class="preview-row">
                <span class="preview-label">Доступен к переводу прибыль</span>
                <span class="preview-value profit">20 USD</span>
              </div>
            </div>

            <div class="bonus-section">
              <div class="bonus-header">
                <span class="bonus-icon">🎁</span>
                <span class="bonus-title">Бонус за первую инвестицию</span>
              </div>
              <div class="bonus-items">
                <div class="bonus-item">
                  <span class="bonus-name">Спины Фортуны</span>
                  <span class="bonus-count">2</span>
                </div>
                <div class="bonus-item">
                  <span class="bonus-name">Сундуки</span>
                  <span class="bonus-count">2</span>
                </div>
              </div>
            </div>

            <button class="create-investment-btn">
              ПЕРЕЙТИ К ОПЛАТЕ
            </button>
          </div>
        </div>
      </div>

      <!-- Мои инвестиции -->
      <div v-else-if="activeTab === 'my'" class="my-investments">
        <div class="empty-state">
          <div class="empty-icon">📈</div>
          <h3>У вас пока нет активных инвестиций</h3>
          <p>Создайте свою первую инвестицию, чтобы начать получать доход</p>
          <button class="create-first-btn" @click="activeTab = 'create'">
            Создать инвестицию
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Реактивные данные
const activeTab = ref('create')
const showHints = ref(true)
const selectedPreset = ref('user')
const bettingMode = ref('betting')

const settings = ref({
  highRtp: false,
  casinoParticipation: false,
  autoSlotChange: false,
  slotSelection: false,
  platformDistribution: false,
  minimalStakes: false,
  winsCount: 100
})

const selectedPlatforms = ref({
  platform1: false,
  platform2: false,
  platform3: false,
  platform4: false,
  platform5: false
})

// Computed свойства для динамического контента
const getPresetTitle = () => {
  const titles = {
    user: 'Пользовательский',
    conservative: 'Консервативный',
    balanced: 'Сбалансированный',
    aggressive: 'Агрессивный'
  }
  return titles[selectedPreset.value] || 'Пользовательский'
}

const getPresetDescription = () => {
  const descriptions = {
    user: 'Настройте инвестицию под свои предпочтения',
    conservative: 'Минимальные риски, стабильная, но невысокая доходность',
    balanced: 'Сбалансированное соотношение риска и доходности',
    aggressive: 'Высокие риски, максимальная потенциальная доходность'
  }
  return descriptions[selectedPreset.value] || 'Настройте инвестицию под свои предпочтения'
}

const getBettingTitle = () => {
  return bettingMode.value === 'gambling' ? 'Гэмблинг' : 'Беттинг'
}

const getProfitability = () => {
  const base = bettingMode.value === 'gambling' ? 15 : 10
  const presetMultiplier = {
    user: 1,
    conservative: 0.8,
    balanced: 1.2,
    aggressive: 1.8
  }
  const profit = Math.round(base * presetMultiplier[selectedPreset.value])
  return `${profit} USD / Week`
}

const getRiskPercentage = () => {
  const riskLevels = {
    user: '5%',
    conservative: '2%',
    balanced: '8%',
    aggressive: '15%'
  }
  return riskLevels[selectedPreset.value] || '5%'
}

const getRiskClass = () => {
  const riskClasses = {
    user: 'risk-medium',
    conservative: 'risk-low',
    balanced: 'risk-medium',
    aggressive: 'risk-high'
  }
  return riskClasses[selectedPreset.value] || 'risk-medium'
}
</script>

<style scoped>
.investments-section {
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
  background: linear-gradient(135deg, #0a2f23 0%, #1a4b3a 100%);
  min-height: 100vh;
}

/* Header */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 28px;
  font-weight: 700;
  color: #4ade80;
  margin: 0;
}

.section-icon {
  font-size: 32px;
}

.section-controls {
  display: flex;
  align-items: center;
  gap: 16px;
}

/* Toggle Switch */
.toggle-switch {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}

.toggle-switch input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.slider {
  position: relative;
  width: 50px;
  height: 24px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 24px;
  transition: background 0.3s ease;
}

.slider:before {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: white;
  top: 2px;
  left: 2px;
  transition: transform 0.3s ease;
}

.toggle-switch input:checked + .slider {
  background: #4ade80;
}

.toggle-switch input:checked + .slider:before {
  transform: translateX(26px);
}

.toggle-text {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
}

/* Tabs Navigation */
.tabs-navigation {
  display: flex;
  gap: 2px;
  margin-bottom: 24px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 4px;
  width: fit-content;
}

.tab-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.3s ease;
  font-family: inherit;
}

.tab-button:hover {
  color: rgba(255, 255, 255, 0.8);
}

.tab-button.active {
  background: #4ade80;
  color: #0a2f23;
}

.tab-icon {
  font-size: 16px;
}

/* Info Banner */
.info-banner {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  background: rgba(249, 115, 22, 0.1);
  border: 1px solid rgba(249, 115, 22, 0.3);
  border-radius: 12px;
  margin-bottom: 24px;
}

.info-icon {
  font-size: 20px;
  color: #f97316;
}

.info-text {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
}

/* Layout */
.create-investment {
  display: block;
}

.left-column,
.right-column {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
}

/* Investment Cards */
.investment-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 24px;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.card-icon {
  font-size: 20px;
  color: #f97316;
}

.card-header h3 {
  font-size: 16px;
  font-weight: 700;
  color: #f97316;
  margin: 0;
  letter-spacing: 0.5px;
}

/* Preset Selector */
.preset-selector {
  margin-bottom: 24px;
}

.preset-dropdown {
  width: 100%;
  padding: 12px 16px;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: white;
  font-size: 14px;
  margin-bottom: 12px;
  cursor: pointer;
}

.preset-info {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  background: rgba(74, 222, 128, 0.1);
  border-radius: 8px;
}

.preset-info .info-icon {
  color: #4ade80;
  font-size: 18px;
}

.preset-description {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.4;
  flex: 1;
}

.preset-dots {
  display: flex;
  gap: 6px;
  margin-left: 16px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.dot.active {
  background: #f97316;
}

/* Betting Controls */
.betting-controls {
  margin-top: 24px;
}

.control-group {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.betting-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
}

.betting-btn:hover {
  background: rgba(255, 255, 255, 0.05);
}

.betting-btn.active {
  background: #4ade80;
  color: #0a2f23;
  border-color: #4ade80;
}

.btn-icon {
  font-size: 14px;
}

.betting-info {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
}

.betting-info .info-icon {
  color: #4ade80;
  font-size: 16px;
}

.betting-info-content {
  flex: 1;
}

.betting-info-title {
  font-weight: 600;
  color: white;
  font-size: 14px;
  display: block;
  margin-bottom: 4px;
}

.betting-info p {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
  line-height: 1.4;
}

/* Equalizer Settings */
.equalizer-info {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  background: rgba(74, 222, 128, 0.1);
  border-radius: 8px;
  margin-bottom: 20px;
}

.equalizer-info .info-icon {
  color: #4ade80;
}

.equalizer-description {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.4;
}

.settings-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.settings-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.setting-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.setting-item.full-width {
  grid-column: 1 / -1;
}

.settings-column {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.setting-item {
  padding: 16px;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
}

.setting-checkbox {
  display: flex;
  align-items: flex-start;
  gap: 12px;
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
  border: 2px solid rgba(255, 255, 255, 0.3);
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
  background: #4ade80;
  border-color: #4ade80;
  color: #0a2f23;
}

.setting-text {
  font-size: 13px;
  color: white;
  line-height: 1.3;
}

.setting-description {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 8px;
}

.wins-input {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
}

.wins-input label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
}

.wins-input input {
  width: 80px;
  padding: 6px 10px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  color: white;
  font-size: 12px;
}

.platforms-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-top: 12px;
}

.platform-item {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
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
  font-size: 11px;
  color: rgba(255, 255, 255, 0.7);
}

/* Preview Card */
.preview-card {
  position: sticky;
  top: 24px;
}

.preview-info {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  background: rgba(74, 222, 128, 0.1);
  border-radius: 8px;
  margin-bottom: 20px;
}

.preview-info .info-icon {
  color: #4ade80;
}

.preview-description {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.4;
}

.investment-preview {
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
}

.preview-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.preview-row:last-child {
  border-bottom: none;
}

.preview-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
}

.preview-value {
  font-size: 12px;
  color: white;
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;
}

.preview-value.status-frozen {
  color: #60a5fa;
}

.preview-value.amount {
  color: #fbbf24;
  font-weight: 600;
}

.preview-value.profit {
  color: #4ade80;
  font-weight: 600;
}

.risk-level.risk-low {
  color: #4ade80;
}

.risk-level.risk-medium {
  color: #fbbf24;
}

.risk-level.risk-high {
  color: #ef4444;
}

.preview-icon {
  font-size: 14px;
}

/* Bonus Section */
.bonus-section {
  background: rgba(34, 197, 94, 0.15);
  border: 1px solid rgba(34, 197, 94, 0.3);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
}

.bonus-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-size: 14px;
  font-weight: 600;
  color: #4ade80;
}

.bonus-icon {
  font-size: 16px;
}

.bonus-title {
  font-size: 13px;
}

.bonus-items {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.bonus-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
}

.bonus-name {
  color: rgba(255, 255, 255, 0.8);
}

.bonus-count {
  background: #4ade80;
  color: #0a2f23;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 700;
  min-width: 20px;
  text-align: center;
}

/* Create Investment Button */
.create-investment-btn {
  width: 100%;
  padding: 14px 16px;
  background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
  border: none;
  border-radius: 8px;
  color: #0a2f23;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.create-investment-btn:hover {
  background: linear-gradient(135deg, #86efac 0%, #4ade80 100%);
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(74, 222, 128, 0.4);
}

/* My Investments - Empty State */
.my-investments {
  padding: 80px 40px;
  text-align: center;
}

.empty-state {
  max-width: 400px;
  margin: 0 auto;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 24px;
  opacity: 0.3;
}

.empty-state h3 {
  font-size: 24px;
  color: white;
  margin-bottom: 16px;
  font-weight: 600;
}

.empty-state p {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 32px;
  line-height: 1.5;
}

.create-first-btn {
  padding: 12px 24px;
  background: #4ade80;
  color: #0a2f23;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.create-first-btn:hover {
  background: #86efac;
  transform: translateY(-1px);
}

/* Mobile Responsive */
@media (max-width: 1200px) {
  .create-investment {
    grid-template-columns: 1fr;
  }

  .setting-row {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .investments-section {
    padding: 16px;
  }

  .section-header {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }

  .tabs-navigation {
    width: 100%;
    justify-content: center;
  }

  .tab-button {
    flex: 1;
    justify-content: center;
  }

  .platforms-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .preview-card {
    position: static;
  }
}

@media (max-width: 480px) {
  .settings-grid {
    gap: 16px;
  }

  .setting-item {
    padding: 12px;
  }

  .investment-card {
    padding: 16px;
  }
}
</style>
