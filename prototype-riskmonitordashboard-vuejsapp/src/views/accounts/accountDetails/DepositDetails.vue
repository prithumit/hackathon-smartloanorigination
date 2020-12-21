<template>
  <v-card class="pa-2 pt-4">
    <p class="pl-1">
      <font :color="primaryColor" class="text-h5 font-weight-bold pl-3 pt-2">
        {{ $t("accountDetails.accountDetails") }}
      </font>
    </p>
    <div>
      <v-layout wrap class="ml-2">
        <v-flex xs12 lg1 class="text-right hidden-md-and-down">
          <v-avatar class="mr-2" :color="secondaryColor" size="44">
            <v-icon class="white--text" large>mdi-account</v-icon>
          </v-avatar>
        </v-flex>
        <v-flex xs12 lg11 class="pl-2">
          <v-row no-gutters>
            <v-layout>
              <v-flex xs6 sm4 md4 lg2 xl2 class="px-1 mt-2">
                <font class="subtitle-1 font-weight-bold"
                  >{{ $t("accountDetails.accountNumber") }}:</font
                >
              </v-flex>
              <v-flex
                xs6
                sm5
                md5
                lg7
                xl7
                class="subheading font-weight-medium mt-2 px-1"
              >
                <h3>{{ accountNumber }}</h3>
              </v-flex>
            </v-layout>
          </v-row>
        </v-flex>
      </v-layout>
      <v-flex class="pt-2">
        <v-divider></v-divider>
      </v-flex>
      <v-layout row wrap class="pa-6">
      <v-flex
        xs12
        sm12
        md6
        lg6
        xl6
        v-for="(item, index) in depositDetails"
        :key="index"
        class="pl-1"
      >
        <v-row>
          <v-flex xs6 sm6 md6 lg5 xl5 class="subheading font-weight-bold">
           {{ $t(`termdepositDetails.${item.label}`) }}
          </v-flex>
          <v-flex xs5 sm5 md5 lg6 xl6 class="subheading font-weight-medium">
            {{ item.value }}
          </v-flex>
        </v-row>
      </v-flex>
    </v-layout>
    </div>
  </v-card>
</template>

<script>
import appSettings from '@/plugins/appSettings'
import maturityInstructions from '@/../mocks/maturityInstructions.json'
import DepositDetails from '@/../mocks/depositDetails.json'

export default {
  name: 'DepositDetails',
  props: {
    config: {
      type: Object,
      default: undefined
    }
  },
  data () {
    return {
      DepositDetails,
      depositDetails: [],
      appSettings,
      productDetails: null,
      accountNumber: null
    }
  },
  created () {
    this.productDetails = this.$route.params.product
    this.accountNumber = this.productDetails
      ? this.productDetails.accountId
      : this.$route.params.accountId
    this.accountId = this.config.params.accountId
    this.accountName = this.config.params.accountName
    this.defaultAccountType = this.config.params.defaultAccountType
    this.getFixedDepositDetails('1000A00001010')
  },
  methods: {
    async getFixedDepositDetails (accountNumber) {
      const response = DepositDetails
      for (const i in maturityInstructions) {
        if (maturityInstructions[i].key === response.capitalizationMethod) {
          response.capitalizationMethod = maturityInstructions[i].value
        }
      }
      this.depositDetails.push(
        {
          label: 'sortCode',
          value: appSettings.defaultConfigurations.sortCode
        },
        {
          label: 'principalAmount',
          value: this.$formatter.currency.format(response.originalPrincipal.value)
        },
        {
          label: 'maturityAmount',
          value: this.$formatter.currency.format(response.maturityAmount.value)
        },
        {
          label: 'interestRate',
          value: response.interestRate + '%'
        },
        {
          label: 'maturityDate',
          value: this.$formatter.formatDate(response.maturityDate)
        },
        {
          label: 'interestPayout',
          value: response.interestPayout
        },
        {
          label: 'interestMaturityAmount',
          value: this.$formatter.currency.format(response.interestAmount.value)
        },
        {
          label: 'startDate',
          value: this.$formatter.formatDate(response.startDate)
        },
        {
          label: 'status',
          value: response.status
        },
        {
          label: 'lastBreakageDate',
          value: this.$formatter.formatDate(response.lastBreakageDate)
        },
        {
          label: 'maturityInstructions',
          value: response.capitalizationMethod
        },
        {
          label: 'capitalPayAwayAccount',
          value: response.payCapitalToAccount
        },
        {
          label: 'interestPayAwayAccount',
          value: response.payInterestToAccount
        },
        {
          label: 'fundingAccount',
          value: response.fundingAccountId
        }
      )
    }
  }
}
</script>
