const commonAppMixins = {
  methods: {
    logout () {
      this.$store.dispatch('userData/removeUserData')
      this.$router.push('/logout')

      // for timeout
      // this.config.enabled = !this.config.enabled
      this.$store.dispatch('appStore/removeAppData')
      this.$idleTimeouts.logoutConfirm = false
    },
    capitalize (s) {
      if (typeof s !== 'string') return ''
      return s.charAt(0).toUpperCase() + s.slice(1)
    },
    populateSelectFieldsFromGenericCodes (code) {
      const selectionArray = []
      console.log(code)
      console.log(this.$store.getters['appStore/appData'].genericCodes)
      const gc = this.$store.getters['appStore/appData'].genericCodes
      if (gc) {
        const selectedGc = gc.filter(i => i.id === code)
        if (selectedGc) {
          selectedGc[0].detail.genericCodeValues.map(item => {
            selectionArray.push(item)
          })
        }
        console.log(selectionArray)
        return selectionArray
      }
    }
  }

}

export default commonAppMixins
