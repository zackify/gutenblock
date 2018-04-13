const path = require('path');

module.exports = {
  mode: 'development', //IN PRODUCTION change to production ;)
  entry: './index.js',
  output: {
    chunkFilename: '[name].chunk.js',
    filename: '[name].js',
    path: __dirname + '/build',
    publicPath: 'http://localhost:8080/', // IN PRODUCTION '/wp-content/plugins/PLUGIN_NAME/build/',
  },
  serve: {
    add: (app, middleware) => {
      app.use((ctx, next) => {
        ctx.set('Access-Control-Allow-Origin', '*');
        next();
      });
      middleware.webpack();
      middleware.content();
    },
    dev: { publicPath: 'http://localhost:8080/' },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'gutenblock/loader',
          },
          {
            loader: 'babel-loader',
          },
        ],
      },
    ],
  },
};
