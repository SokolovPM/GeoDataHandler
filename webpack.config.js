const webpack = require('webpack');
const path = require('path');

const cwd = path.resolve(process.cwd())

module.exports = {
  entry: [
    path.join(__dirname, 'src/main.js')
  ],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, './public'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /(\.js|\.jsx)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: { presets: ['react', 'es2015', 'stage-0'] },
        }],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
                modules: true,
                importLoaders: 1,
                camelCase: true,
                localIdentName: '[path][name]--[local]--[hash:base64:5]'
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
        options: {
          removeTags: true,
          removingTags: [
            'title',
            'desc'
          ],
          removeSVGTagAttrs: false
        }
      },
      {
        test: /\.(?:jpg|png|gif)$/,
        loader: 'file-loader',
        options: {
          name: 'imges/[name]--[hash:base64:5].[ext]'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      src: path.resolve(cwd, 'src')
    },
    modules: [
      cwd,
      'node_modules'
    ]
  },
  devServer: {
    contentBase: './public',
    host: '0.0.0.0',
    port: 7777,
    inline: true
  }
}
