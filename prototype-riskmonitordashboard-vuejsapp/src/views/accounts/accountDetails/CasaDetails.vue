<template>
    <v-layout row wrap>
      <v-flex xs12 sm12 md5 lg5 xl5 class="pr-1">
        <v-card tile class="py-2 pt-4">
          <p class="pl-1">
            <font
              :color="primaryColor"
              class="text-h5 font-weight-bold pl-3 pt-2"
            >{{ $t('accountDetails.accountDetails') }}</font>
          </p>
          <div v-for="(item, index) in accountlistDetails.accountDetails" :key="index">
            <v-layout wrap class="ml-2">
              <v-flex xs12 lg2 class="text-center hidden-md-and-down">
                <v-avatar class="mr-2" :color="secondaryColor" size="44">
                  <v-icon class="white--text" large>mdi-account</v-icon>
                </v-avatar>
              </v-flex>
              <v-flex xs12 lg10 class="pl-2">
                <v-row no-gutters>
                  <v-layout>
                    <v-flex xs6 sm4 md6 lg6 xl4 class="px-1 mt-2">
                      <font
                        class="subheading font-weight-bold"
                      >{{ $t('accountDetails.accountNumber') }}:</font>
                    </v-flex>
                    <v-flex xs6 sm5 md5 lg6 xl4 class="px-1 mt-2">
                      <font class="subheading font-weight-bold">{{accountId}}</font>
                    </v-flex>
                  </v-layout>
                </v-row>
              </v-flex>
            </v-layout>
            <v-flex class="hidden-sm-and-up">
              <v-divider></v-divider>
            </v-flex>
            <v-layout wrap class="pl-5 py-4">
              <v-flex xs12 lg12>
                <v-row no-gutters>
                  <v-flex
                    xs6
                    sm4
                    md6
                    lg6
                    xl6
                    class="subheading font-weight-bold"
                  >{{ $t('accountDetails.accountBalance') }}:</v-flex>
                  <v-flex
                    xs6
                    sm5
                    md6
                    lg6
                    xl6
                    class="subheading font-weight-medium"
                  >{{ $formatter.currency.format(item.accountBalance) }}</v-flex>
                </v-row>
                <v-row no-gutters>
                  <v-flex
                    xs6
                    sm4
                    md6
                    lg6
                    xl6
                    class="subheading font-weight-bold"
                  >{{ $t('accountDetails.accountStatus') }}:</v-flex>
                  <v-flex
                    xs6
                    sm5
                    md6
                    lg6
                    xl6
                    class="subheading font-weight-medium"
                  >{{item.accountStatus}}</v-flex>
                </v-row>
                <v-row no-gutters>
                  <v-flex
                    xs6
                    sm4
                    md6
                    lg6
                    xl6
                    class="subheading font-weight-bold"
                  >{{ $t('accountDetails.accountType') }}:</v-flex>
                  <v-flex
                    xs6
                    sm5
                    md6
                    lg6
                    xl6
                    class="subheading font-weight-medium"
                  >{{item.accountType}}</v-flex>
                </v-row>
                <v-row no-gutters>
                  <v-flex
                    xs6
                    sm4
                    md6
                    lg6
                    xl6
                    class="subheading font-weight-bold"
                  >{{ $t('accountDetails.minimumBalance') }}:</v-flex>
                  <v-flex
                    xs6
                    sm5
                    md6
                    lg6
                    xl6
                    class="subheading font-weight-medium"
                  >{{ $formatter.currency.format(item.minimumBalance) }}</v-flex>
                </v-row>
                <v-row no-gutters>
                  <v-flex
                    xs6
                    sm4
                    md6
                    lg6
                    xl6
                    class="subheading font-weight-bold"
                  >{{ $t('accountDetails.jointAccount') }}:</v-flex>
                  <v-flex
                    xs6
                    sm4
                    md6
                    lg6
                    xl6
                    class="subheading font-weight-medium"
                  >{{item.accountOwnership === 'SOLO' ? 'NO' : 'YES'}}</v-flex>
                </v-row>
                <v-row no-gutters>
                  <v-flex
                    xs6
                    sm4
                    md6
                    lg6
                    xl6
                    class="subheading font-weight-bold"
                  >{{ $t('accountDetails.dateOpened') }}:</v-flex>
                  <v-flex
                    xs6
                    sm4
                    md6
                    lg4
                    xl4
                    class="subheading font-weight-medium"
                  >{{item.dateOfOpen}}</v-flex>
                </v-row>
              </v-flex>
            </v-layout>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
</template>

<script>
import accountlistDetails from '@/../mocks/accountDetails.json'

export default {
  name: 'CasaDetails',
  props: {
    config: {
      type: Object,
      default: undefined
    }
  },
  data () {
    return {
      data: {},
      accountlistDetails
    }
  },
  created () {
    this.accountId = this.config.params.accountId
    this.accountName = this.config.params.accountName
    this.defaultAccountType = this.config.params.defaultAccountType
  }
}
</script>
