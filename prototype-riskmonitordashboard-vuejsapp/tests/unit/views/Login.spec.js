/* eslint-disable import/named */
import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'
import Login from '@/views/Login.vue'
import router from '@/core/router/index.js'
import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'en',
  messages: { common: { loginButtonPlaceholder: 'Login' } }
})
describe('Login Page: ', () => {
  let wrapper
  const vuetify = new Vuetify()
  const localVue = createLocalVue()
  localVue.use(Vuetify)

  beforeEach(() => {
    wrapper = mount(Login, {
      localVue,
      vuetify,
      i18n,
      router,
      mocks: {
        hasFocus: true,
        btndisabled: true,
        resetPassword: false,
        retrieveLoginId: false,
        registerForOnlineBanking: false
      }
    })
  })

  it('is mounted', () => {
    expect(wrapper.is(Login)).toBe(true)
  })

  it('focus method call', () => {
    wrapper.setData({ email: 'admin', userpassword: 'admin' })
    wrapper.vm.focus()
    expect(wrapper.vm.hasFocus).toBe('admin')
  })

  it('focus method call', () => {
    wrapper.setData({ email: '', userpassword: '' })
    wrapper.vm.focus()
    expect(wrapper.vm.btndisabled).toBe(true)
  })

  it('clear method call', () => {
    wrapper.setData({ email: 'admin', userpassword: 'admin' })
    wrapper.vm.clear()
    expect(wrapper.vm.email).toBe('')
  })

  it('screenActions method call for resetPassword action', () => {
    wrapper.vm.screenActions('resetPassword')
    expect(wrapper.vm.resetPassword).toBe(true)
  })

  it('screenActions method call for retrieveLoginId action', () => {
    wrapper.vm.screenActions('retrieveLoginId')
    expect(wrapper.vm.retrieveLoginId).toBe(true)
  })

  it('screenActions method call for registerForOnlineBanking action', () => {
    wrapper.vm.screenActions('registerForOnlineBanking')
    expect(wrapper.vm.registerForOnlineBanking).toBe(true)
  })

  it('handleLoginActions method call', () => {
    wrapper.vm.handleLoginActions()
    expect(wrapper.vm.resetPassword).toBe(false)
  })

// TODO
//   it('to test successful login', () => {
//     wrapper.setData({ email: 'admin', userpassword: 'admin' });
//     wrapper.vm.login();
//     expect(wrapper.vm.$route.path).toBe('/home');
//   });
//   it('to test login failure', () => {
//     wrapper.setData({ username: '', password: '' });
//     wrapper.vm.login();
//     expect(wrapper.vm.errorLogin).toBe(true);
//   });
})
