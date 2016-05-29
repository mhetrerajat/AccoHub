const path = require('path')

module.exports = {
  entry : [
    'webpack-hot-middleware/client',
    './app.js'
  ],
  output : {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  devServer :{
    port : 8000,
    inline : true
  },
  module: {
     loaders: [ {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',

        query: {
           presets: ['es2015', 'react']
        }
     }]
  }
};
