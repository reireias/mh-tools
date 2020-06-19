import { mount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import Vue from 'vue'
import Vuetify from 'vuetify'
import target from '@/pages/index'

Vue.use(Vuetify)
const localVue = createLocalVue()
localVue.use(Vuetify)

describe('power-or-critical', () => {
  it('should be vue instance', () => {
    const vuetify = new Vuetify()
    const wrapper = mount(target, {
      localVue,
      vuetify,
      stubs: {
        NuxtLink: RouterLinkStub,
      },
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
    expect(wrapper.html()).toMatchSnapshot()
  })
})
