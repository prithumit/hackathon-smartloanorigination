import Vue from 'vue'
import Vuex from 'vuex'
import appStore from './modules/appStore'
import userStore from './modules/userStore'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    appStore,
    userStore
  }
})
