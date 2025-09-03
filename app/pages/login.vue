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

const { loginUser, isLoading } = useAuth();
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
      navigateTo('/');
    }, 1000);
  } else {
    loginMessage.value = result.message;
    loginMessageType.value = 'error';
  }
};
</script>

<style scoped>
/* Базовые стили */
.registration-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  width: 100%;
}

.registration-app {
  width: 100%;
  max-width: 424px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
}

/* Логотип */
.logo {
  width: 100%;
  max-width: 424px;
  height: 159px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}

.logo-image {
  width: 302px;
  max-width: 100%;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
}

/* Табы */
.tabs {
  width: 100%;
  max-width: 424px;
  height: 80px;
  padding: 48px 0 2px 0;
  display: flex;
  background: transparent;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  box-sizing: border-box;
}

.tab {
  flex: 1;
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
  box-sizing: border-box;
}

.tab.active {
  color: #4ade80;
  border-bottom-color: #4ade80;
}

.tab:hover:not(.active) {
  color: rgba(255, 255, 255, 0.8);
}

/* Форма */
.form-section {
  width: 100%;
  max-width: 424px;
  height: auto;
  min-height: 350px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding: 24px 16px 16px 16px;
  border-bottom-right-radius: 32px;
  border-bottom-left-radius: 32px;
  background: rgba(0, 170, 105, 0.15);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  animation: fadeIn 0.5s ease;
}

.step-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
  width: 100%;
}

/* Сообщения */
.message {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  animation: slideIn 0.3s ease;
  width: 100%;
  box-sizing: border-box;
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
  font-size: 20px;
  flex-shrink: 0;
}

.message-text {
  flex: 1;
  line-height: 1.4;
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
  padding-top: 24px;
  width: 100%;
  max-width: 424px;
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

/* Анимации */
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

/* Доступность */
.tab:focus-visible,
.link-button:focus-visible {
  outline: 2px solid #4ade80;
  outline-offset: 2px;
  border-radius: 4px;
}

.form-section.loading {
  pointer-events: none;
  opacity: 0.7;
}

.step-content:has(.checkbox-input:disabled) .checkbox-label,
.step-content:has(input:disabled) {
  opacity: 0.6;
  pointer-events: none;
}

.message {
  overflow: hidden;
  max-height: 500px;
  transition: all 0.3s ease;
}

.message:empty {
  max-height: 0;
  padding: 0;
  margin: 0;
  border: none;
}

/* АДАПТИВНОСТЬ */

/* Планшеты (768px - 1023px) */
@media (min-width: 768px) and (max-width: 1023px) {
  .registration-container {
    padding: 24px;
  }

  .registration-app {
    max-width: 500px;
  }

  .logo {
    height: 140px;
  }

  .logo-image {
    width: 280px;
    height: 118px;
  }

  .tabs {
    height: 75px;
    padding-top: 40px;
  }

  .form-section {
    min-height: 320px;
    padding: 22px 18px 18px 18px;
  }

  .message {
    font-size: 13px;
    padding: 14px;
  }
}

/* Десктоп (1024px+) */
@media (min-width: 1024px) {
  .registration-container {
    padding: 30px;
  }

  .registration-app {
    max-width: 560px;
  }

  .logo {
    height: 159px;
  }

  .logo-image {
    width: 302px;
    height: 127px;
  }

  .tabs {
    height: 80px;
    padding-top: 48px;
  }

  .form-section {
    min-height: 350px;
    padding: 24px 16px 16px 16px;
  }
}

/* Маленькие планшеты (481px - 767px) */
@media (min-width: 481px) and (max-width: 767px) {
  .registration-container {
    padding: 20px;
  }

  .logo {
    height: 120px;
    padding: 12px;
  }

  .logo-image {
    width: 220px;
    height: 93px;
  }

  .tabs {
    height: 65px;
    padding-top: 30px;
  }

  .tab {
    font-size: 15px;
    padding: 14px 16px;
  }

  .form-section {
    min-height: 300px;
    padding: 20px 14px 14px 14px;
    border-bottom-right-radius: 24px;
    border-bottom-left-radius: 24px;
  }

  .message {
    font-size: 13px;
    padding: 14px;
  }
}

/* Мобильные устройства (до 480px) */
@media (max-width: 480px) {
  .registration-app {
    max-width: 100%;
    width: 100%;
  }

  .logo {
    height: 100px;
    padding: 8px;
  }

  .logo-image {
    width: 180px;
    height: 76px;
  }

  .tabs {
    height: 60px;
    padding-top: 24px;
  }

  .tab {
    font-size: 14px;
    padding: 12px 8px;
  }

  .form-section {
    min-height: 280px;
    padding: 16px 12px 12px 12px;
    border-bottom-right-radius: 20px;
    border-bottom-left-radius: 20px;
  }

  .step-content {
    gap: 14px;
  }

  .message {
    font-size: 12px;
    padding: 12px;
    gap: 10px;
  }

  .message-icon {
    font-size: 18px;
  }

  .form-extras {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }

  .forgot-password {
    margin-left: 0;
  }

  .checkbox-text {
    font-size: 13px;
  }

  .link {
    font-size: 13px;
  }

  .form-toggle {
    margin-top: 24px;
    padding-top: 16px;
  }

  .toggle-text {
    font-size: 13px;
  }
}

/* Очень маленькие экраны (до 360px) */
@media (max-width: 360px) {
  .registration-container {
    padding: 12px;
    padding-top: 20px;
  }

  .logo {
    height: 80px;
    padding: 4px;
  }

  .logo-image {
    width: 150px;
    height: 63px;
  }

  .tabs {
    height: 55px;
    padding-top: 20px;
  }

  .tab {
    font-size: 13px;
    padding: 10px 4px;
  }

  .form-section {
    min-height: 260px;
    padding: 14px 10px 10px 10px;
  }

  .message {
    font-size: 11px;
    padding: 10px;
  }

  .checkbox-text,
  .link {
    font-size: 12px;
  }

  .toggle-text {
    font-size: 12px;
  }
}

/* Landscape ориентация для мобильных */
@media (max-width: 767px) and (orientation: landscape) {
  .registration-container {
    padding: 12px;
    align-items: flex-start;
  }

  .logo {
    height: 70px;
    padding: 4px;
  }

  .logo-image {
    width: 140px;
    height: 59px;
  }

  .tabs {
    height: 50px;
    padding-top: 16px;
  }

  .form-section {
    min-height: 240px;
    padding: 12px;
  }

  .form-extras {
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
