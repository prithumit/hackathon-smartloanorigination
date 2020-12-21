<template>
  <div class="resetPassword">
    <!-- reset password with Email option-->
    <ResetPasswordWithEmail :settings="configWithEmail" />
    <!-- reset password with OTP option -->
    <ResetPasswordWithOTP :settings="configWithOtp" />
  </div>
</template>

<script>
import event from '@/util/event'
import passwordPolicies from '@/../mocks/passwordPolicies.json'

export default {
  name: 'ResetPassword',
  props: {
    config: Object
  },
  components: {
    ResetPasswordWithEmail: () =>
      import('@/components/DOB-Login/ResetPassword/ResetPasswordWithEmail'),
    ResetPasswordWithOTP: () =>
      import('@/components/DOB-Login/ResetPassword/ResetPasswordWithOTP')
  },
  data () {
    return {
      passwordPolicies,
      configWithEmail: {
        config: this.config,
        modalConfig: {
          cancelButton: 'Cancel',
          enabled: true,
          enableSave: false,
          persistent: true,
          saveButton: 'Next',
          title: this.$t('common.resetPasswordPlaceholder'),
          width: 400,
          saveCallback: this.onNextClick,
          cancelCallback: this.onCancelClick
        },
        showResetPasswordMessage: false,
        showResendPasswordMessage: false,
        customerId: null
      },
      configWithOtp: {
        config: this.config,
        modalConfigWithOTP: {
          cancelButton: 'Cancel',
          enabled: true,
          enableSave: true,
          persistent: true,
          saveButton: 'Next',
          title: this.$t('common.resetPasswordPlaceholder'),
          width: 400,
          saveCallback: this.onNextClickWithOTP,
          cancelCallback: this.onCancelClickWithOTP
        },
        resendOTPBtnDisabled: true,
        showNewPasswordSection: false,
        showPasswordResetSuccess: false,
        showOTPSection: false,
        resetPasswordOTPText: false,
        showUserIdAndPartyId: true,
        newPassword: null,
        renewPassword: null,
        resetPasswordOTP: null,
        resetPasswordTime: 10000,
        userId: null,
        partyId: null
      }
    }
  },
  methods: {
    onNextClick () {
      this.configWithEmail.modalConfig.persist = true
      this.configWithEmail.modalConfig.saveButton = ''
      this.configWithEmail.modalConfig.cancelButton = 'Close'
      this.configWithEmail.showResetPasswordMessage = true
      // API call to send email
    },
    onCancelClick () {
      this.configWithEmail.showResetPasswordMessage = false
      this.$emit('loginActionEvent', true)
    },
    resendHandler () {
      this.configWithEmail.modalConfig.enableSave = true
      setTimeout(() => {
        this.configWithEmail.modalConfig.enableSave = false
      }, this.resetPasswordTime)
    },
    onNextClickWithOTP () {
      this.configWithOtp.modalConfigWithOTP.persist = true
      this.configWithOtp.resetPasswordOTPText = true
      this.configWithOtp.showOTPSection = true
      this.configWithOtp.modalConfigWithOTP.enableSave = true
      this.configWithOtp.modalConfigWithOTP.saveCallback = this.onOTPNextClick
    },
    onCancelClickWithOTP () {
      this.$emit('loginActionEvent', true)
    },
    onOTPNextClick () {
      this.configWithOtp.showUserIdAndPartyId = false
      this.configWithOtp.showOTPSection = false
      this.configWithOtp.modalConfigWithOTP.persist = true
      this.configWithOtp.showNewPasswordSection = true
      this.configWithOtp.modalConfigWithOTP.enableSave = true
      this.configWithOtp.modalConfigWithOTP.saveCallback = this.onNewPasswordNextClick
    },
    onNewPasswordNextClick () {
      this.configWithOtp.showNewPasswordSection = false
      this.configWithOtp.showPasswordResetSuccess = true
      this.configWithOtp.modalConfigWithOTP.persist = true
      this.configWithOtp.modalConfigWithOTP.saveButton = 'OK'
      this.configWithOtp.modalConfigWithOTP.saveCallback = this.reLoginClick
    },
    reLoginClick () {
      this.$emit('loginActionEvent', true)
      this.configWithOtp.showPasswordResetSuccess = false
      this.configWithOtp.modalConfigWithOTP.persist = false
      this.$router.push('/login')
    }
  },
  created () {
    event.$on('POLICY_CHECK', data => {
      if (data.disableNext) {
        this.configWithOtp.modalConfigWithOTP.enableSave = true
      }
      if (data.checked && data.new && data.renew && data.new === data.renew) {
        this.configWithOtp.modalConfigWithOTP.enableSave = false
      } else {
        this.configWithOtp.modalConfigWithOTP.enableSave = true
      }
    })
    event.$on('OTP_UPDATE', otp => {
      if (otp === '111111') {
        this.configWithOtp.modalConfigWithOTP.enableSave = false
      } else {
        this.configWithOtp.modalConfigWithOTP.enableSave = true
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
