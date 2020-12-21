import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from '@/core/router'
import store from '@/core/store'
import vuetify from '@/plugins/vuetify'
import i18n from './plugins/vueI18n'
import formatter from './plugins/formatter'
import colorMixin from '@/core/mixins/colorMixin'
import idleTimeout from '@/plugins/idleTimeout.js'
import appSettings from '@/plugins/appSettings'
import navigation from '@/../_config/_app/navigationConfiguration'
import VueGraph from 'vue-graph'

Vue.config.productionTip = false
Vue.mixin(colorMixin)
Vue.use(VueGraph)
Vue.prototype.$appSettings = appSettings
Vue.prototype.$idleTimeouts = idleTimeout
Vue.prototype.$navigation = navigation
Vue.prototype.$formatter = formatter

new Vue({
  router,
  store,
  colorMixin,
  vuetify,
  i18n,
  appSettings,
  idleTimeout,
  navigation,
  formatter,
  render: h => h(App)
}).$mount('#app')
