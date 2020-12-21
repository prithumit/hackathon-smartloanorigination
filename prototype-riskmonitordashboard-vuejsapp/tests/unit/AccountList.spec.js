/* eslint-disable import/named */
import Vuetify from 'vuetify'
import {
  createLocalVue,
  mount
} from '@vue/test-utils'
import VueRouter from 'vue-router'
import AccountList from '@/views/accounts/AccountList.vue'
import AccountListData from '@/../mocks/accountList.json'
import router from '@/core/router/index.js'
import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'en',
  messages: {}
})
describe('AccountList Component', () => {
  const localVue = createLocalVue()
  let wrapper
  let vuetify
  localVue.use(VueRouter)
  localVue.use(Vuetify)

  beforeEach(() => {
    vuetify = new Vuetify()
    wrapper = mount(AccountList, {
      localVue,
      vuetify,
      i18n,
      router,
      propsData: {
        config: { tab: AccountListData.accountsList, accountType: 'SVGS' }
      },
      data () {
        return {
          currentTab: 0
        }
      },
      mocks: {

      }
    })
  })

  it('is mounted', () => {
    expect(wrapper.is(AccountList)).toBe(true)
  })
})
