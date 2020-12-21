/* eslint-disable import/named */
import Vuetify from 'vuetify'
import { createLocalVue, mount } from '@vue/test-utils'
import VueRouter from 'vue-router'
import ResetPasswordWithOTP from '@/components/DOB-Login/ResetPassword/ResetPasswordWithOTP.vue'
import router from '@/core/router/index.js'
import event from '@/util/event'
import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'en',
  messages: {}
})
describe('ResetPasswordWithOTP component', () => {
  const localVue = createLocalVue()
  let wrapper
  let vuetify
  localVue.use(VueRouter)
  localVue.use(Vuetify)

  beforeEach(() => {
    vuetify = new Vuetify()
    wrapper = mount(ResetPasswordWithOTP, {
      localVue,
      vuetify,
      i18n,
      router,
      propsData: {
        settings: {
          config: {
            resetPasswordType: {
              withOTP: true
            }
          },
          modalConfigWithOTP: {
            cancelButton: 'Cancel',
            enabled: true,
            enableSave: false,
            persistent: true,
            saveButton: 'Next',
            title: 'Reset Password',
            width: 400,
            saveCallback: 'Save',
            cancelCallback: 'Cancel'
          }
        }
      },
      data () {
        return {}
      },
      mocks: {}
    })
  })

  it('is mounted', () => {
    expect(wrapper.is(ResetPasswordWithOTP)).toBe(true)
  })

  it('triggers publishUpdatedPassword method', () => {
    wrapper.vm.publishUpdatedPassword()
    expect(event.$emit('PASSWORD_UPDATE')).toBeTruthy()
  })
})
