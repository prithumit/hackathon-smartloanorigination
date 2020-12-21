/* eslint-disable import/named */
import Vuetify from 'vuetify'
import { createLocalVue, mount } from '@vue/test-utils'
import VueRouter from 'vue-router'
import ResetPassword from '@/components/DOB-Login/ResetPassword/ResetPassword.vue'
import router from '@/core/router/index.js'
import event from '@/util/event'
import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'en',
  messages: {}
})
describe('ResetPassword component', () => {
  const localVue = createLocalVue()
  let wrapper
  let vuetify
  localVue.use(VueRouter)
  localVue.use(Vuetify)

  beforeEach(() => {
    vuetify = new Vuetify()
    wrapper = mount(ResetPassword, {
      localVue,
      vuetify,
      i18n,
      router,
      propsData: {},
      data () {
        return {}
      },
      mocks: {
        configWithEmail: {
          config: {
            resetPasswordType: {
              withEmail: true
            }
          },
          modalConfig: {
            cancelButton: 'Cancel',
            enabled: true,
            enableSave: false,
            persistent: true,
            saveButton: 'Next',
            title: 'Reset Password',
            width: 400,
            saveCallback: 'Save',
            cancelCallback: 'Cancel'
          },
          showResetPasswordMessage: false,
          showResendPasswordMessage: false,
          customerId: null
        },
        configWithOtp: {
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
          },
          resendOTPBtnDisabled: true,
          showNewPasswordSection: false,
          showPasswordResetSuccess: false,
          showOTPSection: false,
          resetPasswordOTPText: false,
          showUserIdAndPartyId: true,
          newPassword: null,
          renewPassword: null,
          resetPasswordOTP: null,
          resetPasswordTime: 10000,
          userId: null,
          partyId: null
        }
      }
    })
    event.$emit('POLICY_CHECK', true)
    event.$emit('OTP_UPDATE', true)
  })

  it('is mounted', () => {
    expect(wrapper.is(ResetPassword)).toBe(true)
  })

  // TODO
  // it('triggers onNextClick method', () => {
  //   wrapper.vm.onNextClick()
  //   expect(wrapper.vm.configWithEmail.modalConfig.persist).toBe(true)
  // })

  // it('triggers onCancelClick method', () => {
  //   wrapper.vm.onCancelClick()
  //   expect(wrapper.vm.configWithEmail.showResetPasswordMessage).toBe(false)
  // })

  // it('triggers resendHandler method', () => {
  //   wrapper.vm.resendHandler()
  //   expect(wrapper.vm.configWithEmail.modalConfig.enableSave).toBe(true)
  // })

  // it('triggers onNextClickWithOTP method', () => {
  //   wrapper.vm.onNextClickWithOTP()
  //   expect(wrapper.vm.configWithOtp.modalConfigWithOTP.persist).toBe(true)
  // })

  // it('triggers onCancelClickWithOTP method', () => {
  //   wrapper.vm.onCancelClickWithOTP()
  //   expect(wrapper.vm.configWithEmail.modalConfig.persist).toBe(true)
  // })

  // it('triggers onOTPNextClick method', () => {
  //   wrapper.vm.onOTPNextClick()
  //   expect(wrapper.vm.configWithOtp.showUserIdAndPartyId).toBe(false)
  // })

  // it('triggers onNewPasswordNextClick method', () => {
  //   wrapper.vm.onNewPasswordNextClick()
  //   expect(wrapper.vm.configWithOtp.showNewPasswordSection).toBe(false)
  // })

  // it('triggers reLoginClick method', () => {
  //   wrapper.vm.reLoginClick()
  //   expect(wrapper.vm.configWithOtp.showPasswordResetSuccess).toBe(false)
  // })
})
