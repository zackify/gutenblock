const path = require('path');
const babelOptions = require('./babel-options');

module.exports = ({
  publicPath,
  production,
  serve,
  customConfig,
  port = 8080,
}) => {
  let folders = process.cwd().split('/');
  let pluginFolderName = folders[folders.length - 1];

  //merge custom babel options and presets
  if (customConfig.babelOptions) {
    babelOptions = {
      plugins: [...babelOptions.plugins, ...customConfig.babelOptions.plugins],
      presets: [...babelOptions.presets, ...customConfig.babelOptions.presets],
    };
    delete customConfig.babelOptions;
  }

  let gutenblock = customConfig.gutenblock || {};
  delete customConfig.gutenblock;

  let serveConfig = customConfig.serve || {};
  delete customConfig.serve;

  port = gutenblock.devPort || port;

  //merge custom rules
  let module = {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: babelOptions,
          },
          {
            loader: require.resolve('eslint-loader'),
            options: {
              configFile: require.resolve('./eslint.js'),
            },
          },
          {
            loader: require.resolve('./loader'),
            options: {
              pluginFolderName,
            },
          },
        ],
      },
    ],
  };

  if (customConfig.module && customConfig.module.rules) {
    module = {
      ...module,
      rules: [...customConfig.module.rules, ...module.rules],
    };
  }
  delete customConfig.module;

  return {
    mode: production ? 'production' : 'development',
    context: __dirname,
    entry: process.cwd() + '/./index.js',
    output: {
      chunkFilename: '[name].[chunkhash].chunk.js',
      filename: '[name].js',
      path: process.cwd() + (gutenblock.outputPath || '/build'),
      publicPath: production
        ? gutenblock.publicPath ||
          `/wp-content/plugins/${pluginFolderName}/build/`
        : `${serveConfig.https ? 'https' : 'http'}://localhost:${port}/`,
    },
    serve: {
      port,
      host: gutenblock.devHost || '0.0.0.0',
      add: (app, middleware) => {
        app.use((ctx, next) => {
          ctx.set('Access-Control-Allow-Origin', '*');
          next();
        });
        middleware.webpack();
        middleware.content();
      },
      dev: { publicPath: `http://localhost:${port}/` },
      ...serveConfig,
    },
    module,
    ...customConfig,
  };
};
