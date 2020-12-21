<template>
  <div>
    <v-navigation-drawer
      :right="$vuetify.rtl"
      class="appDrawer"
      :mini-variant.sync="mini"
      :dark="$vuetify.dark"
      app
      v-model="drawer"
      hide-overlay
      width="271"
    >
      <v-layout justify-center pa-5>
        <div pa-5>
          <v-flex pa-5>
            <div align="center">
              <div class="nav__header-logo"></div>
            </div>
            <div align="center">
              <span class="font-weight-black subtitle-1">{{
                $t("common.bankTitle")
              }}</span>
            </div>
          </v-flex>
        </div>
      </v-layout>
      <v-divider></v-divider>
      <v-list>
        <div
          v-for="item in navigationMenu"
          :key="item.title"
        >
          <v-list-item
            class="v-list__tile--link theme--light"
            v-if="item.enable && !item.views"
            link
            v-bind:to="item.path"
            :color="primaryColor"
            >
            <v-icon :color="primaryColor">{{ item.icon }}</v-icon>
            <v-flex class="pl-4"></v-flex>
            <v-list-item-title>
              <router-link
                style="text-decoration: none;"
                active-class="primary--text active"
                class="body-2 font-weight-bold"
                v-bind:to="item.path"
                >{{ item.title }}</router-link
                >
            </v-list-item-title>
          </v-list-item>
          <v-list-group
            no-action
            v-if="item.views"
            value="true"
            >
            <template v-slot:activator>
              <v-icon :color="primaryColor" v-if="item.enable">{{ item.icon }}</v-icon>
              <v-flex class="pl-4"></v-flex>
              <v-list-item-title>
                <router-link
                  style="text-decoration: none;"
                  active-class="primary--text active"
                  class="body-2 font-weight-bold"
                  v-bind:to="item.path"
                  >{{ item.title }}</router-link
                  >
              </v-list-item-title>
            </template>
            <v-list-item
              v-for="(view, i) in item.views"
              :key="i"
              link
              v-bind:to="view.path"
              :color="primaryColor"
              >
              <v-icon :color="primaryColor" v-if="view.enable">{{ view.icon }}</v-icon>
              <v-flex class="pl-4"></v-flex>
              <v-list-item-title v-if="view.enable">
                <router-link
                  style="text-decoration: none;"
                  active-class="primary--text active"
                  class="body-2 font-weight-bold"
                  v-bind:to="view.path"
                  >{{ view.title }}</router-link
                  >
              </v-list-item-title>
            </v-list-item>
          </v-list-group>
        </div>
      </v-list>
      <template v-slot:append>
        <v-list>
          <v-list-item
            link
            :href="$appSettings.applicationSettings.helpUrl"
            target="_blank"
            class="v-list__tile--link theme--light"
          >
            <v-icon :color="primaryColor">mdi-help-circle</v-icon>
            <v-flex class="pl-4"></v-flex>
            <v-list-item-title class="primary--text body-2 font-weight-bold">{{ $t('common.help') }}</v-list-item-title>
          </v-list-item>
          <v-list-item
            link
            class="v-list__tile--link theme--light"
          >
            <v-icon :color="primaryColor">mdi-power-standby</v-icon>
            <v-flex class="pl-4"></v-flex>
            <v-list-item-title class="primary--text body-2 font-weight-bold" @click="logoutConfirm">{{ $t('common.logoutText') }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
    <Modal :config="modalConfig" @save="logout">
      <span slot="modalContent" class="font-weight-bold">
        {{ $t("common.confirmation_message") }}
      </span>
    </Modal>
  </div>
</template>
<script>
import '@/styles/common/appbar.scss'
import event from '@/util/event'
import store from '@/core/store'

export default {
  name: 'drawer',
  props: {
    expanded: {
      default: true,
      type: Boolean
    }
  },
  components: {
    Modal: () => import('@/components/common/Modal.vue')
  },
  created () {
    event.$on('APP_DRAWER_TOGGLED', () => {
      this.drawer = !this.drawer
    })
    event.$on('Close', () => {
      this.drawer = false
    })
  },
  data () {
    return {
      navigationMenu: this.$navigation.menuStructure,
      customColor: '',
      drawer: false,
      mini: false,
      right: null,
      modalConfig: {
        enabled: false,
        persistent: true,
        title: this.$t('common.logoutText'),
        saveButton: 'Yes',
        cancelButton: 'No',
        width: 400
      }
    }
  },
  methods: {
    logout () {
      store.dispatch('userStore/setUserData', { myAccounts: {} })
      this.$router.push('/login')
    },
    logoutConfirm () {
      this.modalConfig.enabled = true
    },
    closeMenu () {
      this.drawer = false
    }
  },
  watch: {
    drawer () {
      event.$emit('drawerEvent', this.drawer)
      event.$emit('Hide_header_logo', this.drawer)
    }
  }
}
</script>
