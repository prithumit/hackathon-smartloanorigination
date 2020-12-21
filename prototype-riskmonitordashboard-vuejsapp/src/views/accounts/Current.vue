<template>
  <v-flex>
    <div class="currentAccounts">
      <AccountList :config="{ tab: currentAccountList.accountsList[1], accountType}"/>
    </div>
  </v-flex>
</template>

<script>
import AccountList from '@/views/accounts/AccountList.vue'
import currentAccountList from '@/../mocks/accountList.json'

export default {
  name: 'Current',
  components: {
    AccountList
  },
  data () {
    return {
      currentAccountList,
      accountType: 'CACC'
    }
  }
}
</script>
