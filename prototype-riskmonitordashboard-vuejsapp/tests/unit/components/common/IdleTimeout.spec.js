/* eslint-disable import/named */
import Vuetify from 'vuetify'
import {
  createLocalVue,
  mount
} from '@vue/test-utils'
import VueRouter from 'vue-router'
import idleTimeoutPlugin from '@/plugins/idleTimeout'
import IdleTimeout from '@/components/IdleTimeout.vue'
import router from '@/core/router/index.js'
import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'en',
  messages: { common: { idleTimeoutContent: 'Session Timeout' } }
})
describe('IdleTimeout component', () => {
  const localVue = createLocalVue()
  let wrapper
  let vuetify
  localVue.use(Vuetify)
  localVue.use(VueRouter)
  localVue.use(idleTimeoutPlugin)

  beforeEach(() => {
    vuetify = new Vuetify()
    wrapper = mount(IdleTimeout, {
      localVue,
      vuetify,
      i18n,
      router,
      mocks: {
        $idleTimeouts: {
          logoutConfirm: false
        }
      }
    })
  })

  it('routes to login page on inactive', () => {
    wrapper.vm.logout()
    expect(wrapper.vm.$route.name).toBe('Login')
  })

  it('popup the modal component on inactive', () => {
    wrapper.vm.logoutConfirm()
    expect(wrapper.vm.$idleTimeouts.logoutConfirm).toBe(false)
  })
})
