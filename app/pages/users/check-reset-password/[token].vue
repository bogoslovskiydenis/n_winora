<template>
  <div class="auth-page">
    <div class="auth-container">
      <!-- Кнопка назад -->
      <div class="back-button" @click="goBack">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M19 12H5M12 19L5 12L12 5"
            stroke="rgba(255, 255, 255, 0.7)"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>

      <!-- Заголовок -->
      <div class="auth-header">
        <h1>Winora</h1>
      </div>

      <!-- Проверка токена -->
      <div v-if="isCheckingToken" class="validation-loading">
        <div class="loading-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="rgba(255, 255, 255, 0.3)"
              stroke-width="2"
            />
            <path
              d="M12 2A10 10 0 0 1 22 12"
              stroke="#ff6b35"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </div>
        <h3>Проверка ссылки</h3>
        <p>Проверяем действительность ссылки для восстановления пароля...</p>
      </div>

      <!-- Ошибка токена -->
      <div v-else-if="!isTokenValid" class="invalid-token">
        <div class="error-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#ef4444" stroke-width="2" />
            <path
              d="M15 9L9 15M9 9L15 15"
              stroke="#ef4444"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <h3>Недействительная ссылка</h3>
        <p>
          Ссылка для восстановления пароля недействительна или устарела.
          Возможные причины:
        </p>
        <div class="help-section">
          <ul>
            <li>Ссылка была использована ранее</li>
            <li>Истек срок действия ссылки (24 часа)</li>
            <li>Ссылка была повреждена при копировании</li>
          </ul>
        </div>
        <div class="form-actions">
          <button class="auth-button" @click="goToForgotPassword">
            Запросить новую ссылку
          </button>
        </div>
      </div>

      <!-- Успешная установка пароля -->
      <div v-else-if="passwordUpdated" class="success-message">
        <div class="success-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#10b981" stroke-width="2" />
            <path
              d="M9 12L11 14L15 10"
              stroke="#10b981"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <h3>Пароль успешно обновлен!</h3>
        <p>Теперь вы можете войти в систему с новым паролем.</p>
        <div class="form-actions">
          <button class="auth-button" @click="goToLogin">
            Войти в систему
          </button>
        </div>
      </div>

      <!-- Форма установки нового пароля -->
      <div v-else>
        <h2>Установка нового пароля</h2>
        <p class="form-description">
          Создайте новый надежный пароль для вашего аккаунта
        </p>

        <!-- Сообщение об ошибке -->
        <div v-if="message && messageType === 'error'" class="message error">
          {{ message }}
        </div>

        <form @submit.prevent="submitNewPassword" class="auth-form">
          <!-- Новый пароль -->
          <div class="form-group">
            <BaseInput
              v-model="newPassword"
              type="password"
              placeholder="Новый пароль"
              :error="errors.newPassword"
              @input="clearError('newPassword')"
              required
            />
          </div>

          <!-- Индикатор сложности пароля -->
          <div v-if="newPassword" class="password-strength">
            <div class="strength-header">
              <span class="strength-icon">🔐</span>
              <span class="strength-title">Сложность пароля:</span>
              <span
                class="strength-level"
                :style="{ color: passwordStrength.color }"
              >
                {{ passwordStrength.message }}
              </span>
            </div>
            <div class="strength-progress">
              <div
                class="strength-bar"
                :style="{
                  width: passwordStrength.score + '%',
                  backgroundColor: passwordStrength.color,
                }"
              ></div>
            </div>
          </div>

          <!-- Подтверждение пароля -->
          <div class="form-group">
            <BaseInput
              v-model="confirmPassword"
              type="password"
              placeholder="Подтвердите пароль"
              :error="errors.confirmPassword"
              @input="clearError('confirmPassword')"
              required
            />
          </div>

          <!-- Кнопка отправки -->
          <div class="form-actions">
            <button
              type="submit"
              class="auth-button"
              :disabled="!isFormValid || isLoading"
            >
              <span v-if="isLoading" class="button-spinner"></span>
              {{ isLoading ? 'Обновление...' : 'Обновить пароль' }}
            </button>
          </div>
        </form>
      </div>

      <!-- Переключение между формами -->
      <div class="form-toggle">
        <div class="toggle-text">
          Вспомнили пароль?
          <NuxtLink to="/login" class="link-button"> Войдите </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import BaseInput from '~/components/form/BaseInput.vue';
import { userAPI, handleApiResponse } from '~/utils/api.js';

definePageMeta({
  layout: false,
});

// SEO
useHead({
  title: 'Установка нового пароля - Winora',
  meta: [
    {
      name: 'description',
      content: 'Установка нового пароля для доступа к аккаунту Winora',
    },
  ],
});

const route = useRoute();
const token = route.params.token;

// Реактивные переменные
const newPassword = ref('');
const confirmPassword = ref('');
const isLoading = ref(false);
const isCheckingToken = ref(true);
const isTokenValid = ref(false);
const passwordUpdated = ref(false);
const message = ref('');
const messageType = ref('success'); // 'success' | 'error'
const errors = ref({});

// Проверка валидности токена при загрузке
onMounted(async () => {
  console.log('Проверка токена:', token);

  if (!token || typeof token !== 'string') {
    isCheckingToken.value = false;
    isTokenValid.value = false;
    message.value = 'Недействительная ссылка для восстановления пароля';
    messageType.value = 'error';
    return;
  }

  try {
    // Проверяем токен через API
    const response = await userAPI.checkResetPasswordToken(token);
    console.log('Ответ проверки токена:', response);

    const result = handleApiResponse(response, 'check reset password token');

    if (result.success) {
      isTokenValid.value = true;
    } else {
      isTokenValid.value = false;
      message.value =
        result.message ||
        'Ссылка для восстановления пароля недействительна или устарела';
      messageType.value = 'error';
    }
  } catch (error) {
    console.error('Ошибка при проверке токена:', error);
    isTokenValid.value = false;

    let errorMessage = 'Ошибка при проверке ссылки';
    if (error.message?.includes('Failed to fetch')) {
      errorMessage =
        'Ошибка соединения с сервером. Проверьте интернет-подключение.';
    } else if (error.message) {
      errorMessage = error.message;
    }

    message.value = errorMessage;
    messageType.value = 'error';
  } finally {
    isCheckingToken.value = false;
  }
});

// Вычисляемые свойства
const passwordStrength = computed(() => {
  const password = newPassword.value;
  if (!password) return { score: 0, message: '', color: '#666' };

  let score = 0;
  let message = '';
  let color = '';

  // Базовая проверка длины
  if (password.length >= 8) score += 25;
  if (password.length >= 12) score += 15;

  // Проверка на символы
  if (/[a-z]/.test(password)) score += 15;
  if (/[A-Z]/.test(password)) score += 15;
  if (/\d/.test(password)) score += 15;
  if (/[^a-zA-Z\d]/.test(password)) score += 15;

  if (score < 40) {
    message = 'Слабый';
    color = '#ef4444';
  } else if (score < 70) {
    message = 'Средний';
    color = '#f59e0b';
  } else {
    message = 'Сильный';
    color = '#10b981';
  }

  return { score: Math.min(score, 100), message, color };
});

const isFormValid = computed(() => {
  return (
    newPassword.value.length >= 8 &&
    confirmPassword.value === newPassword.value &&
    passwordStrength.value.score >= 40
  );
});

// Методы
const clearError = (field) => {
  if (errors.value[field]) {
    delete errors.value[field];
  }
  if (message.value) {
    message.value = '';
  }
};

const validateForm = () => {
  errors.value = {};

  if (!newPassword.value.trim()) {
    errors.value.newPassword = 'Введите новый пароль';
    return false;
  }

  if (newPassword.value.length < 8) {
    errors.value.newPassword = 'Пароль должен содержать минимум 8 символов';
    return false;
  }

  if (!confirmPassword.value.trim()) {
    errors.value.confirmPassword = 'Подтвердите пароль';
    return false;
  }

  if (newPassword.value !== confirmPassword.value) {
    errors.value.confirmPassword = 'Пароли не совпадают';
    return false;
  }

  if (passwordStrength.value.score < 40) {
    errors.value.newPassword =
      'Пароль слишком простой. Используйте буквы, цифры и специальные символы';
    return false;
  }

  return true;
};

const submitNewPassword = async () => {
  if (!validateForm()) {
    return;
  }

  isLoading.value = true;
  message.value = '';

  try {
    console.log('Установка нового пароля с токеном:', token);

    // API вызов для установки нового пароля
    const response = await userAPI.setNewPassword(token, newPassword.value);
    console.log('Ответ API установки пароля:', response);

    // Обрабатываем ответ
    const result = handleApiResponse(response, 'set new password');

    if (result.success) {
      passwordUpdated.value = true;
      message.value = result.message || 'Пароль успешно обновлен!';
      messageType.value = 'success';
    } else {
      // Показываем ошибку
      message.value =
        result.message || 'Произошла ошибка при установке нового пароля';
      messageType.value = 'error';
    }
  } catch (error) {
    console.error('Ошибка при установке нового пароля:', error);

    // Обрабатываем различные типы ошибок
    let errorMessage = 'Произошла ошибка при установке нового пароля';

    if (error.message?.includes('Failed to fetch')) {
      errorMessage =
        'Ошибка соединения с сервером. Проверьте интернет-подключение.';
    } else if (
      error.message?.includes('invalid') ||
      error.message?.includes('expired')
    ) {
      errorMessage =
        'Ссылка для восстановления пароля недействительна или устарела';
    } else if (error.message) {
      errorMessage = error.message;
    }

    message.value = errorMessage;
    messageType.value = 'error';
  } finally {
    isLoading.value = false;
  }
};

const goBack = () => {
  navigateTo('/login');
};

const goToLogin = () => {
  navigateTo('/login');
};

const goToForgotPassword = () => {
  navigateTo('/forgot-password');
};
</script>

<style scoped>
/* Основные стили */
.auth-page {
  min-height: 100vh;
  background:
    linear-gradient(180deg, #01614b 0%, #032019 100%),
    linear-gradient(0deg, rgba(0, 0, 0, 0.56), rgba(0, 0, 0, 0.56)),
    radial-gradient(
      91.87% 42.67% at 50.13% -9.91%,
      rgba(255, 255, 255, 0.1) 3.42%,
      rgba(255, 255, 255, 0) 100%
    );
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-family: 'Inter', sans-serif;
}

.auth-container {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 40px;
  width: 100%;
  max-width: 420px;
  position: relative;
}

/* Фоновое изображение */
.auth-page::after {
  content: '';
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40vh;
  background-image: url('~/assets/images/winora_bg.png');
  background-repeat: no-repeat;
  background-position: center bottom;
  background-size: cover;
  opacity: 0.15;
  pointer-events: none;
}

/* Кнопка назад */
.back-button {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 24px;
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateX(-2px);
}

/* Заголовок */
.auth-header {
  text-align: center;
  margin-bottom: 32px;
}

.auth-header h1 {
  font-size: 24px;
  font-weight: 700;
  color: #ff6b35;
  margin: 0;
  letter-spacing: 1px;
}

.auth-container h2 {
  color: #ffffff;
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 8px 0;
  text-align: center;
}

.form-description {
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  text-align: center;
  margin: 0 0 32px 0;
  line-height: 1.5;
}

/* Состояния загрузки и ошибок */
.validation-loading {
  text-align: center;
  margin-bottom: 32px;
}

.loading-icon {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}

.loading-icon svg {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.validation-loading h3 {
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 8px 0;
}

.validation-loading p {
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  margin: 0;
}

/* Недействительный токен */
.invalid-token {
  text-align: center;
  margin-bottom: 32px;
}

.error-icon {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}

.invalid-token h3 {
  color: #ef4444;
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 12px 0;
}

.invalid-token p {
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  margin: 0 0 20px 0;
  line-height: 1.5;
}

.help-section {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 16px;
  margin: 20px 0;
  text-align: left;
}

.help-section ul {
  margin: 0;
  padding-left: 20px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
}

.help-section li {
  margin-bottom: 8px;
}

/* Успешное сообщение */
.success-message {
  text-align: center;
  margin-bottom: 32px;
}

.success-icon {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}

.success-message h3 {
  color: #10b981;
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 12px 0;
}

.success-message p {
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  margin: 0 0 20px 0;
  line-height: 1.5;
}

/* Сообщения */
.message {
  padding: 12px 16px;
  border-radius: 12px;
  margin-bottom: 24px;
  font-size: 14px;
  font-weight: 500;
}

.message.success {
  background: rgba(74, 222, 128, 0.1);
  border: 1px solid rgba(74, 222, 128, 0.3);
  color: #4ade80;
}

.message.error {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #ef4444;
}

/* Форма */
.auth-form {
  margin-bottom: 32px;
}

.form-group {
  margin-bottom: 24px;
}

/* Индикатор сложности пароля */
.password-strength {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 20px;
}

.strength-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.strength-icon {
  font-size: 16px;
}

.strength-title {
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  font-weight: 500;
  flex: 1;
}

.strength-level {
  font-size: 14px;
  font-weight: 600;
}

.strength-progress {
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
}

.strength-bar {
  height: 100%;
  border-radius: 3px;
  transition: all 0.3s ease;
}

/* Кнопки */
.form-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.auth-button {
  width: 100%;
  padding: 16px 24px;
  background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
  border: none;
  border-radius: 16px;
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.auth-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 107, 53, 0.3);
}

.auth-button:active {
  transform: translateY(0);
}

.auth-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.button-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #ffffff;
  animation: spin 1s linear infinite;
}

/* Переключение между формами */
.form-toggle {
  text-align: center;
}

.toggle-text {
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
}

.link-button {
  color: #ff6b35;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.link-button:hover {
  color: #f7931e;
}

/* Адаптивность */
@media (max-width: 480px) {
  .auth-container {
    padding: 24px;
    margin: 10px;
  }

  .auth-header h1 {
    font-size: 20px;
  }

  .auth-container h2 {
    font-size: 18px;
  }
}
</style>
