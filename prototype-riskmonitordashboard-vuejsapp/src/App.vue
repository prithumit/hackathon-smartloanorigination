<template>
  <div id="app">
    <v-app>
      <v-flex fluid class="fill-height pa-0">
        <!-- logged in header part -->
        <div v-if="$route.name != 'Login'" class="header-app-bar">
          <!-- <v-app-bar v-if="this.$store.getters.loggedIn"> -->
          <Header :headerConfig="headerConfig" />
          <v-overlay
            v-if="loaderEnabled"
            :opacity="0.5"
          >
            <v-progress-circular
              :size="70"
              :width="7"
              indeterminate
              class="circular-loader"
            ></v-progress-circular>
          </v-overlay>
          <Drawer />
          <!-- </v-app-bar> -->
          <!-- Sizes your content based upon application components -->
          <v-content style="padding-top:0px">
            <!-- Provides the application the proper gutter -->
            <v-flex class="container grid-list-sm fluid pt-3">
              <keep-alive v-if="this.$store.getters.loggedIn">
                <router-view />
              </keep-alive>
              <router-view v-else></router-view>
            </v-flex>
          </v-content>
        </div>
        <v-content v-else class="fill-height">
          <v-container fluid class="pa-0 fill-height align-start">
            <router-view />
          </v-container>
        </v-content>
      </v-flex>
    </v-app>
    <dco-toast :config="alertMessage" />
    <IdleTimeout v-if="$route.name !== 'Login'" />
  </div>
</template>

<script>
import Drawer from '@/components/common/Drawer'
import Header from '@/components/common/Header'
import Logo from '@/assets/logo.png'
import IdleTimeout from '@/components/IdleTimeout'
import toastMixin from '@/core/mixins/toastMixin'

export default {
  name: 'app',
  mixins: [toastMixin],
  components: {
    Drawer,
    Header,
    IdleTimeout,
    'dco-toast': () => import('@/components/DOB-ErrorHandler/ErrorHandler.vue')
  },
  data () {
    return {
      headerConfig: {
        logo: Logo,
        title: this.$t('common.bankTitle'),
        logoText: this.$t('admin.appLogoText'),
        showDrawerButton: true,
        showLogoutButton: true
      }
    }
  }
}
</script>
