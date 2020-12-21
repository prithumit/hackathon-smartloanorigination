<template>
  <div class='nav__header'>
    <v-content>
      <v-app-bar app class='mx-auto overflow-hidden'>
        <v-icon v-if='showDrawerButton' @click='toggleDrawer()' :color='primaryColor'>mdi-menu</v-icon>
        <div v-if='displayLogo' class='nav__header-logo hidden-sm-and-down ml-4 mt-2'></div>
        <!-- <Breadcrumb v-if="$appSettings.headerConfig.breadcrumb" /> -->
        <v-spacer></v-spacer>
        <div class="hidden-sm-and-down">
        <v-tooltip>
          <template v-slot:activator='{ on }'>
            <div v-on='on'>
              <v-btn icon>
                <v-icon @click='handleFullScreen()' :color='primaryColor'>mdi mdi-fullscreen</v-icon>
              </v-btn>
            </div>
          </template>
          <span>{{ $t('header.tooltip_fullScreen') }}</span>
        </v-tooltip>
        </div>
        <div class="hidden-sm-and-down">
        <GlobalSearch v-if="$appSettings.headerConfig.searchComponent" :config="$appSettings.headerConfig" />
        </div>
        <div class="hidden-sm-and-down">
        <v-btn
          icon
          target='_blank'
          name='help-url'
          class="ma-2"
          :href='$appSettings.applicationSettings.helpUrl'
          :color='primaryColor'>
          <v-icon>mdi-help-circle-outline</v-icon>
        </v-btn>
        </div>
        <div class="hidden-sm-and-down">
        <NotificationList v-if="$appSettings.headerConfig.notificationComponent" />
        </div>
        <div class="hidden-sm-and-down">
        <UserProfile v-if="$appSettings.headerConfig.profileComponent" />
        </div>
        <div class="hidden-sm-and-down">
        <v-btn icon v-if="!$appSettings.headerConfig.profileComponent" text v-show='headerLogoutIcon && headerConfig.showLogoutButton'>
          <v-icon
            class="ma-2"
            @click='logoutConfirm'
            :color='primaryColor'
            >mdi-logout-variant</v-icon
          >
        </v-btn>
        </div>
        <div class="hidden-md-and-up">
          <v-menu bottom left>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item>
              <GlobalSearch v-if="$appSettings.headerConfig.searchComponent" :config="$appSettings.headerConfig" />
            </v-list-item>
            <v-list-item>
              <v-btn
                icon
                target='_blank'
                name='help-url'
                class="ma-2"
                :href='$appSettings.applicationSettings.helpUrl'
                :color='primaryColor'>
                <v-icon>mdi-help-circle-outline</v-icon>
              </v-btn>
            </v-list-item>
            <v-list-item>
              <NotificationList v-if="$appSettings.headerConfig.notificationComponent" />
            </v-list-item>
            <v-list-item>
              <UserProfile v-if="$appSettings.headerConfig.profileComponent" />
              <v-btn icon v-if="!$appSettings.headerConfig.profileComponent" text v-show='headerLogoutIcon && headerConfig.showLogoutButton'>
              <v-icon
                class="ma-2"
                @click='logoutConfirm'
                :color='primaryColor'
                >mdi-logout-variant</v-icon
              >
            </v-btn>
            </v-list-item>
          </v-list>
          </v-menu>
        </div>
      </v-app-bar>
      <Modal v-if="!$appSettings.headerConfig.profileComponent" :config='modalConfig' @save='logout'>
        <span slot='modalContent' class='font-weight-bold'>
          {{ $t('common.confirmation_message') }}
        </span>
      </Modal>
    </v-content>
  </div>
</template>
<script>
import UserProfile from '@/components/common/UserProfile.vue'
import Breadcrumb from '@/components/common/Breadcrumb'
import GlobalSearch from '@/components/common/GlobalSearch'
import NotificationList from '@/components/common/NotificationList'
import '@/styles/common/appbar.scss'
import event from '@/util/event'

export default {
  name: 'Header',
  props: {
    headerConfig: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  components: {
    Modal: () => import('@/components/common/Modal.vue'),
    UserProfile,
    GlobalSearch,
    Breadcrumb,
    NotificationList
  },
  created () {
    event.$on('Hide_header_logo', () => {
      this.displayLogo = !this.displayLogo
      this.headerLogoutIcon = !this.headerLogoutIcon
    })
  },
  data () {
    return {
      // TODO: This will be picked up later
      // showAddButton: this.headerConfig.showAddButton || false,
      appName: this.$t('common.bankTitle'),
      displayLogo: true,
      headerLogoutIcon: true,
      modalConfig: {
        cancelButton: 'No',
        enabled: false,
        persistent: true,
        saveButton: 'Yes',
        title: this.$t('common.logoutText'),
        width: 400
      },
      showDrawerButton: this.headerConfig.showDrawerButton || false,
      navigationMenu: this.$navigation.menuStructure
    }
  },
  methods: {
    toggleDrawer () {
      event.$emit('APP_DRAWER_TOGGLED', true)
    },
    handleFullScreen () {
      const doc = window.document
      const docEl = doc.documentElement
      const requestFullScreen =
        docEl.requestFullscreen ||
        docEl.mozRequestFullScreen ||
        docEl.webkitRequestFullScreen ||
        docEl.msRequestFullscreen
      const cancelFullScreen =
        doc.exitFullscreen ||
        doc.mozCancelFullScreen ||
        doc.webkitExitFullscreen ||
        doc.msExitFullscreen
      if (
        !doc.fullscreenElement &&
        !doc.mozFullScreenElement &&
        !doc.webkitFullscreenElement &&
        !doc.msFullscreenElement
      ) {
        requestFullScreen.call(docEl)
      } else {
        cancelFullScreen.call(doc)
      }
    },
    logout () {
      this.$router.push('/')
    },
    logoutConfirm () {
      this.modalConfig.enabled = true
    },
    showDialog () {
      this.drawer = false
      return (this.dialog = true)
    }
  }
}
</script>
<style scoped>
.logoutButton {
  position: absolute;
  width: 90%;
  bottom: 15px;
  right: 5%;
  text-align: center;
}
</style>
