import { ref, computed, watch } from 'vue'

export function useTasks() {
  const saved = localStorage.getItem('tasks')
  const tasks = ref(saved ? JSON.parse(saved) : [])

  watch(tasks, (val) => {
    localStorage.setItem('tasks', JSON.stringify(val))
  }, { deep: true })

  function addTask(name, deadline) {
    if (!name.trim()) return false
    tasks.value.push({
      id: Date.now(),
      name: name.trim(),
      deadline: deadline,
      createdAt: new Date().toISOString()
    })
    return true
  }

  function removeTask(id) {
    tasks.value = tasks.value.filter(t => t.id !== id)
  }

  function getDaysUntilDeadline(deadline) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const deadlineDate = new Date(deadline)
    deadlineDate.setHours(0, 0, 0, 0)
    return Math.round((deadlineDate - today) / (1000 * 60 * 60 * 24))
  }

  const hotTasks = computed(() =>
    tasks.value.filter(t => getDaysUntilDeadline(t.deadline) < 3)
  )

  return { tasks, addTask, removeTask, getDaysUntilDeadline, hotTasks }
}