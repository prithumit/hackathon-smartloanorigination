<template>
  <div v-if="settings.config.resetPasswordType.withOTP" class="resetPasswordWithOtp">
    <Modal :config="settings.modalConfigWithOTP">
      <span slot="modalContent" class="font-weight-bold">
        <v-card flat>
          <v-card-text class="pa-0 pt-6">
            <v-form>
              <v-text-field
                v-if="settings.showUserIdAndPartyId"
                :label="$t('login.resetPassword.userId')"
                prepend-inner-icon="mdi-key"
                type="text"
                filled
                dense
                counter
                maxlength="6"
                minlength="6"
                @input="inputHandler"
                :rules="[rules.required]"
                :color="primaryColor"
                v-model="settings.userId"
              />
              <v-text-field
                v-if="settings.showUserIdAndPartyId"
                :label="$t('login.resetPassword.partyId')"
                prepend-inner-icon="mdi-key"
                type="text"
                filled
                dense
                @input="inputHandler"
                counter
                maxlength="6"
                minlength="6"
                :color="primaryColor"
                v-model="settings.partyId"
                :rules="[rules.required]"
              />
              <!-- OTP Section -->
              <OtpInput v-if="settings.showOTPSection" :otpConfig="otpSettings" />

              <!-- New Password -->
              <v-text-field
                v-if="settings.showNewPasswordSection"
                :label="$t('login.resetPassword.userIdLabel')"
                type="text"
                filled
                dense
                :disabled="true"
                :color="primaryColor"
                counter
                v-model="settings.userId"
              />
              <v-text-field
                v-if="settings.showNewPasswordSection"
                autofocus
                :value="userPassword"
                filled
                dense
                :color="primaryColor"
                :label="$t('login.resetPassword.newPasswordLabel')"
                :append-icon="userPasswordVal ? 'mdi-eye-off': 'mdi-eye'"
                @click:append="() => (userPasswordVal = !userPasswordVal)"
                :type="userPasswordVal ? 'password' : 'text'"
                :rules="[rules.password]"
                @input="publishUpdatedPassword"
                v-model="settings.newPassword"
              />
              <v-text-field
                v-if="settings.showNewPasswordSection && settings.newPassword"
                :value="userPasswordAgain"
                filled
                dense
                :error="settings.renewPassword && settings.newPassword !== settings.renewPassword"
                :error-messages="settings.newPassword !== settings.renewPassword?$t('login.resetPassword.passwordMismatch'):''"
                :color="primaryColor"
                :label="$t('login.resetPassword.renewPasswordLabel')"
                :append-icon="userPasswordAgainVal ? 'mdi-eye-off': 'mdi-eye'"
                @click:append="() => (userPasswordAgainVal = !userPasswordAgainVal)"
                :type="userPasswordAgainVal ? 'password' : 'text'"
                :rules="[rules.password]"
                @input="publishUpdatedPassword"
                v-model="settings.renewPassword"
              />
              <p v-if="settings.showNewPasswordSection">
                <PasswordPolicyChecker :config="settings.config.passwordPolicyType" />
              </p>
              <!-- Password reset success -->
              <p
                v-if="settings.showPasswordResetSuccess"
              >{{ $t("login.resetPassword.passwordResetSuccess") }}</p>
            </v-form>
          </v-card-text>
        </v-card>
      </span>
    </Modal>
  </div>
</template>

<script>
import event from '@/util/event'
import policies from '../../../../mocks/passwordPolicies.json'
import OtpInput from '@/components/common/OtpInput.vue'
export default {
  name: 'ResetPasswordWithOTP',
  components: {
    OtpInput,
    Modal: () => import('@/components/common/Modal.vue'),
    PasswordPolicyChecker: () =>
      import('@/components/DOB-Login/ResetPassword/PasswordPolicyChecker.vue')
  },
  props: {
    settings: Object
  },
  data () {
    return {
      policies,
      otpLength: 6,
      requiredFields: [],
      userPassword: '',
      userPasswordAgain: '',
      userPasswordVal: true,
      userPasswordAgainVal: true,
      rules: {
        required: value => !!value || 'Required.',
        password: value => {
          const self = this
          let patternText = ''
          let pattern = null
          let patternMessage = 'Password must contain at least '
          this.policies.typeRestrict.map((val, i) => {
            const uppercase = '^(?=(.*[A-Z]){' + val.min + '})'
            const lowercase = '^(?=(.*[a-z]){' + val.min + '})'
            const number = '^(?=(.*\\d){' + val.min + '})'
            const specialChar = '^(?=(.*[!@#$%^&*]){' + val.min + '})'
            const minChar = '(?=.{8,})'
            if (val.min && val.name === 'uppercase') {
              patternText += uppercase
              patternMessage += `${val.min} capital ${
                val.min > 1 ? 'letters' : 'letter'
              }, `
            }
            if (val.min && val.name === 'lowercase') {
              patternText += lowercase
              patternMessage += `${val.min} small ${
                val.min > 1 ? 'letters' : 'letter'
              }, `
            }
            if (val.min && val.name === 'number') {
              patternText += number
              patternMessage += `${val.min} ${
                val.min > 1 ? 'numbers' : 'number'
              }, `
            }
            if (val.min && val.name === 'special') {
              patternText += specialChar
              patternMessage += `${val.min} special ${
                val.min > 1 ? 'characters' : 'character'
              }`
            }
            if (self.policies.typeRestrict.length - 1 === i) {
              patternText += minChar
            }
            pattern = new RegExp(patternText)
          })
          return pattern.test(value) || patternMessage
        }
      },
      otpSettings: {
        resetPasswordTime: 10000
      }
    }
  },
  created () {
    this.getRequiredFields()
  },
  methods: {
    publishUpdatedPassword () {
      event.$emit('PASSWORD_UPDATE', {
        new: this.settings.newPassword,
        renew: this.settings.renewPassword
      })
    },
    getRequiredFields () {
      const self = this
      self.requiredFields = []
      if (this.settings.showUserIdAndPartyId) {
        self.requiredFields = ['userId', 'partyId']
      }
    },
    inputHandler () {
      this.ifAllRequiredFilled()
    },
    ifAllRequiredFilled () {
      const self = this
      const checked = this.requiredFields.every(v => {
        return self.settings && self.settings[v] && self.settings[v].trim().length === 6
      })
      if (checked) {
        self.settings.modalConfigWithOTP.enableSave = false
      } else {
        self.settings.modalConfigWithOTP.enableSave = true
      }
    }
  }
}
</script>
