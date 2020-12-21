<template v-slot:activator="{ on }">
  <v-container class="form-container">
      <v-toolbar
        :color="greyColor"
        dense
        class="white--text text-h6 font-weight-bold form-container__toolbar-header"
      >
        <font
          :color="primaryColor"
        >{{ config.label }}</font>
        <v-spacer />
        <v-icon
          @click="handleIconClicked(config.form.schema)"
          :color="primaryColor"
          medium
					dark
        >{{ config.icon }}</v-icon>
      </v-toolbar>
			<v-card>
        <v-card-text>
          <v-form
            ref="form"
            v-if="config.form"
            v-model="valid"
            :lazy-validation="false"
          >
            <v-form-base
              v-if="(config.form.model && config.form.schema)"
              :value="config.form.model"
              :schema="config.form.schema"
              @blur="isFormValid(valid);"
              @input="isFormValid(valid);
                      validateRegEx($event);
                      onFieldChange($event);"
              @update="onFieldChange"
              @click="onFieldClick($event)"
              class="pt-2"
            >
            </v-form-base>
          </v-form>
        </v-card-text>
			</v-card>
  </v-container>
</template>

<script>
/* eslint-disable no-param-reassign */
import '@/styles/components/form.scss'
import VFormBase from 'dco-vuetify-form'
import event from '@/util/event'
import formFieldsMixin from '@/core/mixins/formFieldsMixin'

export default {
  name: 'Form',
  components: {
    VFormBase
  },
  mixins: [
    formFieldsMixin
  ],
  props: {
    config: {
      type: Object,
      default: undefined
    }
  },
  data () {
    return {
      enableFileComponent: false,
      valid: true,
      component: undefined,
      key: undefined,
      orientation: 'bottom',
      enableComponent: false,
      componentInput: undefined,
      arg: undefined,
      isFileValid: true,
      persistData: undefined,
      isDataPreloaded: false
    }
  },
  created () {
    event.$emit('isValid', this.config.validation ? this.valid : true)
    event.$on('disableForm', arg => {
      this.toggleManual(this.config.form.schema, true)
    })
  },
  methods: {
    onBlur (event) {
      this.isFormValid(event)
    },
    isFormValid (e) {
      event.$emit('isValid', this.valid)
    },
    onFieldClick ({ data, obj }) {
      if (obj) {
        const { schema } = obj
        let value = ''
        const validateField = obj.schema['data-relation']

        if (!this.config.form.model[validateField]) {
          this.config.form.model[validateField] = undefined
        }

        if (schema['data-type']) {
          this.component = schema['data-type']
        }
        if (schema['data-relation']) {
          value = this.config.form.model[schema['data-relation']]
        }
        if (this.component && value) {
          if (schema['trigger-info'] === 0 || value.length >= schema['trigger-info']) {
            this.enableComponent = true
          }
        }
        this.componentInput = data[schema['data-relation']]
        this.emitUpdated(data)
      }
    },
    emitUpdated (data) {
      this.$emit('update', {
        data,
        schema: this.config.form.schema
      })
    },
    handleIconClicked (schema) {
      event.$emit('disableSaveIni', true)
      this.toggleManual(schema, false)
    },
    getEnabledKey (schema, searchKey) {
      return Object.keys(schema).filter(key => (schema[key][searchKey])).toString()
    },
    onFieldChange ({ data, obj }) {
      if (obj) {
        const { key, schema, value } = obj
        const inputValue = data[key]
        const { componentKeyEnable } = schema

        if (componentKeyEnable) {
          this.key = componentKeyEnable
        }
        if (schema['data-type']) {
          this.component = schema['data-type']
        }
        if (this.component && inputValue) {
          if (schema['trigger-length'] === 0 || inputValue.length >= schema['trigger-length']) {
            this.enableComponent = true
          }
        }
        if (schema.type === 'calendar') {
          this.$formatter.formatDate(value, key)
        }
        this.componentInput = data[schema['data-relation']]
        this.emitUpdated(data)
      }
    }
  },
  watch: {
    valid () {
      event.$emit('isValid', this.valid)
    }
  }
}
</script>
