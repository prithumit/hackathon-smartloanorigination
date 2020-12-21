<template>
  <v-flex xs2 sm2 md2 lg2 xl2>
    <Modal :config="modalConfig" @save="logout">
      <span slot="modalContent" class="font-weight-bold">
        {{ $t("common.idleTimeoutContent") }}
      </span>
    </Modal>
  </v-flex>
</template>
<script>
import IdleVueComponent from 'idle-vue/src/components/Idle.vue'
import Vue from 'vue'
Vue.component('idle-view', IdleVueComponent)
export default {
  name: 'idle-timeout',
  components: {
    Modal: () => import('@/components/common/Modal.vue')
  },
  data () {
    return {
      modalConfig: {
        enabled: false,
        icon: 'mdi-timer',
        persistent: true,
        saveButton: 'OK',
        title: this.$t('common.idleTimeoutTitle'),
        width: 450
      }
    }
  },
  methods: {
    logout () {
      this.$router.push('/')
    },
    logoutConfirm () {
      this.modalConfig.enabled = true
    }
  },
  onIdle () {
    this.modalConfig.enabled = true
  }
}
</script>
