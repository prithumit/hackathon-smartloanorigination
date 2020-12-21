<template>
  <v-flex>
    <div class="deposit">
      <accountList :config="{ tab: depositAccountList.accountsList[2], accountType}"/>
    </div>
  </v-flex>
</template>

<script>
// import '@/styles/pages/accounts/deposits.scss'
import accountList from '@/views/accounts/AccountList.vue'
import depositAccountList from '@/../mocks/accountList.json'

export default {
  name: 'Deposits',
  components: {
    accountList
  },
  data () {
    return {
      depositAccountList,
      accountType: 'TD'
    }
  },
  created () {
    this.accountType = this.$route.params.accountType || 'TD'
  }
}
</script>
