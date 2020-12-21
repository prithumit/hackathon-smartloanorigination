/* eslint-disable import/named */
import Vuetify from 'vuetify'
import {
  createLocalVue,
  mount
} from '@vue/test-utils'
import VueRouter from 'vue-router'
import ResetPasswordWithEmail from '@/components/DOB-Login/ResetPassword/ResetPasswordWithEmail.vue'
import router from '@/core/router/index.js'
import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'en',
  messages: {}
})
describe('ResetPasswordWithEmail component', () => {
  const localVue = createLocalVue()
  let wrapper
  let vuetify
  localVue.use(VueRouter)
  localVue.use(Vuetify)

  beforeEach(() => {
    vuetify = new Vuetify()
    wrapper = mount(ResetPasswordWithEmail, {
      localVue,
      vuetify,
      i18n,
      router,
      propsData: {
        settings: {
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
    expect(wrapper.is(ResetPasswordWithEmail)).toBe(true)
  })
})
