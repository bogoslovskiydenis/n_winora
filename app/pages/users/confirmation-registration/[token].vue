<!-- pages/users/confirmation-registration/[token].vue -->
<template>
  <div class="confirmation-container">
    <div class="confirmation-card">
      <!-- Логотип -->
      <div class="logo">
        <img
          src="~/assets/images/Winora_logo.png"
          alt="Winora Logo"
          class="logo-image"
        />
      </div>

      <!-- Контент в зависимости от состояния -->
      <div class="confirmation-content">
        <!-- Загрузка -->
        <div v-if="isLoading" class="status-section loading">
          <div class="status-icon">
            <div class="spinner"></div>
          </div>
          <h2 class="status-title">Подтверждение email...</h2>
          <p class="status-description">
            Пожалуйста, подождите. Мы обрабатываем ваш запрос.
          </p>
        </div>

        <!-- Успешное подтверждение -->
        <div
          v-else-if="confirmationStatus === 'success'"
          class="status-section success"
        >
          <div class="status-icon">
            <span class="success-icon">✅</span>
          </div>
          <h2 class="status-title">Email успешно подтвержден!</h2>
          <p class="status-description">
            Ваш аккаунт активирован. Теперь вы можете войти в систему и начать
            использовать все возможности Winora.
          </p>

          <div class="confirmation-actions">
            <BaseButton
              variant="primary"
              @click="navigateToLogin"
              class="action-button"
            >
              <span class="btn-icon">🚀</span>
              Войти в аккаунт
            </BaseButton>
          </div>

          <!-- Дополнительная информация -->
          <div class="welcome-info">
            <div class="info-item">
              <span class="info-icon">🎁</span>
              <span class="info-text">Добро пожаловать в Winora!</span>
            </div>
            <div class="info-item">
              <span class="info-icon">⭐</span>
              <span class="info-text">Вы можете начать инвестировать</span>
            </div>
          </div>
        </div>

        <!-- Ошибка подтверждения -->
        <div
          v-else-if="confirmationStatus === 'error'"
          class="status-section error"
        >
          <div class="status-icon">
            <span class="error-icon">❌</span>
          </div>
          <h2 class="status-title">Ошибка подтверждения</h2>
          <p class="status-description">
            {{ errorMessage }}
          </p>

          <div class="confirmation-actions">
            <BaseButton
              variant="outline"
              @click="navigateToRegistration"
              class="action-button"
            >
              <span class="btn-icon">🔄</span>
              Зарегистрироваться снова
            </BaseButton>
            <BaseButton
              variant="secondary"
              @click="retryConfirmation"
              :loading="isRetrying"
              class="action-button"
            >
              <span class="btn-icon">↻</span>
              Попробовать снова
            </BaseButton>
          </div>

          <!-- Дополнительная помощь -->
          <div class="help-section">
            <p class="help-text">
              Если проблема повторяется, свяжитесь с нашей службой поддержки.
            </p>
            <a href="mailto:support@winora.com" class="support-link">
              📧 support@winora.com
            </a>
          </div>
        </div>

        <!-- Недействительный токен -->
        <div v-else class="status-section invalid">
          <div class="status-icon">
            <span class="invalid-icon">⚠️</span>
          </div>
          <h2 class="status-title">Недействительная ссылка</h2>
          <p class="status-description">
            Ссылка подтверждения недействительна или устарела. Пожалуйста,
            зарегистрируйтесь заново.
          </p>

          <div class="confirmation-actions">
            <BaseButton
              variant="primary"
              @click="navigateToRegistration"
              class="action-button"
            >
              <span class="btn-icon">🔄</span>
              Зарегистрироваться снова
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false,
});

const route = useRoute();
const { confirmRegistration } = useAuth();

// Получаем токен из URL
const token = route.params.token;

// Состояния компонента
const isLoading = ref(true);
const isRetrying = ref(false);
const confirmationStatus = ref(null); // 'success', 'error', 'invalid'
const errorMessage = ref('');

// Функция подтверждения email
const confirmEmail = async () => {
  if (!token || typeof token !== 'string') {
    console.log('No token provided or token is invalid');
    confirmationStatus.value = 'invalid';
    isLoading.value = false;
    return;
  }

  try {
    console.log('Confirming registration with token:', token);
    const result = await confirmRegistration(token);

    if (result.success) {
      confirmationStatus.value = 'success';
      console.log('Registration confirmed successfully');
    } else {
      confirmationStatus.value = 'error';
      errorMessage.value = result.message || 'Ошибка подтверждения email';
      console.log('Registration confirmation failed:', result.message);
    }
  } catch (error) {
    confirmationStatus.value = 'error';
    errorMessage.value = 'Произошла неожиданная ошибка при подтверждении';
    console.error('Confirmation error:', error);
  } finally {
    isLoading.value = false;
    isRetrying.value = false;
  }
};

// Навигация
const navigateToLogin = () => {
  navigateTo('/login');
};

const navigateToRegistration = () => {
  navigateTo('/registration');
};

// Повторная попытка подтверждения
const retryConfirmation = () => {
  isRetrying.value = true;
  isLoading.value = true;
  confirmationStatus.value = null;

  setTimeout(() => {
    confirmEmail();
  }, 500);
};

// Автоматическое подтверждение при загрузке страницы
onMounted(() => {
  console.log('Confirmation page mounted with token:', token);
  confirmEmail();
});

// SEO метаданные
useHead({
  title: 'Подтверждение email - Winora',
  meta: [
    {
      name: 'description',
      content: 'Подтверждение email адреса для активации аккаунта Winora',
    },
    { name: 'robots', content: 'noindex, nofollow' },
  ],
});
</script>

<style scoped>
.confirmation-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(135deg, #01614b, #032019 70%);
}

.confirmation-card {
  max-width: 500px;
  width: 100%;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 40px 30px;
  text-align: center;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
}

/* Логотип */
.logo {
  margin-bottom: 32px;
}

.logo-image {
  width: 80px;
  height: 80px;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
}

/* Контент */
.confirmation-content {
  animation: fadeIn 0.6s ease;
}

.status-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

/* Иконки статуса */
.status-icon {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin-bottom: 8px;
}

.success .status-icon {
  background: rgba(34, 197, 94, 0.2);
  border: 3px solid rgba(34, 197, 94, 0.3);
  box-shadow: 0 0 30px rgba(34, 197, 94, 0.3);
  animation: pulse 2s ease-in-out infinite;
}

.error .status-icon,
.invalid .status-icon {
  background: rgba(239, 68, 68, 0.2);
  border: 3px solid rgba(239, 68, 68, 0.3);
  box-shadow: 0 0 30px rgba(239, 68, 68, 0.3);
}

.loading .status-icon {
  background: rgba(74, 222, 128, 0.2);
  border: 3px solid rgba(74, 222, 128, 0.3);
  box-shadow: 0 0 30px rgba(74, 222, 128, 0.3);
}

.success-icon,
.error-icon,
.invalid-icon {
  font-size: 40px;
}

.success-icon {
  color: #22c55e;
}

.error-icon,
.invalid-icon {
  color: #ef4444;
}

/* Спиннер для загрузки */
.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(74, 222, 128, 0.3);
  border-top: 4px solid #4ade80;
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

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

/* Текст */
.status-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
  line-height: 1.3;
}

.loading .status-title {
  color: #4ade80;
}

.success .status-title {
  color: #22c55e;
}

.error .status-title,
.invalid .status-title {
  color: #ef4444;
}

.status-description {
  font-size: 16px;
  color: var(--text-secondary);
  line-height: 1.5;
  margin: 0;
  max-width: 400px;
}

/* Действия */
.confirmation-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 8px;
}

.action-button {
  min-width: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-icon {
  font-size: 16px;
}

/* Информация о бонусах */
.welcome-info {
  margin-top: 24px;
  padding: 20px;
  background: rgba(74, 222, 128, 0.1);
  border: 1px solid rgba(74, 222, 128, 0.2);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: var(--text-primary);
}

.info-icon {
  font-size: 20px;
  flex-shrink: 0;
}

.info-text {
  font-weight: 500;
}

/* Секция помощи */
.help-section {
  margin-top: 20px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

.help-text {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 0 0 8px 0;
}

.support-link {
  color: #4ade80;
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  transition: color 0.3s ease;
}

.support-link:hover {
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

.status-section {
  animation: statusSlideIn 0.6s ease;
}

@keyframes statusSlideIn {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Адаптивность */
@media (max-width: 768px) {
  .confirmation-card {
    padding: 32px 20px;
    margin: 16px;
  }

  .logo-image {
    width: 60px;
    height: 60px;
  }

  .status-title {
    font-size: 20px;
  }

  .status-description {
    font-size: 14px;
  }

  .status-icon {
    width: 60px;
    height: 60px;
  }

  .success-icon,
  .error-icon,
  .invalid-icon {
    font-size: 30px;
  }

  .spinner {
    width: 30px;
    height: 30px;
    border-width: 3px;
  }

  .confirmation-actions {
    flex-direction: column;
  }

  .action-button {
    width: 100%;
  }

  .welcome-info {
    padding: 16px;
  }

  .info-item {
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .confirmation-container {
    padding: 12px;
  }

  .confirmation-card {
    padding: 24px 16px;
  }

  .status-section {
    gap: 12px;
  }

  .status-title {
    font-size: 18px;
  }

  .status-description {
    font-size: 13px;
  }
}

/* Поддержка уменьшенной анимации */
@media (prefers-reduced-motion: reduce) {
  .confirmation-content,
  .success .status-icon,
  .spinner,
  .status-section {
    animation: none;
  }
}

/* Focus states для доступности */
.action-button:focus-visible,
.support-link:focus-visible {
  outline: 2px solid #4ade80;
  outline-offset: 2px;
}
</style>
