import { Api } from '@/service/api'
import handleError from '@/core/_helpers/errorHandler'

export default {
  // calling mock data
  getAppConfigurations () {
    return Api()
      .get('/appConfig')
      .then(({ data }) => data)
      .catch(e => handleError(e))
  },
  getDefaultConfigurations () {
    return Api()
      .get('/defaultConfig')
      .then(({ data }) => data)
      .catch(e => handleError(e))
  },
  getFAQ () {
    return Api()
      .get('/faq')
      .then(({ data }) => data)
      .catch(e => handleError(e))
  },
  getPasswordPolicies () {
    return Api()
      .get('/passwordPolicies')
      .then(({ data }) => data)
      .catch(e => handleError(e))
  },
  getSearchResults () {
    return Api()
      .get('/searchResults')
      .then(({ data }) => data)
      .catch(e => handleError(e))
  },
  getFormData (formName) {
    return Api()
      .post(`api/db/forms/${formName}`)
      .then(({ data }) => {
        return data
      })
      .catch(e => handleError(e))
  },
  // calling actual API starts with (api/public/)
  getActiveCurrencyFromService () {
    return Api()
      .get('api/public/listActiveCurrencies/')
      .then(({ data }) => data)
      .catch(e => handleError(e))
  }
}
