<template>
  <div class="auth-page">
    <div class="auth-container">
      <!-- Заголовок -->
      <div class="auth-header">
        <h1>ВОССТАНОВИТЬ ПАРОЛЬ</h1>
      </div>

      <!-- Уведомления -->
      <div v-if="message" class="message" :class="messageType">
        {{ message }}
      </div>

      <!-- Форма восстановления пароля -->
      <div class="auth-form" v-if="!emailSent">
        <BaseInput
          v-model="email"
          type="email"
          placeholder="Введите ваш E-mail"
          :error="errors.email"
          :disabled="isLoading"
          @input="clearError('email')"
        />

        <div class="form-actions">
          <div class="back-button" @click="goBack">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M19 12H5M12 19L5 12L12 5"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <button
            @click="submitResetRequest"
            class="auth-button"
            :disabled="isLoading || !isEmailValid"
            :class="{ loading: isLoading }"
          >
            {{ isLoading ? 'ОТПРАВКА...' : 'ВОССТАНОВИТЬ' }}
          </button>
        </div>
      </div>

      <!-- Сообщение об отправке -->
      <div v-else class="success-notification">
        <div class="notification-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
              stroke="#4ade80"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div class="notification-content">
          <h3>
            На ваш E-mail {{ maskedEmail }} была отправлена инструкция по
            восстановлению пароля.
          </h3>
          <div class="countdown-timer">
            Повторная отправка возможна через {{ countdown }} сек
          </div>
        </div>
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
import { ref, computed } from 'vue';
import BaseInput from './../components/form/BaseInput.vue';
import { userAPI, handleApiResponse } from './../utils/api.js';

definePageMeta({
  layout: false,
});

// SEO
useHead({
  title: 'Восстановление пароля - Winora',
  meta: [
    {
      name: 'description',
      content: 'Восстановление пароля для доступа к аккаунту Winora',
    },
  ],
});

// Реактивные переменные
const email = ref('');
const isLoading = ref(false);
const emailSent = ref(false);
const countdown = ref(60);
const message = ref('');
const messageType = ref('success'); // 'success' | 'error'
const errors = ref({});

// Вычисляемые свойства
const isEmailValid = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.value);
});

const maskedEmail = computed(() => {
  if (!email.value) return '';
  const [localPart, domain] = email.value.split('@');
  const maskedLocal =
    localPart.length > 2
      ? localPart[0] +
        '*'.repeat(localPart.length - 2) +
        localPart[localPart.length - 1]
      : localPart;
  return `${maskedLocal}@${domain}`;
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

  if (!email.value.trim()) {
    errors.value.email = 'Введите адрес электронной почты';
    return false;
  }

  if (!isEmailValid.value) {
    errors.value.email = 'Введите корректный адрес электронной почты';
    return false;
  }

  return true;
};

const submitResetRequest = async () => {
  if (!validateForm()) {
    return;
  }

  isLoading.value = true;
  message.value = '';

  try {
    console.log('Отправка запроса на сброс пароля для:', email.value);

    // Реальный API вызов
    const response = await userAPI.resetPassword(email.value);

    console.log('Ответ API сброса пароля:', response);

    // Обрабатываем ответ
    const result = handleApiResponse(response, 'reset password');

    if (result.success) {
      emailSent.value = true;
      startCountdown();
      message.value =
        result.message ||
        'Инструкция по восстановлению пароля отправлена на ваш email';
      messageType.value = 'success';
    } else {
      // Показываем ошибку
      message.value =
        result.message || 'Произошла ошибка при отправке. Попробуйте позже.';
      messageType.value = 'error';
    }
  } catch (error) {
    console.error('Ошибка при сбросе пароля:', error);

    // Обрабатываем различные типы ошибок
    let errorMessage = 'Произошла ошибка при отправке. Попробуйте позже.';

    if (error.message?.includes('Failed to fetch')) {
      errorMessage =
        'Ошибка соединения с сервером. Проверьте интернет-подключение.';
    } else if (error.message) {
      errorMessage = error.message;
    }

    message.value = errorMessage;
    messageType.value = 'error';
  } finally {
    isLoading.value = false;
  }
};

const startCountdown = () => {
  const timer = setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0) {
      clearInterval(timer);
      emailSent.value = false;
      countdown.value = 60;
    }
  }, 1000);
};

const goBack = () => {
  navigateTo('/login');
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
  background-image: url('./../assets/images/winora_bg.png');
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
  color: #ffffff;
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateX(-2px);
}

/* Заголовок */
.auth-header {
  text-align: center;
  margin-bottom: 32px;
  margin-top: 20px;
}

.auth-header h1 {
  font-size: 24px;
  font-weight: 700;
  color: #ff6b35;
  margin: 0;
  letter-spacing: 1px;
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

.form-input {
  width: 100%;
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  font-size: 16px;
  color: #ffffff;
  transition: all 0.3s ease;
  outline: none;
}

.form-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.form-input:focus {
  border-color: #ff6b35;
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
}

.form-input.error {
  border-color: #ef4444;
  background: rgba(239, 68, 68, 0.05);
}

.error-message {
  color: #ef4444;
  font-size: 14px;
  margin-top: 8px;
  margin-left: 4px;
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
}

.auth-button.loading {
  position: relative;
  color: transparent;
}

.auth-button.loading::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  margin: -10px 0 0 -10px;
  border: 2px solid transparent;
  border-top: 2px solid #ffffff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Уведомление об успехе */
.success-notification {
  text-align: center;
  margin-bottom: 32px;
}

.notification-icon {
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
}

.notification-content h3 {
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  margin: 0 0 16px 0;
  line-height: 1.5;
}

.countdown-timer {
  background: rgba(74, 222, 128, 0.1);
  border: 1px solid rgba(74, 222, 128, 0.3);
  border-radius: 12px;
  padding: 12px 16px;
  color: #4ade80;
  font-size: 14px;
  font-weight: 500;
}

/* Переключение форм */
.form-toggle {
  text-align: center;
  margin-top: 24px;
}

.toggle-text {
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
}

.link-button {
  color: #4ade80;
  text-decoration: none;
  font-weight: 500;
  margin-left: 4px;
  transition: color 0.3s ease;
}

.link-button:hover {
  color: #22c55e;
  text-decoration: underline;
}

/* Адаптивность */
@media (max-width: 480px) {
  .auth-page {
    padding: 16px;
  }

  .auth-container {
    padding: 32px 24px;
  }

  .auth-header h1 {
    font-size: 20px;
  }

  .form-input {
    padding: 14px 16px;
    font-size: 15px;
  }

  .auth-button {
    padding: 14px 20px;
    font-size: 15px;
  }
}

@media (max-width: 360px) {
  .auth-container {
    padding: 28px 20px;
  }

  .auth-header h1 {
    font-size: 18px;
  }
}
</style>
