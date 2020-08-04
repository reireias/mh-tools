import { mount, createLocalVue } from '@vue/test-utils'
import Vue from 'vue'
import Vuetify from 'vuetify'
import target from '@/components/Description'

Vue.use(Vuetify)
const localVue = createLocalVue()
localVue.use(Vuetify)

describe('Description', () => {
  it('should be vue instance', () => {
    const vuetify = new Vuetify()
    const wrapper = mount(target, {
      localVue,
      vuetify,
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
