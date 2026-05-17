<template>
  <div :class="['task-card', { urgent: isUrgent, overdue: isOverdue }]">
    <div class="card-left">
      <div class="dot"></div>
    </div>

    <div class="card-body">
      <div class="task-title-row">
        <h3 class="task-name">{{ task.name }}</h3>
        <span class="category-chip">{{ task.category }}</span>
      </div>

      <p class="deadline-text">
        <span v-if="isOverdue">Прострочено {{ Math.abs(days) }} дн. тому</span>
        <span v-else-if="days === 0">Дедлайн сьогодні!</span>
        <span v-else-if="days === 1">Завтра дедлайн!</span>
        <span v-else>{{ days }} дн. до дедлайну</span>
      </p>
    </div>

    <div class="card-right">
      <span class="badge overdue-badge" v-if="isOverdue">прострочено</span>
      <span class="badge urgent-badge" v-else-if="isUrgent">терміново</span>
      <span class="days-chip" v-else>{{ days }}д</span>
      <button class="remove-btn" @click="$emit('remove', task.id)">×</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps(['task', 'getDays'])
defineEmits(['remove'])

const days = computed(() => props.getDays(props.task.deadline))
const isUrgent = computed(() => days.value < 3 && days.value >= 0)
const isOverdue = computed(() => days.value < 0)
</script>

<style scoped>
.task-card {
  display: flex;
  align-items: center;
  gap: 14px;
  background: white;
  border-radius: 14px;
  padding: 16px 18px;
  margin-bottom: 10px;
  border: 1.5px solid #ede8df;
  transition:
    transform 0.15s,
    box-shadow 0.15s;
}

.task-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.07);
}

.task-card.urgent {
  background: #fff5f5;
  border-color: #f5c0c0;
}

.task-card.overdue {
  background: #fff0f0;
  border-color: #e8a0a0;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #c8e6c9;
  flex-shrink: 0;
}

.urgent .dot {
  background: #ffb3b3;
}
.overdue .dot {
  background: #e57373;
}

.card-body {
  flex: 1;
  min-width: 0;
}

.task-title-row {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.task-name {
  font-size: 15px;
  font-weight: 500;
  color: #1a1a1a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.category-chip {
  flex-shrink: 0;
  font-size: 10px;
  font-weight: 600;
  color: #6b6257;
  background: #f7f4ef;
  border: 1px solid #e8e3da;
  border-radius: 999px;
  padding: 2px 8px;
}

.deadline-text {
  font-size: 12px;
  color: #9c9587;
  margin-top: 3px;
}

.urgent .deadline-text {
  color: #c0392b;
}
.overdue .deadline-text {
  color: #a93226;
}

.card-right {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.days-chip {
  font-size: 12px;
  font-weight: 600;
  color: #7a9e7e;
  background: #edf7ee;
  padding: 4px 10px;
  border-radius: 20px;
}

.badge {
  font-size: 11px;
  font-weight: 500;
  padding: 4px 10px;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.urgent-badge {
  background: #fde8e8;
  color: #c0392b;
}

.overdue-badge {
  background: #f5c0c0;
  color: #922b21;
}

.remove-btn {
  background: none;
  border: 1.5px solid #e8e3da;
  border-radius: 8px;
  width: 28px;
  height: 28px;
  font-size: 16px;
  color: #b0a898;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;
}

.remove-btn:hover {
  background: #fde8e8;
  border-color: #f5c0c0;
  color: #c0392b;
}
</style>
