<template>
  <div>
    <v-menu :close-on-content-click="false" :nudge-width="200" offset-y>
      <template v-slot:activator="{ on }">
        <v-btn class="ma-2" icon @click="showUserProfile = !showUserProfile" v-on="on">
          <v-icon :color="primaryColor">mdi-account-outline</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title @click="openUserProfile" class="justify-space-around">
          <v-avatar class="nav__header-avatar" size="100">
            <span  class="headline">{{ sessionActiveUserInitial }}</span>
          </v-avatar>
        </v-card-title>
        <v-list>
          <v-list-item class="text-center">
            <v-list-item-content>
              <v-list-item-title>{{ sessionActiveUserName }}</v-list-item-title>
              <v-list-item-subtitle>{{
                sessionActiveUserEmail
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-item class="justify-space-around">
            <v-row align="center" justify="center">
              <div class="text-center">
                <v-btn
                  class="nav__logout-btn px-5 white--text"
                  rounded
                  dark
                  depressed
                  small
                  @click="logoutConfirm"
                  min-width="200"
                  :color="primaryColor"
                >
                  <v-icon small class="px-2">mdi-logout-variant</v-icon>
                  {{ $t("common.logoutText") }}
                </v-btn>
              </div>
            </v-row>
          </v-list-item>

          <v-list-item class="justify-center">
            <v-btn
              @click="openUserProfile"
              text
              class="nav__profile-text text-none"
            ><font :color="primaryColor">{{$t('common.viewProfilePlaceholder')}}</font></v-btn>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
    <Modal :config="modalConfig" @save="logout">
      <span slot="modalContent" class="font-weight-bold">
        {{ $t("common.confirmation_message") }}
      </span>
    </Modal>
  </div>
</template>

<script>
import store from '@/core/store'

export default {
  components: {
    Modal: () => import('@/components/common/Modal.vue')
  },
  data () {
    return {
      modalConfig: {
        enabled: false,
        persistent: true,
        title: this.$t('common.logoutText'),
        saveButton: 'Yes',
        cancelButton: 'No',
        width: 400
      },
      showUserProfile: false,
      sessionActiveUserInitial: 'RM',
      sessionActiveUserName: 'Roger Moore',
      sessionActiveUserEmail: 'someemail@finastra.com'
    }
  },
  methods: {
    handleDrawerEvent (event) {
      this.drawer = event
    },
    logout () {
      store.dispatch('userStore/setUserData', { myAccounts: {} })
      this.$router.push('/login')
    },
    logoutConfirm () {
      this.modalConfig.enabled = true
    },
    showDialog () {
      this.drawer = false
      return (this.dialog = true)
    },
    openUserProfile () {
      this.showUserProfile = !this.showUserProfile
      this.$router.push({ name: 'MyProfile' })
    }
  }
}
</script>
<style lang="scss" scoped></style>
