<template>
  <div class="docUpload">
    <v-dialog v-model="config.enabled" :persistent="true" max-width="370">
      <v-card min-width="370">
        <v-flex>
        <v-toolbar :color="primaryColor" max-height="50px">
          <p>
            <font class="pl-0 pt-0 white--text title font-weight-thin">{{ config.modalTitle }}</font>
          </p>
          <v-spacer></v-spacer>
          <p>
            <font class="pr-0 justify-end">
              <v-icon class="white--text" @click="onClose()">mdi-close</v-icon>
            </font>
          </p>
        </v-toolbar>
        <v-toolbar
          class="white--text subtitle-1 font-weight-medium"
          max-height="50px"
          color="#f4f1fa"
          elevation="0"
        >
          <font class="pb-2 subtitle-1 font-weight-regular" color="black">{{ $t("docUpload.selectFile") }}</font>
          <v-spacer></v-spacer>
          <p>
            <v-btn text @click="isBrowserSelected">
              <clipper-upload v-model="image.browsedImage">
                <font
                  class="text-none title font-weight-thin subtitle-1"
                  :color="primaryColor"
                >{{$t("docUpload.browse")}}</font>
              <v-icon :color="primaryColor" right dark>mdi-upload</v-icon>
              </clipper-upload>
            </v-btn>
          </p>
        </v-toolbar>
        <v-divider :color="primaryColor" style="margin-top:0px; margin-bottom: 0px"></v-divider>
        <v-switch v-model="enableCamera" class="pl-3 title dcoUpload--switchAction" :color="primaryColor" label="Use Camera"></v-switch>
        <v-layout v-if="browserSelected" wrap class="py-0">
          <v-flex xs2 sm2 md2 lg2 xl2 class="pt-0">
          <v-icon
            :color="secondaryColor"
            medium
            class="pl-3"
          >mdi-information-outline</v-icon>
          </v-flex>
          <v-flex xs9 sm9 md9 lg10 xl10 class="pt-0">
          <font class="caption font-weight-light">{{ $t('photoCapture.upload_info') }} {{ image.maxSize/1024 }}MB. </font>
          <font v-if="browserSelected && (config.type === 'addressDoc')" class="caption font-weight-light">{{ $t('photoCapture.supported_type') }}</font>
          </v-flex>
        </v-layout>
        <!-- <font class="caption font-weight-light pl-2">Supported File Type: </font>
        <br />
        <font class="caption font-weight-light pl-2">PDF, Word, Excel, Image</font>
        </span> -->
        <v-card-text class="pb-0">
          <v-progress-linear
            v-if="enableCamera"
            :active="!image.isCameraReady && !isDcoClipper()"
            :color="secondaryColor"
            indeterminate
            height="8"
          ></v-progress-linear>

        <dob-camera
          v-if="isDcoCamera() && enableCamera"
          @blobURL="recievedImage($event)"
          @isCameraActive="isCameraActive($event)"
          :isCameraStopped="cameraState"
        ></dob-camera>

        <dob-clipper
          v-if="isDcoClipper() && image.isAcceptable && !image.clippedImage"
          @clippedImage="recievedClippedImage($event, config.type)"
          @savePhoto="onSave"
          :config="{ image: this.image.uploadedImage ? this.image.uploadedImage: this.image.browsedImage, isActive: image.isClipped }"
        ></dob-clipper>

        <v-avatar
          v-if="image.clippedImage"
          tile
          height="320"
          width="330"
          class="photo-capture--border mb-1"
        >
          <v-img :src="image.clippedImage"/>
        </v-avatar>
      </v-card-text>

      <v-divider v-if="isDcoClipper() && image.isAcceptable" :color="primaryColor" style="margin-top:0px margin-bottom: 0px"></v-divider>
      <v-card-actions v-if="isDcoClipper() && image.isAcceptable" class="pa-2">
        <v-spacer></v-spacer>
        <v-btn
          @click="save"
          :color="secondaryColor"
          :disabled="!image.clippedImage"
          outlined
          class="font-weight-light text-none"
        >{{ $t("docUpload.save") }}</v-btn>
      </v-card-actions>
        </v-flex>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { clipperUpload } from 'vuejs-clipper'
import event from '@/util/event'
import '@/styles/docUpload.scss'

export default {
  name: 'DocUpload',
  components: {
    clipperUpload,
    'dob-camera': () => import('@/components/DOB-Camera/Camera.vue'),
    'dob-clipper': () => import('@/components/DOB-Camera/Clipper.vue')
  },
  data () {
    return {
      enableCamera: false,
      cameraState: undefined,
      showActions: false,
      uploadType: '',
      browserSelected: false,
      image: {
        maxSize: this.$appSettings.defaultConfigurations.maxUploadFileSize,
        height: this.$appSettings.defaultConfigurations.uploadCustomerPhotoHeight,
        width: this.$appSettings.defaultConfigurations.uploadCustomerPhotoWidth,
        isAcceptable: true,
        browsedImage: undefined,
        clippedImage: undefined,
        uploadedImage: undefined,
        isCameraReady: false,
        isClipped: false
      },
      doc: {
        clippedDoc: undefined,
        isClipped: false,
        uploadedDoc: undefined,
        browsedDoc: undefined
      }
    }
  },
  props: {
    config: {
      type: Object,
      default: undefined
    }
  },
  methods: {
    isDcoCamera () {
      return !this.image.uploadedImage && !this.image.browsedImage
    },
    isDcoClipper () {
      return this.image.uploadedImage ? this.image.uploadedImage : this.image.browsedImage
    },
    isCamera () {
      this.cameraState = false
      this.image.isClipped = false
      this.image.uploadedImage = undefined
      this.image.browsedImage = undefined
      this.image.isCameraReady = false
      this.browserSelected = false
    },
    isBrowserSelected () {
      this.browserSelected = true
    },
    recievedImage ({ image, stream }) {
      this.image.uploadedImage = image
      this.image.isAcceptable = true

      stream.getTracks().forEach((track) => {
        track.stop()
      })
    },
    recievedClippedImage (clippedImage, type) {
      this.image.clippedImage = clippedImage.image
      this.$store.dispatch('userStore/setUserData', { [type]: clippedImage.blobUrl })
      this.uploadType = type
      // this.config.enabled = false
      this.image.isClipped = false
      // this.$emit('isValid', true)
      // event.$emit('docImageUploaded', type)
    },
    deleteClippedImage () {
      this.image.clippedImage = false
    },
    save () {
      event.$emit('docImageUploaded', this.uploadType)
      this.browserSelected = false
      this.$emit('close', true)
    },
    onSave () {
      this.image.isClipped = !this.image.isClipped
      // this.doc.isClipped = !this.doc.isClipped
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
            // this.config.enabled = true
          }
        }
      }
      xhr.send()
    },
    isCameraActive (state) {
      this.image.isCameraReady = state
    },
    onClose () {
      // this.config.enabled = false
      this.cameraState = true
      this.browserSelected = false
      this.$emit('close', true)
      event.$emit('stopCamera', false)
    }
  },
  watch: {
    enableCamera (newValue) {
      this.doc = {
        clippedDoc: undefined,
        isClipped: false,
        uploadedDoc: undefined,
        browsedDoc: undefined,
        browserSelected: false
      }
      if (!newValue) event.$emit('stopCamera')
    }
  }
}
</script>
