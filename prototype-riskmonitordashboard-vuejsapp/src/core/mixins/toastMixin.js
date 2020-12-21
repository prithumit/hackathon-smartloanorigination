import { mapState } from 'vuex'

const toastMixin = {
  data () {
    return {
      alertMessage: undefined,
      loaderEnabled: false
    }
  },
  computed: {
    ...mapState('appStore', ['appData'])
  },
  created () {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'appStore/updateAppData') {
        this.loaderEnabled = state.appStore.appData.inProgress
        if (state.appStore.appData.message) {
          this.alertMessage = state.appStore.appData.message
        }
      }
    })
  }
}

export default toastMixin
