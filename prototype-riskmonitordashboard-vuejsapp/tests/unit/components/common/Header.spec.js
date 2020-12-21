/* eslint-disable import/named */
import Vuetify from 'vuetify'
import {
  createLocalVue,
  mount
} from '@vue/test-utils'
import VueRouter from 'vue-router'
import Header from '@/components/common/Header.vue'
import event from '@/util/event'
import router from '@/core/router/index.js'
import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'en',
  messages: { common: { confirmation_message: 'Are you sure?' } }
})
describe('Header component', () => {
  const localVue = createLocalVue()
  let wrapper
  let vuetify
  localVue.use(VueRouter)
  localVue.use(Vuetify)

  beforeEach(() => {
    vuetify = new Vuetify()
    wrapper = mount(Header, {
      localVue,
      vuetify,
      i18n,
      router,
      propsData: {
        headerConfig: {
          showDrawerButton: true,
          showLogoutButton: true
        }
      },
      data () {
        return {
          headerLogoutIcon: true
        }
      },
      mocks: {
        drawer: false
      }
    })
    event.$emit('Hide_header_logo', true)
  })

  it('is mounted', () => {
    expect(wrapper.is(Header)).toBe(true)
  })

  it('triggers toggleDrawer method', () => {
    wrapper.vm.toggleDrawer()
    expect(event.$on('APP_DRAWER_TOGGLED')).toBeTruthy()
  })

  it('triggers logout method', () => {
    wrapper.vm.logout()
    expect(wrapper.vm.$route.path).toBe('/')
  })

  it('triggers logoutConfirm method', () => {
    wrapper.vm.logoutConfirm()
    expect(wrapper.vm.modalConfig.enabled).toBe(true)
  })

  it('triggers showDialog method', () => {
    wrapper.vm.showDialog()
    expect(wrapper.vm.drawer).toBe(false)
  })
})
