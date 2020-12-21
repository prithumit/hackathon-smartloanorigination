<template>
  <v-container>
    <v-tabs
      v-model="currentTab"
      grow
      background-color="#EEEEEE"
      color="deep-purple accent-4"
    >
      <v-tab @change="setTab('savings')" class="text-none" to="/savings">{{ $t('common.savingsLabel') }}</v-tab>
      <v-tab @change="setTab('current')" class="text-none" to="/current">{{ $t('common.currentLabel') }}</v-tab>
      <v-tab @change="setTab('deposits')" class="text-none" to="/deposits">{{ $t('common.depositsLabel') }}</v-tab>
    </v-tabs>
    <!-- Loads the respective tab component -->
    <router-view />
  </v-container>
</template>

<script>
export default {
  name: 'Accounts',
  props: {
    config: {
      type: Object,
      default: undefined
    }
  },
  data () {
    return {
      currentTab: null
    }
  },
  created () {
    this.setTab(this.$route.name)
  },
  methods: {
    setTab (routeTo) {
      if (routeTo) {
        this.currentTab = (routeTo === 'deposits' || routeTo === 'Deposits') ? 2 : ((routeTo === 'current' || routeTo === 'Current') ? 1 : 0)
      }
    }
  }
}
</script>
