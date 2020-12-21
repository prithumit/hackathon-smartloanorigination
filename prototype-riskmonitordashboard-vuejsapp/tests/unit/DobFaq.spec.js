/* eslint-disable import/named */
import Vuetify from 'vuetify'
import {
  createLocalVue,
  mount
} from '@vue/test-utils'
import VueRouter from 'vue-router'
import DobFAQ from '@/views/common/DobFAQ.vue'
import router from '@/core/router/index.js'
import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'en',
  messages: { common: { confirmation_message: 'Are you sure?' } }
})
describe('DobFAQ component', () => {
  const localVue = createLocalVue()
  let wrapper
  let vuetify
  localVue.use(VueRouter)
  localVue.use(Vuetify)

  beforeEach(() => {
    vuetify = new Vuetify()
    wrapper = mount(DobFAQ, {
      localVue,
      vuetify,
      i18n,
      router,
      propsData: {
      },
      data () {
        return {
        }
      },
      mocks: {

      }
    })
  })

  it('is mounted', () => {
    expect(wrapper.is(DobFAQ)).toBe(true)
  })
})
