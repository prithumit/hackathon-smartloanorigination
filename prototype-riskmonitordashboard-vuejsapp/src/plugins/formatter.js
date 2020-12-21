import appSettings from '@/plugins/appSettings'
const moment = require('moment')
const formatter = {
  currency: {
    format (number) {
      return new Intl.NumberFormat(appSettings.defaultConfigurations.currencyFormat.localeCountry, { style: 'currency', currency: appSettings.defaultConfigurations.currencyFormat.currency }).format(number).replace(/^(\D+)/, '$1 ')
    }
  },
  formatDate (
    inputDate,
    inputFormat = 'YYYY-MM-DD',
    outputFormat = appSettings.defaultConfigurations.dateFormat.uiFormat
  ) {
    let formatedDate
    const date = new Date(inputDate)
    const validateDateFormat = moment(inputDate, outputFormat, true).isValid() // validating the 'inputDate' against 'outputFormat' format
    if (isNaN(inputDate) && date.toString() !== 'Invalid Date') {
      if (!validateDateFormat) {
        formatedDate = moment(inputDate, inputFormat).format(outputFormat)
      }
    }
    if (appSettings.defaultConfigurations.dateFormat.showTime) {
      return formatedDate + new Date().toLocaleTimeString()
    } else return formatedDate
  }
}
export default formatter
