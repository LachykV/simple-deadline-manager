import { ref, computed, watch } from 'vue'

const STORAGE_KEY = 'simple-deadline-manager-tasks'

function loadTasks() {
  try {
    const savedTasks = localStorage.getItem(STORAGE_KEY)
    return savedTasks ? JSON.parse(savedTasks) : []
  } catch {
    return []
  }
}

function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}

export function useTasks() {
  const tasks = ref(loadTasks())

  watch(
    tasks,
    (newTasks) => {
      saveTasks(newTasks)
    },
    { deep: true }
  )

  function addTask(name, deadline, category) {
    if (!name.trim()) return false

    tasks.value.push({
      id: Date.now(),
      name: name.trim(),
      deadline,
      category: category || 'Навчання',
      createdAt: new Date().toISOString()
    })

    return true
  }

  function removeTask(id) {
    tasks.value = tasks.value.filter((task) => task.id !== id)
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
    tasks.value.filter((task) => {
      const days = getDaysUntilDeadline(task.deadline)
      return days < 3 && days >= 0
    })
  )

  return {
    tasks,
    addTask,
    removeTask,
    getDaysUntilDeadline,
    hotTasks
  }
}
