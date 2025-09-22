<template>
  <div class="info-banner">
    <img src="./../../assets/images/info.svg" />
    <div class="info-text">
      Вспомогательная информация, которая появляется на экране и помогает
      пользователю при работе
    </div>
  </div>
</template>

<style scoped>
.info-banner {
  margin: 24px 20px 24px 20px;
  background: #00000033;
  border-top: 1px solid #00b27d33;
  box-shadow: 0px 1px 5px 0px #00000040;
  border-radius: 16px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  width: calc(100% - 40px);
  max-width: 604px;
  box-sizing: border-box;
  opacity: 1;
  padding: 10px 16px 8px 10px;
}

.info-banner img {
  width: 32px;
  height: 32px;
}

.info-text {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.4;
}

@media (max-width: 480px) {
  .info-banner {
    margin: 20px 16px 20px;
  }
}
</style>
