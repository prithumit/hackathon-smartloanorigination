<template>
  <v-menu bottom :nudge-width="70" :close-on-content-click="false" offset-y>
    <template v-slot:activator="{ on }">
      <v-btn icon class="ma-2" v-on="on">
        <v-icon :color="primaryColor">mdi-bell-outline</v-icon>
      </v-btn>
    </template>
      <v-card max-width="300">
      <v-list two-line>
        <v-list-item-group multiple active-class="pink--text">
          <template v-for="(item, index) in notifications">
            <v-list-item :key="item.title">
              <template v-slot:default="{ }">
                <v-list-item-content>
                  <v-list-item-title v-text="item.title"></v-list-item-title>
                  <v-list-item-subtitle class="text--primary" v-text="item.headline"></v-list-item-subtitle>
                  <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-list-item-action-text v-text="item.action"></v-list-item-action-text>
                </v-list-item-action>
              </template>
            </v-list-item>
            <v-divider v-if="index + 1 < item.length" :key="index"></v-divider>
          </template>
        </v-list-item-group>
      </v-list>
    </v-card>
  </v-menu>
</template>
<script>
export default {
  name: 'NotificationList',
  data () {
    return {
      showUserNotification: false,
      notifications: [
        {
          action: '15 min',
          headline: 'Bank Admin',
          title: 'KYC verification is successful',
          subtitle: 'An email is sent with details'
        },
        {
          action: '2 hr',
          headline: 'Relationship Manager',
          title: 'New account activated for Savings',
          subtitle: 'An email is sent with details'
        },
        {
          action: '4 hr',
          headline: 'Bank Admin',
          title: 'Address details updated successfully',
          subtitle: 'An email is sent with details'
        },
        {
          action: '6 hr',
          headline: 'Bank Admin',
          title: 'Joint account application processed',
          subtitle: 'An email is sent with details'
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
