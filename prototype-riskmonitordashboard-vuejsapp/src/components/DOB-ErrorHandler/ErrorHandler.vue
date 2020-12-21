<template>
  <div>
    <component
      v-if="config.component"
      :is="config.component"
      :config="getSettings()"
    ></component>
  </div>
</template>

<script>
export default {
  name: 'dob-errorHandler',
  components: {
    'dob-snackbar': () => import('@/components/DOB-ErrorHandler/Snackbar.vue'),
    'dob-modal': () => import('@/components/common/Modal.vue')
  },
  data () {
    return {
      settingsObj: {
        'dob-snackbar': {
          enabled: false,
          content: '',
          color: '',
          timeout: 2000,
          topPosition: true,
          rightPosition: true,
          bottomPosition: false,
          leftPosition: false
        },
        'dob-modal': {
          enabled: false,
          name: 'dob',
          values: '',
          saveButton: 'OK',
          close: true,
          title: '',
          'max-height': '50px',
          width: '500px',
          persistent: false
        }
      },
      colorMap: {
        error: {
          color: '#E57373'
        },
        success: {
          color: '#66BB6A' // green lighten-1
        }
      }
    }
  },
  props: {
    config: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    getColorByType (messageType) {
      return this.colorMap[messageType].color
    },
    getSettings () {
      const {
        content, type, title, component,
        saveButton, cancelButton, timeout, saveCallback, cancelCallback, close, persistent, icon
      } = this.config
      const settingObj = this.settingsObj[component]
      const getColorCode = this.getColorByType(type)

      settingObj.enabled = true

      if (component === 'dob-modal') {
        settingObj.values = content
        settingObj.title = title
        settingObj.saveButton = saveButton
        settingObj.cancelButton = cancelButton
        settingObj.saveCallback = saveCallback
        settingObj.cancelCallback = cancelCallback
        settingObj.close = close
        settingObj.persistent = persistent
        settingObj.icon = icon
      } else if (component === 'dob-snackbar') {
        settingObj.content = content
        settingObj.color = getColorCode
        settingObj.timeout = timeout
      }

      return settingObj
    }
  }
}
</script>
