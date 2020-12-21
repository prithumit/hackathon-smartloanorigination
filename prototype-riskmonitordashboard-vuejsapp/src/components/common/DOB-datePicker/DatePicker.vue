<template>
<v-row>
  <v-col cols="12" sm="6" md="4">
    <v-menu
      v-model="dateMenu"
      :close-on-content-click="false"
      :nudge-right="50"
      transition="scale-transition"
      offset-y
      min-width="250px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
            v-model="date"
            label="Picker without buttons"
            append-icon="event"
            readonly
            v-bind="attrs"
            v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker v-model="date" @input="dateMenu = false"></v-date-picker>
    </v-menu>
  </v-col>
</v-row>
</template>

<script>

export default {
  name: 'DatePicker',
  props: {
    config: {
      type: Object,
      default: undefined
    }
  },
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    dateMenu: false
  })
}
</script>
