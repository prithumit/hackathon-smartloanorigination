<template>
  <v-flex class="mt-4" xs12 sm12 md12 lg12 xl12>
    <font :color="primaryColor" class="text-h6 font-weight-bold">Loan Officer Dashboard - Repayment Risk Analysis</font>
    <v-row class="pt-6">
      <v-layout wrap>
        <v-flex xs12 sm12 md12 lg12 xl12>
          <v-card style="background: linear-gradient(45deg, rgb(105, 78, 214), rgb(193, 55, 162))">
              <v-layout wrap>
                <v-flex xs12 sm12 md3 lg3 xl3>
                  <v-card-title class="text-center">
                    <v-list-item-title>
                      <v-avatar size="120">
                        <!-- <v-icon color="#F8BBD0" size="180">mdi-account</v-icon> -->
                        <img :src="profilePhoto"/>
                      </v-avatar>
                    </v-list-item-title>
                    <v-list-item-subtitle class="pt-3">
                      <p class="title font-weight-bold white--text">
                        <span>{{ loanDetails.data.customerName }}</span>
                      </p>
                    </v-list-item-subtitle>
                  </v-card-title>
                </v-flex>
                <v-flex xs12 sm12 md9 lg9 xl9 class="pt-4">
                    <v-layout class="pb-6 pt-6">
                      <v-flex xs12 sm12 md3 lg3 xl3>
                        <v-list-item-title class="white--text" style="opacity:0.8">{{$t("home.customerCard.customerId")}}</v-list-item-title>
                        <v-list-item-subtitle class="subtitle-1 font-weight-bold white--text">{{ loanDetails.data.customerId }}</v-list-item-subtitle>
                      </v-flex>
                      <v-flex xs12 sm12 md3 lg3 xl3>
                        <v-list-item-title class="white--text" style="opacity:0.8">{{$t('home.customerCard.loanAC')}}</v-list-item-title>
                        <v-list-item-subtitle class="subtitle-1 font-weight-bold white--text">{{ loanDetails.data.loanAC }}</v-list-item-subtitle>
                      </v-flex>
                      <v-flex xs12 sm12 md3 lg3 xl3>
                        <v-list-item-title class="white--text" style="opacity:0.8">{{$t('home.customerCard.loanType')}}</v-list-item-title>
                        <v-list-item-subtitle class="subtitle-1 font-weight-bold white--text">{{ loanDetails.data.loanType }}</v-list-item-subtitle>
                      </v-flex>
                      <v-flex xs12 sm12 md3 lg3 xl3>
                        <v-list-item-title class="white--text" style="opacity:0.8">{{$t('home.customerCard.tenure')}}</v-list-item-title>
                        <v-list-item-subtitle class="subtitle-1 font-weight-bold white--text">{{ loanDetails.data.tenure }}</v-list-item-subtitle>
                      </v-flex>
                    </v-layout>
                      <v-layout>
                      <v-flex xs12 sm12 md3 lg3 xl3>
                        <v-list-item-title class="white--text" style="opacity:0.8">{{$t('home.customerCard.maturityDate')}}</v-list-item-title>
                        <v-list-item-subtitle class="subtitle-1 font-weight-bold white--text">{{ loanDetails.data.maturityDate }}</v-list-item-subtitle>
                      </v-flex>
                      <v-flex xs12 sm12 md3 lg3 xl3>
                        <v-list-item-title class="white--text" style="opacity:0.8">{{$t('home.customerCard.loanAmount')}}</v-list-item-title>
                        <v-list-item-subtitle class="subtitle-1 font-weight-bold white--text">{{ loanDetails.data.loanAmount }}</v-list-item-subtitle>
                      </v-flex>
                      <v-flex xs12 sm12 md3 lg3 xl3>
                        <v-list-item-title class="white--text" style="opacity:0.8">{{$t('home.customerCard.interestRate')}}</v-list-item-title>
                        <v-list-item-subtitle class="subtitle-1 font-weight-bold white--text">{{ loanDetails.data.interestRate }}</v-list-item-subtitle>
                      </v-flex>
                      <v-flex xs12 sm12 md3 lg3 xl3>
                        <v-list-item-title class="white--text" style="opacity:0.8">{{$t('home.customerCard.repaymentEMIAmount')}}</v-list-item-title>
                        <v-list-item-subtitle class="subtitle-1 font-weight-bold white--text">{{ loanDetails.data.repaymentEMIAmount }}</v-list-item-subtitle>
                      </v-flex>
                    </v-layout>
                </v-flex>
              </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-row>
    <v-row class="pt-8">
      <v-layout wrap>
        <v-flex xs12 sm12 md12 lg12 xl12>
          <v-toolbar :color="primaryColor" style="height:50px;"><font class="text-h8 white--text pb-4">Income and Expense Trends </font></v-toolbar>
          <v-card tile> 
            <v-layout wrap>
              <v-flex xs12 sm8 md8 lg8 xl8>
                <graph-bar
                  class="pa-0 ma-0"
                  :width="600"
                  :height="280"
                  :axis-min="200"
                  :axis-max="2500"
                  :colors="[primaryColor, secondaryColor]"
                  :labels="graph.labels"
                  :values="graph.values"
                  :active-event="'click'"
                >
                  <tooltip :names="graph.names" :position="'left'"></tooltip>
                  <legends :names="graph.names" :filter="true"></legends>
                </graph-bar>
              </v-flex>

              <v-flex xs12 sm4 md14 lg4 xl4 class="pl-6 pt-4">
                 <v-row justify="center" class="pt-1">
                  <font class="subtitle-2 font-weight-bold">Repayment Risk (Projected)</font><br/>
                  </v-row>
                <v-row justify="center">
                  <v-progress-circular
                    :rotate="360"
                    :size="100"
                    :width="6"
                    :value="75"
                    :color="primaryColor"
                  >
                    <font class="text-h5 font-weight-bold"
                      >80%</font
                    >
                  </v-progress-circular>
                </v-row>               
                  <br/>
                <table style="width:95%">
                  <tr>
                    <td class="text-center">Income Trends</td>
                    <td class="text-center">Expense Trends</td>
                  </tr>
                  <tr>
                    <td class="subtitle-1 text-center">Salary <v-icon color="red">mdi-arrow-down</v-icon></td>
                    <td class="subtitle-1 text-center">
                      <font>Travel <v-icon color="red" class="pl-3">mdi-arrow-down</v-icon></font>
                      <br/>
                      <font class="pl-1">Medical <v-icon color="green">mdi-arrow-up</v-icon></font>
                    </td>
                  </tr>
                </table>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-row>

    <v-row>
      <v-layout wrap>
        <v-flex xs12 sm12 md12 lg12 xl12 class="pt-6">
          <v-toolbar :color="primaryColor" style="height:50px;"><font class="text-h8 white--text pb-4">Repayment Stress Check in Account Cashflows</font></v-toolbar>
          <v-card tile>
            <v-row class="pl-6 py-4">
              <table style="width:95%">
                <tr>
                  <th v-for="label in table.headers" :key="label" class="text-center">
                    <font class="subtitle-2 font-weight-bold">{{ label }}</font>
                  </th>
                </tr>
                <tr v-for="data in loanDetails.data.monthlyStatus" :key="data.month">
                  <td class="text-center">
                    <font class="text-capitalize subtitle-2">{{ data.month }} {{ data.year }}</font>
                  </td>
                  <td class="text-center">
                    <font class="subtitle-2">{{ data.avgIncome }}</font>
                  </td>
                  <td class="text-center">
                    <font class="subtitle-2">{{ data.avgExpense }}</font>
                  </td>
                  <td class="text-center">
                    <font class="subtitle-2"><b>{{ data.balance }}</b></font>
                  </td>
                  <td class="text-center">
                    <font class="subtitle-2">{{ data.repaymentEMI }}</font>
                  </td>
                  <td>
                    <v-layout class="pa-0" wrap>
                      <v-flex lg4 class="text-right pr-5">
                        <font class="subtitle-2" :color="(data.repaymentRiskFactor >= 70) ? errorColor : darkColor"><b>{{ Math.ceil(data.repaymentRiskFactor) }}%</b></font>
                      </v-flex>
                      <v-flex lg8 class="pr-3">
                        <v-progress-linear
                          v-model="data.repaymentRiskFactor"
                          :color="secondaryColor"
                          height="15"
                        >
                        </v-progress-linear>
                      </v-flex>
                    </v-layout>
                  </td>
                  <td class="text-center">
                    <font class="text-capitalize subtitle-2">{{ data.repaymentStatus.toUpperCase() }}</font>
                  </td>
                </tr>
              </table>
            </v-row>
          </v-card>
        </v-flex>
      </v-layout>
    </v-row>
      
    <!-- Cookie -->
    <cookie-law
      theme="blood-orange"
      class="pt-1 pb-1"
      :buttonText="$t('common.okay')"
    >
      <div slot="message">
        {{ $appSettings.applicationSettings.bankName }}
        {{ $t("common.cookiePolicy") }}
        <span class="dashboard__underlined-cursor-pointer">
          <router-link to="legal-notes">{{
            $t("common.privacyPolicy")
          }}</router-link>
        </span>
      </div>
    </cookie-law>
  </v-flex>
</template>

<script>
import '@/styles/pages/home/home.scss'
import CookieLaw from 'vue-cookie-law'
import loanDetails from '@/../mocks/loanData.json'

export default {
  name: 'Home',
  components: {
    CookieLaw
  },
  data () {
    return {
      loanDetails,
      profilePhoto: require('../../assets/profilePhoto.jpg'),
      graph: {
        names: ['Income', 'Expense'],
        labels: [],
        values: [[], []]
      },
      table: {
        headers: ['Month', 'Income', 'Expense', 'Account Balance', 'Repayment Amount', 'Repayment Stress', 'Repayment Status']
      }
    }
  },
  created () {
    this.loanDetails.data.monthlyStatus.forEach(data => {
      // X-axis (Graph Bar)
      this.graph.labels.push(data.month)
      // Y-axis (Graph Bar)
      this.graph.values[0].push((data.avgIncome))
      this.graph.values[1].push((data.avgExpense))
    })
  }
}
</script>

<style scoped>
  table, th, td {
    border: 1px solid #BDBDBD;
    border-collapse: collapse;
  }
  th, td {
    padding: 7px;
  }
</style>
