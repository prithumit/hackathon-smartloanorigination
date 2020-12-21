<template>
   <v-row no-gutters>
    <v-flex :class="['otpInput', otpConfig.flex ]">
      <p class="subtitle-2 font-weight-regular">{{ $t("login.resetPassword.resetPasswordOTPText") }}</p>
      <div>
        <v-text-field
          v-model="otp"
          @input="publishOTP"
          :color="primaryColor"
          outlined
          dense
          maxlength='6'
          class="otpInput__padding"
        />
          <v-row align="center" justify="end">
            <v-btn
              @click="resendOTP"
              :disabled="isResendActive.mobile.timerActive || isResendActive.mobile.disabled"
              :color="primaryColor"
              outlined
              small
              class="text-capitalize mr-3"
            >
            {{ (!isResendActive.mobile.timerActive) ? $t("login.resetPassword.resendLabel") : `Resend OTP in ${isResendActive.mobile.counter}` }}
            </v-btn>
          </v-row>
      </div>
    </v-flex>
    </v-row>
</template>

<script>
import '@/styles/common/otpInput.scss'
import event from '@/util/event'

export default {
  name: 'OtpInput',
  props: {
    otpConfig: Object
  },
  data () {
    return {
      otp: null,
      otpTimeInterval: this.$appSettings.defaultConfigurations.otpResendTimeInterval,
      otpResendValidity: this.$appSettings.defaultConfigurations.otpResendValidity,
      isResendActive: {
        mobile: {
          timerActive: false,
          disabled: false,
          counter: 0
        }
      }
    }
  },
  methods: {
    resendOTP () {
      this.runTimer('mobile', this.otpTimeInterval)
      this.otp = ''
      this.$store.dispatch('appStore/setAppData', {
        message: {
          content: this.$t('otp.resendMessage') + this.otpResendValidity + this.$t('otp.unit.minute'),
          type: 'success',
          component: 'dob-snackbar'
        }
      })
      this.isResendActive.mobile.disabled = true
      event.$emit('OTP_RESENT', true)
    },
    runTimer (type, timeInterval) {
      this.isResendActive[type].timerActive = true
      this.isResendActive[type].counter = timeInterval / 1000
      const timerInterval = setInterval(() => {
        this.isResendActive[type].counter -= 1
        if (this.isResendActive[type].counter < 1) {
          this.isResendActive[type].timerActive = false
          this.isResendActive.mobile.disabled = false
          clearInterval(timerInterval)
        }
      }, 1000)
    },
    publishOTP () {
      event.$emit('OTP_UPDATE', this.otp)
    }
  }
}
</script>
