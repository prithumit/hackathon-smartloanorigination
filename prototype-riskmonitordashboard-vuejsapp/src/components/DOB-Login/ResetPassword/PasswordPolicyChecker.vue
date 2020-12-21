<template>
  <div v-if="policies" class="resetPasswordWithEmail">
    <p>{{ $t("login.resetPassword.passwordPolicyLabel") }}</p>
    <div v-for="item in policies.typeRestrict" :key="item.name">
      <div v-if="item.min">
        <v-icon :class="{ checked: item.checked }" right small class="px-2">mdi-check</v-icon>
        <span :class="{ checked: item.checked }">{{ getValue(item) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import event from '@/util/event'
import policies from '../../../../mocks/passwordPolicies.json'
export default {
  name: 'PasswordPolicyChecker',
  props: {
    config: String
  },
  data () {
    return {
      policies
    }
  },
  methods: {
    getValue (item) {
      return `atleast ${item.min} ${item.name}`
    },
    checkPasswordStrength (str) {
      // const allowed = /^[0-9a-zA-Z!@#$]/
      this.policies.typeRestrict.map(val => {
        const uppercase = new RegExp('^(?=(.*[A-Z]){' + val.min + '})')
        const lowercase = new RegExp('^(?=(.*[a-z]){' + val.min + '})')
        const number = new RegExp('^(?=(.*\\d){' + val.min + '})')
        const specialChar = new RegExp('^(?=(.*[!@#$]){' + val.min + '})')

        if (val.name === 'uppercase') {
          if (uppercase.test(str)) {
            val.checked = true
          } else {
            val.checked = false
          }
        }
        if (val.name === 'lowercase') {
          if (lowercase.test(str)) {
            val.checked = true
          } else {
            val.checked = false
          }
        }
        if (val.name === 'number') {
          if (number.test(str)) {
            val.checked = true
          } else {
            val.checked = false
          }
        }
        if (val.name === 'special') {
          if (specialChar.test(str)) {
            val.checked = true
          } else {
            val.checked = false
          }
        }
      })
    }
  },
  created () {
    event.$on('PASSWORD_UPDATE', data => {
      if (data.new && data.new.trim().length) {
        this.checkPasswordStrength(data.new)
      }
      const checked = this.policies.typeRestrict.every(v => v.checked === true)
      const policyCheckData = {
        ...data,
        checked: checked
      }
      if (checked) {
        event.$emit('POLICY_CHECK', policyCheckData)
      } else {
        event.$emit('POLICY_CHECK', { disableNext: true })
      }
    })
  }
}
</script>
<style lang="scss">
.checked {
  color: green;
}
</style>
