module.exports = {
  entry : [
    'webpack-hot-middleware/client',
    './app.js'
  ]
  output : {
    path : __dirname,
    filename : 'app.min.js'
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
