module.exports = {
  rules: {
    'no-console': 'warn', // Предупреждать об использовании console.log
    'no-unused-vars': ['error', { vars: 'all', args: 'after-used' }], // Проверка неиспользуемых переменных
    'vue/no-unused-components': 'error' // Проверка неиспользуемых компонентов Vue
  }
}