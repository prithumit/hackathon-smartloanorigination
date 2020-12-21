const mockData = require('./mock.js')
const axios = require('axios')

module.exports = (app, protectedRoutes, qs, config) => {
    function request (targetUrl, req, res) {
      try {
        console.log(baseUrl)
        const { method, body } = req
        axios({
          method,
          url: targetUrl,
          data: body,
          headers: req.header
        })
          .then((data) => {
            res.json(data.data)
          })
          .catch((data) => {
            res.json(data.data)
          })
      } catch (e) {
        console.log(e)
      }
    }
  
    protectedRoutes.all('/public/:service/:params?', (req, res) => {
      try {
        const exceptionMethods = ['GET']
        const { service, params } = req.params
        const pathParam = params || ''
        const queryParam = qs.stringify(req.query) || ''
        let { target } = services[service] || { target: '' }
        if (services[service]) {
          if (exceptionMethods.includes(req.method)) {
            target = `${baseUrl}${services[service].target + '/'}${pathParam}${queryParam ? '?' + queryParam : ''}`
          } else {
            target = `${baseUrl}${services[service].target}`
          }
          request(target, req, res)
        }
      } catch (e) {
        console.log(e)
      }
    })
  
    protectedRoutes.get('/public/:service/:accountNumber/:info/', (req, res) => {
      try {
        const { service, accountNumber, info } = req.params
        const accountNumberParams = accountNumber || ''
        const infoParams = info || ''
        let { target } = services[service] || { target: '' }
  
        if (services[service]) {
          target = `${baseUrl}${services[service].target + '/'}${accountNumberParams + '/'}${infoParams}`
          request(target, req, res)
        }
      } catch (e) {
        console.log(e)
      }
    })
    protectedRoutes.put('/public/:service/:accountNumber/terminate', (req, res) => {
      try {
        const { service, accountNumber } = req.params
        const accountNumberParams = accountNumber || ''
  
        let { target } = services[service] || { target: '' }
  
        if (services[service]) {
          target = `${baseUrl}${services[service].target + '/'}${accountNumberParams + '/'}terminate`
          request(target, req, res)
        }
      } catch (e) {
        console.log(e)
      }
    })
    protectedRoutes.post('/public/:service/:accountNumber/terminate/forecast', (req, res) => {
      try {
        const { service, accountNumber } = req.params
        const accountNumberParams = accountNumber || ''
  
        let { target } = services[service] || { target: '' }
        if (services[service]) {
          target = `${baseUrl}${services[service].target + '/'}${accountNumberParams + '/terminate/forecast'}`
          request(target, req, res)
        }
      } catch (e) {
        console.log(e)
      }
    })

    app.get('/defaultConfig', (req, res) => {
    res.send(mockData.defaultConfig)
    })
    app.get('/appConfig', (req, res) => {
    res.send(mockData.appConfig)
    })
    app.get('/passwordPolicies', (req, res) => {
    res.send(mockData.passwordPolicies)
    })
    app.get('/faq', (req, res) => {
    res.send(mockData.faq)
    })
    app.get('/searchResults', (req, res) => {
    res.send(mockData.searchResults)
    })
  }  
