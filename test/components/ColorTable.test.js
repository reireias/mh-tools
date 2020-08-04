import { mount } from '@vue/test-utils'
import ColorTable from '@/components/ColorTable'

describe('ColorTable', () => {
  const props = {
    xlabels: ['A', 'B', 'C'],
    ylabels: ['X', 'Y', 'Z'],
    data: [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
  }

  it('should be vue instance', () => {
    const wrapper = mount(ColorTable, {
      propsData: props,
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  describe('maxValues', () => {
    it('should be max value array', () => {
      const wrapper = mount(ColorTable, {
        propsData: props,
      })
      expect(wrapper.vm.maxValues).toStrictEqual([1, 4, 7, 8, 9])
    })
  })
})
