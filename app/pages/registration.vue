<template>
  <div class="registration-container">
    <div class="registration-app">
      <!-- Логотип -->
      <div class="logo">
        <img
          src="./../assets/images/Winora_logo.png"
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
              @input="onPasswordInput"
            />

            <!-- Индикатор сложности пароля -->
            <div v-if="showPasswordStrength" class="password-strength">
              <div class="strength-header">
                <span class="strength-icon">🔒</span>
                <span class="strength-title">Сложность пароля</span>
                <span
                  class="strength-level"
                  :style="{ color: passwordStrength.color }"
                >
                  {{ passwordStrength.message }}
                </span>
              </div>

              <!-- Прогресс-бар -->
              <div class="strength-progress">
                <div
                  class="strength-fill"
                  :style="{
                    width: passwordStrength.width,
                    backgroundColor: passwordStrength.color,
                  }"
                ></div>
              </div>

              <!-- Рекомендации -->
              <div
                v-if="
                  passwordStrength.feedback &&
                  passwordStrength.feedback.length > 0
                "
                class="strength-feedback"
              >
                <div class="feedback-title">
                  <span class="feedback-icon">💡</span>
                  <span
                    >Вспомогательная информация, которая появляется на экране и
                    помогает пользователю при работе</span
                  >
                </div>
                <div class="feedback-list">
                  <div
                    v-for="item in passwordStrength.feedback"
                    :key="item"
                    class="feedback-item"
                  >
                    <span class="feedback-bullet">•</span>
                    <span>{{ item }}</span>
                  </div>
                </div>
              </div>
            </div>

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

// Переменные для индикатора сложности пароля
const showPasswordStrength = ref(false);
const passwordStrength = ref({
  score: 0,
  message: '',
  color: '',
  width: '0%',
  feedback: [],
});

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

// Функция для проверки сложности пароля
const checkPasswordStrength = (password) => {
  let score = 0;
  let feedback = [];

  // Проверка длины
  if (password.length >= 8) score += 1;
  else feedback.push('минимум 8 символов');

  // Проверка на строчные буквы
  if (/[a-z]/.test(password)) score += 1;
  else feedback.push('строчные буквы (a-z)');

  // Проверка на заглавные буквы
  if (/[A-Z]/.test(password)) score += 1;
  else feedback.push('заглавные буквы (A-Z)');

  // Проверка на цифры
  if (/\d/.test(password)) score += 1;
  else feedback.push('цифры (0-9)');

  // Проверка на специальные символы
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;
  else feedback.push('специальные символы (!@#$...)');

  // Определение уровня сложности
  let strengthData = {
    score: score,
    feedback: feedback,
  };

  if (score <= 1) {
    strengthData.message = 'Очень слабый';
    strengthData.color = '#ef4444';
    strengthData.width = '20%';
  } else if (score === 2) {
    strengthData.message = 'Слабый';
    strengthData.color = '#f97316';
    strengthData.width = '40%';
  } else if (score === 3) {
    strengthData.message = 'Средний';
    strengthData.color = '#eab308';
    strengthData.width = '60%';
  } else if (score === 4) {
    strengthData.message = 'Хороший';
    strengthData.color = '#22c55e';
    strengthData.width = '80%';
  } else if (score === 5) {
    strengthData.message = 'Отличный';
    strengthData.color = '#16a34a';
    strengthData.width = '100%';
  }

  return strengthData;
};

// Функция валидации перед отправкой
const validateRegistration = () => {
  errors.value = {};
  showPasswordStrength.value = false; // Сброс при каждой валидации

  if (!form.value.login.trim()) {
    errors.value.login = 'Никнейм обязателен для заполнения';
  } else if (form.value.login.length < 3) {
    errors.value.login = 'Никнейм должен содержать минимум 3 символа';
  }

  if (!isValidEmail(form.value.email)) {
    errors.value.email = 'Введите корректный email';
  }

  // Расширенная валидация пароля
  if (form.value.password.length < 8) {
    errors.value.password = 'Пароль должен содержать минимум 8 символов';
    // Показать индикатор сложности при ошибке
    showPasswordStrength.value = true;
    passwordStrength.value = checkPasswordStrength(form.value.password);
  } else {
    // Проверить сложность даже если длина достаточна
    const strength = checkPasswordStrength(form.value.password);
    if (strength.score < 3) {
      showPasswordStrength.value = true;
      passwordStrength.value = strength;
      errors.value.password =
        'Пароль слишком простой. Улучшите его безопасность.';
    }
  }

  return Object.keys(errors.value).length === 0;
};

// Функция для отслеживания ввода пароля
const onPasswordInput = () => {
  if (showPasswordStrength.value) {
    passwordStrength.value = checkPasswordStrength(form.value.password);
  }
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
  showPasswordStrength.value = false;
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
  cursor: pointer;
  border: none;
  background: transparent;
  transition: all 0.3s ease;
  font-size: 16px;
  border-bottom: 2px solid transparent;
  border-radius: 0;
  text-decoration: none;
  box-sizing: border-box;
  font-family: Roboto, serif;
  font-weight: 400;
  line-height: 13px;
  letter-spacing: 0%;
  vertical-align: middle;
  color: #ffffff;
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
  min-height: 452px;
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
  align-items: flex-start;
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

/* Индикатор сложности пароля */
.password-strength {
  margin-top: 8px;
  margin-bottom: 10px;
  padding: 16px;
  background: rgba(0, 170, 105, 0.1);
  border: 1px solid rgba(0, 170, 105, 0.2);
  border-radius: 12px;
  animation: slideDown 0.3s ease;
}

.strength-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.strength-icon {
  font-size: 16px;
  flex-shrink: 0;
}

.strength-title {
  font-size: 14px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
}

.strength-level {
  font-size: 14px;
  font-weight: 600;
  margin-left: auto;
}

/* Прогресс-бар */
.strength-progress {
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 12px;
}

.strength-fill {
  height: 100%;
  border-radius: 3px;
  transition:
    width 0.3s ease,
    background-color 0.3s ease;
}

/* Обратная связь */
.strength-feedback {
  margin-top: 12px;
}

.feedback-title {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 8px;
}

.feedback-icon {
  font-size: 14px;
  flex-shrink: 0;
  margin-top: 1px;
}

.feedback-title span:last-child {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.4;
}

.feedback-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 8px;
}

.feedback-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
}

.feedback-bullet {
  color: rgba(255, 255, 255, 0.5);
  font-weight: bold;
  flex-shrink: 0;
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

/* Кнопки действий */
.success-actions {
  display: flex;
  gap: 12px;
  margin-top: 8px;
  width: 100%;
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

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
    max-height: 0;
  }
  to {
    opacity: 1;
    transform: translateY(0);
    max-height: 200px;
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
    min-height: 420px;
    padding: 22px 18px 18px 18px;
  }

  .password-strength {
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
    min-height: 452px;
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
    min-height: 380px;
    padding: 20px 14px 14px 14px;
    border-bottom-right-radius: 24px;
    border-bottom-left-radius: 24px;
  }

  .message {
    font-size: 13px;
    padding: 14px;
  }

  .password-strength {
    padding: 12px;
    margin-top: 6px;
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
    min-height: 360px;
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

  .password-strength {
    padding: 12px;
    margin-top: 6px;
  }

  .strength-header {
    margin-bottom: 8px;
  }

  .strength-title,
  .strength-level {
    font-size: 13px;
  }

  .feedback-title span:last-child {
    font-size: 11px;
  }

  .feedback-item {
    font-size: 11px;
  }

  .success-actions {
    flex-direction: column;
    gap: 10px;
  }

  .instruction-step {
    font-size: 12px;
    gap: 10px;
  }

  .step-number {
    width: 20px;
    height: 20px;
    font-size: 10px;
  }

  .instruction-note {
    font-size: 11px;
    padding: 10px;
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
    min-height: 340px;
    padding: 14px 10px 10px 10px;
  }

  .message {
    font-size: 11px;
    padding: 10px;
  }

  .password-strength {
    padding: 10px;
    margin-top: 4px;
  }

  .strength-title,
  .strength-level {
    font-size: 12px;
  }

  .feedback-title span:last-child {
    font-size: 10px;
  }

  .feedback-item {
    font-size: 10px;
  }

  .instruction-step {
    font-size: 11px;
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
    min-height: 300px;
    padding: 12px;
  }

  .password-strength {
    padding: 10px;
    margin-top: 4px;
  }

  .strength-header {
    margin-bottom: 6px;
  }

  .feedback-title span:last-child {
    font-size: 10px;
  }

  .feedback-item {
    font-size: 10px;
  }
}
</style>
