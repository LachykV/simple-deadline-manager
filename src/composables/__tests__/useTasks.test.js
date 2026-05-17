import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { nextTick } from 'vue'
import { useTasks } from '../useTasks'

describe('useTasks', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-05-10T12:00:00'))
  })

  afterEach(() => {
    localStorage.clear()
    vi.useRealTimers()
  })

  it('додає нове завдання зі строком і категорією', async () => {
    const { tasks, addTask } = useTasks()

    const result = addTask('Підготувати лабораторну', '2026-05-12', 'Навчання')

    await nextTick()

    expect(result).toBe(true)
    expect(tasks.value).toHaveLength(1)
    expect(tasks.value[0].name).toBe('Підготувати лабораторну')
    expect(tasks.value[0].deadline).toBe('2026-05-12')
    expect(tasks.value[0].category).toBe('Навчання')
  })

  it('не додає завдання з порожньою назвою', () => {
    const { tasks, addTask } = useTasks()

    const result = addTask('   ', '2026-05-12', 'Навчання')

    expect(result).toBe(false)
    expect(tasks.value).toHaveLength(0)
  })

  it('правильно рахує кількість днів до дедлайну', () => {
    const { getDaysUntilDeadline } = useTasks()

    expect(getDaysUntilDeadline('2026-05-12')).toBe(2)
  })

  it('визначає термінові завдання', async () => {
    const { tasks, addTask, hotTasks } = useTasks()

    addTask('Термінове', '2026-05-12', 'Навчання')
    addTask('Не термінове', '2026-05-20', 'Робота')

    await nextTick()

    expect(tasks.value).toHaveLength(2)
    expect(hotTasks.value).toHaveLength(1)
    expect(hotTasks.value[0].name).toBe('Термінове')
  })
})