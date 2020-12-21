/* eslint-disable import/named */
import Vuetify from 'vuetify'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Drawer from '@/components/common/Drawer.vue'
import event from '@/util/event'
import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'en',
  messages: { common: { confirmation_message: 'Are you sure?' } }
})

describe('Drawer component', () => {
  let wrapper
  let vuetify
  const localVue = createLocalVue()
  localVue.use(Vuetify)
  localVue.use(VueRouter)
  const commonMenuItems = []
  beforeEach(() => {
    vuetify = new Vuetify()
    wrapper = shallowMount(Drawer, {
      localVue,
      vuetify,
      i18n
    })
    wrapper.setData({ commonMenuItems })
  })

  it('is mounted', () => {
    expect(wrapper.is(Drawer)).toBe(true)
  })

  it('emits an event to open the drawer', () => {
    event.$emit('drawerEvent', true)
    expect(wrapper.vm.drawer).toBe(false)
  })
  it('emits an event APP_DRAWER_TOGGLED', () => {
    event.$emit('APP_DRAWER_TOGGLED')
    expect(wrapper.vm.drawer).toBe(true)
  })

  it('emits an event Close', () => {
    event.$emit('Close')
    expect(wrapper.vm.drawer).toBe(false)
  })
})
