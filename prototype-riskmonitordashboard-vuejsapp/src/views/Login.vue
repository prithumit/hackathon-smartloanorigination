<template>
  <v-row>
    <v-layout v-if="!currentActionType" row>
      <v-flex xs12 sm6 md6 lg6 xl6 class="login__alignCard">
        <v-row>
          <v-flex lg2 xl2 />
          <v-flex lg9 xl9 class="mr-4">
            <v-card flat class="pa-4">
              <v-flex xs12 sm12 md12 lg8 xl8>
                <img
                  alt="logo"
                  height="80px"
                  width="140px"
                  :src="logo"
                  id="images"
                  class="loginTitle"
                />
                <br />
                <div class="text-uppercase text-h5 font-weight-black pt-10">
                  {{ $t("common.welcomeText") }}
                </div>
                <div class="text--secondary text-h6 pt-1">
                  {{ $t("common.bankTitle") }}
                </div>
              </v-flex>
              <v-flex class="mt-10" xs10 sm10 md9 lg8 xl8>
                <v-card-text class="pa-0 pt-6">
                  <v-form>
                    <v-text-field
                      :label="$t('common.loginusernamePlaceholder')"
                      name="username"
                      data-qa="userID"
                      :rules="loginRules"
                      :error="errorLogin"
                      prepend-inner-icon="mdi-account-outline"
                      type="text"
                      :color="primaryColor"
                      filled
                      counter
                      :maxlength="
                        $appSettings.loginConfiguration.usernameMaxLength
                      "
                      :minlength="
                        $appSettings.loginConfiguration.usernameMinLength
                      "
                      class="custom-textfield"
                      v-model="email"
                      @blur="focus()"
                      @keyup.enter="email.length > 0 ? login() : false"
                    />

                    <v-text-field
                      id="userpassword"
                      :label="$t('common.loginpasswordPlaceholder')"
                      name="userpassword"
                      data-qa="password"
                      :rules="loginRules"
                      :error="errorLogin"
                      :error-messages="errorMessage"
                      prepend-inner-icon="mdi-lock-outline"
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append="() => (showPassword = !showPassword)"
                      :type="showPassword ? 'text' : 'password'"
                      filled
                      counter
                      :maxlength="
                        $appSettings.loginConfiguration.passwordMaxLength
                      "
                      :minlength="
                        $appSettings.loginConfiguration.passwordMinLength
                      "
                      :color="primaryColor"
                      class="custom-textfield"
                      v-model="userpassword"
                      @blur="focus()"
                      @keyup.enter="userpassword.length > 0 ? login() : false"
                    />
                  </v-form>
                </v-card-text>
                <v-btn
                  block
                  id="loginButton"
                  aria-label="loginButton"
                  class="home__login-btn mt-5 white--text text-capitalize"
                  :color="primaryColor"
                  rounded
                  depressed
                  large
                  v-bind:disabled="btndisabled"
                  @click="login"
                >
                  <v-icon left small class="px-2">mdi-arrow-right</v-icon>
                  {{ $t("common.loginButtonPlaceholder") }}
                </v-btn>
                <br />
                <v-row justify="center" class="mt-4">
                  {{ $t("common.forgot") }}
                  <a
                    :style="{ color: primaryColor }"
                    class="px-2 text-uppercase font-weight-bold"
                    target="_blank"
                    @click="screenActions('retrieveLoginId')"
                    >{{ $t("common.loginusernamePlaceholder") }}</a
                  >
                  {{ $t("common.or") }}
                  <a
                    :style="{ color: primaryColor }"
                    class="px-2 text-uppercase font-weight-bold"
                    target="_blank"
                    @click="screenActions('resetPassword')"
                    >{{ $t("common.loginpasswordPlaceholder") }}</a
                  >
                </v-row>
                <br />
                <!-- <v-row justify="center" class="mt-4">
                  <a :style="{ color: primaryColor }" class="px-2 text-uppercase font-weight-bold" @click="screenActions('registerForOnlineBanking')" target="_blank">{{
                        $t("common.activateUser")
                  }}</a>
                </v-row> -->
              </v-flex>
              <br />
              <v-layout class="mt-4" row>
                <v-flex xs7 sm7 md6 lg6 xl6 />
                <v-flex xs2 sm2 md2 lg1 xl1 class="ml-8">
                  <v-icon large>mdi-shield-account</v-icon>
                </v-flex>
              </v-layout>
              <v-row class="px-1">
                <v-flex xs7 sm7 md6 lg6 xl6>
                  <a
                    :style="{ color: primaryColor }"
                    class="px-2"
                    target="_blank"
                    @click="openFaq"
                    >{{ $t("common.support") }}
                  </a>
                  /
                  <a
                    :style="{ color: primaryColor }"
                    class="px-2"
                    target="_blank"
                    @click="openContactUs"
                    >{{ $t("common.finastraContactLink") }}</a
                  >
                </v-flex>
                <v-flex class="ml-1" xs4 sm4 md4 lg4 xl4>
                  <font :color="primaryColor" class="font-weight-bold"
                    >{{ $t("common.secure") }}
                  </font>
                  <font class="text-lowercase">{{
                    $t("common.loginButtonPlaceholder")
                  }}</font>
                </v-flex>
              </v-row>
              <br />
            </v-card>
          </v-flex>
        </v-row>
      </v-flex>
      <v-flex
        v-if="!showBgImage"
        :style="{ background: gradients }"
        id="gradient"
        class="box hidden-xs-only"
        xs12
        sm6
        md6
      />
      <v-flex
        v-if="showBgImage"
        :style="{ backgroundImage: 'url(' + image + ')' }"
        id="bgImg"
        class="box login__bgImages hidden-xs-only"
        xs12
        sm6
        md6
        lg6
        xl6
      />
    </v-layout>

    <ResetPassword
      v-if="resetPassword"
      @loginActionEvent="handleLoginActions"
      :config="$appSettings.loginConfiguration"
    />
    <RetrieveLoginId
      v-if="retrieveLoginId"
      @loginActionEvent="handleLoginActions"
    />
    <RegisterForOnlineBanking
      v-if="registerForOnlineBanking"
      @loginActionEvent="handleLoginActions"
    />
    <Modal :config="modalConfig" @cancel="modalConfig.enabled = false">
      <span slot="modalContent" class="font-weight-bold">
        <DobFAQ />
      </span>
    </Modal>
     <v-overlay
        v-if="loaderEnabled"
        :opacity="0.5"
      >
       <v-progress-circular
         :color="primaryColor"
         :size="70"
         :width="7"
         indeterminate
         class="circular-loader"
       ></v-progress-circular>
      </v-overlay>
  </v-row>
</template>

<script>
import '@/styles/pages/login/login.scss'
import customBgImage from '@/assets/login.jpg'

export default {
  name: 'login',
  components: {
    Modal: () => import('@/components/common/Modal.vue'),
    DobFAQ: () => import('@/views/common/DobFAQ.vue'),
    ResetPassword: () =>
      import('@/components/DOB-Login/ResetPassword/ResetPassword'),
    RetrieveLoginId: () =>
      import('@/components/DOB-Login/RetrieveLoginId/RetrieveLoginId'),
    RegisterForOnlineBanking: () =>
      import(
        '@/components/DOB-Login/RegisterForOnlineBanking/RegisterForOnlineBanking'
      )
  },
  data () {
    return {
      checked: true,
      hasFocus: true,
      email: '',
      userpassword: '',
      showPassword: false,
      btndisabled: true,
      resetPassword: false,
      retrieveLoginId: false,
      registerForOnlineBanking: false,
      loginRules: [
        v => Boolean(v)
      ],
      errorLogin: false,
      errorMessage: undefined,
      modalConfig: {
        cancelButton: 'Close',
        enabled: false,
        persistent: true,
        saveButton: '',
        title: this.$t('login.faq.faqTitle'),
        width: 700
      },
      loaderEnabled: false,
      showBgImage: false,
      enableBgImage: undefined,
      image: undefined,
      currentActionType: ''
    }
  },
  created () {
    this.getAppDefaultConfig()
  },
  methods: {
    getAppDefaultConfig () {
      this.enableBgImage = this.$appSettings.defaultConfigurations.enableCustomBackgroundImage
      if (this.enableBgImage) {
        this.showBgImage = true
        this.image = customBgImage
      } else {
        this.showBgImage = false
      }
    },
    focus () {
      this.hasFocus = this.email
      if (!this.hasFocus) {
        this.btndisabled = true
      } else {
        this.btndisabled = false
      }
    },
    openContactUs () {
      // this.$router.push({ name: 'ContactUs' })
      window.open(this.$appSettings.applicationSettings.contactUs)
    },
    clear () {
      this.email = ''
      this.userpassword = ''
      this.btndisabled = true
    },
    login () {
      if (this.email === 'LoanOfficer' && this.userpassword === 'LoanOfficer') {
        this.loaderEnabled = true
        localStorage.setItem('user', JSON.stringify(this.email))
        // for store
        this.$store.dispatch('userStore/setUserData', {
          // this.$store.dispatch("login", {
          username: this.email,
          userSession: true
        })
        setTimeout(() => {
          this.$router.push('/home')
          this.loaderEnabled = false
        }, 3000)
        //  this.$store.dispatch('login', {email: this.email, password:this.password})
      } else {
        this.errorLogin = true
        this.errorMessage = this.$t('login.invalidLoginMessage')
      }
    },
    screenActions (actionType) {
      switch (actionType) {
        case 'resetPassword':
          this.resetPassword = true
          break
        case 'retrieveLoginId':
          this.retrieveLoginId = true
          break
        case 'registerForOnlineBanking':
          this.registerForOnlineBanking = true
          break
      }
    },
    handleLoginActions () {
      this.resetPassword = false
      this.retrieveLoginId = false
      this.registerForOnlineBanking = false
    },
    openFaq () {
      this.modalConfig.enabled = true
    }
  }
}
</script>
