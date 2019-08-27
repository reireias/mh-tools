import { mount, createLocalVue } from '@vue/test-utils'
import Vue from 'vue'
import Vuetify from 'vuetify'
import target from '@/pages/power-or-critical'

Vue.use(Vuetify)
const localVue = createLocalVue()
localVue.use(Vuetify)

describe('power-or-critical', () => {
  it('should be vue instance', () => {
    const vuetify = new Vuetify()
    const wrapper = mount(target, {
      localVue,
      vuetify
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
    expect(wrapper.html()).toMatchSnapshot()
  })
})
