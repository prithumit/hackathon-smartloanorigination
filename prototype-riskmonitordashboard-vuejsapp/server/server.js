const https = require('https');
const http = require('http');
const express = require('express')
const bodyParser = require('body-parser')
const qs = require('querystring')
const fs = require('fs');
const cors = require('cors')
const path = require('path');
const morgan = require('morgan');
const customEnv = require('custom-env');
const winston = require('./winston');
const config = require('./config')
const mockRoutes = require('./mockRoutes.js')
const dataSet = require(`${__dirname}/dataSet.js`)
const history = require('connect-history-api-fallback');
const app = express()
const protectedRoutes = express.Router()
const mockEnv = process.env.NODE_MOCK;

app.use(bodyParser.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('combined', { stream: winston.stream }));
const environment = process.env.NODE_ENV;
app.use('/api', protectedRoutes)

if (environment.trim() === 'prod') {
  customEnv.env('prod');
} else {
  customEnv.env('dev');
}

const key = fs.readFileSync(process.env.PRIVATEKEY_SSL);
const cert = fs.readFileSync(process.env.CERT_SSL);
const certPayload = {
  key,
  cert,
};

if (mockEnv) {
  mockRoutes(app, protectedRoutes, qs, config);
}

app.post('*', (req, res) => {
  res.status(404).end();
});

app.get('/locale/:lang?', (req, res) => {
  const { lang } = req.params;

  res.json({
    [lang]: dataSet().locale[lang],
  });
  res.end();
});

protectedRoutes.post('/db/:id?/:childNode?', (req, res) => {
  try {
    const { id, childNode } = req.params
    const db = dataSet()[id]
    const resultKey = Object.keys(db).filter(dbKey => childNode === dbKey)
    const data = db[resultKey] || db

    res.json(data)
  } catch (e) {
    console.log(e)
  }
})

/** ***** SERVE STATIC APP ****** */
const options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  fallthrough: true,
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('Accept', 'text/html')
    res.set('x-timestamp', Date.now())
  }
};

const staticFileMiddleware = express.static(path.join(__dirname, '../'), options);
app.use('/', express.static(path.join(__dirname, '../'), options));
app.use(history({
  disableDotRule: true
}));

app.use(staticFileMiddleware);

if (process.env.ENABLE_SSL === 'true') {
  server = https.createServer(certPayload, app);
} else {
  server = http.createServer(app);
}

server.listen(process.env.PORT, () => console.log('Server Started at port', process.env.PORT));
