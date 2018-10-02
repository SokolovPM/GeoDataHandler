const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express();

const publicPath = express.static(path.join(__dirname, '/public'));

app.use(express.static('images'));
app.use('/public', publicPath);
app.use(bodyParser.json({ limit: 1024102420, type: 'application/json' }));
app.use(
  bodyParser.urlencoded({
    limit: 1024102420,
    type: 'application/json',
    extended: true
  })
);
app.use(bodyParser.json());
app.use(cookieParser())

const routing = require('./routing')(app);

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const config = require('./webpack.config.js')
  const compiler = webpack(config)

  app.use(webpackHotMiddleware(compiler));
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPathdist
  }))
}

const port = (process.env.PORT || 5000)
app.listen(port);
console.log(`Listening at http://localhost:${port}`);
