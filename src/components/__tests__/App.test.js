import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import App from '../../App.vue'

describe('App', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-05-10T10:00:00'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('спочатку показує порожній список завдань', () => {
    const wrapper = mount(App)

    expect(wrapper.text()).toContain('(Список порожній)')
    expect(wrapper.text()).toContain('0 завдань')
    expect(wrapper.text()).toContain('0 терміново')
  })

  it('додає завдання через форму та показує його у списку', async () => {
    const wrapper = mount(App)

    await wrapper.find('.input-name').setValue('Підготувати лабораторну №2')
    await wrapper.find('input[type="date"]').setValue('2026-05-12')
    await wrapper.find('select').setValue('Навчання')
    await wrapper.find('.add-btn').trigger('click')
    await nextTick()

    expect(wrapper.text()).toContain('Підготувати лабораторну №2')
    expect(wrapper.text()).toContain('Навчання')
    expect(wrapper.text()).toContain('2 дн. до дедлайну')
    expect(wrapper.text()).toContain('1 завдань')
    expect(wrapper.text()).toContain('1 терміново')
  })

  it('видаляє завдання зі списку після натискання кнопки видалення', async () => {
    const wrapper = mount(App)

    await wrapper.find('.input-name').setValue('Завдання для видалення')
    await wrapper.find('input[type="date"]').setValue('2026-05-20')
    await wrapper.find('select').setValue('Робота')
    await wrapper.find('.add-btn').trigger('click')
    await nextTick()

    await wrapper.find('.remove-btn').trigger('click')
    await nextTick()

    expect(wrapper.text()).not.toContain('Завдання для видалення')
    expect(wrapper.text()).toContain('(Список порожній)')
  })
})
