import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { nextTick } from 'vue'
import { useTasks } from '../useTasks'

describe('useTasks', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-05-10T10:00:00'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('додає нове завдання зі строком і категорією', () => {
    const { tasks, addTask } = useTasks()

    const result = addTask('Лабораторна №2', '2026-05-12', 'Навчання')

    expect(result).toBe(true)
    expect(tasks.value).toHaveLength(1)
    expect(tasks.value[0].name).toBe('Лабораторна №2')
    expect(tasks.value[0].category).toBe('Навчання')
  })

  it('не додає завдання з порожньою назвою', () => {
    const { tasks, addTask } = useTasks()

    const result = addTask('   ', '2026-05-15', 'Навчання')

    expect(result).toBe(false)
    expect(tasks.value).toHaveLength(0)
  })

  it('правильно рахує кількість днів до дедлайну', () => {
    const { getDaysUntilDeadline } = useTasks()

    expect(getDaysUntilDeadline('2026-05-12')).toBe(2)
  })

  it('визначає термінові завдання', async () => {
    const { addTask, hotTasks } = useTasks()

    addTask('Термінове', '2026-05-11', 'Навчання')
    addTask('Не термінове', '2026-05-20', 'Робота')
    await nextTick()

    expect(hotTasks.value).toHaveLength(1)
    expect(hotTasks.value[0].name).toBe('Термінове')
  })
})
