/*eslint-disable*/
import store from '@/core/store'
// import router from '@/core/router';

let errorStatus = ''
let enableRedirect = false

const redirectToHome = () => {
  const { productCode, productType, productTerm } = router.app.$route.params
  const { refer } = router.app.$route.meta

  if (productType) {
    router.push(`/${refer}/${productType}/${productCode}/${productTerm}`)
  } else {
    router.push(`/${refer}`)
  }
}

const redirectOnError = () => {
  const statusCodes = ['401', '404', '400', '500']

  switch (true) {
    case (statusCodes.includes(errorStatus)):
      if (statusCodes.includes(errorStatus) && enableRedirect) {
        redirectToHome()
      }
      break

    case '500':
      // eslint-disable-next-line
      location.reload();
      break

    case '405':
      // eslint-disable-next-line
      break;

    default:
      console.log('This error status code is not handled')
      break
  }
}

const assembleMessage = (message, title) => {
  const messageArray = []
  messageArray.push(message)

  store.dispatch('appStore/setAppData', {
    message: {
      content: message,
      type: 'error',
      component: 'db-modal',
      title,
      cancelCallback: redirectOnError,
      close: true,
      persistent: true
    }
  })
}

const setExceptionError = (type = 'DEFAULT') => {
  assembleMessage(router.app.$t(`systemMessages.exceptions.${type}.message`), router.app.$t(`systemMessages.exceptions.${type}.title`))
}

const handleError = (e, type = undefined, redirect = false, hideError = []) => {
  const { status, data } = e.response || e

  store.dispatch('appStore/setAppData', {
    inProgress: false
  })

  if (status && data) {
    const { error } = data

    errorStatus = status.toString()
    enableRedirect = redirect
    if (type) {
      if (hideError.length && Array.isArray(hideError)) {
        if (hideError.includes(errorStatus)) {
          return
        }
      }
      setExceptionError(type)
      return
    }
    router.app.$log.debug('Service Error  -', data.message)
    const errorMsgBody = `systemMessages.${status}.${(error) ? `custom.${error.replace(/[^a-zA-Z ]/g, '')}` : 'message'}`
    assembleMessage(router.app.$t(`${errorMsgBody}`), router.app.$t(`systemMessages.${status}.title`))
  }
}

export default handleError
