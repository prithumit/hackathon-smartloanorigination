/* eslint-disable import/named */
import Vuetify from 'vuetify'
import {
  createLocalVue,
  mount
} from '@vue/test-utils'
import VueRouter from 'vue-router'
import OtpInput from '@/components/common/OtpInput.vue'
import router from '@/core/router/index.js'
import event from '@/util/event'
import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'en',
  messages: { common: { confirmation_message: 'Are you sure?' } }
})
describe('OtpInput component', () => {
  const localVue = createLocalVue()
  let wrapper
  let vuetify
  localVue.use(VueRouter)
  localVue.use(Vuetify)

  beforeEach(() => {
    vuetify = new Vuetify()
    wrapper = mount(OtpInput, {
      localVue,
      vuetify,
      i18n,
      router,
      propsData: {
        otpConfig: {
          resetPasswordTime: 1000
        }
      },
      data () {
        return {
        }
      },
      mocks: {
        disableOTPButton: true
      }
    })
  })

  it('is mounted', () => {
    expect(wrapper.is(OtpInput)).toBe(true)
  })

  it('triggers resendOTP method', () => {
    wrapper.vm.resendOTP()
    expect(wrapper.vm.disableOTPButton).toBe(true)
  })

  it('triggers resendHandler method', () => {
    wrapper.vm.publishOTP()
    expect(event.$on('OTP_UPDATE')).toBeTruthy()
  })
})
