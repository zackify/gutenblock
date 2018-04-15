const path = require('path');

module.exports = ({ publicPath, production, serve, babelOptions }) => {
  let folders = process.cwd().split('/');
  let pluginFolderName = folders[folders.length - 1];

  return {
    mode: production ? 'production' : 'development',
    context: __dirname,
    entry: ['@babel/polyfill', process.cwd() + '/./index.js'],
    output: {
      chunkFilename: '[name].chunk.js',
      filename: '[name].js',
      path: process.cwd() + '/build',
      publicPath: production
        ? `/wp-content/plugins/${pluginFolderName}/build/`
        : 'http://localhost:8080/',
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
              loader: '../loader',
            },
            {
              loader: 'babel-loader',
              options: babelOptions,
            },
          ],
        },
      ],
    },
  };
};
