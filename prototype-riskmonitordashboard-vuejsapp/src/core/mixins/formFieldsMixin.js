/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
import {
  pattern
} from '@/core/_helpers/validationRules'

const formFieldsMixin = {
  data: () => ({
    rule: undefined,
    ruleLength: undefined
  }),
  methods: {
    toggleManual (keys, flag = true) {
      if (keys) {
        // eslint-disable-next-line
        Object.keys(keys).filter((schemaKey) => {
          this.config.form.schema[schemaKey].readonly = flag
        })
      }
    },
    validateRegEx ({ schema, key }) {
      if (schema) {
        if (key in schema) {
          const { regex } = schema[key]
          if (!('rules' in schema[key])) {
            Object.assign(schema[key], { rules: [] })
          }
          if (regex) {
            schema[key].rules[5] = pattern(regex)
          }
        }
      }
    }
  }
}

export default formFieldsMixin
