// import { object } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import Camera from '@/components/DOB-Camera/Camera'

export const methods = {
  cameraIcon: action('Emits click event and runs the callback!')
}

export const asDefault = () => ({
  components: { Camera },
  props: {
    isCameraStopped: {
      type: Boolean
    }
  },
  template: '<Camera></Camera>',
  methods
})
