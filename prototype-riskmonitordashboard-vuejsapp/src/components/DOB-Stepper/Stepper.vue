<template>
  <div>
    <Snackbar v-if="showSnackbar" :config="snackbarConfig"/>
    <v-stepper v-model="currentStep">
      <v-stepper-header class="hidden-md-and-down">
        <template v-for="(step, index) in options.steps">
          <v-stepper-step
            :key="`step${index}`"
            :complete="checkComplete(index)"
            :step="index+1"
            :color="primaryColor"
          >
            {{ step.name }}
          </v-stepper-step>
          <v-divider
            v-if="index !== options.steps.length-1"
            :key="`divider${index}`"
          ></v-divider>
        </template>
      </v-stepper-header>
      <template class="hidden-lg-and-up">
        <RadialStepper
          :config="{ steps: options.steps, state: currentStep }"
          class="hidden-lg-and-up radial-stepper--background"
        />
      </template>
      <v-stepper-items>
        <v-stepper-content
          v-for="(step, index) in options.steps"
          :key="`content${index}`"
          :step="index+1"
        >
          <v-card class="mx-auto">
            <component :is="step.component" :config="step.propName"/>
            <v-card-actions class="justify-end">
              <v-btn
                @click="onConfirm(index, step)"
                :disabled="isConfirmDisabled"
                :color="primaryColor"
                outlined
                class="continue subtitle-1 text-capitalize font-weight-regular"
              > {{ buttonLabel }} </v-btn>
            </v-card-actions>
          </v-card>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
import RadialProgressBar from 'vue-radial-progress'
import '@/styles/components/stepper.scss'
import event from '@/util/event'
import Snackbar from '@/components/DOB-ErrorHandler/Snackbar.vue'
import components from '@/components/DOB-Stepper/stepperHelper.js'
export default {
  name: 'Stepper',
  props: {
    options: Object
  },
  components: {
    ...components,
    Snackbar,
    RadialProgressBar,
    RadialStepper: () => import('@/components/RadialStepper.vue')
  },
  data () {
    return {
      currentStep: 1,
      disableNext: true,
      showSnackbar: false,
      isConfirmDisabled: false,
      buttonLabel: this.$t('common.confirmLabel'),
      snackbarConfig: {
        content: 'Account opened successfully',
        enabled: true,
        color: 'green',
        timeout: 4000,
        topPosition: true,
        rightPosition: true
      }
    }
  },
  methods: {
    checkComplete (idx) {
      return this.currentStep > idx + 1
    },
    onModelChange (props) {
      for (const key in props) {
        this[key] = props[key]
      }
    },
    onConfirm (idx, step) {
      if (this.buttonLabel === this.$t('common.accountInquiryLabel')) {
        // TODO: This is temporary
        const type = this.$route.params.type === 'SVGS' ? 'Savings' : (this.$route.params.type === 'CACC' ? 'Current' : 'Deposits')
        this.showSnackbar = true
        this.$router.push({ name: type })
      } else {
        event.$emit('onConfirmation', { name: step.component, value: this[step.propName], currentStep: this.currentStep })
      }
    }
  },
  created () {
    const self = this
    event.$on('changeStepData', (config) => {
      self.onModelChange(config)
    })
    event.$on('setStepperComponentData', (data) => {
      this[data.name] = data.value
      if (data.callback) {
        data.callback()
      }
    })
  }
}
</script>
