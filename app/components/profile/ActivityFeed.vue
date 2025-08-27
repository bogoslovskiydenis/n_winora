<template>
  <div class="activity-card">
    <div class="card-header">
      <h3>📝 Недавняя активность</h3>
    </div>
    <div class="activity-list">
      <div
        v-for="activity in activities"
        :key="activity.id"
        class="activity-item"
      >
        <div class="activity-icon">{{ activity.icon }}</div>
        <div class="activity-content">
          <div class="activity-title">{{ activity.title }}</div>
          <div class="activity-time">{{ formatDate(activity.date) }}</div>
        </div>
        <div class="activity-amount" :class="activity.type">
          {{ activity.amount }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  activities: {
    type: Array,
    default: () => [],
  },
});

const formatDate = (date) => {
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
};
</script>

<style scoped>
.activity-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 20px;
  transition: all 0.3s ease;
}

.activity-card:hover {
  background: rgba(255, 255, 255, 0.06);
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.card-header {
  margin-bottom: 20px;
}

.card-header h3 {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.activity-item:hover {
  background: rgba(0, 0, 0, 0.3);
  border-color: rgba(255, 255, 255, 0.1);
  transform: translateX(2px);
}

.activity-icon {
  font-size: 20px;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
}

.activity-content {
  flex: 1;
}

.activity-title {
  font-size: 14px;
  color: var(--text-primary);
  font-weight: 500;
  margin-bottom: 2px;
}

.activity-time {
  font-size: 12px;
  color: var(--text-secondary);
}

.activity-amount {
  font-size: 14px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 4px;
  min-width: 70px;
  text-align: center;
}

.activity-amount.positive {
  color: #22c55e;
  background: rgba(34, 197, 94, 0.1);
}

.activity-amount.negative {
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
}

@media (max-width: 480px) {
  .activity-card {
    padding: 16px;
  }

  .activity-item {
    padding: 10px;
    gap: 10px;
  }

  .activity-icon {
    font-size: 16px;
    width: 28px;
    height: 28px;
  }

  .activity-title,
  .activity-amount {
    font-size: 13px;
  }

  .activity-time {
    font-size: 11px;
  }
}
</style>
