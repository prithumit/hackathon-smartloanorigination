<template>
  <div class="clipper">
    <clipper-basic
      v-if="config.image"
      :border="3"
      :initWidth="90"
      :initHeight="90"
      ref="clipper"
      :wrapRatio="1/1"
      :grid="false"
      :src="config.image"
      :clipImage="getClippedImage()"
      class="basic"
    ></clipper-basic>
    <div v-if="config.image" class="text-right">
      <v-icon
        v-if="config.cameraRetake"
        :color="primaryColor"
        @click="openCamera()"
      >mdi-camera-retake</v-icon>
      <v-progress-circular
        v-if="!clippedImage && enableProgress"
        indeterminate
        :color="primaryColor"
      ></v-progress-circular>
      <v-icon v-if="!enableProgress" @click="savePhoto()" :color="successColor" medium>mdi-checkbox-marked-circle</v-icon>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueRx from 'vue-rx'
import { clipperBasic } from 'vuejs-clipper'

Vue.use(VueRx)
export default {
  name: 'dco-clipper',
  components: {
    clipperBasic
  },
  props: {
    config: {
      type: Object,
      default: undefined
    }
  },
  data () {
    return {
      clippedImage: undefined,
      enableProgress: false
    }
  },
  methods: {
    getClippedImage () {
      let img
      if (this.config.isActive) {
        const canvas = this.$refs.clipper.clip()
        canvas.toBlob((blob) => {
          img = document.createElement('img')
          img.src = window.URL.createObjectURL(blob)

          this.clippedImage = canvas.toDataURL('image/jpg', 1)
          this.$emit('clippedImage', { image: this.clippedImage, blobUrl: img.src })
          this.enableProgress = false
        })
      }
    },
    savePhoto () {
      this.enableProgress = true
      this.$emit('savePhoto')
    },
    openCamera () {
      this.$emit('openCamera')
    }
  }
}
</script>

<style lang="scss" scoped>
.basic {
  max-width: 320px;
  min-width: 300px;
}
</style>
