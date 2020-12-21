import {
  required,
  minLen,
  maxLen,
  pattern,
  dateValidation,
  emailAddress,
  requiredLen,
  phoneNumberLen
} from '@/core/_helpers/validationRules.js'
import * as colors from '@/config/app/utility/themeUtility'

const getFormConfig = form => {
  if (process.env.NODE_ENV === 'test') {
    return {
      schema: {},
      model: {}
    }
  }
  let ruleState
  if (typeof form === 'object') {
    ruleState = getFormRules(form)
  }
  return ruleState
}

function getRules (rule, RegEx, length, displayLength) {
  switch (rule) {
    case 'required':
      return required('Required')
    case 'minLen':
      return minLen(length, displayLength)
    case 'maxLen':
      return maxLen(length, displayLength)
    case 'requiredLen':
      return requiredLen(length, displayLength)
    case 'phoneNumberLen':
      return phoneNumberLen(length, displayLength)
    case 'dateValidation':
      return dateValidation(length, displayLength)
    case 'emailAddress':
      return emailAddress(RegEx)
    case 'pattern':
      return pattern(RegEx)
    default:
      break
  }
  return null
}
function getFormRules ({ schema, model }) {
  const validationRules = ['required', 'minLen', 'maxLen', 'dateValidation',
    'phoneNumberLen', 'emailAddress', 'requiredLen']
  const fSchema = schema

  Object.keys(fSchema).map(schemaKey => {
    const rules = []
    const ruleSet = fSchema[schemaKey].rules

    if (ruleSet) {
      // eslint-disable-next-line no-return-assign
      ruleSet.filter(rule =>
        rule === 'required' ? (fSchema[schemaKey].id = 'required') : false
      )
      ruleSet.filter(rule =>
        validationRules.includes(rule.replace(/[^a-zA-Z]+/g, ''))
          ? rules.push(
            getRules(
              rule.replace(/[^a-zA-Z]+/g, ''),
              rule.replace(/[a-zA-Z()]+/g, ''),
              rule.substring(
                rule.lastIndexOf('(') + 1,
                rule.lastIndexOf(',')
              ),
              rule.substring(rule.lastIndexOf(')'), rule.lastIndexOf(',') + 1)
            )
          )
          : false
      )
    }

    fSchema[schemaKey].rules = rules
    return true
  })

  const data = getFormColors({ model, schema: fSchema })
  return {
    schema: data.schema,
    model: data.model
  }
}

function getFormColors ({ model, schema }) {
  const fSchema = schema

  Object.keys(fSchema).map((schemaKey) => {
    const { color } = fSchema[schemaKey]
    fSchema[schemaKey].color = colors[color]
    return true
  })
  return {
    schema: fSchema,
    model
  }
}
export default getFormConfig
