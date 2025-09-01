<!-- pages/registration.vue -->
<template>
  <div class="registration-container">
    <div class="registration-app">
      <!-- Логотип -->
      <div class="logo">
        <img
          src="~/assets/images/Winora_logo.png"
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
            <div class="message-content">
              <span class="message-text">{{ registrationMessage }}</span>
              <!-- Дополнительные инструкции для успешной регистрации -->
              <div
                v-if="
                  registrationMessageType === 'success' && showEmailInstructions
                "
                class="email-instructions"
              >
                <div class="instruction-step">
                  <span class="step-number">1</span>
                  <span class="step-text"
                    >Откройте вашу почту <strong>{{ form.email }}</strong></span
                  >
                </div>
                <div class="instruction-step">
                  <span class="step-number">2</span>
                  <span class="step-text">Найдите письмо от Winora</span>
                </div>
                <div class="instruction-step">
                  <span class="step-number">3</span>
                  <span class="step-text">Нажмите на ссылку подтверждения</span>
                </div>
                <div class="instruction-note">
                  <span class="note-icon">💡</span>
                  <span class="note-text"
                    >Не забудьте проверить папку "Спам"</span
                  >
                </div>
              </div>
            </div>
          </div>

          <!-- Поля ввода (скрываются при успешной регистрации) -->
          <div v-if="!showEmailInstructions">
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
              placeholder="Придумайте пароль (минимум 8 символов)"
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

          <!-- Кнопки для успешной регистрации -->
          <div v-if="showEmailInstructions" class="success-actions">
            <BaseButton
              variant="outline"
              @click="openEmailClient"
              class="email-btn"
            >
              <span class="btn-icon">📧</span>
              Открыть почту
            </BaseButton>
            <BaseButton
              variant="secondary"
              @click="resetForm"
              class="reset-btn"
            >
              <span class="btn-icon">🔄</span>
              Зарегистрировать другой аккаунт
            </BaseButton>
          </div>
        </div>
      </div>

      <!-- Ссылка на страницу входа -->
      <div class="form-toggle" v-if="!showEmailInstructions">
        <div class="toggle-text">
          Уже есть аккаунт?
          <NuxtLink to="/login" class="link-button"> Войдите </NuxtLink>
        </div>
      </div>

      <!-- Информация для успешной регистрации -->
      <div class="form-toggle" v-if="showEmailInstructions">
        <div class="toggle-text">
          Уже подтвердили email?
          <NuxtLink to="/login" class="link-button"> Войти в аккаунт </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false,
});

const { registerUser, isLoading } = useAuth();

// Реактивные переменные для сообщений пользователю
const registrationMessage = ref('');
const registrationMessageType = ref('success'); // success | error
const showEmailInstructions = ref(false);

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
  } else if (form.value.login.length < 3) {
    errors.value.login = 'Никнейм должен содержать минимум 3 символа';
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
  showEmailInstructions.value = false;

  try {
    const result = await registerUser(form.value);

    if (result.success) {
      registrationMessage.value = result.message;
      registrationMessageType.value = 'success';

      if (result.needsConfirmation) {
        showEmailInstructions.value = true;
      }
    } else {
      registrationMessage.value = result.message;
      registrationMessageType.value = 'error';
      showEmailInstructions.value = false;
    }
  } catch (error) {
    registrationMessage.value = 'Произошла ошибка при регистрации';
    registrationMessageType.value = 'error';
    showEmailInstructions.value = false;
    console.error('Registration error:', error);
  }
};

// Сброс полей формы и ошибок
const resetForm = () => {
  form.value = { login: '', email: '', password: '' };
  errors.value = {};
  registrationMessage.value = '';
  showEmailInstructions.value = false;
};

// Открытие почтового клиента
const openEmailClient = () => {
  // Определяем домен email для открытия соответствующего сервиса
  const email = form.value.email;
  const domain = email.split('@')[1]?.toLowerCase();

  let mailUrl = `mailto:${email}`;

  // Популярные почтовые сервисы
  if (domain?.includes('gmail.com')) {
    mailUrl = 'https://mail.google.com';
  } else if (domain?.includes('yandex.ru') || domain?.includes('ya.ru')) {
    mailUrl = 'https://mail.yandex.ru';
  } else if (domain?.includes('mail.ru')) {
    mailUrl = 'https://mail.mail.ru';
  } else if (
    domain?.includes('outlook.com') ||
    domain?.includes('hotmail.com')
  ) {
    mailUrl = 'https://outlook.live.com';
  }

  window.open(mailUrl, '_blank');
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
  max-width: 520px;
  width: 100%;
  padding: 40px 30px;
}

/* Desktop адаптация */
@media (min-width: 1024px) {
  .registration-app {
    max-width: 560px;
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
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  border-radius: 12px;
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
  font-size: 20px;
  flex-shrink: 0;
  margin-top: 2px;
}

.message-content {
  flex: 1;
}

.message-text {
  display: block;
  line-height: 1.4;
  margin-bottom: 16px;
}

/* Инструкции по email */
.email-instructions {
  margin-top: 16px;
}

.instruction-step {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  font-size: 13px;
}

.step-number {
  width: 24px;
  height: 24px;
  background: rgba(34, 197, 94, 0.2);
  border: 2px solid rgba(34, 197, 94, 0.4);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 12px;
  flex-shrink: 0;
}

.step-text {
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.4;
}

.instruction-note {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  font-size: 12px;
}

.note-icon {
  font-size: 16px;
  flex-shrink: 0;
}

.note-text {
  color: rgba(255, 255, 255, 0.8);
}

/* Кнопки действий для успеха */
.success-actions {
  display: flex;
  gap: 12px;
  margin-top: 8px;
}

.email-btn,
.reset-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-icon {
  font-size: 16px;
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

/* Адаптивность */
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
    padding: 12px 14px;
  }

  .success-actions {
    flex-direction: column;
  }

  .instruction-step {
    font-size: 12px;
  }

  .step-number {
    width: 20px;
    height: 20px;
    font-size: 10px;
  }
}

/* Стили для лучшей доступности */
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
  max-height: 500px;
  transition: all 0.3s ease;
}

.message:empty {
  max-height: 0;
  padding: 0;
  margin: 0;
  border: none;
}
</style>
