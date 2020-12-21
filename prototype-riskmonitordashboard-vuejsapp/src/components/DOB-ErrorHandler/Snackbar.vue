<template>
  <div class="snackbar">
    <v-snackbar
      v-model="config.enabled"
      :timeout="config.timeout"
      :color="config.color"
      :top="config.topPosition"
      :right="config.rightPosition"
      :bottom="config.bottomPosition"
      :left="config.leftPosition"
    >
     <v-row no-gutters>
        <v-col cols="11">
          <span class="snackbar__content subtitle-2 font-weight-regular">{{ config.content }}</span>
       </v-col>

        <v-col cols="1">
          <v-btn
            @click="config.enabled = false"
            icon
            color="white"
            class="snackbarClose"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
     </v-row>
    </v-snackbar>
  </div>
</template>

<script>
import '@/styles/components/snackbar.scss'

export default {
  name: 'DOB-Snackbar',
  props: {
    config: {
      type: Object,
      default () {
        return {
          enabled: true,
          content: '',
          color: 'green',
          timeout: 4000,
          topPosition: true,
          rightPosition: true
        }
      }
    }
  }
}
</script>
