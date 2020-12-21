/* eslint-disable import/named */
import Vuetify from 'vuetify'
import {
  createLocalVue,
  mount
} from '@vue/test-utils'
import VueRouter from 'vue-router'
import CreditCards from '@/views/accounts/CreditCards.vue'
import router from '@/core/router/index.js'
import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'en',
  messages: {}
})
describe('Credit Cards Component', () => {
  const localVue = createLocalVue()
  let wrapper
  let vuetify
  localVue.use(VueRouter)
  localVue.use(Vuetify)

  beforeEach(() => {
    vuetify = new Vuetify()
    wrapper = mount(CreditCards, {
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
    expect(wrapper.is(CreditCards)).toBe(true)
  })
})
