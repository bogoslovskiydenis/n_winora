<script setup>
import { ref, computed } from 'vue'

const activeTab = ref('registration')
const isLoading = ref(false)
const isLoginLoading = ref(false)
const rememberMe = ref(false)

const form = ref({
  nickname: '',
  email: '',
  password: ''
})

const loginForm = ref({
  email: '',
  password: ''
})

const errors = ref({})
const loginErrors = ref({})

const isRegistrationValid = computed(() => {
  return form.value.nickname.trim() &&
      isValidEmail(form.value.email) &&
      form.value.password.length >= 8
})

const isLoginValid = computed(() => {
  return isValidEmail(loginForm.value.email) &&
      loginForm.value.password.length > 0
})

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const validateRegistration = () => {
  errors.value = {}

  if (!form.value.nickname.trim()) {
    errors.value.nickname = 'Никнейм обязателен для заполнения'
  }

  if (!isValidEmail(form.value.email)) {
    errors.value.email = 'Введите корректный email'
  }

  if (form.value.password.length < 8) {
    errors.value.password = 'Пароль должен содержать минимум 8 символов'
  }

  return Object.keys(errors.value).length === 0
}

const submitRegistration = async () => {
  if (!validateRegistration()) {
    return
  }

  isLoading.value = true

  // Имитация запроса к серверу
  setTimeout(() => {
    console.log('Регистрация пользователя:', {
      nickname: form.value.nickname,
      email: form.value.email
    })

    // Создаем объект пользователя
    const userData = {
      nickname: form.value.nickname,
      email: form.value.email,
      balance: 150000,
      id: Date.now()
    }

    // Используем глобальную функцию для авторизации
    window.loginUser(userData, rememberMe.value)

    isLoading.value = false

    // Сброс формы
    resetForm()
  }, 2000)
}

const submitLogin = async () => {
  loginErrors.value = {}

  if (!isValidEmail(loginForm.value.email)) {
    loginErrors.value.email = 'Введите корректный email'
    return
  }

  if (!loginForm.value.password) {
    loginErrors.value.password = 'Введите пароль'
    return
  }

  isLoginLoading.value = true

  setTimeout(() => {
    console.log('Попытка входа:', {
      email: loginForm.value.email
    })

    // Создаем объект пользователя для входа
    const userData = {
      nickname: loginForm.value.email.split('@')[0], // Простое извлечение имени из email
      email: loginForm.value.email,
      balance: 150000,
      id: Date.now()
    }

    // Используем глобальную функцию для авторизации
    window.loginUser(userData, rememberMe.value)

    isLoginLoading.value = false
    loginForm.value = { email: '', password: '' }
  }, 1500)
}

const resetForm = () => {
  form.value = {
    nickname: '',
    email: '',
    password: ''
  }
  errors.value = {}
}
</script>

<template>
  <div class="registration-container">
    <div class="registration-app">
      <!-- Логотип -->
      <div class="logo">
        <img src="../assets/images/Winora_logo.png" alt="Winora Logo" class="logo-image" />
      </div>

      <!-- Табы -->
      <div class="tabs">
        <button
            class="tab"
            :class="{ active: activeTab === 'registration' }"
            @click="activeTab = 'registration'"
        >
          Регистрация
        </button>
        <button
            class="tab"
            :class="{ active: activeTab === 'authorization' }"
            @click="activeTab = 'authorization'"
        >
          Авторизация
        </button>
      </div>

      <!-- Форма регистрации -->
      <div v-if="activeTab === 'registration'" class="form-section">
        <div class="step-content">
          <BaseInput
              v-model="form.nickname"
              placeholder="Введите ваш никнейм"
              :error="errors.nickname"
          />

          <BaseInput
              v-model="form.email"
              type="email"
              placeholder="Введите ваш E-mail"
              :error="errors.email"
          />

          <BaseInput
              v-model="form.password"
              type="password"
              placeholder="Придумайте пароль"
              :error="errors.password"
          />

          <div class="checkbox-wrapper">
            <label class="checkbox-label">
              <input
                  type="checkbox"
                  v-model="rememberMe"
                  class="checkbox-input"
              />
              <span class="checkbox-custom"></span>
              <span class="checkbox-text">Запомнить меня</span>
            </label>
          </div>

          <BaseButton
              variant="primary"
              :disabled="!isRegistrationValid"
              :loading="isLoading"
              @click="submitRegistration"
          >
            {{ isLoading ? 'РЕГИСТРАЦИЯ...' : 'ЗАРЕГИСТРИРОВАТЬСЯ' }}
          </BaseButton>
        </div>
      </div>

      <!-- Форма авторизации -->
      <div v-if="activeTab === 'authorization'" class="form-section">
        <div class="step-content">
          <BaseInput
              v-model="loginForm.email"
              type="email"
              placeholder="Введите ваш E-mail"
              :error="loginErrors.email"
          />

          <BaseInput
              v-model="loginForm.password"
              type="password"
              placeholder="Введите пароль"
              :error="loginErrors.password"
          />

          <div class="form-extras">
            <div class="checkbox-wrapper">
              <label class="checkbox-label">
                <input
                    type="checkbox"
                    v-model="rememberMe"
                    class="checkbox-input"
                />
                <span class="checkbox-custom"></span>
                <span class="checkbox-text">Запомнить меня</span>
              </label>
            </div>

            <div class="forgot-password">
              <a href="#" class="link">Восстановить пароль</a>
            </div>
          </div>

          <BaseButton
              variant="primary"
              :disabled="!isLoginValid"
              :loading="isLoginLoading"
              @click="submitLogin"
          >
            {{ isLoginLoading ? 'ВХОД...' : 'ВХОД' }}
          </BaseButton>
        </div>
      </div>

      <!-- Переключение между формами -->
      <div class="form-toggle">
        <div v-if="activeTab === 'registration'" class="toggle-text">
          Уже есть аккаунт? <button @click="activeTab = 'authorization'" class="link-button">Войдите</button>
        </div>
        <div v-if="activeTab === 'authorization'" class="toggle-text">
          Нет аккаунта? <button @click="activeTab = 'registration'" class="link-button">Зарегистрируйтесь</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.registration-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  width: 100%;
}

.registration-app {
  max-width: 480px;
  width: 100%;
  padding: 40px 30px;
}

/* Desktop адаптация */
@media (min-width: 1024px) {
  .registration-app {
    max-width: 520px;
    padding: 50px 40px;
  }
}

/* Логотип */
.logo {
  text-align: center;
  margin-bottom: 40px;
}

.logo-image {
  width: 80px;
  height: 80px;
  margin-bottom: 15px;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
}

@media (min-width: 1024px) {
  .logo-image {
    width: 100px;
    height: 100px;
    margin-bottom: 20px;
  }
}

.logo p {
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  margin: 0;
}

/* Табы */
.tabs {
  display: flex;
  background: transparent;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0;
  margin-bottom: 40px;
}

.tab {
  flex: 1;
  padding: 16px 20px;
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  border: none;
  background: transparent;
  transition: all 0.3s ease;
  font-size: 16px;
  font-weight: 500;
  font-family: inherit;
  border-bottom: 2px solid transparent;
  border-radius: 0;
}

.tab.active {
  color: #4ade80;
  border-bottom-color: #4ade80;
}

.tab:hover:not(.active) {
  color: rgba(255, 255, 255, 0.8);
}

/* Контент форм */
.form-section {
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.step-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Чекбокс */
.checkbox-wrapper {
  margin: 8px 0;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  user-select: none;
}

.checkbox-input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.checkbox-custom {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  position: relative;
  transition: all 0.3s ease;
  background: transparent;
}

.checkbox-input:checked + .checkbox-custom {
  background: #4ade80;
  border-color: #4ade80;
}

.checkbox-input:checked + .checkbox-custom::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
  width: 4px;
  height: 8px;
  border: solid #0a3d2e;
  border-width: 0 2px 2px 0;
}

.checkbox-text {
  font-size: 14px;
  transition: color 0.2s ease;
}

.checkbox-label:hover .checkbox-text {
  color: rgba(255, 255, 255, 0.9);
}

.checkbox-label:hover .checkbox-custom {
  border-color: rgba(255, 255, 255, 0.5);
}

/* Дополнительные элементы формы */
.form-extras {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px 0;
}

.forgot-password {
  margin-left: auto;
}

.link {
  color: #4ade80;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
  font-size: 14px;
}

.link:hover {
  color: #22c55e;
  text-decoration: underline;
}

.forgot-password .link {
  font-size: 14px;
  color: #f97316;
}

.forgot-password .link:hover {
  color: #ea580c;
}

/* Переключение форм */
.form-toggle {
  text-align: center;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.toggle-text {
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
}

.link-button {
  background: none;
  border: none;
  color: #4ade80;
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
  font-size: inherit;
  font-family: inherit;
  transition: color 0.2s ease;
}

.link-button:hover {
  color: #22c55e;
  text-decoration: underline;
}

@media (max-width: 480px) {
  .registration-container {
    padding: 16px;
  }

  .registration-app {
    padding: 20px 16px;
  }

  .logo-image {
    width: 60px;
    height: 60px;
  }

  .form-extras {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }

  .forgot-password {
    margin-left: 0;
  }
}

.step-content {
  transition: all 0.3s ease;
}

.tab:focus-visible {
  outline: 2px solid #4ade80;
  outline-offset: 2px;
}

.link-button:focus-visible {
  outline: 2px solid #4ade80;
  outline-offset: 2px;
  border-radius: 4px;
}

.form-section.loading {
  pointer-events: none;
  opacity: 0.7;
}
</style>