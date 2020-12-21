<template>
  <v-flex>
    <v-layout row wrap>
      <v-flex xs12 sm5 md4 lg3 xl3>
        <!-- Display Profile Photo -->
        <v-row no-gutters justify="start" class="pt-4 pl-6">
        <font class="title font-weight-bold text-center" :color="primaryColor">{{ $t(`photoCapture.customerDoc`) }}</font>
        </v-row>
        <v-row no-gutters justify="center" class="py-6 pt-2" order-xs-1>
          <div class="relative">
            <v-avatar :tile="false" class="photo-capture--border" height="180" width="180">
              <v-icon
                v-if="!customerProfilePic"
                :size="image.height - (1/6)*(image.height)"
                color="#F8BBD0">mdi-account</v-icon>
              <img v-if="customerProfilePic" :src="customerProfilePic" />
            </v-avatar>
            <div class="text-right">
              <v-icon
                v-if="displayProfileDelete"
                @click="confirmDelete('customerDoc')"
                :color="errorColor"
                large
                class="photo-capture--icon-align topright"
                name="closeIcon"
              >mdi-close-circle</v-icon>
            </div>
            <v-icon
              @click="reset();setConfig('customerDoc');"
              :color="primaryColor"
              x-large
              class="bottomright"
            >mdi-camera</v-icon>
          </div>
        </v-row>
        <!-- Display Address Proof -->
        <v-row v-if="docUploaded" no-gutters justify="start" class="pt-4 pl-6">
        <font class="title font-weight-bold text-left" :color="primaryColor">{{ $t(`photoCapture.addressDocPreview`) }}</font>
        </v-row>
        <v-row v-if="docUploaded" justify="center" no-gutters class="pt-2" order-xs-2>
          <div class="relative">
          <v-avatar
            v-if="docUploaded"
            height="200"
            width="240"
            style="max-width:240;"
            tile
            class="photo-capture--border"
          >
            <img :src="docUploaded" alt="Customer Doc" />
          </v-avatar>
          <div class="text-right">
            <v-icon
              @click="confirmDelete('addressDoc')"
              :color="errorColor"
              large
              class="photo-capture--icon-align topright"
              name="closeIcon"
            >mdi-close-circle</v-icon>
          </div>
          </div>
        </v-row>
      </v-flex>

      <v-flex class="px-1" xs12 sm7 md8 lg9 xl9 order-xs-3>
        <v-container>
          <!-- Email Address & Phone Number -->
          <v-row no-gutters>
            <Form
              :config="{
                label: 'Personal Details',
                icon: 'mdi-pencil',
                name: 'PersonalDetails',
                isEnabled: true,
                form: schema.personalDetails
              }"
            ></Form>
          </v-row>

          <!-- Address -->
          <v-row no-gutters>
            <Form
              :config="{
                label: 'Address Details',
                icon: 'mdi-pencil',
                name: 'AddressDetails',
                isEnabled: true,
                form: schema.addressDetails
              }"
          ></Form>
          </v-row>

          <v-card-actions>
            <v-spacer class="hidden-xs-and-down"></v-spacer>
            <v-btn
              @click="onAddressProof();setConfig('addressDoc');"
              :color='primaryColor'
              outlined
              class='text-capitalize'
            >{{ $t('personalSettings.buttons.addressProof') }}
              <v-icon v-if="docUploaded" class="ml-4" :color="successColor">mdi-check-circle</v-icon>
            </v-btn>
            <v-btn
              @click="onSave('save')"
              :color='primaryColor'
              :disabled="disableModify.saveForm"
              class='text-capitalize white--text'
            >{{ $t('personalSettings.buttons.saveDetails') }}</v-btn>
          </v-card-actions>

          <!-- OTP Section -->
          <Modal v-if='enableOTP' :config='modalConfig.otp' @save='saveAmendData'>
            <span slot='modalContent'>
              <v-flex class='pt-2'>
                <OtpInput :otpConfig='otpSettings' />
              </v-flex>
            </span>
          </Modal>

          <!-- Address Proof Upload -->
          <DocUpload
            v-if="onProofClick"
            @close="onDocClose($event)"
            @customerPicture="updateCustomerPic($event)"
            :isProfilePhoto="isProfilePic"
            :config="{ enabled: onProofClick, type: selectUploadType, modalTitle: selectModalTitle }"
          />
        </v-container>
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
import '@/styles/pages/photoCapture.scss'
import OtpInput from '@/components/common/OtpInput.vue'
import CommonService from '@/service/commonService.js'
import getFormConfig from '@/util/formUtility.js'
import store from '@/core/store'
import event from '@/util/event'

export default {
  name: 'MyProfile',
  components: {
    OtpInput,
    DocUpload: () => import('@/views/personalSettingsAmendments/DocUpload.vue'),
    Modal: () => import('@/components/common/Modal.vue'),
    Form: () => import('@/components/DOB-Form/Form.vue')
  },
  data () {
    return {
      countryCode: '+ 91',
      enableOTP: false,
      onProofClick: false,
      docUploaded: undefined,
      isProfilePic: false,
      selectUploadType: '',
      deleteUploadType: '',
      selectModalTitle: '',
      displayProfileDelete: false,
      customerProfilePic: '',
      customer: {
        emailAddress: 'customer@gmail.com',
        phoneNumber: '9123456780',
        address: {
          postcode: '560037',
          country: 'India',
          state: 'Karnataka',
          city: 'Bangalore',
          addressLine1: 'Finastra Software System',
          addressLine2: 'BCP, OuterRing Road'
        }
      },
      disableModify: {
        emailAddress: true,
        phoneNumber: true,
        address: true,
        saveData: false,
        saveForm: true
      },
      otpSettings: {
        resetPasswordTime: 6000,
        flex: 'xs12 sm12 md12 lg12 xl12'
      },
      modalConfig: {
        otp: {
          enabled: false,
          persistent: true,
          enableSave: false,
          saveButton: this.$t('personalSettings.buttons.confirm'),
          title: this.$t('personalSettings.label.otpTitle'),
          width: 400
        }
      },
      image: {
        height: this.$appSettings.defaultConfigurations.uploadCustomerPhotoHeight,
        width: this.$appSettings.defaultConfigurations.uploadCustomerPhotoWidth
      },
      schema: {
        addressDetails: { exists: true },
        personalDetails: { exists: true }
      }
    }
  },
  created () {
    this.getFormData('PersonalDetails-en')
    this.getFormData('AddressDetails-en')
    event.$on('OTP_UPDATE', val => {
      if (val === '111111') {
        this.modalConfig.otp.enableSave = false
      } else {
        this.modalConfig.otp.enableSave = true
      }
    })
    event.$on('disableSaveIni', arg => {
      this.disableModify.saveData = arg
    })
    event.$on('isValid', arg => {
      if (this.disableModify.saveData) {
        this.disableModify.saveForm = !arg
      }
    })
    event.$on('OTP_RESENT', arg => {
      this.modalConfig.otp.enableSave = true
    })
    event.$on('docImageUploaded', arg => {
      if (this.$store.getters['userStore/userData']) {
        if ((arg === 'customerDoc') && (this.selectUploadType === 'customerDoc')) {
          this.customerProfilePic = this.$store.getters['userStore/userData'].customerDoc
          this.displayProfileDelete = true
        }
        if ((arg === 'addressDoc') && (this.selectUploadType === 'addressDoc')) {
          this.docUploaded = this.$store.getters['userStore/userData'].addressDoc
          this.onProofClick = !this.onProofClick
        }
        if (this.docUploaded || this.customerProfilePic) {
          this.disableModify.saveForm = false
        }
      }
    })
  },
  methods: {
    async getFormData (formName) {
      try {
        const componentSchema = await CommonService.getFormData(formName)
        const data = getFormConfig(componentSchema)
        if (formName === 'AddressDetails-en') {
          this.schema.addressDetails = data
        } else {
          if (formName === 'PersonalDetails-en') {
            this.schema.personalDetails = data
          }
        }
      } catch (e) {
        console.log(e)
      }
    },
    updateCustomerPic (profilePic) {
      this.customerProfilePic = profilePic
      this.isProfilePic = false
    },
    onDocClose (e) {
      this.onProofClick = !e
    },
    reset () {
      this.onProofClick = true
      this.isProfilePic = !this.isProfilePic
    },
    setConfig (type) {
      this.selectUploadType = type
      this.selectModalTitle = (type === 'customerDoc') ? this.$t('photoCapture.uploadPhoto') : this.$t('photoCapture.uploadProof')
    },
    onSave (type) {
      if (type) {
        this.enableOTP = true
        this.modalConfig.otp.enabled = true
        event.$emit('disableForm', true)
      }
    },
    onAddressProof () {
      this.onProofClick = !this.onProofClick
    },
    confirmDelete (type) {
      this.deleteUploadType = type
      store.dispatch('appStore/setAppData', {
        message: {
          title: this.$t('photoCapture.deleteTitle') + ' ' + this.$t(`photoCapture.${type}`),
          content: this.$t('photoCapture.confirmDelete') + ' ' + this.$t(`photoCapture.${type}`) + this.$t('photoCapture.questionMark'),
          type: 'success',
          saveButton: this.$t('common.yes'),
          cancelButton: this.$t('common.no'),
          saveCallback: this.deleteClippedImage,
          icon: 'mdi-delete',
          component: 'dob-modal'
        }
      })
    },
    deleteClippedImage () {
      if ((this.deleteUploadType === 'customerDoc')) {
        this.customerProfilePic = ''
        this.displayProfileDelete = false
      }
      if ((this.deleteUploadType === 'addressDoc')) {
        this.docUploaded = ''
      }
      this.$store.dispatch('userStore/setUserData', { [this.deleteUploadType]: '' })
    },
    saveAmendData () {
      this.disableModify.saveData = false
      store.dispatch('appStore/setAppData', {
        message: {
          title: this.$t('personalSettings.updateStatus'),
          content: this.$t('personalSettings.updateSuccess'),
          type: 'success',
          width: 400,
          saveButton: this.$t('common.okay'),
          component: 'dob-modal'
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.bottomright {
  position: absolute;
  top: 160px;
  right: 40px;
}
.topright {
  position: absolute;
  border-bottom-right-radius: 2px;
}
.relative {
  position: relative;
}
</style>
