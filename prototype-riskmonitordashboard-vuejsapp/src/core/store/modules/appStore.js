const data = {
  appData: {}
}

const getters = {
  appData: state => state.appData
}

const mutations = {
  updateAppData (state, payload) {
    state.appData = Object.assign(state.appData, payload)
  },
  removeAppData (state) {
    state.appData = {}
  }
}

const actions = {
  setAppData ({ commit }, payload) {
    commit('updateAppData', payload)
  },
  removeAppData ({ commit }) {
    commit('removeAppData')
  }
}

export default {
  namespaced: true,
  state: data,
  getters,
  mutations,
  actions
}
