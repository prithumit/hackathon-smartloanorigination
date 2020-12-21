<template>
  <div class="photo-capture">
    <v-container class="text-center">
      <v-row>
        <v-col lg="12">
          <v-avatar
            v-if="!image.clippedImage"
            :height="config.height ? config.height : image.height"
            :width="config.width ? config.width : image.width"
            :tile="config.circular"
            class="photo-capture--border"
          >
            <v-col v-bind:class="classObject">
              <v-progress-linear
                :active="!image.isCameraReady && !isDcoClipper()"
                :color="secondaryColor"
                indeterminate
                height="8"
                slot="modalContent"
              ></v-progress-linear>
              <dob-camera
                v-if="isDcoCamera()"
                @blobURL="recievedImage($event)"
                @isCameraActive="isCameraActive($event)"
                :isCameraStopped="cameraState"
                slot="modalContent"
              ></dob-camera>
              <dob-clipper
                v-if="isDcoClipper() && image.isAcceptable"
                @clippedImage="recievedClippedImage($event)"
                @savePhoto="onSave"
                @openCamera="isCamera"
                :config="{ image: this.image.uploadedImage ? this.image.uploadedImage: this.image.browsedImage, isActive: image.isClipped }"
                :title="changeModalTitle()"
                slot="modalContent"
              ></dob-clipper>
              <v-icon
                :size="config.height ? config.height - (1/6)*(config.height) : image.height - (1/6)*(image.height)"
                color="#F8BBD0"
              >mdi-account</v-icon>
            </v-col>
          </v-avatar>
          <!-- Cropped Image -->
          <v-avatar
            v-if="image.clippedImage"
            :height="config.height ? config.height : image.height"
            :width="config.width ? config.width : image.width"
            :tile="config.circular"
            class="photo-capture--border"
          >
            <v-img
              v-if="image.clippedImage"
              :src="image.clippedImage"
              alt="Customer Photo"
            >
              <div v-if="image.clippedImage" class="text-right">
                <v-icon
                  @click="confirmDelete"
                  :color="secondaryColor"
                  medium
                  class="photo-capture--icon-align"
                  name="closeIcon"
                >mdi-close-circle</v-icon>
              </div>
            </v-img>
          </v-avatar>
        </v-col>

        <v-col lg="12" class="pt-0"></v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import '@/styles/pages/photoCapture.scss'
import event from '@/util/event'

export default {
  name: 'dob-photoCapture',
  components: {
    'dob-camera': () => import('@/components/DOB-Camera/Camera.vue'),
    'dob-clipper': () => import('@/components/DOB-Camera/Clipper.vue')
  },
  props: {
    config: {
      type: Object,
      default: undefined
    }
  },
  data () {
    return {
      imageSizeInfo: false,
      cameraState: undefined,
      image: {
        maxSize: this.$appSettings.defaultConfigurations.maxUploadFileSize,
        height: this.$appSettings.defaultConfigurations.uploadCustomerPhotoHeight,
        width: this.$appSettings.defaultConfigurations.uploadCustomerPhotoWidth,
        isAcceptable: true,
        browsedImage: undefined,
        clippedImage: undefined,
        uploadedImage: Blob,
        isCameraReady: false,
        isClipped: false
      },
      modal: {
        enabled: false,
        name: 'DOB',
        title: this.$t('photoCapture.face_the_camera'),
        'max-height': '300px',
        width: '450',
        close: true
      }
    }
  },
  created () {
    // this.$emit("isValid", !this.config.validation)
    this.isCamera()
    event.$on('stopCamera', this.onCameraStop)
  },
  computed: {
    classObject: function () {
      return {
        clipper: this.isDcoClipper() && this.image.isAcceptable,
        'camera-capture': this.isDcoCamera()
      }
    }
  },
  methods: {
    isDcoClipper () {
      return this.image.uploadedImage ? this.image.uploadedImage : this.image.browsedImage
    },
    isDcoCamera () {
      return !this.image.uploadedImage && !this.image.browsedImage
    },
    recievedImage ({ image, stream }) {
      this.image.uploadedImage = image
      this.image.isAcceptable = true

      stream.getTracks().forEach((track) => {
        track.stop()
      })
    },
    recievedClippedImage (clippedImage) {
      this.image.clippedImage = clippedImage.image
      this.$store.dispatch('userStore/setUserData', { profilePhoto: clippedImage.blobUrl })
      this.image.isClipped = false
      // this.$emit('isValid', true)
    },
    confirmDelete () {
      this.$store.dispatch('appStore/setAppData', {
        message: {
          title: this.$t('photoCapture.deleteTitle'),
          content: this.$t('photoCapture.confirmDelete'),
          type: 'success',
          saveButton: this.$t('common.yes'),
          cancelButton: this.$t('common.no'),
          saveCallback: this.deleteClippedImage,
          width: 450,
          icon: 'mdi-delete',
          component: 'dob-modal'
        }
      })
    },
    deleteClippedImage () {
      this.image.clippedImage = false
      this.$store.dispatch('userStore/setUserData', { profilePhoto: '' })
    },
    onSave () {
      this.image.isClipped = !this.image.isClipped
      this.$emit('docImage', this.image)
    },
    onClose () {
      this.cameraState = true
    },
    changeModalTitle () {
      this.modal.title = this.$t('photoCapture.crop_image')
      this.modal.saveButton = this.$t('common.saveButton_text')
    },
    isBrowse (e) {
      this.validateFileSize(e)
      this.image.uploadedImage = undefined
    },
    validateFileSize (imageFile) {
      const xhr = new XMLHttpRequest()
      xhr.open('GET', imageFile, true)
      xhr.responseType = 'blob'

      xhr.onload = ({ target }) => {
        const { response, status } = target
        const { size } = response

        if (status === 200) {
          if (Math.round(size / 1024) > this.image.maxSize) {
            this.$store.dispatch('appStore/setAppData', {
              message: {
                content: this.$t('photoCapture.image_size_exceeded'),
                type: 'error',
                component: 'dob-snackbar'
              }
            })
            this.image.isAcceptable = false
          } else {
            this.image.isAcceptable = true
            this.modal.enabled = true
          }
        }
      }
      xhr.send()
    },
    isCamera () {
      this.cameraState = false
      this.image.isClipped = false
      this.image.uploadedImage = undefined
      this.image.browsedImage = undefined
      this.image.isCameraReady = false
    },
    isCameraActive (state) {
      this.image.isCameraReady = state
    },
    onCameraStop (arg) {
      event.$emit('stopCam')
    }
  },
  beforeDestroy () {
    event.$off('stopCamera', this.onCameraStop)
  },
  watch: {
    cameraState: {
      immediate: true,
      handler (newval, oldVal) {}
    }
  }
}
</script>
