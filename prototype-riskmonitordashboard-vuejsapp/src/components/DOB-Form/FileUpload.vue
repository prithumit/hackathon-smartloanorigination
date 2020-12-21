<template>
  <div class="pa-1">
    <v-file-input
      v-model="files"
      @change="setData($event)"
      :label="$t('personalSettings.fileUpload.label')"
      accept=".pdf"
      prepend-icon="mdi-upload"
      show-size
      :error="error"
      :color="primaryColor"
    >
    </v-file-input>
    <div class="text-left">
      <v-layout
        row
        wrap
      >
        <v-flex
          xs8
          sm10
          md10
          xl7
          lg7
        >
          <v-icon
            :color="secondaryColor"
            medium
            class="pr-1"
          >mdi-information-outline</v-icon>
          <font
            class="caption font-weight-bold"
            :color="color"
          >{{ $t("personalSettings.fileUpload.info") }}</font>
        </v-flex>
        <v-flex>
          <div class="text-right">
            <v-btn
              v-if="enablePdfViewer"
              :disabled="files ? false : true"
              :color="secondaryColor"
              @click="displayPdf"
              class="text-none"
              small
              outlined
              >Preview</v-btn
            >
          </div>
        </v-flex>
      </v-layout>
    </div>
    <Modal
      :config="modalConfig"
      @cancel="modalConfig.enabled = false"
    >
      <div
        slot="modalContent"
        id="viewPdfFile"
        class="pdf-viewer"
      ></div>
    </Modal>
  </div>
</template>

<script>
import '@/styles/components/fileUpload.scss'
import PDFObject from '@/core/_helpers/pdfViewer'
import store from '@/core/store'

export default {
  name: 'File-Upload',
  data: () => ({
    files: [],
    ignoreFileTypes: ['.exe', '.doc', '.htm', '.html', '.gif', '.jpg', '.ps', '.mp3', '.mp4', '.png', '.jpeg'],
    urlPdf: undefined,
    enablePdfViewer: false,
    maxSize: undefined,
    error: false,
    color: undefined,
    fileTypeExists: false,
    modalConfig: {
      enabled: false,
      title: 'Preview Address Proof',
      width: '1000px',
      persistent: true,
      cancelButton: 'Close'
    }
    // this.$t('personalSettings.fileUpload.preview')
    // this.$t('personalSettings.buttons.close')
  }),

  components: {
    Modal: () => import('@/components/common/Modal.vue')
  },
  methods: {
    setData (file) {
      this.error = false
      this.color = undefined
      if (file) {
        this.ignoreFileTypes.filter((type) => {
          if (file.name.includes(type)) {
            this.fileTypeExists = true
          }
        })
        if (file.type === 'application/pdf' && !this.fileTypeExists) {
          if (Math.round(file.size / 1024) > this.maxSize) {
            this.files = []
            this.$store.dispatch('appStore/setAppData', {
              message: {
                content: this.$t('personalSettings.fileUpload.warning'),
                type: 'error',
                component: 'dco-snackbar',
                timeOut: 2000
              }
            })
          } else {
            this.urlPdf = undefined
            this.enablePdfViewer = true
            this.urlPdf = URL.createObjectURL(file)
            store.dispatch('userStore/setUserData', { fileType: file.type, file })
          }
        } else {
          this.invalidateInputField()
        }
      } else {
        this.invalidateInputField()
      }
      this.fileTypeExists = false
    },
    displayPdf () {
      this.modalConfig.enabled = true
      setTimeout(() => { PDFObject.embed(this.urlPdf, '#viewPdfFile', { forcePDFJS: true }) }, 10)
    },
    invalidateInputField () {
      this.files = null
      this.error = true
      this.color = this.errorColor
      this.fileTypeExists = false
      store.dispatch('userStore/setUserData', { fileType: undefined, file: undefined })
    }
  }
}
</script>
