<template>
  <div>
    <v-flex class="text-left mt-2 mb-2">
      <v-btn
        text
        color="primary"
        @click="goBack"
      >
        <v-icon left>mdi-arrow-left</v-icon>
        {{$t('common.goBack')}}
      </v-btn>
    </v-flex>
    <v-flex v-if="defaultAccountType === 'TD'">
      <DepositDetails :config="{ params: {accountId, accountName, defaultAccountType}}" />
    </v-flex>
    <div fluid v-if="(defaultAccountType === 'SVGS' || defaultAccountType === 'CACC')">
      <CasaDetails :config="{ params: {accountId, accountName, defaultAccountType}}" />
    </div>
  </div>
</template>

<script>
import CasaDetails from '@/views/accounts/accountDetails/CasaDetails'
import DepositDetails from '@/views/accounts/accountDetails/DepositDetails'

export default {
  name: 'AccountDetails',
  components: {
    CasaDetails,
    DepositDetails
  },
  data () {
    return {

    }
  },
  created () {
    this.accountId = this.$route.params.accountId
    this.accountName = this.$route.params.accountName
    this.defaultAccountType = this.$route.params.accountType
  },
  methods: {
    goBack () {
      return this.$router.go(-1)
    }
  }
}
</script>
