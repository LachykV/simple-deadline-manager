import { ref, computed } from 'vue'

export function useTasks() {
  const tasks = ref([])

  function addTask(name, deadline, category) {
    if (!name.trim()) return false

    tasks.value.push({
      id: Date.now(),
      name: name.trim(),
      deadline: deadline,
      category: category || 'Навчання',
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

    const diff = deadlineDate - today
    return Math.round(diff / (1000 * 60 * 60 * 24))
  }

  const hotTasks = computed(() =>
    tasks.value.filter(t => getDaysUntilDeadline(t.deadline) < 3)
  )

  return {
    tasks,
    addTask,
    removeTask,
    getDaysUntilDeadline,
    hotTasks
  }
}