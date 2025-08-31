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
        <NuxtLink to="/registration" class="tab active"> Регистрация </NuxtLink>
        <NuxtLink to="/login" class="tab"> Авторизация </NuxtLink>
      </div>

      <!-- Форма регистрации -->
      <div class="form-section">
        <div class="step-content">
          <!-- Сообщения об успехе или ошибке -->
          <div
            v-if="registrationMessage"
            class="message"
            :class="registrationMessageType"
          >
            <span class="message-icon">
              {{ registrationMessageType === 'success' ? '✅' : '❌' }}
            </span>
            <span class="message-text">{{ registrationMessage }}</span>
          </div>

          <!-- Поля ввода -->
          <BaseInput
            v-model="form.login"
            placeholder="Введите ваш никнейм"
            :error="errors.login"
            :disabled="isLoading"
          />

          <BaseInput
            v-model="form.email"
            type="email"
            placeholder="Введите ваш E-mail"
            :error="errors.email"
            :disabled="isLoading"
          />

          <BaseInput
            v-model="form.password"
            type="password"
            placeholder="Придумайте пароль"
            :error="errors.password"
            :disabled="isLoading"
          />

          <!-- Кнопка регистрации -->
          <BaseButton
            variant="primary"
            :disabled="!isRegistrationValid || isLoading"
            :loading="isLoading"
            @click="submitRegistration"
          >
            {{ isLoading ? 'РЕГИСТРАЦИЯ...' : 'ЗАРЕГИСТРИРОВАТЬСЯ' }}
          </BaseButton>
        </div>
      </div>

      <!-- Ссылка на страницу входа -->
      <div class="form-toggle">
        <div class="toggle-text">
          Уже есть аккаунт?
          <NuxtLink to="/login" class="link-button"> Войдите </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const { registerUser, isLoading } = useAuth();

// Реактивные переменные для сообщений пользователю
const registrationMessage = ref('');
const registrationMessageType = ref('success'); // success | error

// Данные формы
const form = ref({
  login: '',
  email: '',
  password: '',
});

// Ошибки валидации
const errors = ref({});

// Проверка, что все поля формы заполнены корректно
const isRegistrationValid = computed(() => {
  return (
    form.value.login.trim() &&
    isValidEmail(form.value.email) &&
    form.value.password.length >= 8
  );
});

// Простая валидация email
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Функция валидации перед отправкой
const validateRegistration = () => {
  errors.value = {};

  if (!form.value.login.trim()) {
    errors.value.login = 'Никнейм обязателен для заполнения';
  }

  if (!isValidEmail(form.value.email)) {
    errors.value.email = 'Введите корректный email';
  }

  if (form.value.password.length < 8) {
    errors.value.password = 'Пароль должен содержать минимум 8 символов';
  }

  return Object.keys(errors.value).length === 0;
};

// Отправка формы регистрации
const submitRegistration = async () => {
  if (!validateRegistration()) {
    return;
  }

  registrationMessage.value = ''; // Сброс предыдущего сообщения

  try {
    const result = await registerUser(form.value);

    if (result.success) {
      registrationMessage.value = result.message;
      registrationMessageType.value = 'success';
      if (result.needsConfirmation) {
        resetForm(); // Очищаем форму, если нужно подтверждение
      }
    } else {
      registrationMessage.value = result.message;
      registrationMessageType.value = 'error';
    }
  } catch (error) {
    registrationMessage.value = 'Произошла ошибка при регистрации';
    registrationMessageType.value = 'error';
    console.error('Registration error:', error);
  }
};

// Сброс полей формы и ошибок
const resetForm = () => {
  form.value = { login: '', email: '', password: '' };
  errors.value = {};
};
definePageMeta({ layout: false });
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
