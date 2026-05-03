<template>
  <div class="app">
    <header class="app-header">
      <div class="title-row">
        <img src="/clock.png" class="title-icon" alt="clock" />
        <h1>Deadline Manager</h1>
      </div>
      <div class="stats">
        <span class="stat">{{ tasks.length }} завдань</span>
        <span class="divider">·</span>
        <span class="stat" :class="{ urgent: hotTasks.length > 0 }">
          {{ hotTasks.length }} терміново
        </span>
      </div>
    </header>

    <TaskForm @add="addTask" />

    <div class="list-header" v-if="tasks.length > 0">
      <span>{{ tasks.length }} завдань</span>
    </div>

    <TaskList
      :tasks="tasks"
      :getDays="getDaysUntilDeadline"
      @remove="removeTask"
    />

    <p v-if="tasks.length === 0" class="empty-state">
      (Список порожній)
    </p>
  </div>
</template>

<script setup>
import TaskForm from './components/TaskForm.vue'
import TaskList from './components/TaskList.vue'
import { useTasks } from './composables/useTasks'

const { tasks, addTask, removeTask, getDaysUntilDeadline, hotTasks } = useTasks()
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Stack+Sans+Notch:wght@200..700&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: 'DM Sans', sans-serif;
  background: #f5f3ef;
  min-height: 100vh;
  padding: 32px 16px;
  color: #1a1a1a;
}

.app {
  max-width: 580px;
  margin: 0 auto;
}

.app-header {
  margin-bottom: 28px;
  padding-bottom: 20px;
  border-bottom: 1.5px solid #e0dbd2;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 6px;
}

.title-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.title-icon {
  width: 36px;
  height: 36px;
  object-fit: contain;
  opacity: 0.85;
}

.app-header h1 {
  font-family: 'Stack Sans Notch', sans-serif;
  font-size: 32px;
  font-weight: 700;
  color: #1a1a1a;
  letter-spacing: 2px;
  line-height: 1.1;
}

.stats {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.stat {
  font-size: 12px;
  color: #b0a898;
  font-weight: 400;
}

.stat.urgent { color: #c0392b; }

.divider {
  color: #d4cfc8;
  font-size: 12px;
}

.list-header {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #b0a898;
  margin-bottom: 10px;
  font-weight: 500;
}

.empty-state {
  text-align: center;
  color: #b0a898;
  font-size: 15px;
  margin-top: 24px;
  padding: 32px;
  background: white;
  border-radius: 16px;
  border: 1.5px dashed #e0dbd2;
}
</style>
