/* eslint-disable import/named */
import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'
import RetrieveLoginId from '@/components/DOB-Login/RetrieveLoginId/RetrieveLoginId.vue'
import router from '@/core/router/index.js'
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import event from '@/util/event'
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'en',
  messages: {}
})
describe('RetrieveLoginId Component: ', () => {
  let wrapper
  const vuetify = new Vuetify()
  const localVue = createLocalVue()
  localVue.use(Vuetify)

  beforeEach(() => {
    wrapper = mount(RetrieveLoginId, {
      localVue,
      vuetify,
      i18n,
      router,
      mocks: {
        modalConfig: {
          cancelButton: 'Cancel',
          enabled: true,
          persistent: true,
          persist: true,
          saveButton: 'Next',
          saveCallback: '',
          cancelCallback: '',
          enableSave: true,
          title: 'Retrieve User ID',
          width: 400
        }
      }
    })
    event.$emit('OTP_UPDATE', true)
  })

  it('is mounted', () => {
    expect(wrapper.is(RetrieveLoginId)).toBe(true)
  })

  it('disableNext method call', () => {
    wrapper.vm.disableNext()
    expect(wrapper.vm.modalConfig.enableSave).toBe(true)
  })

  it('triggers onCancelClick method', () => {
    wrapper.vm.onCancelClick()
    expect(event.$emit('loginActionEvent')).toBeTruthy()
  })

  it('onRetrieveUserIdFieldNextClick method call', () => {
    wrapper.vm.onRetrieveUserIdFieldNextClick()
    expect(wrapper.vm.modalConfig.persist).toBe(true)
  })

  it('onOtpNextClick method call', () => {
    wrapper.vm.onOtpNextClick()
    expect(wrapper.vm.modalConfig.persist).toBe(true)
  })
})
