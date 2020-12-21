import { object } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import Modal from '@/components/common/Modal'

export const methods = {
  onSave: action('Emits save event and runs the callback!'),
  onCancel: action('Emits cancel event and runs the callback!')
}

export default {
  title: 'Modal'
}
export const asDefault = () => ({
  components: { Modal },
  props: {
    config: {
      default: object('data', {
        enabled: true,
        values: 'Example Text',
        saveButton: 'Save',
        cancelButton: 'Cancel',
        width: 500
      })
    }
  },
  template: '<Modal :config="config" @save="onSave" @cancel="onCancel"></Modal>',
  methods
})
