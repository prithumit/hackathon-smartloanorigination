import * as Settings from '@/_config/_app/appConfiguration.json'

const localeMixin = {
  mounted () {
    this.$i18n.locale = this.loadLocaleParam()
  },
  methods: {
    loadLocaleParam () {
      return this.$store.getters['appStore/appData'].locale || Settings.localizationAndLanguageSettings.appliedLocalizationKey
    }
  }
}

export default localeMixin
