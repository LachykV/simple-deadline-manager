import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TaskCard from '../TaskCard.vue'

const baseTask = {
  id: 1,
  name: 'Підготувати лабораторну №2',
  deadline: '2026-05-12',
  category: 'Навчання'
}

describe('TaskCard', () => {
  it('відображає назву завдання, категорію та кількість днів', () => {
    const wrapper = mount(TaskCard, {
      props: {
        task: baseTask,
        getDays: () => 5
      }
    })

    expect(wrapper.text()).toContain('Підготувати лабораторну №2')
    expect(wrapper.text()).toContain('Навчання')
    expect(wrapper.text()).toContain('5 дн. до дедлайну')
    expect(wrapper.find('.days-chip').text()).toBe('5д')
  })

  it('позначає завдання як термінове, якщо до дедлайну менше 3 днів', () => {
    const wrapper = mount(TaskCard, {
      props: {
        task: baseTask,
        getDays: () => 1
      }
    })

    expect(wrapper.classes()).toContain('urgent')
    expect(wrapper.text()).toContain('Завтра дедлайн!')
    expect(wrapper.find('.urgent-badge').text()).toBe('терміново')
  })

  it('позначає завдання як прострочене, якщо дата вже минула', () => {
    const wrapper = mount(TaskCard, {
      props: {
        task: baseTask,
        getDays: () => -2
      }
    })

    expect(wrapper.classes()).toContain('overdue')
    expect(wrapper.text()).toContain('Прострочено 2 дн. тому')
    expect(wrapper.find('.overdue-badge').text()).toBe('прострочено')
  })

  it('відправляє подію remove з id завдання після натискання кнопки видалення', async () => {
    const wrapper = mount(TaskCard, {
      props: {
        task: baseTask,
        getDays: () => 5
      }
    })

    await wrapper.find('.remove-btn').trigger('click')

    expect(wrapper.emitted('remove')).toBeTruthy()
    expect(wrapper.emitted('remove')[0]).toEqual([1])
  })
})
