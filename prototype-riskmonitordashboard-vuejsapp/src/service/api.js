/* eslint-disable no-param-reassign */
import axios from 'axios'
import Settings from '@/plugins/appSettings'
import store from '@/core/store'

const Api = () => {
  const axoisApi = axios.create({
    baseURL: Settings.serverSettings.baseUrl,
    withCredentials: false,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })

  axoisApi.interceptors.request.use((config) => {
    store.dispatch('appStore/setAppData', {
      inProgress: true
    })
    return config
  })

  axoisApi.interceptors.response.use((response) => {
    store.dispatch('appStore/setAppData', {
      inProgress: false
    })
    return response
  })

  return axoisApi
}

export {
  Api
}
