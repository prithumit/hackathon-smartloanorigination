<template>
  <v-flex>
    <div class="savings">
      <AccountList :config="{ tab: savingsAccountList.accountsList[0], accountType}"/>
    </div>
  </v-flex>
</template>

<script>
import '@/styles/pages/accounts/savings.scss'
import AccountList from '@/views/accounts/AccountList.vue'
import savingsAccountList from '@/../mocks/accountList.json'

export default {
  name: 'Savings',
  components: {
    AccountList
  },
  data () {
    return {
      savingsAccountList,
      accountType: 'SVGS'
    }
  }
}
</script>
