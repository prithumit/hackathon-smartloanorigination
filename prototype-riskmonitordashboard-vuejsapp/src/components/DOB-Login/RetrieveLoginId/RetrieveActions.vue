<template>
  <div>
    <p>{{ getInfoMessage() }}</p>
    <v-btn
      class="text-capitalize ma-2"
      :color="primaryColor"
      rounded
      outlined
      text
      @click="sendToEmail"
    >{{ $t("login.retrieveLoginId.sendToEmail") }}</v-btn>
    <v-btn
      class="text-capitalize ma-2"
      :color="primaryColor"
      rounded
      outlined
      text
      @click="sendToMobile"
    >{{ $t("login.retrieveLoginId.sendToMobile") }}</v-btn>
  </div>
</template>
<script>
export default {
  name: 'RetrieveActions',
  props: {
    actionConfig: Object
  },
  methods: {
    sendToEmail () {
      console.log('Send to email API call')
      this.actionConfig.close()
    },
    sendToMobile () {
      console.log('Send to mobile API call')
      this.actionConfig.close()
    },
    getInfoMessage () {
      let msg = ''
      msg += this.$t('common.greeting')
      msg += ' '
      msg += this.actionConfig.userInfo.userName
      msg += '! '
      msg += this.$t('login.retrieveLoginId.retrieveLoginIdConfirmMsg')
      return msg
    }
  }
}
</script>
