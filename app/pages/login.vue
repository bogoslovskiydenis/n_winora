<template>
  <div class="registration-container">
    <div class="registration-app">
      <!-- Логотип -->
      <div class="logo">
        <img
          src="../assets/images/Winora_logo.png"
          alt="Winora Logo"
          class="logo-image"
        />
      </div>

      <!-- Табы -->
      <div class="tabs">
        <NuxtLink to="/registration" class="tab"> Регистрация </NuxtLink>
        <NuxtLink to="/login" class="tab active"> Авторизация </NuxtLink>
      </div>

      <!-- Форма авторизации -->
      <div class="form-section">
        <div class="step-content">
          <!-- Сообщения -->
          <div v-if="loginMessage" class="message" :class="loginMessageType">
            <span class="message-icon">
              {{ loginMessageType === 'success' ? '✅' : '❌' }}
            </span>
            <span class="message-text">{{ loginMessage }}</span>
          </div>

          <BaseInput
            v-model="loginForm.login"
            placeholder="Введите ваш никнейм или email"
            :error="loginErrors.login"
            :disabled="isLoading"
          />

          <BaseInput
            v-model="loginForm.password"
            type="password"
            placeholder="Введите пароль"
            :error="loginErrors.password"
            :disabled="isLoading"
          />

          <div class="form-extras">
            <label class="checkbox-label">
              <input
                type="checkbox"
                v-model="rememberMe"
                class="checkbox-input"
                :disabled="isLoading"
              />
              <span class="checkbox-custom"></span>
              <span class="checkbox-text">Запомнить меня</span>
            </label>
            <div class="forgot-password">
              <a href="#" class="link">Восстановить пароль</a>
            </div>
          </div>

          <BaseButton
            variant="primary"
            :disabled="!isLoginValid || isLoading"
            :loading="isLoading"
            @click="submitLogin"
          >
            {{ isLoading ? 'ВХОД...' : 'ВХОД' }}
          </BaseButton>
        </div>
      </div>

      <!-- Переключение между формами -->
      <div class="form-toggle">
        <div class="toggle-text">
          Нет аккаунта?
          <NuxtLink to="/registration" class="link-button">
            Зарегистрируйтесь
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

definePageMeta({
  layout: false,
});

const { loginUser, isLoading } = useAuth(); // Получаем isLoading из useAuth
const rememberMe = ref(false);

const loginMessage = ref('');
const loginMessageType = ref('success'); // 'success' | 'error'

const loginForm = ref({
  login: '',
  password: '',
});

const loginErrors = ref({});

const isLoginValid = computed(() => {
  return loginForm.value.login.trim() && loginForm.value.password.length > 0;
});

const submitLogin = async () => {
  loginErrors.value = {};
  loginMessage.value = '';

  if (!loginForm.value.login.trim()) {
    loginErrors.value.login = 'Введите никнейм или email';
    return;
  }

  if (!loginForm.value.password) {
    loginErrors.value.password = 'Введите пароль';
    return;
  }

  const result = await loginUser(loginForm.value, rememberMe.value);

  if (result.success) {
    loginMessage.value = 'Вход выполнен успешно! Перенаправляем...';
    loginMessageType.value = 'success';

    setTimeout(() => {
      navigateTo('/main');
    }, 1000);
  } else {
    loginMessage.value = result.message;
    loginMessageType.value = 'error';
  }
};
</script>

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
  margin-bottom: 15px;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
}

@media (min-width: 1024px) {
  .logo-image {
    margin-bottom: 20px;
  }
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
  text-decoration: none;
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

/* Сообщения */
.message {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  animation: slideIn 0.3s ease;
}

.message.success {
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.3);
  color: #22c55e;
}

.message.error {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #ef4444;
}

.message-icon {
  font-size: 16px;
  flex-shrink: 0;
}

.message-text {
  flex: 1;
  line-height: 1.4;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Чекбокс */
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
  flex-wrap: wrap;
  gap: 12px;
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

  .message {
    font-size: 13px;
    padding: 10px 14px;
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

/* Анимация для отключенных элементов */
.step-content:has(.checkbox-input:disabled) .checkbox-label,
.step-content:has(input:disabled) {
  opacity: 0.6;
  pointer-events: none;
}

/* Улучшенная анимация появления сообщений */
.message {
  overflow: hidden;
  max-height: 100px;
  transition: all 0.3s ease;
}

.message:empty {
  max-height: 0;
  padding: 0;
  margin: 0;
  border: none;
}
</style>
