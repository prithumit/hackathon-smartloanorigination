// import { object } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import Clipper from '@/components/DOB-Camera/Clipper'

export const methods = {
  clipImage: action('Emits click event and runs the callback!')
}

export const asDefault = () => ({
  components: { Clipper },
  props: {
    config: {
      type: Object,
      default: undefined
    }
  },
  template: '<Clipper></Clipper>',
  methods
})
