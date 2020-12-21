<template>
  <div v-if="settings.config.resetPasswordType.withEmail" class="resetPasswordWithEmail">
    <Modal :config="settings.modalConfig">
      <span slot="modalContent" class="font-weight-bold">
        <v-card flat>
          <v-card-text class="pa-0 pt-6">
            <p
              v-if="settings.showResetPasswordMessage"
            >{{ $t("login.resetPassword.resetPasswordMessage") }}</p>
            <p
              v-if="settings.showResendPasswordMessage"
            >{{ $t("login.resetPassword.resendPasswordMessage") }}</p>
            <v-form
              v-if="!settings.showResetPasswordMessage && !settings.showResendPasswordMessage"
            >
              <v-text-field
                :label="$t('login.resetPassword.userId')"
                prepend-inner-icon="mdi-key"
                :rules="[rules.required]"
                type="text"
                filled
                dense
                :color="primaryColor"
                counter
                maxlength="6"
                minlength="6"
                class="custom-textfield"
                v-model="settings.customerId"
                hint="Enter your customer ID that you would have got while onboarding."
              />
            </v-form>
          </v-card-text>
        </v-card>
      </span>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'ResetPasswordWithEmail',
  components: {
    Modal: () => import('@/components/common/Modal.vue')
  },
  props: {
    settings: Object
  },
  data () {
    return {
      rules: {
        required: v => !!v || 'Required'
      }
    }
  }
}
</script>
