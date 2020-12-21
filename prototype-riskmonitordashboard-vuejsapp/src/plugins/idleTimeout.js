import Vue from 'vue'
import IdleVue from 'idle-vue'
import appSettings from '@/plugins/appSettings'
const eventsHub = new Vue()
const timeout = appSettings.applicationSettings.idleTimeout
Vue.use(IdleVue, {
  eventEmitter: eventsHub,
  idleTime: timeout
})

export default new Vue({
  data () {
    return {
      logoutConfirm: false
    }
  },
  onIdle () {
    this.logoutConfirm = !this.logoutConfirm
  },
  onActive () {
    // console.log('I am active ----', this.logoutConfirm)
  }
})
