import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TaskForm from '../TaskForm.vue'

describe('TaskForm', () => {
  it('відправляє подію add після заповнення форми', async () => {
    const wrapper = mount(TaskForm)

    await wrapper.find('.input-name').setValue('Підготувати звіт')
    await wrapper.find('input[type="date"]').setValue('2026-05-20')
    await wrapper.find('select').setValue('Робота')
    await wrapper.find('.add-btn').trigger('click')

    expect(wrapper.emitted('add')).toBeTruthy()
    expect(wrapper.emitted('add')[0]).toEqual([
      'Підготувати звіт',
      '2026-05-20',
      'Робота'
    ])
  })

  it('не дозволяє додати завдання без назви та дати', () => {
    const wrapper = mount(TaskForm)

    expect(wrapper.find('.add-btn').attributes('disabled')).toBeDefined()
  })
})
