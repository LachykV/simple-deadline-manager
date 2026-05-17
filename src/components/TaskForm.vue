<template>
  <div class="task-form">
    <input
      v-model="taskName"
      placeholder="Назва завдання..."
      @keyup.enter="handleAdd"
      class="input-name"
    />

    <button class="date-btn" @click="openPicker" :class="{ selected: deadline }">
      <span><img src="/calendar.png" class="calendar-icon" alt="calendar" /> </span>
      <span class="date-text">{{ formattedDate || 'Оберіть дату' }}</span>
      <input
        ref="dateInput"
        v-model="deadline"
        type="date"
        :min="today"
        class="input-date-hidden"
      />
    </button>

    <select v-model="category" class="category-select" aria-label="Категорія завдання">
      <option value="Навчання">Навчання</option>
      <option value="Спорт">Спорт</option>
      <option value="Робота">Робота</option>
      <option value="Особисте">Особисте</option>
    </select>

    <button class="add-btn" @click="handleAdd" :disabled="!taskName || !deadline">
      + Додати
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const emit = defineEmits(['add'])
const taskName = ref('')
const deadline = ref('')
const category = ref('Навчання')
const dateInput = ref(null)
const today = new Date().toISOString().split('T')[0]

const formattedDate = computed(() => {
  if (!deadline.value) return ''
  const [y, m, d] = deadline.value.split('-')
  return `${d}.${m}.${y}`
})

function openPicker() {
  if (dateInput.value) {
    try {
      dateInput.value.showPicker()
    } catch {
      dateInput.value.click()
    }
  }
}

function handleAdd() {
  if (taskName.value && deadline.value) {
    emit('add', taskName.value, deadline.value, category.value)
    taskName.value = ''
    deadline.value = ''
    category.value = 'Навчання'
  }
}
</script>

<style scoped>
.task-form {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  background: white;
  padding: 10px;
  border-radius: 16px;
  border: 1.5px solid #e8e3da;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  align-items: center;
}

.input-name {
  flex: 1;
  border: none;
  outline: none;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  color: #1a1a1a;
  background: transparent;
  padding: 8px 10px;
}

.input-name::placeholder {
  color: #c5bfb5;
}

/* Кнопка вибору дати — такого ж розміру як "+ Додати" */
.date-btn {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 10px 16px;
  background: #f7f4ef;
  border-radius: 10px;
  border: 1.5px solid #e8e3da;
  cursor: pointer;
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: #6b6257;
  white-space: nowrap;
  position: relative;
  transition:
    background 0.15s,
    border-color 0.15s;
  height: 40px;
}

.date-btn:hover {
  background: #f0ebe0;
  border-color: #d4cfc8;
}

.date-btn.selected {
  background: #edf7ee;
  border-color: #c8e6c9;
  color: #2e7d32;
}

.calendar-icon {
  width: 14px;
  height: 14px;
  object-fit: contain;
}

.date-text {
  min-width: 82px;
}

.category-select {
  height: 40px;
  padding: 0 12px;
  background: #f7f4ef;
  border: 1.5px solid #e8e3da;
  border-radius: 10px;
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: #6b6257;
  cursor: pointer;
  outline: none;
  white-space: nowrap;
}

.category-select:hover,
.category-select:focus {
  background: #f0ebe0;
  border-color: #d4cfc8;
}

/* Повністю прихований нативний input */
.input-date-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
}

.add-btn {
  background: #1a1a1a;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 10px 18px;
  height: 40px;
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition:
    background 0.15s,
    transform 0.1s;
}

.add-btn:hover:not(:disabled) {
  background: #333;
  transform: translateY(-1px);
}

.add-btn:disabled {
  background: #d4cfc8;
  cursor: not-allowed;
}
</style>
