module.exports = {
  presets: [
    [__dirname + '/../node_modules/babel-preset-env', { useBuiltIns: 'entry' }],
  ],
  plugins: [
    __dirname + '/../node_modules/react-hot-loader/babel',
    __dirname + '/../node_modules/babel-plugin-syntax-dynamic-import',
    [
      __dirname + '/../node_modules/babel-plugin-transform-object-rest-spread',
      { useBuiltIns: true },
    ],
    [
      __dirname + '/../node_modules/babel-plugin-transform-react-jsx',
      {
        pragma: 'wp.element.createElement',
      },
    ],
  ],
};
