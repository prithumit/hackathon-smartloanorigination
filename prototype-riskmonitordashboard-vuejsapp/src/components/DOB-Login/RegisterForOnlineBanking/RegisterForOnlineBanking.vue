<template>
  <div class="registerForOnlineBanking">
    <Modal :config="modalConfig" @save="logout">
        <span slot="modalContent" class="font-weight-bold">

        </span>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'RegisterForOnlineBanking',
  components: {
    Modal: () => import('@/components/common/Modal.vue')
  },
  data () {
    return {
      modalConfig: {
        cancelButton: 'Cancel',
        enabled: true,
        persistent: true,
        saveButton: 'Register',
        title: this.$t('common.registerForOnlineBanking'),
        width: 400
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
