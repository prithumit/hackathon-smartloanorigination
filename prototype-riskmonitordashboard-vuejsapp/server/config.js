module.exports = {
  secret: 'finastra',
  services: {
    listActiveCurrencies: {
      target: 'cbs/currencies'
    }
  },
  apiSettings: {
    url: '',
    auth: {
      username: '',
      password: ''
    },
    public: {
      headers: {
        grant_type: '',
        scope: ''
      }
    },
    private: {
      headers: {
        grant_type: '',
        scope: ''
      }
    },
    revoke: {
      header: {}
    }
  }
}
