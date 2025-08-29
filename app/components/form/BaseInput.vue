<template>
  <div class="base-input">
    <div class="base-input__wrapper">
      <input
        :id="inputId"
        :type="currentType"
        :placeholder="placeholder"
        :value="modelValue"
        :disabled="disabled"
        :class="inputClasses"
        @input="$emit('update:modelValue', $event.target.value)"
        @blur="$emit('blur')"
        @focus="$emit('focus')"
        @keyup.enter="$emit('enter')"
      />
      <button
        v-if="type === 'password' && showPasswordToggle"
        type="button"
        class="base-input__password-toggle"
        @click="togglePasswordVisibility"
      >
        <svg
          v-if="showPassword"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
            fill="currentColor"
          />
        </svg>
        <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"
            fill="currentColor"
          />
        </svg>
      </button>
    </div>
    <div v-if="error" class="base-input__error">
      {{ error }}
    </div>
    <div v-if="success && !error" class="base-input__success">
      {{ success }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  error: {
    type: String,
    default: '',
  },
  success: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  showPasswordToggle: {
    type: Boolean,
    default: true,
  },
});

defineEmits(['update:modelValue', 'blur', 'focus', 'enter']);

const showPassword = ref(false);
const inputId = computed(
  () => `input-${Math.random().toString(36).substr(2, 9)}`
);
const currentType = computed(() => (showPassword.value ? 'text' : props.type));
const inputClasses = computed(() => [
  'base-input__field',
  {
    'base-input__field--error': props.error,
    'base-input__field--success': props.success && !props.error,
    'base-input__field--disabled': props.disabled,
    'base-input__field--with-icon':
      props.type === 'password' && props.showPasswordToggle,
  },
]);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};
</script>

<style scoped>
.base-input {
  margin-bottom: 16px;
}

.base-input__wrapper {
  position: relative;
}

.base-input__field {
  width: 100%;
  padding: 16px 20px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 32px;
  background: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 16px;
  font-family: inherit;
  transition: all 0.3s ease;
  outline: none;
  backdrop-filter: blur(10px);
  box-sizing: border-box;
}

.base-input__field--with-icon {
  padding-right: 55px;
}

.base-input__field::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.base-input__field:focus {
  border-color: #4ade80;
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 4px 20px rgba(74, 222, 128, 0.2);
}

.base-input__field--error {
  border-color: #ef4444;
  background: rgba(239, 68, 68, 0.05);
}

.base-input__field--error:focus {
  border-color: #ef4444;
  box-shadow: 0 4px 20px rgba(239, 68, 68, 0.2);
}

.base-input__field--success {
  border-color: #4ade80;
  background: rgba(74, 222, 128, 0.05);
}

.base-input__field--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: rgba(255, 255, 255, 0.02);
}

.base-input__password-toggle {
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
  transition: color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.base-input__password-toggle:hover {
  color: rgba(255, 255, 255, 0.8);
}

.base-input__error {
  color: #ef4444;
  font-size: 12px;
  margin-top: 8px;
  margin-left: 4px;
  display: block;
}

.base-input__success {
  color: #4ade80;
  font-size: 12px;
  margin-top: 8px;
  margin-left: 4px;
  display: block;
}

.base-input__field:-webkit-autofill,
.base-input__field:-webkit-autofill:hover,
.base-input__field:-webkit-autofill:focus {
  -webkit-box-shadow: 0 0 0 30px rgba(255, 255, 255, 0.05) inset !important;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  background-image: linear-gradient(
    135deg,
    #01614b,
    #032019 70%
  ); /* Ваш градиент */
  border-color: rgba(255, 255, 255, 0.2) !important;
}

@media (max-width: 480px) {
  .base-input__field {
    padding: 14px 18px;
    font-size: 16px;
  }

  .base-input__field--with-icon {
    padding-right: 50px;
  }

  .base-input__password-toggle {
    right: 15px;
    padding: 4px;
  }
}
</style>
