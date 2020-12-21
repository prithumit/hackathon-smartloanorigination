<template>
  <v-data-table
    :headers='config.tab.headers'
    :items='config.tab.list'
    :search='filterStatus'
    item-key='accountNumber'
    :items-per-page='5'
    class='elevation-1'
    :hide-default-footer="true"
  >
    <template v-slot:top>
      <v-menu
        :close-on-content-click="enableFilter"
        offset-y
        transition='scale-transition'
      >
        <template v-slot:activator='{ on, attrs }'>
          <v-row no-gutters class='text-right pr-6 py-3'>
            <v-col cols='12'>
              <span class='subtitle-2 font-weight-medium pr-2'>View by</span>
              <v-icon
                v-on='on'
                v-bind='attrs'
                @click='getUniqueStatusList(config.tab.headers, config.tab.list)'
                :color='primaryColor'
                dark
              >mdi-filter-outline</v-icon>
              <v-divider
                class="mx-4"
                vertical
              ></v-divider>
              <v-icon
                @click="getFilterContent('clear')"
                :color="secondaryColor"
              >mdi-refresh</v-icon>
              <font :color="secondaryColor" class="caption">Reset</font>
            </v-col>
          </v-row>
          <v-divider/>
        </template>
        <v-list v-if='filterableContent' dense>
          <font class='subtitle-2 font-weight-black pl-3'>Status</font>
          <v-list-item-group :color='primaryColor'>
            <v-list-item
              v-for='(item, index) in filterableContent'
              :key='index'
            >
              <template v-slot:default="{ active }">
                <v-list-item-action>
                  <v-checkbox
                    :input-value='active'
                    :color='primaryColor'
                    @click='setFilter(item.status)'
                  ></v-checkbox>
                </v-list-item-action>

                <v-list-item-content>
                  <font class='subtitle-2 font-weight-regular'>{{ item.status }}</font>
                </v-list-item-content>
             </template>
            </v-list-item>
          </v-list-item-group>
          <v-list-item-action class="d-flex justify-end pr-3">
            <v-row no-gutters class='text-end'>
              <v-flex v-for="button in filterButton" :key="button">
                <v-btn
                  :color="primaryColor"
                  small
                  rounded
                  outlined
                  class='text-capitalize'
                  @click="getFilterContent(button)"
                >{{ button }}</v-btn>
              </v-flex>
            </v-row>
          </v-list-item-action>
        </v-list>
      </v-menu>
    </template>

    <template v-slot:item.status='{ item }'>
      <v-chip :color='getColor(item.status)' dark>{{ item.status }}</v-chip>
    </template>

    <!-- display buttons and bind them to their respective functions -->
    <template v-slot:item.action="{ item }">
      <v-btn rounded small outlined color="primary" dark @click="accountDetails(item)">View details</v-btn>
    </template>

  </v-data-table>
</template>

<script>
export default {
  name: 'AccountList',
  props: {
    config: {
      type: Object,
      default: undefined
    }
  },
  data () {
    return {
      editable: true,
      filterStatus: '',
      filterableContent: [],
      activeFilter: '',
      enableFilter: false,
      filterButton: ['Apply']
    }
  },
  methods: {
    setFilter (item) {
      this.activeFilter = item
    },
    getFilterContent (clickedBy) {
      if (clickedBy === 'Apply') {
        this.filterStatus = !(this.activeFilter === 'All') ? this.activeFilter : ''
      } else {
        this.filterStatus = ''
      }
      this.enableFilter = true
    },
    getUniqueStatusList (headers, arr) {
      this.filterableContent = [
        ...new Map(arr.map(item => [item.status, item])).values()
      ]
      // this.filterableContent.push({ status: 'All' })
      this.enableFilter = false
    },
    getColor (status) {
      const color = status === 'Closed' ? 'grey' : 'green'
      return color
    },
    changeAccount () {
      this.editable = false
    },
    saveAccountChange () {
      this.editable = true
    },
    accountDetails (item) {
      this.$router.push({
        name: 'AccountDetails',
        params: { accountId: item.accountNumber, accountName: item.accountName, accountType: this.config.accountType }
      })
    }
  }
}
</script>
