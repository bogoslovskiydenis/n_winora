<template>
  <div class="verification-section">
    <div class="verification-header">
      <div class="warning-icon">⚠️</div>
      <div class="verification-text">
        <h3>Верификация аккаунта</h3>
        <p>Верификация личных данных необходима для загрузки копий документов удостоверяющих личность</p>
      </div>
    </div>

    <div class="verification-form">
      <div class="form-section">
        <h4>Личные данные</h4>
        <div class="form-grid">
          <BaseInput
              v-model="formData.firstName"
              placeholder="Имя"
              :error="errors.firstName"
          />
          <BaseInput
              v-model="formData.lastName"
              placeholder="Фамилия"
              :error="errors.lastName"
          />
          <BaseInput
              v-model="formData.phone"
              placeholder="Номер телефона"
              :error="errors.phone"
          />
          <BaseInput
              v-model="formData.address"
              placeholder="Адрес проживания"
              :error="errors.address"
          />
        </div>
      </div>

      <div class="form-section">
        <h4>Документы</h4>
        <div class="document-upload">
          <div class="upload-item">
            <div class="upload-label">Паспорт (главная страница)</div>
            <div class="upload-area" @click="$emit('upload-document', 'passport')">
              <div class="upload-icon">📄</div>
              <div class="upload-text">Нажмите для загрузки</div>
            </div>
          </div>
          <div class="upload-item">
            <div class="upload-label">Селфи с паспортом</div>
            <div class="upload-area" @click="$emit('upload-document', 'selfie')">
              <div class="upload-icon">🤳</div>
              <div class="upload-text">Нажмите для загрузки</div>
            </div>
          </div>
        </div>
      </div>

      <div class="form-actions">
        <BaseButton
            variant="primary"
            :loading="loading"
            @click="handleSubmit"
        >
          Отправить на верификацию
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['submit', 'upload-document'])

const formData = ref({
  firstName: '',
  lastName: '',
  phone: '',
  address: ''
})

const errors = ref({})

const validateForm = () => {
  errors.value = {}

  if (!formData.value.firstName.trim()) {
    errors.value.firstName = 'Введите имя'
  }

  if (!formData.value.lastName.trim()) {
    errors.value.lastName = 'Введите фамилию'
  }

  if (!formData.value.phone.trim()) {
    errors.value.phone = 'Введите номер телефона'
  }

  if (!formData.value.address.trim()) {
    errors.value.address = 'Введите адрес'
  }

  return Object.keys(errors.value).length === 0
}

const handleSubmit = () => {
  if (validateForm()) {
    emit('submit', { ...formData.value })
  }
}
</script>

<style scoped>
.verification-section {
  max-width: 600px;
  margin: 0 auto;
}

.verification-header {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 20px;
  background: rgba(249, 115, 22, 0.1);
  border: 1px solid rgba(249, 115, 22, 0.3);
  border-radius: 12px;
  margin-bottom: 24px;
}

.warning-icon {
  font-size: 24px;
  color: #f97316;
  flex-shrink: 0;
  filter: drop-shadow(0 0 4px rgba(249, 115, 22, 0.3));
}

.verification-text h3 {
  font-size: 18px;
  color: var(--text-primary);
  margin: 0 0 8px 0;
  font-weight: 600;
}

.verification-text p {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.5;
}

.verification-form {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px;
  backdrop-filter: blur(15px);
}

.form-section {
  margin-bottom: 24px;
}

.form-section:last-child {
  margin-bottom: 0;
}

.form-section h4 {
  font-size: 16px;
  color: var(--text-primary);
  margin: 0 0 16px 0;
  font-weight: 600;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}

.document-upload {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}

.upload-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.upload-label {
  font-size: 14px;
  color: var(--text-primary);
  font-weight: 500;
}

.upload-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 32px 16px;
  border: 2px dashed rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: rgba(0, 0, 0, 0.1);
  min-height: 120px;
}

.upload-area:hover {
  border-color: rgba(74, 222, 128, 0.5);
  background: rgba(74, 222, 128, 0.05);
  transform: translateY(-2px);
}

.upload-icon {
  font-size: 32px;
  opacity: 0.6;
  color: var(--text-secondary);
}

.upload-text {
  font-size: 14px;
  color: var(--text-secondary);
  font-weight: 500;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
}

@media (max-width: 768px) {
  .verification-section {
    max-width: 100%;
  }

  .verification-header {
    padding: 16px;
  }

  .verification-form {
    padding: 20px;
  }

  .form-grid,
  .document-upload {
    grid-template-columns: 1fr;
  }

  .upload-area {
    padding: 24px 16px;
    min-height: 100px;
  }

  .form-actions {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .verification-header {
    padding: 12px;
  }

  .verification-text h3 {
    font-size: 16px;
  }

  .verification-text p {
    font-size: 13px;
  }

  .verification-form {
    padding: 16px;
  }

  .upload-area {
    padding: 20px 12px;
    min-height: 80px;
  }

  .upload-icon {
    font-size: 24px;
  }

  .upload-text {
    font-size: 13px;
  }
}

</style>