import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TaskList from '../TaskList.vue'
import TaskCard from '../TaskCard.vue'

const tasks = [
  {
    id: 1,
    name: 'Підготувати звіт',
    deadline: '2026-05-12',
    category: 'Навчання'
  },
  {
    id: 2,
    name: 'Зробити презентацію',
    deadline: '2026-05-20',
    category: 'Робота'
  }
]

describe('TaskList', () => {
  it('відображає всі завдання зі списку', () => {
    const wrapper = mount(TaskList, {
      props: {
        tasks,
        getDays: () => 4
      }
    })

    expect(wrapper.findAllComponents(TaskCard)).toHaveLength(2)
    expect(wrapper.text()).toContain('Підготувати звіт')
    expect(wrapper.text()).toContain('Зробити презентацію')
  })

  it('передає подію remove від TaskCard до батьківського компонента', async () => {
    const wrapper = mount(TaskList, {
      props: {
        tasks,
        getDays: () => 4
      }
    })

    await wrapper.findAllComponents(TaskCard)[0].vm.$emit('remove', 1)

    expect(wrapper.emitted('remove')).toBeTruthy()
    expect(wrapper.emitted('remove')[0]).toEqual([1])
  })
})
