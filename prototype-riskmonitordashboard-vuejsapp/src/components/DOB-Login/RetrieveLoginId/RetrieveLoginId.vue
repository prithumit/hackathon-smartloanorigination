<template>
  <div class="retrieveLoginId">
    <Modal :config="modalConfig">
      <span slot="modalContent" class="font-weight-bold">
        <v-card flat>
          <v-card-text class="pa-0 pt-6">
            <v-form>
              <v-menu
                v-if="showRetrieveUserIdField"
                ref="dateMenu"
                v-model="dateMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="dateFormatted"
                    filled
                    :rules="[rules.required]"
                    dense
                    :color="primaryColor"
                    class="custom-textfield"
                    :label="$t('login.retrieveLoginId.dob')"
                    :hint="$t('login.retrieveLoginId.dobHint')"
                    prepend-inner-icon="mdi-calendar"
                    @blur="date = parseDate(dateFormatted)"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  no-title
                  @input="dateMenu = false"
                  :color="primaryColor"
                  :header-color="primaryColor"
                ></v-date-picker>
              </v-menu>

              <v-text-field
                v-if="showRetrieveUserIdField"
                :label="$t('login.retrieveLoginId.lastName')"
                prepend-inner-icon="mdi-cellphone"
                type="text"
                filled
                dense
                :rules="[rules.required]"
                :color="primaryColor"
                v-model="lastName"
              />
              <v-text-field
                v-if="showRetrieveUserIdField"
                :label="$t('login.retrieveLoginId.partyId')"
                prepend-inner-icon="mdi-key"
                type="text"
                filled
                :rules="[rules.required, rules.length]"
                counter
                maxlength="6"
                minlength="6"
                dense
                :color="primaryColor"
                v-model="partyId"
                hint="Enter your customer ID that you would have got while onboarding."
              />
              <v-text-field
                v-if="showRetrieveUserIdField"
                :label="$t('login.retrieveLoginId.idNumber')"
                prepend-inner-icon="mdi-key"
                type="text"
                filled
                :rules="[rules.required, rules.length]"
                counter
                maxlength="6"
                minlength="6"
                dense
                :color="primaryColor"
                v-model="idNumber"
                hint="Enter your customer ID that you would have got while onboarding."
              />
              <OtpInput v-if="showOtpField" :otpConfig="otpSettings" />
              <RetrieveActions v-if="showConfirmRetrieveLoginId" :actionConfig="actionConfig" />
            </v-form>
          </v-card-text>
        </v-card>
      </span>
    </Modal>
  </div>
</template>

<script>
import event from '@/util/event'
import OtpInput from '@/components/common/OtpInput.vue'
import RetrieveActions from '@/components/DOB-Login/RetrieveLoginId/RetrieveActions.vue'
import '@/styles/components/retrieveLoginId.scss'

export default {
  name: 'RetrieveLoginId',
  components: {
    Modal: () => import('@/components/common/Modal.vue'),
    OtpInput,
    RetrieveActions
  },
  data () {
    return {
      date: '',
      dateFormatted: '',
      showDatePicker: false,
      dateMenu: false,
      lastName: null,
      partyId: null,
      idNumber: null,
      retrieveOtp: null,
      modalConfig: {
        cancelButton: 'Cancel',
        enabled: true,
        persistent: true,
        persist: true,
        saveButton: 'Next',
        saveCallback: this.onRetrieveUserIdFieldNextClick,
        cancelCallback: this.onCancelClick,
        enableSave: true,
        title: this.$t('common.retrieveLoginId'),
        width: 400
      },
      showRetrieveUserIdField: true,
      showOtpField: false,
      showConfirmRetrieveLoginId: false,
      otpSettings: {
        resetPasswordTime: 10000
      },
      actionConfig: {
        userInfo: {
          userName: 'Roger Moore'
        },
        close: this.onCancelClick
      },
      rules: {
        required: v => !!v || 'Required.',
        length: v => v.length === 6 || 'Invalid Length.'
      }
    }
  },
  methods: {
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    parseDate (date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    disableNext () {
      const fields = ['date', 'lastName', 'partyId', 'idNumber']
      const filled = fields.every(v => {
        if (v === 'partyId' || v === 'idNumber') {
          return typeof this[v] === 'string' && this[v].length && this[v].length === 6
        } else {
          return typeof this[v] === 'string' && this[v].length
        }
      })
      if (filled) {
        this.modalConfig.enableSave = false
      } else {
        this.modalConfig.enableSave = true
      }
    },
    onCancelClick () {
      this.$emit('loginActionEvent', true)
    },
    onRetrieveUserIdFieldNextClick () {
      this.modalConfig.persist = true
      this.modalConfig.enableSave = true
      this.modalConfig.saveCallback = this.onOtpNextClick
      this.showRetrieveUserIdField = false
      this.showOtpField = true
    },
    onOtpNextClick () {
      this.modalConfig.saveButton = ''
      this.modalConfig.persist = true
      this.showOtpField = false
      this.showConfirmRetrieveLoginId = true
    }
  },
  watch: {
    date () {
      this.dateFormatted = this.formatDate(this.date)
      this.disableNext()
    },
    lastName () {
      this.disableNext()
    },
    partyId () {
      this.disableNext()
    },
    idNumber () {
      this.disableNext()
    }
  },
  created () {
    event.$on('OTP_UPDATE', otp => {
      if (otp === '111111') {
        this.modalConfig.enableSave = false
      } else {
        this.modalConfig.enableSave = true
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
