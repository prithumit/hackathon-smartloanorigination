/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-extraneous-dependencies */
// import { storiesOf } from '@storybook/vue'
// import { withKnobs, object } from '@storybook/addon-knobs'
// import VueRouter from 'vue-router'
import Vue from 'vue'
import i18n from '@/plugins/vueI18n'
import idleTimeout from '@/plugins/idleTimeout'
import IdleTimeout from '@/components/IdleTimeout.vue'

import { action } from '@storybook/addon-actions'
// import Modal from '@/components/common/Modal'
import router from '@/core/router/index.js'
Vue.prototype.$idleTimeouts = idleTimeout
export const methods = {
  logout: action('Emits save event and runs the callback!')
}
export default {
  title: 'IdleTimeout'
}
export const asDefault = () => ({
  components: { IdleTimeout },
  i18n,
  router,
  props: {
  },
  template: '<IdleTimeout />',
  methods
})
