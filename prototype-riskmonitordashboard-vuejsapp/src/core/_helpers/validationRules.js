const moment = require('moment')
const router = require('@/core/router')

function validateError (min, max, diff) {
  if (diff <= min && diff >= 0) {
    return `${router.default.app.$t('errors.date.min')} ${min} ${router.default.app.$t('errors.common.years')}`
  } if (diff >= max) {
    return `${router.default.app.$t('errors.date.max')} ${max} ${router.default.app.$t('errors.common.years')}`
  } if (diff < 0) {
    return `${router.default.app.$t('errors.date.year')}`
  }
  return `${router.default.app.$t('errors.date.invalid')}`
}

function validateDate (v, min, max) {
  const enteredDate = moment(v, 'DD-MM-YYYY')
  const currentDate = moment(new Date())
  const diff = currentDate.diff(enteredDate, 'years')

  /* eslint-disable-next-line */
  if (!isNaN(enteredDate) && enteredDate.length < 2) {
    return false
  } if (diff >= min && diff <= max) {
    return true
  }
  return validateError(min, max, diff)
}

function validatePhoneNumberLen (v, min, max) {
  /* eslint-disable-next-line */
  if (v && v.length < min) {
    return router.default.app.$t('errors.phone_characters')
  }
}

module.exports = {
  required: v => !!v || router.default.app.$t('errors.common.required'),
  requiredLen: (l, m = l) => v => (v && v.length >= l) || router.default.app.$t('errors.common.required'),
  minLen: (l, m = l) => v => (v && v.length >= l) || `${router.default.app.$t('errors.common.minimum')} ${m} ${router.default.app.$t('errors.common.characters')}`,
  maxLen: (l, m = l) => v => (v && v.length <= l) || `${router.default.app.$t('errors.common.maximum')} ${m} ${router.default.app.$t('errors.common.characters')}`,
  // eslint-disable-next-line no-useless-escape
  emailAddress: l => v => new RegExp(l).test(v) || `${router.default.app.$t('errors.phone_characters')}`,
  phoneNumberLen: (l, m = l) => v => validatePhoneNumberLen(v, l, m),
  /* eslint-disable-next-line */
  dateValidation: (min, max) => v => validateDate(v, min, max),
  pattern: l => v => new RegExp(l).test(v) || `${router.default.app.$t('errors.common.invalid')} ${router.default.app.$t('errors.common.format')}`
}
