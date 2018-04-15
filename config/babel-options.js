module.exports = {
  presets: [[require.resolve('babel-preset-env'), { useBuiltIns: 'entry' }]],
  plugins: [
    require.resolve('react-hot-loader/babel'),
    require.resolve('babel-plugin-syntax-dynamic-import'),
    [
      require.resolve('babel-plugin-transform-object-rest-spread'),
      { useBuiltIns: true },
    ],
    [
      require.resolve('babel-plugin-transform-react-jsx'),
      {
        pragma: 'wp.element.createElement',
      },
    ],
  ],
};
